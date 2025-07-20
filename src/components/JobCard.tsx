'use client';
import React from 'react';
import Image from 'next/image';

interface JobCardProps {
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

export default function JobCard({
  category,
  title,
  company,
  jobType,
  jobTypeSub,
  employmentType,
  curation,
  logoUrl,
  sourceUrl
}: JobCardProps) {
  // UTM 파라미터 추가
  const urlWithUtm = `${sourceUrl}${sourceUrl.includes('?') ? '&' : '?'}utm_source=letscareer&utm_medium=letscareer_ogongo`;

  // 카테고리별 색상 매핑 함수
  const getCategoryColor = (category: string) => {
    const categoryColors: { [key: string]: string } = {
      '혁신의 숲 어워즈': '#B2FF00',
      '스타트업': '#70dbff',
      'IT/개발': '#8A2BE2',
      '마케팅': '#FF69B4',
      '디자인': '#FFD700',
      '기획/운영': '#FFA500',
      '영업': '#FF0000',
      '인사': '#4B0082',
      '재무': '#00FF00',
      '기타': '#808080'
    };
    
    return categoryColors[category] || '#808080';
  };

  return (
    <a 
      href={urlWithUtm} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block hover:opacity-90 transition-opacity"
    >
      <div className="bg-white rounded-lg p-4 md:p-5 w-full border border-gray-200 flex gap-3 md:gap-5 cursor-pointer hover:bg-gray-50 transition-colors">
        {/* 로고 영역 - 세로 중앙 정렬 */}
        <div className="flex items-center">
          <div className={`rounded flex-shrink-0 w-[60px] h-[60px] md:w-[80px] md:h-[80px] flex items-center justify-center ${logoUrl ? 'bg-white border border-gray-300' : 'bg-blue-500'}`}>
            {logoUrl ? (
              <Image 
                src={logoUrl} 
                alt={`${company} 로고`} 
                width={80}
                height={80}
                className="w-full h-full object-contain rounded"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <span className={`text-white font-bold text-sm md:text-lg ${logoUrl ? 'hidden' : ''}`}>로고</span>
          </div>
        </div>
        
        {/* 텍스트 정보 영역 */}
        <div className="flex flex-col justify-center flex-1 min-w-0 py-2">
          <div className="space-y-2">
            {/* 카테고리 */}
            <p 
              className="font-bold text-sm md:text-base text-black leading-tight truncate px-2 py-1 rounded inline-block"
              style={{ backgroundColor: getCategoryColor(category) }}
            >
              {category}
            </p>
            
            {/* 회사명 | 직무 카테고리 | 고용 형태 */}
            <p className="font-medium text-xs md:text-sm text-gray-500 leading-tight truncate -mt-2">
              {company} | {jobType} | {employmentType}
            </p>
            
            {/* 직무 제목 */}
            <p className="font-bold text-base md:text-l text-black leading-tight line-clamp-1">{title}</p>
            
            {/* 큐레이션 정보 */}
            <p className="font-bold text-xs md:text-sm text-black leading-tight">
              👉🏻 오공고 큐레이션
            </p>
            
            {/* 큐레이션 설명 */}
            <p className="font-medium text-xs md:text-sm text-black leading-medium line-clamp-5">{curation}</p>
          </div>
        </div>
      </div>
    </a>
  );
} 