'use client'

interface AdminModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AdminModal({ isOpen, onClose }: AdminModalProps) {
  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-gray-500/25 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      tabIndex={-1}
    >
      <div 
        className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col"
        onClick={e => e.stopPropagation()}
        style={{ boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">어드민 입력</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* 본문: 2단 분할 */}
        <div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-200 min-h-[400px]">
          {/* 기업 입력 */}
          <div className="flex-1 min-w-0 w-full p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">기업 입력</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">기업명</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" disabled />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">산업</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" disabled />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">로고 URL</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" disabled />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호(비밀코드)</label>
                <input type="password" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              </div>
              <button type="button" className="w-full bg-[#5D5DF6] text-white py-2 rounded-lg font-medium transition-all duration-200 hover:bg-[#4c4cf5] disabled:bg-gray-300 disabled:cursor-not-allowed" disabled>
                기업 등록 (준비중)
              </button>
            </form>
          </div>
          {/* 공고 입력 */}
          <div className="flex-1 min-w-0 w-full p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">공고 입력</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">공고명</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" disabled />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">직무</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" disabled />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">공고 URL</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" disabled />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호(비밀코드)</label>
                <input type="password" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              </div>
              <button type="button" className="w-full bg-[#5D5DF6] text-white py-2 rounded-lg font-medium transition-all duration-200 hover:bg-[#4c4cf5] disabled:bg-gray-300 disabled:cursor-not-allowed" disabled>
                공고 등록 (준비중)
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 