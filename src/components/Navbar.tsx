'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import FeedbackModal from './FeedbackModal';
import Image from 'next/image'
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="w-full backdrop-blur-md bg-white/80 sticky top-0 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2 px-2">
            {/* 로고: 데스크톱에서는 ogongo-logo, 모바일에서는 ogongo-favicon */}
            <Link href="/" className="block hover:opacity-80 transition-opacity">
              {/* 데스크톱(640px 이상)에서만 보임 */}
              <span className="hidden sm:inline">
                <Image
                  src="/ogongo-logo.png"
                  alt="오공고 로고"
                  width={1080}
                  height={270}
                  className="h-auto max-w-[180px] w-full"
                  style={{ width: '100%', aspectRatio: '1080/270' }}
                  priority
                />
              </span>
              {/* 모바일(640px 미만)에서만 보임 */}
              <span className="inline sm:hidden">
                <Image
                  src="/ogongo-favicon.png"
                  alt="오공고 파비콘"
                  width={72}
                  height={72}
                  className="h-12 w-12 object-contain"
                  priority
                />
              </span>
            </Link>
            
            {/* 데스크톱 네비게이션 메뉴 */}
            <nav className="hidden sm:flex ml-8 gap-6 text-base font-medium mt-2">
              <Link 
                href="/" 
                className={`transition-colors ${
                  pathname === '/' ? 'text-black font-semibold' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                채용공고
              </Link>
              <Link 
                href="/chat" 
                className={`transition-colors ${
                  pathname === '/chat' ? 'text-black font-semibold' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                오픈채팅방
              </Link>
            </nav>
          </div>

          {/* 우측: 모바일에서는 오픈채팅 버튼 + 피드백 요청 버튼, 데스크톱에서는 피드백 버튼만 */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* 모바일에서만 보이는 오픈채팅 버튼 */}
            <Link href="/chat" className="sm:hidden">
              <button className="bg-[#3b82f6]/10 hover:bg-[#3b82f6]/20 text-[#3b82f6] font-semibold px-3 py-1.5 rounded-full border border-[#3b82f6]/30 transition-colors text-xs min-w-[60px]">
                <span className="inline">💬 오픈채팅</span>
              </button>
            </Link>
            <button
              className="bg-[#5D5DF6]/10 hover:bg-[#5D5DF6]/20 text-[#5D5DF6] font-semibold px-3 py-1.5 sm:px-5 sm:py-2 rounded-full border border-[#5D5DF6]/30 transition-colors text-xs sm:text-sm min-w-[70px] sm:min-w-[110px]"
              onClick={() => setIsFeedbackOpen(true)}
            >
              <span className="inline">제발 도와주세요 🙏</span>
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 py-3">
          <div className="flex flex-col gap-3">
            <Link 
              href="/" 
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