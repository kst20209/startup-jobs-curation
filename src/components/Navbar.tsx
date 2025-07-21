'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import FeedbackModal from './FeedbackModal';

export default function Navbar() {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="w-full bg-white border-b border-gray-100 px-4 md:px-8 py-3 flex items-center justify-between sticky top-0 z-30">
        {/* 좌측: 햄버거 메뉴 및 로고 */}
        <div className="flex items-center gap-4">
          {/* 모바일 햄버거 메뉴 */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2 select-none">
            <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center overflow-hidden">
              {/* <img src="/logo.svg" alt="오공고 로고" className="w-full h-full object-contain" /> */}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-black tracking-tight hidden sm:inline">오늘의 공고, 오공고</span>
            </div>
          </Link>
          
          {/* 네비게이션 메뉴 (데스크톱) */}
          <div className="hidden md:flex items-center gap-6 ml-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              채용공고
            </Link>
            <Link href="/chat" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              오픈채팅방
            </Link>
          </div>
        </div>

        {/* 우측: 피드백 요청 버튼 */}
        <div className="flex items-center">
          <button
            className="bg-[#5D5DF6]/10 hover:bg-[#5D5DF6]/20 text-[#5D5DF6] font-semibold px-3 py-1.5 sm:px-5 sm:py-2 rounded-full border border-[#5D5DF6]/30 transition-colors text-xs sm:text-sm min-w-[70px] sm:min-w-[110px]"
            onClick={() => setIsFeedbackOpen(true)}
          >
            <span className="inline">제발 도와주세요 🙏</span>
          </button>
        </div>
      </nav>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 py-3">
          <div className="flex flex-col gap-3">
            <Link 
              href="/jobs" 
              className="text-gray-700 hover:text-gray-900 font-medium py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              채용공고
            </Link>
            <Link 
              href="/chat" 
              className="text-gray-700 hover:text-gray-900 font-medium py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              오픈채팅방
            </Link>
          </div>
        </div>
      )}

      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
    </>
  );
} 