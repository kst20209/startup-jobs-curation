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

// 텍스트 포맷팅 함수 
function parseCurationText(text: string): string {
  if (!text) return '';
  
  let result = text;
  
  // 색상 매핑
  const colorMap: { [key: string]: string } = {
    '빨강': '#FF0000',
    '파랑': '#0000FF',
    '초록': '#00FF00',
    '노랑': '#FFFF00',
    '보라': '#800080',
    '주황': '#FFA500',
    '회색': '#808080',
    '검정': '#000000',
    '흰색': '#FFFFFF',
    '빨간색': '#FF0000',
    '파란색': '#0000FF',
    '초록색': '#00FF00',
    '노란색': '#FFFF00',
    '보라색': '#800080',
    '주황색': '#FFA500',
    '검정색': '#000000'
  };
  
  // HEX 색상 검증 함수
  const isValidHexColor = (color: string): boolean => {
    return /^#[0-9A-F]{6}$/i.test(color);
  };
  
  // 색상명 검증 함수
  const isValidColorName = (color: string): boolean => {
    return colorMap.hasOwnProperty(color);
  };
  
  // 1. 색상 처리 (커스텀 기호) - 화이트리스트 방식
  result = result.replace(/\[색상:(.*?)\](.*?)\[\/색상\]/g, (match, color, text) => {
    // 색상 검증
    if (isValidColorName(color) || isValidHexColor(color)) {
      const hexColor = colorMap[color] || color;
      return `<span style="color: ${hexColor}">${text}</span>`;
    }
    return text; // 유효하지 않은 색상이면 원본 텍스트 반환
  });
  
  result = result.replace(/\[배경:(.*?)\](.*?)\[\/배경\]/g, (match, color, text) => {
    // 색상 검증
    if (isValidColorName(color) || isValidHexColor(color)) {
      const hexColor = colorMap[color] || color;
      return `<span style="background-color: ${hexColor}">${text}</span>`;
    }
    return text; // 유효하지 않은 색상이면 원본 텍스트 반환
  });
  
  // 2. 마크다운 스타일 처리 - 화이트리스트 방식
  result = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  result = result.replace(/\*(.*?)\*/g, '<em>$1</em>');
  result = result.replace(/~~(.*?)~~/g, '<del>$1</del>');
  result = result.replace(/__(.*?)__/g, '<u>$1</u>');
  
  // 3. 줄바꿈 처리 (실제 줄바꿈만 처리)
  result = result.replace(/\n/g, '<br>');
  
  // 4. 최종 보안 검증 - 허용된 태그만 남기기
  const allowedTags = ['strong', 'em', 'del', 'u', 'span', 'br'];
  const allowedAttributes = ['style'];
  
  // 위험한 태그나 속성이 있으면 제거
  result = result.replace(/<script[^>]*>.*?<\/script>/gi, '');
  result = result.replace(/<iframe[^>]*>.*?<\/iframe>/gi, '');
  result = result.replace(/<object[^>]*>.*?<\/object>/gi, '');
  result = result.replace(/<embed[^>]*>/gi, '');
  result = result.replace(/on\w+\s*=/gi, ''); // 이벤트 핸들러 제거
  
  return result;
}

export default function JobCard({
  category,
  title,
  company,
  jobType,
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

  // 큐레이션 텍스트 파싱
  const parsedCuration = parseCurationText(curation);

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
            <div 
              className="font-medium text-xs md:text-sm text-black leading-medium line-clamp-5 min-h-[80px] md:min-h-[100px]"
              dangerouslySetInnerHTML={{ __html: parsedCuration }}
            />
          </div>
        </div>
      </div>
    </a>
  );
} 