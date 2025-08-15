import MainHeadline from '@/components/MainHeadline';
import Banner from '@/components/Banner';
import JobsPage from '@/components/JobsPage';
import KakaotalkChatBanner from '@/components/KakaotalkChatBanner';
import { supabase } from '@/lib/supabase';

// 정적 생성 설정 - 1시간마다 재생성
export const revalidate = 86400;

// 매출 필터링 헬퍼 함수
const matchesRevenueFilter = (revenue: string, filter: string): boolean => {
  const revenueNum = parseFloat(revenue.replace(/[^0-9.]/g, ''));
  
  switch (filter) {
    case '0~30억':
      return revenueNum <= 30;
    case '30~200억':
      return revenueNum > 30 && revenueNum <= 200;
    case '200~500억':
      return revenueNum > 200 && revenueNum <= 500;
    case '500억 이상':
      return revenueNum > 500;
    default:
      return true;
  }
};

// 임직원 수 필터링 헬퍼 함수
const matchesEmployeeFilter = (employeeCount: string, filter: string): boolean => {
  const count = parseInt(employeeCount);
  
  switch (filter) {
    case '0~50명':
      return count <= 50;
    case '50~100명':
      return count > 50 && count <= 100;
    case '100~200명':
      return count > 100 && count <= 200;
    case '200명 이상':
      return count > 200;
    default:
      return true;
  }
};

// 오늘의 공고 데이터를 가져오는 함수
async function getDailyBannerJob() {
  // 먼저 settings_curation 테이블에서 today_job_post_id 확인
  const { data: settingsData, error: settingsError } = await supabase
    .from('settings_curation')
    .select('today_job_post_id')
    .order('id', { ascending: false })
    .limit(1)
    .single();

  if (settingsError && settingsError.code !== 'PGRST116') { // PGRST116는 결과가 없는 경우
    console.error('Error fetching settings:', settingsError);
  }

  // today_job_post_id가 설정되어 있고 null이 아닌 경우
  if (settingsData?.today_job_post_id) {
    const { data: manualJob, error: manualJobError } = await supabase
      .from('job_post_curation')
      .select(`
        id,
        job_title,
        job_category_main,
        job_category_sub,
        employment_type,
        source_url,
        job_curation,
        is_active,
        is_liberal,
        is_visible,
        companies (
          company_name,
          industry,
          logo_url,
          categories,
          investment_series,
          revenue,
          employee_count
        )
      `)
      .eq('id', settingsData.today_job_post_id)
      .eq('is_active', true)
      .eq('is_liberal', true)
      .eq('is_visible', true)
      .single();

    if (!manualJobError && manualJob) {
      console.log(`📌 수동 설정된 오늘의 공고 사용: ID ${settingsData.today_job_post_id}`);
      return manualJob;
    } else {
      console.warn(`⚠️ 설정된 공고 ID ${settingsData.today_job_post_id}를 찾을 수 없습니다. 랜덤 공고로 대체합니다.`);
    }
  }

  // 수동 설정이 없거나 유효하지 않은 경우 기존 랜덤 방식 사용
  const { data: bannerJobs, error } = await supabase
    .from('job_post_curation')
    .select(`
      id,
      job_title,
      job_category_main,
      job_category_sub,
      employment_type,
      source_url,
      job_curation,
      is_active,
      is_liberal,
      is_visible,
      companies (
        company_name,
        industry,
        logo_url,
        categories,
        investment_series,
        revenue,
        employee_count
      )
    `)
    .eq('is_active', true)
    .eq('is_liberal', true)
    .eq('is_visible', true);

  if (error) {
    console.error('Error fetching banner job:', error);
    return null;
  }

  if (!bannerJobs || bannerJobs.length === 0) return null;

  // 날짜 기반 결정적 랜덤 - 하루에 하나의 공고로 고정
  const today = new Date();
  const dateString = today.toISOString().split('T')[0]; // YYYY-MM-DD 형식
  
  // 간단한 해시 함수로 시드 기반 랜덤 생성
  const hash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // 32비트 정수로 변환
    }
    return Math.abs(hash);
  };
  
  const dailyIndex = hash(dateString) % bannerJobs.length;
  console.log(`🎲 랜덤 오늘의 공고 사용: ${bannerJobs[dailyIndex].job_title}`);
  return bannerJobs[dailyIndex];
}

