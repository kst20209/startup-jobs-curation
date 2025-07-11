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
      <div className="bg-gray-200 rounded-lg p-5 w-full h-[160px] flex gap-5 cursor-pointer hover:bg-gray-300 transition-colors">
        {/* 로고 영역 - 세로 중앙 정렬 */}
        <div className="flex items-center">
          <div className={`rounded flex-shrink-0 w-[80px] h-[80px] flex items-center justify-center ${logoUrl ? 'bg-white border border-gray-300' : 'bg-blue-500'}`}>
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
            <span className={`text-white font-bold text-lg ${logoUrl ? 'hidden' : ''}`}>로고</span>
          </div>
        </div>
        
        {/* 텍스트 정보 영역 */}
        <div className="flex flex-col justify-center flex-1 min-w-0">
          <div className="space-y-1.5">
            <p className="font-medium text-sm text-gray-500 leading-tight">{company} | {category}</p>
            <p className="font-bold text-xl text-black leading-tight">{title}</p>
            <p className="font-medium text-base text-black leading-tight">{jobType} | {jobTypeSub} | {employmentType}</p>
            <p className="font-medium text-base text-black leading-tight">{curation}</p>
          </div>
        </div>
      </div>
    </a>
  );
} 