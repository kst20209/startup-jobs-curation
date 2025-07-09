'use client';
import React, { useState } from 'react';
import JobCard from './JobCard';

interface FilterButtonProps {
  label: string;
  options?: string[];
  onClick?: () => void;
  isOpen?: boolean;
  onSelect?: (option: string) => void;
}

function FilterButton({ label, options = [], onClick, isOpen = false, onSelect }: FilterButtonProps) {
  return (
    <div className="relative">
      <button 
        onClick={onClick}
        className="bg-gray-200 rounded-md px-5 py-2.5 flex items-center gap-2 min-w-[130px] h-[38px] hover:bg-gray-300 transition-colors"
      >
        <span className="font-semibold text-base text-center text-black flex-1">{label}</span>
        <svg 
          width="18" 
          height="18" 
          viewBox="0 0 22 22" 
          fill="none" 
          className={`text-black transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M6 9L11 14L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      {isOpen && options.length > 0 && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10 min-w-[130px]">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => onSelect?.(option)}
              className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const sampleJobs = [
  {
    id: 1,
    category: "카테고리명",
    title: "채용공고명",
    company: "기업명",
    jobType: "직무 카테고리",
    employmentType: "고용형태",
    curation: "큐레이션"
  },
  {
    id: 2,
    category: "카테고리명",
    title: "채용공고명",
    company: "기업명",
    jobType: "직무 카테고리",
    employmentType: "고용형태",
    curation: "큐레이션"
  },
  {
    id: 3,
    category: "카테고리명",
    title: "채용공고명",
    company: "기업명",
    jobType: "직무 카테고리",
    employmentType: "고용형태",
    curation: "큐레이션"
  },
  {
    id: 4,
    category: "카테고리명",
    title: "채용공고명",
    company: "기업명",
    jobType: "직무 카테고리",
    employmentType: "고용형태",
    curation: "큐레이션"
  },
  {
    id: 5,
    category: "카테고리명",
    title: "채용공고명",
    company: "기업명",
    jobType: "직무 카테고리",
    employmentType: "고용형태",
    curation: "큐레이션"
  },
  {
    id: 6,
    category: "카테고리명",
    title: "채용공고명",
    company: "기업명",
    jobType: "직무 카테고리",
    employmentType: "고용형태",
    curation: "큐레이션"
  }
];

const filterOptions = {
  직무: ['마케팅', '영업', '기획', '인사', '재무'],
  '커리어 여정': ['신입', '경력', '인턴'],
  카테고리: ['IT', '금융', '제조', '서비스'],
  '투자 시리즈': ['시드', 'A라운드', 'B라운드', 'C라운드'],
  매출: ['1억 미만', '1-10억', '10-100억', '100억 이상'],
  '임직원 수': ['10명 미만', '10-50명', '50-100명', '100명 이상'],
  산업: ['IT', '금융', '제조', '서비스', '유통'],
  지역: ['서울', '경기', '부산', '대구', '광주']
};

export default function JobsPage() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const handleOptionSelect = (option: string) => {
    console.log('Selected:', option);
    setOpenDropdown(null);
  };

  return (
    <div className="bg-white rounded-lg max-w-[1280px] mx-auto p-8">
      {/* 메인 타이틀 */}
      <div className="text-center mb-8">
        <h1 className="font-bold text-4xl text-black leading-[38px] mb-4">
          문과 취업준비생에게 딱 맞는 채용공고만 보여드립니다
        </h1>
        <p className="font-normal text-xl text-black leading-7 text-center max-w-[872px] mx-auto">
          '내가 잘할 수 있을까?', '지원해도 괜찮을까?' <br />
          처음이라 더 조심스러운 그 마음, 잘 알고 있습니다. <br />
          그래서 여러분이 지원해볼만한 공고만 엄선했습니다.
        </p>
      </div>

      {/* 필터 버튼 컨테이너 - JobCard 그리드와 동일한 너비 */}
      <div className="max-w-[1100px] mx-auto">
        {/* 첫 번째 필터 행 */}
        <div className="flex gap-3 mb-4">
          <FilterButton 
            label="직무" 
            options={filterOptions.직무}
            isOpen={openDropdown === '직무'}
            onClick={() => handleDropdownToggle('직무')}
            onSelect={handleOptionSelect}
          />
          <FilterButton 
            label="커리어 여정" 
            options={filterOptions['커리어 여정']}
            isOpen={openDropdown === '커리어 여정'}
            onClick={() => handleDropdownToggle('커리어 여정')}
            onSelect={handleOptionSelect}
          />
        </div>

        {/* 두 번째 필터 행 */}
        <div className="flex gap-3 mb-10 flex-wrap">
          <FilterButton 
            label="카테고리" 
            options={filterOptions.카테고리}
            isOpen={openDropdown === '카테고리'}
            onClick={() => handleDropdownToggle('카테고리')}
            onSelect={handleOptionSelect}
          />
          <FilterButton 
            label="투자 시리즈" 
            options={filterOptions['투자 시리즈']}
            isOpen={openDropdown === '투자 시리즈'}
            onClick={() => handleDropdownToggle('투자 시리즈')}
            onSelect={handleOptionSelect}
          />
          <FilterButton 
            label="매출" 
            options={filterOptions.매출}
            isOpen={openDropdown === '매출'}
            onClick={() => handleDropdownToggle('매출')}
            onSelect={handleOptionSelect}
          />
          <FilterButton 
            label="임직원 수" 
            options={filterOptions['임직원 수']}
            isOpen={openDropdown === '임직원 수'}
            onClick={() => handleDropdownToggle('임직원 수')}
            onSelect={handleOptionSelect}
          />
          <FilterButton 
            label="산업" 
            options={filterOptions.산업}
            isOpen={openDropdown === '산업'}
            onClick={() => handleDropdownToggle('산업')}
            onSelect={handleOptionSelect}
          />
          <FilterButton 
            label="지역" 
            options={filterOptions.지역}
            isOpen={openDropdown === '지역'}
            onClick={() => handleDropdownToggle('지역')}
            onSelect={handleOptionSelect}
          />
        </div>
      </div>

      {/* 채용공고 카드 그리드 (2열) - 간격 조정 */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-5 max-w-[1100px] mx-auto">
        {sampleJobs.map((job) => (
          <JobCard
            key={job.id}
            category={job.category}
            title={job.title}
            company={job.company}
            jobType={job.jobType}
            employmentType={job.employmentType}
            curation={job.curation}
          />
        ))}
      </div>

      {/* 하단 텍스트 */}
      <div className="text-center mt-20">
        <p className="font-bold text-4xl text-black leading-tight">
          본인에게 딱 맞는 채용공고만 받아 보고 싶으신가요?
        </p>
      </div>
    </div>
  );
} 