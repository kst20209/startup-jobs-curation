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
}

function FilterButton({ label, options = [], onClick, isOpen = false, onSelect, selectedText }: FilterButtonProps) {
  return (
    <div className="relative">
      <button 
        onClick={onClick}
        className="bg-gray-200 rounded-md px-3 md:px-5 py-2.5 flex items-center gap-2 min-w-[110px] md:min-w-[130px] h-[38px] hover:bg-gray-300 transition-colors text-sm md:text-base"
      >
        <span className="font-semibold text-center text-black flex-1 truncate">{selectedText || label}</span>
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 22 22" 
          fill="none" 
          className={`text-black transition-transform flex-shrink-0 md:w-[18px] md:h-[18px] ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M6 9L11 14L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      {isOpen && options.length > 0 && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10 min-w-[110px] md:min-w-[130px] max-w-[200px]">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => onSelect?.(label, option)}
              className="w-full text-left px-3 md:px-4 py-2.5 text-xs md:text-sm hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
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
      else if (filterType === '투자 시리즈') params.delete('investment');
      else if (filterType === '산업') params.delete('industry');
      else if (filterType === '매출') params.delete('revenue');
      else if (filterType === '임직원 수') params.delete('employees');
      
      // 커리어 여정 전체보기시 자동 필터도 제거
      if (filterType === '커리어 여정') {
        params.delete('investment');
        params.delete('revenue');
        params.delete('employees');
      }
    } else {
      // 일반 필터 선택
      if (filterType === '직무') params.set('job', option);
      else if (filterType === '투자 시리즈') params.set('investment', option);
      else if (filterType === '산업') params.set('industry', option);
      else if (filterType === '매출') params.set('revenue', option);
      else if (filterType === '임직원 수') params.set('employees', option);
      
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
    else if (filterType === '투자 시리즈') currentValue = currentFilters.investment as string || '';
    else if (filterType === '산업') currentValue = currentFilters.industry as string || '';
    else if (filterType === '매출') currentValue = currentFilters.revenue as string || '';
    else if (filterType === '임직원 수') currentValue = currentFilters.employees as string || '';
    
    return currentValue && currentValue !== '전체보기' ? currentValue : filterType;
  };

  return (
    <div className="max-w-[1100px] mx-auto px-2 md:px-0">
      {/* 첫 번째 필터 행: 직무, 커리어 여정 */}
      <div className="flex gap-2 md:gap-3 mb-3 md:mb-4 flex-wrap">
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

      {/* 두 번째 필터 행: 나머지 필터들 */}
      <div className="flex gap-2 md:gap-3 mb-6 md:mb-10 flex-wrap">
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
  );
} 