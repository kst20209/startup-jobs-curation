import JobsPage from '@/components/JobsPage';
import { supabase } from '@/lib/supabase';

// 정적 생성 설정 - 1시간마다 재생성
export const revalidate = 86400;

// 빌드 타임에 모든 데이터를 가져오는 서버 컴포넌트
export default async function Home() {
  // 모든 활성 문과 직무 데이터를 빌드 타임에 가져오기
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
    return <div className="min-h-screen bg-white p-8">데이터를 불러오는데 실패했습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <JobsPage allJobs={allJobs || []} />
    </div>
  );
}
