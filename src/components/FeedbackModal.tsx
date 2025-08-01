'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import AdminModal from './AdminModal'

const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_SECRET

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [satisfactionFeedback, setSatisfactionFeedback] = useState('')
  const [improvementFeedback, setImprovementFeedback] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'admin'>('idle')
  const [showAdminModal, setShowAdminModal] = useState(false)

  const maxLength = 1000
  const emailMaxLength = 100

  const handleSubmit = async () => {
    if ((!satisfactionFeedback.trim() && !improvementFeedback.trim()) || isSubmitting) return

    // 비밀코드 입력 시 어드민 모드 활성화
    if (satisfactionFeedback.trim() === ADMIN_SECRET || improvementFeedback.trim() === ADMIN_SECRET) {
      setSubmitStatus('admin')
      setTimeout(() => {
        setShowAdminModal(true)
        setSubmitStatus('idle')
        setSatisfactionFeedback('')
        setImprovementFeedback('')
        setEmail('')
      }, 1200)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const userAgent = navigator.userAgent
      
      const { error } = await supabase
        .from('user_feedback_curation')
        .insert([
          {
            satisfaction_feedback: satisfactionFeedback.trim() || null,
            improvement_feedback: improvementFeedback.trim() || null,
            email: email.trim() || null,
            user_agent: userAgent,
            // 기존 feedback_content는 null로 설정 (새로운 구조 사용)
            feedback_content: null,
          }
        ])

      if (error) {
        throw error
      }

      setSubmitStatus('success')
      setSatisfactionFeedback('')
      setImprovementFeedback('')
      setEmail('')
      
      // 성공 메시지 표시 후 모달 닫기
      setTimeout(() => {
        onClose()
        setSubmitStatus('idle')
      }, 1500)

    } catch (error) {
      console.error('피드백 전송 오류:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setSatisfactionFeedback('')
      setImprovementFeedback('')
      setEmail('')
      setSubmitStatus('idle')
      onClose()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && !isSubmitting) {
      handleClose()
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div 
        className="fixed inset-0 bg-gray-500/25 flex items-center justify-center z-50 p-4"
        onClick={handleClose}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <div 
          className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
          style={{ 
            boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' 
          }}
        >
          {/* 헤더 */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              더 유용한 채용 공고 서비스를 만들고 싶습니다
            </h2>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 본문 */}
          <div className="p-6">
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              구직자분들을 위해 더 유용한 채용 공고 서비스를 만들고 싶습니다. 솔직한 의견과 좋았던 점, 부족했던 점을 자유롭게 말씀해주세요!
            </p>

            {/* 질문 1: 만족도 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                1. 이용 중 어떤 점이 가장 만족스러우신가요?
              </label>
              <div className="relative">
                <textarea
                  value={satisfactionFeedback}
                  onChange={(e) => setSatisfactionFeedback(e.target.value)}
                  placeholder="만족스러웠던 점을 자유롭게 작성해주세요..."
                  maxLength={maxLength}
                  disabled={isSubmitting}
                  className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
                <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                  {satisfactionFeedback.length}/{maxLength}
                </div>
              </div>
            </div>

            {/* 질문 2: 개선사항 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                2. 아쉬운 점이나 개선됐으면 하는 점이 있다면 자유롭게 적어주세요
              </label>
              <div className="relative">
                <textarea
                  value={improvementFeedback}
                  onChange={(e) => setImprovementFeedback(e.target.value)}
                  placeholder="개선이 필요한 부분을 자유롭게 작성해주세요..."
                  maxLength={maxLength}
                  disabled={isSubmitting}
                  className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
                <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                  {improvementFeedback.length}/{maxLength}
                </div>
              </div>
            </div>

            {/* 질문 3: 이메일 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                3. 이메일 주소를 남겨주시면, 제안사항이 반영 됐을 때 알려드릴게요! (선택)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                maxLength={emailMaxLength}
                disabled={isSubmitting}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* 상태 메시지 */}
            {submitStatus === 'success' && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-green-700">피드백이 성공적으로 전송되었습니다!</span>
                </div>
              </div>
            )}
            {submitStatus === 'admin' && (
              <div className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-purple-700">어드민 모드가 활성화 됩니다!</span>
                </div>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-red-700">전송 중 오류가 발생했습니다. 다시 시도해주세요.</span>
                </div>
              </div>
            )}
          </div>

          {/* 푸터 */}
          <div className="px-6 pb-6">
            <button
              onClick={handleSubmit}
              disabled={(!satisfactionFeedback.trim() && !improvementFeedback.trim()) || isSubmitting}
              className="w-full bg-[#5D5DF6] text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:bg-[#4c4cf5] disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  전송 중...
                </>
              ) : (
                '의견 보내기'
              )}
            </button>
          </div>
        </div>
      </div>
      {/* 어드민 입력 모달 */}
      {showAdminModal && <AdminModal isOpen={showAdminModal} onClose={() => setShowAdminModal(false)} />}
    </>
  )
} 