// 서버에서 필터링된 데이터를 가져오는 함수
async function getFilteredJobs(searchParams: Promise<{ [key: string]: string | string[] | undefined }>) {
  // searchParams를 await으로 해결
  const params = await searchParams;
  // 모든 데이터 가져오기
  const { data: allJobs, error } = await supabase
    .from('job_post_curation')
    .select(`
      id,
      job_title,
      job_category_main,
      job_category_sub,
      employment_type,
      source_url,
      job_curation,
      is_active,
      is_liberal,
      is_visible,
      companies (
        company_name,
        industry,
        logo_url,
        categories,
        investment_series,
        revenue,
        employee_count
      )
    `)
    .eq('is_active', true)
    .eq('is_liberal', true)
    .eq('is_visible', true);

  if (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }

  if (!allJobs) return [];

  // URL 파라미터 기반 필터링
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return allJobs.filter((job: any) => {
    const company = job.companies?.[0];
    
    // 직무 필터
    if (params.job && params.job !== '전체보기') {
      if (job.job_category_main !== params.job) {
        return false;
      }
    }

    // 투자 시리즈 필터
    if (params.investment && params.investment !== '전체보기') {
      if (!company?.investment_series || company.investment_series !== params.investment) {
        return false;
      }
    }

    // 산업 필터
    if (params.industry && params.industry !== '전체보기') {
      if (!company?.industry || company.industry !== params.industry) {
        return false;
      }
    }

    // 매출 필터
    if (params.revenue && params.revenue !== '전체보기') {
      if (!company?.revenue || !matchesRevenueFilter(company.revenue, params.revenue as string)) {
        return false;
      }
    }

    // 임직원 수 필터
    if (params.employees && params.employees !== '전체보기') {
      if (!company?.employee_count || !matchesEmployeeFilter(company.employee_count, params.employees as string)) {
        return false;
      }
    }

    return true;
  });
}

// 서버 컴포넌트 - URL 파라미터 기반 필터링
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Home({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
  const filteredJobs = await getFilteredJobs(searchParams);
  const bannerJob = await getDailyBannerJob();
  const params = await searchParams;

  // 배너 데이터 변환 - JobPostList와 동일한 방식 사용
  const bannerData = bannerJob ? {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    category: (bannerJob.companies as any)?.categories?.length > 0 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? (bannerJob.companies as any).categories.join(', ') 
      : '스타트업',
    title: bannerJob.job_title,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    company: (bannerJob.companies as any)?.company_name || '회사명',
    jobType: bannerJob.job_category_main || '직무 카테고리',
    jobTypeSub: bannerJob.job_category_sub || '직무 카테고리',
    employmentType: bannerJob.employment_type || '고용형태',
    curation: bannerJob.job_curation || '큐레이션 내용이 없습니다.',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logoUrl: (bannerJob.companies as any)?.logo_url || undefined,
    sourceUrl: bannerJob.source_url || ''
  } : null;

  return (
    <div>
      <KakaotalkChatBanner />
      <MainHeadline />
      {bannerData && (
        <Banner
          category={bannerData.category}
          title={bannerData.title}
          company={bannerData.company}
          jobType={bannerData.jobType}
          jobTypeSub={bannerData.jobTypeSub}
          employmentType={bannerData.employmentType}
          curation={bannerData.curation}
          logoUrl={bannerData.logoUrl}
          sourceUrl={bannerData.sourceUrl}
        />
      )}
      <JobsPage initialJobs={filteredJobs} currentFilters={params} />
    </div>
  );
}
