'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilterButtonProps {
  label: string;
  options?: string[];
  onClick?: () => void;
  isOpen?: boolean;
  onSelect?: (filterType: string, option: string) => void;
  selectedText?: string;
  theme?: 'career' | 'job';
}

function FilterButton({ label, selectedText, theme = 'career' }: FilterButtonProps) {
  const isCareerTheme = theme === 'career';
  
  return (
    <div className="relative">
      <button 
        className={`rounded-full px-2 md:px-2.5 py-1.5 flex items-center gap-2 hover:opacity-80 transition-colors text-sm md:text-base ${
          isCareerTheme 
            ? 'bg-blue-100 text-blue-500' 
            : 'bg-orange-100 text-orange-400'
        }`}
      >
        <span className="font-medium text-center flex-1 truncate">{selectedText || label}</span>
      </button>
    </div>
  );
}

interface FilterDropdownProps {
  label: string;
  options?: string[];
  onClick?: () => void;
  isOpen?: boolean;
  onSelect?: (filterType: string, option: string) => void;
  selectedText?: string;
  theme?: 'career' | 'job';
}

function FilterDropdown({ label, options = [], onClick, isOpen = false, onSelect, selectedText, theme = 'career' }: FilterDropdownProps) {
  const isCareerTheme = theme === 'career';
  const accentColor = isCareerTheme ? 'text-blue-500' : 'text-orange-400';
  
  // 선택된 값이 있으면 해당 값을 표시, 없으면 "전체" 표시
  const displayText = selectedText && selectedText !== label ? selectedText : '전체';
  
  return (
    <div className="relative">
      <button 
        onClick={onClick}
        className="bg-gray-50 border border-gray-200 rounded-md px-2 md:px-2.5 py-2 flex items-center gap-2.5 hover:bg-gray-100 transition-colors text-xs md:text-sm filter"
      >
        <span className="text-gray-900 flex-1 truncate">{label}</span>
        <span className={`font-semibold ${accentColor}`}>{displayText}</span>
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 22 22" 
          fill="none" 
          className={`text-gray-500 transition-transform flex-shrink-0 md:w-[16px] md:h-[16px] ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M6 9L11 14L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      {isOpen && options.length > 0 && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[160px] max-w-[200px]">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => onSelect?.(label, option)}
              className="w-full text-left px-3 md:px-4 py-2 text-sm md:text-base hover:bg-gray-50 first:rounded-t-md last:rounded-b-md text-gray-700 whitespace-nowrap"
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

interface FilterSectionProps {
  currentFilters: { [key: string]: string | string[] | undefined };
}

export default function FilterSection({ currentFilters }: FilterSectionProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const handleOptionSelect = (filterType: string, option: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (option === '전체보기') {
      // 전체보기 선택 시 해당 필터 제거
      if (filterType === '직무') params.delete('job');
      else if (filterType === '커리어 여정') params.delete('careerJourney');
      else if (filterType === '투자 시리즈') params.delete('investment');
      else if (filterType === '산업') params.delete('industry');
      else if (filterType === '매출') params.delete('revenue');
      else if (filterType === '임직원 수') params.delete('employees');
      else if (filterType === '카테고리') params.delete('category');
      else if (filterType === '투자') params.delete('investment');
      else if (filterType === '지역') params.delete('location');
      
      // 커리어 여정 전체보기시 자동 필터도 제거
      if (filterType === '커리어 여정') {
        params.delete('investment');
        params.delete('revenue');
        params.delete('employees');
      }
    } else {
      // 일반 필터 선택
      if (filterType === '직무') params.set('job', option);
      else if (filterType === '커리어 여정') params.set('careerJourney', option);
      else if (filterType === '투자 시리즈') params.set('investment', option);
      else if (filterType === '산업') params.set('industry', option);
      else if (filterType === '매출') params.set('revenue', option);
      else if (filterType === '임직원 수') params.set('employees', option);
      else if (filterType === '카테고리') params.set('category', option);
      else if (filterType === '투자') params.set('investment', option);
      else if (filterType === '지역') params.set('location', option);
      
      // 커리어 여정 선택시 자동 필터 적용
      if (filterType === '커리어 여정' && careerJourneyFilters[option]) {
        const autoFilters = careerJourneyFilters[option];
        if (autoFilters['투자 시리즈']) params.set('investment', autoFilters['투자 시리즈'][0]);
        if (autoFilters['매출']) params.set('revenue', autoFilters['매출'][0]);
        if (autoFilters['임직원 수']) params.set('employees', autoFilters['임직원 수'][0]);
      }
    }
    
    setOpenDropdown(null);
    router.push(`/?${params.toString()}`);
  };

  const getSelectedFilterText = (filterType: string) => {
    let currentValue = '';
    
    if (filterType === '직무') currentValue = currentFilters.job as string || '';
    else if (filterType === '커리어 여정') currentValue = currentFilters.careerJourney as string || '';
    else if (filterType === '투자 시리즈') currentValue = currentFilters.investment as string || '';
    else if (filterType === '산업') currentValue = currentFilters.industry as string || '';
    else if (filterType === '매출') currentValue = currentFilters.revenue as string || '';
    else if (filterType === '임직원 수') currentValue = currentFilters.employees as string || '';
    else if (filterType === '카테고리') currentValue = currentFilters.category as string || '';
    else if (filterType === '투자') currentValue = currentFilters.investment as string || '';
    else if (filterType === '지역') currentValue = currentFilters.location as string || '';
    
    return currentValue && currentValue !== '전체보기' ? currentValue : filterType;
  };

  return (
    <div className="max-w-[1100px] mx-auto px-2 md:px-0">
      {/* 첫 번째 필터 행: 커리어 필터 (보라/파란색 테마) */}
      <div className="flex gap-2 md:gap-3 mb-3 md:mb-4 flex-wrap">
        <FilterButton 
          label="커리어 필터" 
          theme="career"
        />
        <FilterDropdown 
          label="직무" 
          options={filterOptions.직무}
          isOpen={openDropdown === '직무'}
          onClick={() => handleDropdownToggle('직무')}
          onSelect={handleOptionSelect}
          selectedText={getSelectedFilterText('직무')}
          theme="career"
        />
        <FilterDropdown 
          label="커리어 여정" 
          options={filterOptions['커리어 여정']}
          isOpen={openDropdown === '커리어 여정'}
          onClick={() => handleDropdownToggle('커리어 여정')}
          onSelect={handleOptionSelect}
          selectedText={getSelectedFilterText('커리어 여정')}
          theme="career"
        />
      </div>

      {/* 두 번째 필터 행: 공고 필터 (주황색 테마) */}
      <div className="flex gap-2 md:gap-3 mb-6 md:mb-10 flex-wrap">
        <FilterButton 
          label="공고 필터" 
          theme="job"
        />
        <FilterDropdown 
          label="카테고리" 
          options={filterOptions.카테고리}
          isOpen={openDropdown === '카테고리'}
          onClick={() => handleDropdownToggle('카테고리')}
          onSelect={handleOptionSelect}
          selectedText={getSelectedFilterText('카테고리')}
          theme="job"
        />
        <FilterDropdown 
          label="투자" 
          options={filterOptions['투자 시리즈']}
          isOpen={openDropdown === '투자 시리즈'}
          onClick={() => handleDropdownToggle('투자 시리즈')}
          onSelect={handleOptionSelect}
          selectedText={getSelectedFilterText('투자 시리즈')}
          theme="job"
        />
        <FilterDropdown 
          label="매출" 
          options={filterOptions.매출}
          isOpen={openDropdown === '매출'}
          onClick={() => handleDropdownToggle('매출')}
          onSelect={handleOptionSelect}
          selectedText={getSelectedFilterText('매출')}
          theme="job"
        />
        <FilterDropdown 
          label="임직원 수" 
          options={filterOptions['임직원 수']}
          isOpen={openDropdown === '임직원 수'}
          onClick={() => handleDropdownToggle('임직원 수')}
          onSelect={handleOptionSelect}
          selectedText={getSelectedFilterText('임직원 수')}
          theme="job"
        />
        <FilterDropdown 
          label="산업" 
          options={filterOptions.산업}
          isOpen={openDropdown === '산업'}
          onClick={() => handleDropdownToggle('산업')}
          onSelect={handleOptionSelect}
          selectedText={getSelectedFilterText('산업')}
          theme="job"
        />
        <FilterDropdown 
          label="지역" 
          options={filterOptions.지역}
          isOpen={openDropdown === '지역'}
          onClick={() => handleDropdownToggle('지역')}
          onSelect={handleOptionSelect}
          selectedText={getSelectedFilterText('지역')}
          theme="job"
        />
      </div>
    </div>
  );
} 