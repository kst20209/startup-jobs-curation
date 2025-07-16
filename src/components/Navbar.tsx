'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import FeedbackModal from './FeedbackModal';

export default function Navbar() {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  return (
    <>
      <nav className="w-full bg-white border-b border-gray-100 px-4 md:px-8 py-2 flex items-center justify-between sticky top-0 z-30">
        {/* 좌측: 로고 */}
        <Link href="/" className="flex items-center gap-2 select-none">
          {/* 로고 이미지 자리 */}
          <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center overflow-hidden">
            {/* <img src="/logo.svg" alt="오공고 로고" className="w-full h-full object-contain" /> */}
          </div>
          <span className="font-bold text-lg text-black tracking-tight">오공고</span>
        </Link>
        {/* 우측: 버튼 */}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded transition-colors text-sm md:text-base"
          onClick={() => setIsFeedbackOpen(true)}
        >
          피드백
        </button>
      </nav>
      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
    </>
  );
} 