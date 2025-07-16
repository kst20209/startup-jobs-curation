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
  return (
    <a 
      href={sourceUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block hover:opacity-90 transition-opacity"
    >
      <div className="bg-gray-200 rounded-lg p-4 md:p-5 w-full h-[140px] md:h-[160px] flex gap-3 md:gap-5 cursor-pointer hover:bg-gray-300 transition-colors">
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
        <div className="flex flex-col justify-center flex-1 min-w-0">
          <div className="space-y-1 md:space-y-1.5">
            <p className="font-medium text-xs md:text-sm text-gray-500 leading-tight truncate">{company} | {category}</p>
            <p className="font-bold text-base md:text-xl text-black leading-tight line-clamp-2">{title}</p>
            <p className="font-medium text-sm md:text-base text-black leading-tight truncate">{jobType} | {jobTypeSub} | {employmentType}</p>
            <p className="font-medium text-sm md:text-base text-black leading-tight">{curation}</p>
          </div>
        </div>
      </div>
    </a>
  );
} 