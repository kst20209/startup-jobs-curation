export default function MainHeadline() {
  return (
    <div className="w-full bg-white pt-12 pb-0">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 px-4">
        {/* 왼쪽: 타이틀 */}
        <div className="font-bold text-2xl md:text-4xl text-black text-center md:text-left">
          오늘의 공고에서 커리어 여정에 <br className="md:hidden" />
          딱 맞는 채용공고만 보여드립니다
        </div>
        {/* 오른쪽: 서브텍스트 */}
        <div className="text-base md:text-xl text-black text-center md:text-left">
          ‘내가 잘할 수 있을까?’, ‘지원해도 괜찮을까?’<br className="md:hidden" />
          처음이라 더 조심스러운 그 마음, 잘 알고 있습니다.<br className="md:hidden" />
          그래서 여러분이 지원해볼 만한 공고만 엄선했습니다.
        </div>
      </div>
    </div>
  );
} 