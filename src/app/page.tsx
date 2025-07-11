import JobsPage from '@/components/JobsPage';
import { supabase } from '@/lib/supabase';

// 타입 정의
interface Company {
  company_name: string;
  industry: string;
  logo_url?: string;
  categories: string[];
  investment_series: string;
  revenue: string;
  employee_count: string;
}

interface JobWithCompany {
  id: number;
  job_title: string;
  job_category_main: string;
  job_category_sub: string;
  employment_type: string;
  is_active: boolean;
  is_liberal: boolean;
  companies: Company | null;
}

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
      is_active,
      is_liberal,
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
    .eq('is_liberal', true);

  if (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }

  if (!allJobs) return [];

  // URL 파라미터 기반 필터링
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return allJobs.filter((job: any) => {
    const company = job.companies;
    
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
export default async function Home({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
  const filteredJobs = await getFilteredJobs(searchParams);
  const params = await searchParams;

  return (
    <div className="min-h-screen bg-white p-8">
      <JobsPage 
        initialJobs={filteredJobs} 
        currentFilters={params}
      />
    </div>
  );
}
