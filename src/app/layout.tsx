import './globals.css';
import { ReactNode } from 'react';
import Script from 'next/script';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: '오늘의 공고, 오공고',
  description: '커리어 여정에 딱 맞는 채용공고만 엄선해서 보여드립니다. 오늘의 스타트업, 오늘의 채용, 당신의 성장을 위해!',
  openGraph: {
    title: '오공고 - 오늘의 공고',
    description: '커리어 여정에 딱 맞는 채용공고만 엄선해서 보여드립니다. 오늘의 스타트업, 오늘의 채용, 당신의 성장을 위해!',
    type: 'website',
    url: 'https://ogongo.today',
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
    title: '오공고 - 오늘의 공고',
    description: '커리어 여정에 딱 맞는 채용공고만 엄선해서 보여드립니다. 오늘의 스타트업, 오늘의 채용, 당신의 성장을 위해!',
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
