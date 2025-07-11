'use client';
import React, { useState } from 'react';
import JobCard from './JobCard';

interface FilterButtonProps {
  label: string;
  options?: string[];
  onClick?: () => void;
  isOpen?: boolean;
  onSelect?: (filterType: string, option: string) => void;
  selectedText?: string;
}

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
}

interface JobsPageProps {
  allJobs: any[];
}

function FilterButton({ label, options = [], onClick, isOpen = false, onSelect, selectedText }: FilterButtonProps) {
  return (
    <div className="relative">
      <button 
        onClick={onClick}
        className="bg-gray-200 rounded-md px-5 py-2.5 flex items-center gap-2 min-w-[130px] h-[38px] hover:bg-gray-300 transition-colors"
      >
        <span className="font-semibold text-base text-center text-black flex-1">{selectedText || label}</span>
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
              onClick={() => onSelect?.(label, option)}
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

const filterOptions = {
  직무: ['전체보기', '세일즈/마케팅', '기획', '인사/HR', 'CX/운영', '디자인'],
  '커리어 여정': ['전체보기', '첫 커리어', '인턴 1회', '인턴 2회 이상', '신입'],
  카테고리: ['전체보기', '혁신의숲 어워즈'],
  '투자 시리즈': ['전체보기', 'pre-A', 'Series A'],
  매출: ['전체보기', '0~30억', '30~200억', '200~500억', '500억 이상'],
  '임직원 수': ['전체보기', '0~50명', '50~100명', '100~200명', '200명 이상'],
  산업: ['전체보기', '헬스케어/바이오', '통신/보안/데이터', '홈리빙/펫', '콘텐츠/예술', '교육'],
  지역: ['전체보기', '서울', '경기', '부산', '대구', '광주']
};

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

// 커리어 여정별 자동 필터 설정
const careerJourneyFilters: {[key: string]: {[key: string]: string[]}} = {
  '첫 커리어': {
    '투자 시리즈': ['pre-A'],
    매출: ['0~30억'],
    '임직원 수': ['0~50명']
  },
  '인턴 1회': {
    '투자 시리즈': ['pre-A', 'Series A'],
    매출: ['0~30억', '30~200억'],
    '임직원 수': ['0~50명', '50~100명']
  },
  '인턴 2회 이상': {
    '투자 시리즈': ['Series A'],
    매출: ['30~200억'],
    '임직원 수': ['50~100명', '100~200명']
  },
  '신입': {
    '투자 시리즈': ['Series A'],
    매출: ['200~500억', '500억 이상'],
    '임직원 수': ['100~200명', '200명 이상']
  }
};

export default function JobsPage({ allJobs }: JobsPageProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<{[key: string]: string[]}>({});

  // 모든 데이터를 JobData 형식으로 변환
  const transformedAllJobs: JobData[] = allJobs.map((item: any) => ({
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
    // 필터링을 위한 원본 데이터 보존
    _originalData: item
  }));

  // 클라이언트 사이드 필터링 (즉시 계산)
  const jobs = transformedAllJobs.filter((job: any) => {
    const company = job._originalData.companies;
    
    // 직무 필터
    if (selectedFilters.직무 && selectedFilters.직무.length > 0) {
      if (!selectedFilters.직무.includes(job.jobType)) {
        return false;
      }
    }

    // 투자 시리즈 필터
    if (selectedFilters['투자 시리즈'] && selectedFilters['투자 시리즈'].length > 0) {
      const investmentSeries = company?.investment_series;
      if (!investmentSeries || !selectedFilters['투자 시리즈'].includes(investmentSeries)) {
        return false;
      }
    }

    // 산업 필터
    if (selectedFilters.산업 && selectedFilters.산업.length > 0) {
      const industry = company?.industry;
      if (!industry || !selectedFilters.산업.includes(industry)) {
        return false;
      }
    }

    // 매출 필터
    if (selectedFilters.매출 && selectedFilters.매출.length > 0) {
      const revenueFilter = selectedFilters.매출[0];
      const revenue = company?.revenue;
      if (revenue && !matchesRevenueFilter(revenue, revenueFilter)) {
        return false;
      }
    }

    // 임직원 수 필터
    if (selectedFilters['임직원 수'] && selectedFilters['임직원 수'].length > 0) {
      const employeeFilter = selectedFilters['임직원 수'][0];
      const employeeCount = company?.employee_count;
      if (employeeCount && !matchesEmployeeFilter(employeeCount, employeeFilter)) {
        return false;
      }
    }

    return true;
  }).map(({ _originalData, ...job }: any) => job); // 원본 데이터 제거

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const handleOptionSelect = (filterType: string, option: string) => {
    console.log('Selected:', filterType, option);
    
    // 전체보기 선택 시 필터 초기화
    if (option === '전체보기') {
      if (filterType === '커리어 여정') {
        // 커리어 여정 전체보기 시 자동 필터도 함께 초기화
        setSelectedFilters(prev => {
          const newFilters = { ...prev };
          delete newFilters[filterType];
          delete newFilters['투자 시리즈'];
          delete newFilters['매출'];
          delete newFilters['임직원 수'];
          return newFilters;
        });
      } else {
        // 다른 필터의 전체보기 시 해당 필터만 초기화
        setSelectedFilters(prev => {
          const newFilters = { ...prev };
          delete newFilters[filterType];
          return newFilters;
        });
      }
    } else {
      // 커리어 여정 선택 시 자동 필터링
      if (filterType === '커리어 여정' && careerJourneyFilters[option]) {
        const autoFilters = careerJourneyFilters[option];
        setSelectedFilters(prev => ({
          ...prev,
          [filterType]: [option],
          ...autoFilters
        }));
      } else {
        // 일반 필터 선택
        setSelectedFilters(prev => ({
          ...prev,
          [filterType]: [option]
        }));
      }
    }
    
    setOpenDropdown(null);
  };

  const getSelectedFilterText = (filterType: string) => {
    const selected = selectedFilters[filterType];
    if (selected && selected.length > 0) {
      // 전체보기가 선택된 경우에는 원래 라벨 표시
      if (selected[0] === '전체보기') {
        return filterType;
      }
      return selected.length === 1 ? selected[0] : `${selected[0]} 외 ${selected.length - 1}개`;
    }
    return filterType;
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
            selectedText={getSelectedFilterText('직무')}
          />
          <FilterButton 
            label="커리어 여정" 
            options={filterOptions['커리어 여정']}
            isOpen={openDropdown === '커리어 여정'}
            onClick={() => handleDropdownToggle('커리어 여정')}
            onSelect={handleOptionSelect}
            selectedText={getSelectedFilterText('커리어 여정')}
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
            selectedText={getSelectedFilterText('카테고리')}
          />
          <FilterButton 
            label="투자 시리즈" 
            options={filterOptions['투자 시리즈']}
            isOpen={openDropdown === '투자 시리즈'}
            onClick={() => handleDropdownToggle('투자 시리즈')}
            onSelect={handleOptionSelect}
            selectedText={getSelectedFilterText('투자 시리즈')}
          />
          <FilterButton 
            label="매출" 
            options={filterOptions.매출}
            isOpen={openDropdown === '매출'}
            onClick={() => handleDropdownToggle('매출')}
            onSelect={handleOptionSelect}
            selectedText={getSelectedFilterText('매출')}
          />
          <FilterButton 
            label="임직원 수" 
            options={filterOptions['임직원 수']}
            isOpen={openDropdown === '임직원 수'}
            onClick={() => handleDropdownToggle('임직원 수')}
            onSelect={handleOptionSelect}
            selectedText={getSelectedFilterText('임직원 수')}
          />
          <FilterButton 
            label="산업" 
            options={filterOptions.산업}
            isOpen={openDropdown === '산업'}
            onClick={() => handleDropdownToggle('산업')}
            onSelect={handleOptionSelect}
            selectedText={getSelectedFilterText('산업')}
          />
          <FilterButton 
            label="지역" 
            options={filterOptions.지역}
            isOpen={openDropdown === '지역'}
            onClick={() => handleDropdownToggle('지역')}
            onSelect={handleOptionSelect}
            selectedText={getSelectedFilterText('지역')}
          />
        </div>
      </div>

      {/* 채용공고 카드 그리드 (2열) - 간격 조정 */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-5 max-w-[1100px] mx-auto">
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