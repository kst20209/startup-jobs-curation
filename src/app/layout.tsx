import './globals.css';
import { ReactNode } from 'react';
import Script from 'next/script';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: '오늘의 공고, 오공고',
  description: '놓치기 쉬운 채용공고, 오늘의 공고에서 확인하세요. 문과 취업준비생을 위한 커리어 맞춤 스타트업 채용공고를 매일 큐레이션해드립니다.',
  openGraph: {
    title: '오늘의 공고｜커리어 여정에 딱 맞는 스타트업 채용공고 추천',
    description: '놓치기 쉬운 채용공고, 오늘의 공고에서 확인하세요. 문과 취업준비생을 위한 커리어 맞춤 스타트업 채용공고를 매일 큐레이션해드립니다.',
    type: 'website',
    url: 'https://startup-jobs-curation.vercel.app',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '오공고 - 오늘의 공고'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: '오늘의 공고｜커리어 여정에 딱 맞는 스타트업 채용공고 추천',
    description: '놓치기 쉬운 채용공고, 오늘의 공고에서 확인하세요. 문과 취업준비생을 위한 커리어 맞춤 스타트업 채용공고를 매일 큐레이션해드립니다.',
    images: ['/og-image.png']
  }
};

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WG4FL6NN');
          `}
        </Script>
        {/* End Google Tag Manager */}
        
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Pretendard Font */}
        <link rel="stylesheet" as="style" crossOrigin="anonymous" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7PEJC0TG9K"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7PEJC0TG9K');
          `}
        </Script>
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WG4FL6NN"
            height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}
