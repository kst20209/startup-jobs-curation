import React from 'react';
import Image from 'next/image';

interface BannerProps {
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

// 텍스트 포맷팅 함수 (JobCard와 동일)
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
      return `<span style="color: ${hexColor}" class="jd_card">${text}</span>`;
    }
    return text; // 유효하지 않은 색상이면 원본 텍스트 반환
  });
  
  result = result.replace(/\[배경:(.*?)\](.*?)\[\/배경\]/g, (match, color, text) => {
    // 색상 검증
    if (isValidColorName(color) || isValidHexColor(color)) {
      const hexColor = colorMap[color] || color;
      return `<span style="background-color: ${hexColor}" class="jd_card">${text}</span>`;
    }
    return text; // 유효하지 않은 색상이면 원본 텍스트 반환
  });
  
  // 2. 마크다운 스타일 처리 - 화이트리스트 방식
  result = result.replace(/\*\*(.*?)\*\*/g, '<strong class="jd_card">$1</strong>');
  result = result.replace(/\*(.*?)\*/g, '<em class="jd_card">$1</em>');
  result = result.replace(/~~(.*?)~~/g, '<del class="jd_card">$1</del>');
  result = result.replace(/__(.*?)__/g, '<u class="jd_card">$1</u>');
  
  // 3. 줄바꿈 처리 (실제 줄바꿈만 처리)
  result = result.replace(/\n/g, '<br>');
  
  // 4. 최종 보안 검증 - 위험한 태그나 속성이 있으면 제거
  result = result.replace(/<script[^>]*>.*?<\/script>/gi, '');
  result = result.replace(/<iframe[^>]*>.*?<\/iframe>/gi, '');
  result = result.replace(/<object[^>]*>.*?<\/object>/gi, '');
  result = result.replace(/<embed[^>]*>/gi, '');
  result = result.replace(/on\w+\s*=/gi, ''); // 이벤트 핸들러 제거
  
  return result;
}

export default function Banner({
  category,
  title,
  company,
  jobType,
  employmentType,
  curation,
  logoUrl,
  sourceUrl
}: BannerProps) {
  // UTM 파라미터 추가
  const urlWithUtm = sourceUrl ? `${sourceUrl}${sourceUrl.includes('?') ? '&' : '?'}utm_source=letscareer&utm_medium=letscareer_ogongo` : '#';

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
    <div className="w-full bg-[#0066e3] py-10 md:py-16 px-2 md:px-0">
      {/* 상단 텍스트 */}
      <div className="max-w-4xl mx-auto mb-2 md:mb-4">
        <span className="text-white font-bold text-xl md:text-2xl pl-2">
          취업 준비생을 위한 공고 추천
        </span>
      </div>
      {/* 배너 카드 */}
      <div className="max-w-4xl mx-auto bg-gray-50 rounded-2xl shadow-xl flex flex-col md:flex-row p-6 md:p-10">
        {/* 왼쪽: 로고+회사정보 */}
        <div className="flex flex-col items-center md:w-2/5 md:flex-none md:items-start  md:pr-8">
          {/* 로고 컨테이너 - 고정 크기 */}
          <div className="w-16 h-16 md:w-20 md:h-20 mb-4 flex-shrink-0">
            <div className="w-full h-full border border-gray-200 rounded-lg bg-white p-1">
              {logoUrl ? (
                <Image 
                  src={logoUrl} 
                  alt={`${company} 로고`} 
                  width={80}
                  height={80}
                  className="w-full h-full object-contain rounded"
                />
              ) : (
                <div className="w-full h-full rounded flex items-center justify-center bg-blue-500">
                  <span className="text-white font-bold text-xs md:text-sm">로고</span>
                </div>
              )}
            </div>
          </div>
          
          {/* 카테고리 태그 */}
          <span 
            className="text-black px-2 py-1 rounded font-bold text-xs mb-2"
            style={{ backgroundColor: getCategoryColor(category) }}
          >
            {category}
          </span>
          
          {/* 회사 정보 */}
          <div className="text-gray-700 text-sm mb-1 text-center md:text-left">
            {company} | {jobType} | {employmentType}
          </div>
          
          {/* 제목 */}
          <div className="font-bold text-base md:text-lg text-black mb-2 text-center md:text-left">
            {title}
          </div>
        </div>
        
        {/* 오른쪽: 큐레이션+버튼 */}
        <div className="flex flex-col justify-between md:w-3/5 md:flex-none mt-6 md:mt-0 md:pl-8">
          {/* 큐레이션 내용 */}
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 text-sm text-gray-800 mb-4 flex-1">
            <span className="font-semibold text-black block mb-2">👉 오공고 큐레이션</span>
            <div 
              className="text-gray-800"
              dangerouslySetInnerHTML={{ __html: parsedCuration }}
            />
          </div>
          
          {/* 지원 버튼 */}
          <div className="flex justify-center md:justify-end">
            <a href={urlWithUtm} target="_blank" rel="noopener noreferrer">
              <button className="bg-[#3b82f6] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#2563eb] transition">
                지원하기
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 