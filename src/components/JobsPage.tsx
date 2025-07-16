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
    curation: '큐레이션',
    logoUrl: item.companies?.logo_url || undefined,
    sourceUrl: item.source_url || ''
  }));

  return (
    <div className="bg-white rounded-lg max-w-[1280px] mx-auto p-4 md:p-8">
      {/* 메인 타이틀 */}
      <div className="text-center mb-6 md:mb-8">
        <h1 className="font-bold text-2xl md:text-4xl text-black leading-tight md:leading-[38px] mb-3 md:mb-4 px-2">
          문과 취업준비생에게 딱 맞는 채용공고만 보여드립니다
        </h1>
        <p className="font-normal text-base md:text-xl text-black leading-6 md:leading-7 text-center max-w-[872px] mx-auto px-4">
          &apos;내가 잘할 수 있을까?&apos;, &apos;지원해도 괜찮을까?&apos; <br className="hidden md:block" />
          <span className="md:hidden"> </span>처음이라 더 조심스러운 그 마음, 잘 알고 있습니다. <br className="hidden md:block" />
          <span className="md:hidden"> </span>그래서 여러분이 지원해볼만한 공고만 엄선했습니다.
        </p>
      </div>

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

      {/* 하단 텍스트 */}
      <div className="text-center mt-12 md:mt-20 px-4">
        <p className="font-bold text-2xl md:text-4xl text-black leading-tight">
          본인에게 딱 맞는 채용공고만 받아 보고 싶으신가요?
        </p>
      </div>
    </div>
  );
} 