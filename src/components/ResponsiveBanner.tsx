import Image from 'next/image';

export default function KakaotalkChatBanner() {
  return (
    <div className="w-full">
      {/* 데스크톱 배너 */}
      <div className="hidden md:block">
        <Image
          src="/desktop_banner.png"
          alt="데스크톱 배너"
          width={1200}
          height={300}
          className="w-full h-auto"
          priority
        />
      </div>
      
      {/* 모바일 배너 */}
      <div className="block md:hidden">
        <Image
          src="/mobile_banner.png"
          alt="모바일 배너"
          width={400}
          height={200}
          className="w-full h-auto"
          priority
        />
      </div>
    </div>
  );
}
