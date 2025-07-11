'use client';
import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import { supabase } from '../lib/supabase';

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
  employmentType: string;
  curation: string;
  logoUrl?: string;
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
  직무: ['전체보기', '마케팅', '세일즈', '기획/운영', '인사/HR/경영관리'],
  '커리어 여정': ['전체보기', '첫 커리어', '인턴 1회', '인턴 2회 이상', '신입'],
  카테고리: ['전체보기', '혁신의숲 어워즈'],
  '투자 시리즈': ['전체보기', 'seed', 'pre-A', 'seriesA', 'seriesB', 'seriesC', 'seriesD', 'IPO', 'M&A'],
  매출: ['전체보기', '0~1억', '1~10억', '10~50억', '50억~100억', '100억 이상', '500억 이상'],
  '임직원 수': ['전체보기', '0~10명', '11~50명', '51~100명', '100명 이상'],
  산업: ['전체보기', 'IT', '금융', '제조', '서비스', '유통'],
  지역: ['전체보기', '서울', '경기', '부산', '대구', '광주']
};

// 커리어 여정별 자동 필터 설정
const careerJourneyFilters: {[key: string]: {[key: string]: string[]}} = {
  '첫 커리어': {
    '투자 시리즈': ['seed', 'pre-A'],
    매출: ['0~1억'],
    '임직원 수': ['0~10명']
  },
  '인턴 1회': {
    '투자 시리즈': ['seed', 'seriesA'],
    매출: ['1~10억'],
    '임직원 수': ['11~50명']
  },
  '인턴 2회 이상': {
    '투자 시리즈': ['seriesA', 'seriesB'],
    매출: ['10~50억'],
    '임직원 수': ['51~100명']
  },
  '신입': {
    '투자 시리즈': ['seriesB', 'seriesC'],
    매출: ['50억~100억'],
    '임직원 수': ['100명 이상']
  }
};

export default function JobsPage() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<{[key: string]: string[]}>({});
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('job_post_curation')
          .select(`
            id,
            job_title,
            job_category_main,
            employment_type,
            is_active,
            is_liberal,
            companies (
              company_name,
              industry,
              logo_url
            )
          `)
          .eq('is_active', true)
          .eq('is_liberal', true);

        if (error) {
          throw error;
        }

        // 데이터를 JobData 형식으로 변환
        const transformedJobs: JobData[] = data.map((item: any) => ({
          id: item.id,
          category: item.job_category_main || '카테고리명',
          title: item.job_title,
          company: item.companies?.company_name || '회사명',
          jobType: item.job_category_main || '직무 카테고리',
          employmentType: item.employment_type || '고용형태',
          curation: '큐레이션',
          logoUrl: item.companies?.logo_url || undefined
        }));

        setJobs(transformedJobs);
      } catch (err) {
        setError('채용공고를 불러오는데 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

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

  if (loading) return <div className="text-center py-10">채용공고를 불러오는 중...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

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