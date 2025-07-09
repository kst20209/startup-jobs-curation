import React from 'react';

interface JobCardProps {
  category: string;
  title: string;
  company: string;
  jobType: string;
  employmentType: string;
  curation: string;
  logoUrl?: string;
}

export default function JobCard({
  category,
  title,
  company,
  jobType,
  employmentType,
  curation,
  logoUrl
}: JobCardProps) {
  return (
    <div className="bg-gray-200 rounded-lg p-5 w-full h-[160px] flex gap-5">
      {/* 로고 영역 - 세로 중앙 정렬 */}
      <div className="flex items-center">
        <div className="bg-blue-500 rounded flex-shrink-0 w-[80px] h-[80px] flex items-center justify-center">
          {logoUrl ? (
            <img src={logoUrl} alt={`${company} 로고`} className="w-full h-full object-contain" />
          ) : (
            <span className="text-white font-bold text-lg">로고</span>
          )}
        </div>
      </div>
      
      {/* 텍스트 정보 영역 */}
      <div className="flex flex-col justify-center flex-1 min-w-0">
        <div className="space-y-1.5">
          <p className="font-bold text-lg text-black leading-tight">({category})</p>
          <p className="font-bold text-xl text-black leading-tight">({title})</p>
          <p className="font-bold text-lg text-black leading-tight">({company})</p>
          <p className="font-medium text-base text-black leading-tight">({jobType})/({employmentType})</p>
          <p className="font-medium text-base text-black leading-tight">({curation})</p>
        </div>
      </div>
    </div>
  );
} 