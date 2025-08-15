import Image from 'next/image';
import Link from 'next/link';

export default function KakaotalkChatBanner() {
  return (
    <div className="w-full flex justify-center">
      {/* 데스크톱 배너 */}
      <div className="hidden md:block">
        <Link href="/chat">
          <Image
            src="/desktop_banner.png"
            alt="데스크톱 배너"
            width={800}
            height={200}
            priority
          />
        </Link>
      </div>
      
      {/* 모바일 배너 */}
      <div className="block md:hidden">
        <Link href="/chat">
          <Image
            src="/mobile_banner.png"
            alt="모바일 배너"
            width={400}
            height={200}
            className="w-full h-auto"
            priority
          />
        </Link>
      </div>
    </div>
  );
}
