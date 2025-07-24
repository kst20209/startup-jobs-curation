import React from 'react';

export default function Banner() {
  return (
    <div className="w-full bg-[#0066e3] py-10 md:py-16 px-2 md:px-0">
      {/* 상단 텍스트 */}
      <div className="max-w-5xl mx-auto mb-6 md:mb-10">
        <span className="text-white font-bold text-xl md:text-2xl">
          취업 준비생을 위한 공고 추천
        </span>
      </div>
      {/* 배너 카드 */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl flex flex-col md:flex-row items-stretch p-6 md:p-10">
        {/* 왼쪽: 이미지+텍스트 */}
        <div className="flex flex-col items-center md:items-start md:w-1/2">
          <img
            src="/kakaochat_1.png"
            alt="배너 이미지"
            className="w-20 h-20 md:w-28 md:h-28 mb-4"
          />
          <span className="bg-lime-200 text-black px-2 py-1 rounded font-bold text-xs mb-2">
            혁신의 숲 어워즈
          </span>
          <div className="text-gray-700 text-sm mb-1">
            넥스트 그라운드 | 기획/운영 | 인턴
          </div>
          <div className="font-bold text-base md:text-lg text-black mb-2 text-center md:text-left">
            [인턴] 앱/웹 기획 인턴(Product manager) 채용
          </div>
        </div>
        {/* 오른쪽: 큐레이션 설명+버튼 */}
        <div className="flex flex-col justify-between md:w-1/2 mt-6 md:mt-0 md:pl-8">
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 text-sm text-gray-800 mb-4 flex-1">
            <span className="font-semibold text-black block mb-2">👉 오공고 큐레이션</span>
            넥스트 그라운드는 월 150만명이 사용하는 부동산 정보 플랫폼, “찜플”을 운영하고 있어요. 24년도 하반기부터 축자에 전환했으며, 30억원의 투자를 유치했어요. 경험이 없어도 기획, 개발 및 배포까지의 사이드 프로젝트 경험이 있고, PM으로 커리어를 시작하고 싶으신 분들께 추천드려요.
          </div>
          <div className="flex justify-end">
            <a href="#" target="_blank" rel="noopener noreferrer">
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