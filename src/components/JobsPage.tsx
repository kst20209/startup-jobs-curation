import React from 'react';
import JobCard from './JobCard';
import FilterSection from './FilterSection';

interface JobData {
  id: number;
  category: string;
  title: string;
  company: string;
  jobType: string;
  jobTypeSub: string;
  employmentType: string;
  curation: string;
  logoUrl?: string;
  sourceUrl: string;
}

interface JobsPageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialJobs: any[];
  currentFilters: { [key: string]: string | string[] | undefined };
}

export default function JobsPage({ initialJobs, currentFilters }: JobsPageProps) {
  // 서버에서 이미 필터링된 데이터를 JobData 형식으로 변환
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const jobs: JobData[] = initialJobs.map((item: any) => ({
    id: item.id,
    category: item.companies?.categories?.length > 0 
      ? item.companies.categories.join(', ') 
      : '스타트업',
    title: item.job_title,
    company: item.companies?.company_name || '회사명',
    jobType: item.job_category_main || '직무 카테고리',
    jobTypeSub: item.job_category_sub || '직무 카테고리',
    employmentType: item.employment_type || '고용형태',
    curation: item.job_curation || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    logoUrl: item.companies?.logo_url || undefined,
    sourceUrl: item.source_url || ''
  }));

  return (
    <div className="bg-white max-w-[1280px] mx-auto md:p-8">
      {/* 필터 섹션 - 클라이언트 컴포넌트 */}
      <FilterSection currentFilters={currentFilters} />

      {/* 채용공고 카드 그리드 - 모바일: 1열, 데스크탑: 2열 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-6 md:gap-y-5 max-w-[1100px] mx-auto">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            category={job.category}
            title={job.title}
            company={job.company}
            jobType={job.jobType}
            jobTypeSub={job.jobTypeSub}
            employmentType={job.employmentType}
            curation={job.curation}
            logoUrl={job.logoUrl}
            sourceUrl={job.sourceUrl}
          />
        ))}
      </div>
    </div>
  );
} 