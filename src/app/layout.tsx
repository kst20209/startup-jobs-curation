import './globals.css';
import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: '오공고 - 오늘의 공고',
  description: '문과생을 위한 채용공고만 엄선해서 보여드립니다. 오늘의 스타트업, 오늘의 채용, 오직 문과생을 위해!',
  openGraph: {
    title: '오공고 - 오늘의 공고',
    description: '문과생을 위한 채용공고만 엄선해서 보여드립니다. 오늘의 스타트업, 오늘의 채용, 오직 문과생을 위해!',
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
    description: '문과생을 위한 채용공고만 엄선해서 보여드립니다. 오늘의 스타트업, 오늘의 채용, 오직 문과생을 위해!',
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
