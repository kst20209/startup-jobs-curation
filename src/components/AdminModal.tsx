'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

// 비밀코드는 실제 운영에서는 환경변수(.env.local)로 분리하는 것이 안전합니다.
// 예시: NEXT_PUBLIC_ADMIN_SECRET=/admin-공고추가
const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_SECRET

const JOB_MAIN_OPTIONS = [
  '세일즈/마케팅', '기획', '인사/HR', 'CX/운영', '디자인'
]
const JOB_SUB_OPTIONS = [
  '세일즈/마케팅', '기획', '인사/HR', 'CX/운영', '디자인'
]

interface AdminModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AdminModal({ isOpen, onClose }: AdminModalProps) {
  // 기업 목록 fetch
  const [companyList, setCompanyList] = useState<{ id: number, company_name: string }[]>([])

  useEffect(() => {
    if (!isOpen) return
    supabase.from('companies').select('id, company_name').then(({ data }) => {
      setCompanyList(data || [])
    })
  }, [isOpen])

  const [companyForm, setCompanyForm] = useState({
    company_name: '',
    company_url: '',
    revenue: '',
    employee_count: '',
    investment_series: '',
    industry: '',
    categories: '',
    logo_url: '',
    password: ''
  })
  const [companySubmitting, setCompanySubmitting] = useState(false)
  const [companyStatus, setCompanyStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const [jobForm, setJobForm] = useState({
    company_id: '',
    job_title: '',
    job_url: '',
    job_category_main: '',
    job_category_sub: '',
    employment_type: '',
    region: '',
    deadline_date: '',
    job_description: '',
    requirements: '',
    preferred_qualifications: '',
    contract_duration: '',
    is_conversion_intern: false,
    deadline_text: '',
    is_liberal: false,
    source_url: '',
    password: ''
  })
  const [jobSubmitting, setJobSubmitting] = useState(false)
  const [jobStatus, setJobStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // 기업 등록 핸들러 - DB 업데이트 비활성화
  const handleCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (companyForm.password !== ADMIN_SECRET) {
      setCompanyStatus('error')
      return
    }
    setCompanySubmitting(true)
    setCompanyStatus('idle')
    
    // DB 업데이트 대신 성공 메시지만 표시
    setTimeout(() => {
      setCompanyStatus('success')
      setCompanySubmitting(false)
      // 폼 초기화
      setCompanyForm({
        company_name: '',
        company_url: '',
        revenue: '',
        employee_count: '',
        investment_series: '',
        industry: '',
        categories: '',
        logo_url: '',
        password: ''
      })
    }, 1000)
  }

  // 공고 등록 핸들러 - DB 업데이트 비활성화
  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (jobForm.password !== ADMIN_SECRET) {
      setJobStatus('error')
      return
    }
    if (!jobForm.company_id) {
      setJobStatus('error')
      return
    }
    setJobSubmitting(true)
    setJobStatus('idle')
    
    // DB 업데이트 대신 성공 메시지만 표시
    setTimeout(() => {
      setJobStatus('success')
      setJobSubmitting(false)
      // 폼 초기화
      setJobForm({
        company_id: '',
        job_title: '',
        job_url: '',
        job_category_main: '',
        job_category_sub: '',
        employment_type: '',
        region: '',
        deadline_date: '',
        job_description: '',
        requirements: '',
        preferred_qualifications: '',
        contract_duration: '',
        is_conversion_intern: false,
        deadline_text: '',
        is_liberal: false,
        source_url: '',
        password: ''
      })
    }, 1000)
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-gray-500/25 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      tabIndex={-1}
    >
      <div 
        className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col"
        onClick={e => e.stopPropagation()}
        style={{ boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">어드민 입력 (비활성화됨)</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* 비활성화 알림 */}
        <div className="p-4 bg-yellow-50 border border-yellow-200">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span className="text-sm text-yellow-700">
              현재 기업 및 채용공고 등록 기능이 비활성화되어 있습니다. 입력하신 정보는 저장되지 않습니다.
            </span>
          </div>
        </div>
        
        {/* 본문: 2단 분할 */}
        <div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-200 min-h-[500px]">
          {/* 기업 입력 */}
          <div className="flex-1 min-w-0 w-full p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">기업 입력</h3>
            <form className="space-y-3" onSubmit={handleCompanySubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">기업명 *</label>
                <input type="text" required value={companyForm.company_name} onChange={e => setCompanyForm(f => ({...f, company_name: e.target.value}))} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">기업 URL</label>
                <input type="text" value={companyForm.company_url} onChange={e => setCompanyForm(f => ({...f, company_url: e.target.value}))} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">매출</label>
                  <input type="text" value={companyForm.revenue} onChange={e => setCompanyForm(f => ({...f, revenue: e.target.value}))} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">임직원 수</label>
                  <input type="text" value={companyForm.employee_count} onChange={e => setCompanyForm(f => ({...f, employee_count: e.target.value}))} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">투자 시리즈</label>
                  <input type="text" value={companyForm.investment_series} onChange={e => setCompanyForm(f => ({...f, investment_series: e.target.value}))} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">산업</label>
                  <input type="text" value={companyForm.industry} onChange={e => setCompanyForm(f => ({...f, industry: e.target.value}))} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">카테고리(쉼표로 구분)</label>
                <input type="text" value={companyForm.categories} onChange={e => setCompanyForm(f => ({...f, categories: e.target.value}))} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">로고 URL</label>
                <input type="text" value={companyForm.logo_url} onChange={e => setCompanyForm(f => ({...f, logo_url: e.target.value}))} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호(비밀코드) *</label>
                <input type="password" required value={companyForm.password} onChange={e => setCompanyForm(f => ({...f, password: e.target.value}))} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              </div>
              <button type="submit" className="w-full bg-[#5D5DF6] text-white py-2 rounded-lg font-medium transition-all duration-200 hover:bg-[#4c4cf5] disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center" disabled={companySubmitting}>
                {companySubmitting ? '등록 중...' : '기업 등록 (비활성화됨)'}
              </button>
              {companyStatus === 'success' && <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-green-700 text-sm">기업 등록이 시뮬레이션되었습니다! (실제로는 저장되지 않음)</div>}
              {companyStatus === 'error' && <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">등록 실패(비밀번호 오류 또는 필수값 누락)</div>}
            </form>
          </div>
          {/* 공고 입력 */}
          <div className="flex-1 min-w-0 w-full p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">공고 입력</h3>
            <form className="space-y-3" onSubmit={handleJobSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">기업명 *</label>
                <select required value={jobForm.company_id} onChange={e => setJobForm(f => ({...f, company_id: e.target.value}))} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option value="">기업을 선택하세요</option>
                  {companyList.map(c => (
                    <option key={c.id} value={c.id}>{c.company_name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">공고명 *</label>
                <input type="text" required value={jobForm.job_title} onChange={e => setJobForm(f => ({...f, job_title: e.target.value}))} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">공고 URL *</label>
                <input type="text" required value={jobForm.job_url} onChange={e => setJobForm(f => ({...f, job_url: e.target.value}))} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">직무(메인)</label>
                  <select value={jobForm.job_category_main} onChange={e => setJobForm(f => ({...f, job_category_main: e.target.value}))} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option value="">선택</option>
                    {JOB_MAIN_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">직무(서브)</label>
                  <select value={jobForm.job_category_sub} onChange={e => setJobForm(f => ({...f, job_category_sub: e.target.value}))} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option value="">선택</option>
                    {JOB_SUB_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">고용형태</label>
                  <input type="text" value={jobForm.employment_type} onChange={e => setJobForm(f => ({...f, employment_type: e.target.value}))} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">지역</label>
                  <input type="text" value={jobForm.region} onChange={e => setJobForm(f => ({...f, region: e.target.value}))} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">마감일(YYYY-MM-DD)</label>
                  <input type="date" value={jobForm.deadline_date} onChange={e => setJobForm(f => ({...f, deadline_date: e.target.value}))} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">마감 텍스트</label>
                  <input type="text" value={jobForm.deadline_text} onChange={e => setJobForm(f => ({...f, deadline_text: e.target.value}))} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">공고 설명</label>
                <textarea value={jobForm.job_description} onChange={e => setJobForm(f => ({...f, job_description: e.target.value}))} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[60px]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">자격요건</label>
                <textarea value={jobForm.requirements} onChange={e => setJobForm(f => ({...f, requirements: e.target.value}))} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[40px]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">우대사항</label>
                <textarea value={jobForm.preferred_qualifications} onChange={e => setJobForm(f => ({...f, preferred_qualifications: e.target.value}))} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[40px]" />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">계약기간</label>
                  <input type="text" value={jobForm.contract_duration} onChange={e => setJobForm(f => ({...f, contract_duration: e.target.value}))} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
                <div className="flex-1 flex items-center gap-2 mt-6">
                  <input type="checkbox" checked={jobForm.is_conversion_intern} onChange={e => setJobForm(f => ({...f, is_conversion_intern: e.target.checked}))} className="mr-1" id="is_conversion_intern" />
                  <label htmlFor="is_conversion_intern" className="text-sm text-gray-700">정규직 전환형 인턴</label>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-2">
                  <input type="checkbox" checked={jobForm.is_liberal} onChange={e => setJobForm(f => ({...f, is_liberal: e.target.checked}))} className="mr-1" id="is_liberal" />
                  <label htmlFor="is_liberal" className="text-sm text-gray-700">문과생 지원 가능</label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">공고 원본 URL</label>
                <input type="text" value={jobForm.source_url} onChange={e => setJobForm(f => ({...f, source_url: e.target.value}))} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호(비밀코드) *</label>
                <input type="password" required value={jobForm.password} onChange={e => setJobForm(f => ({...f, password: e.target.value}))} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              </div>
              <button type="submit" className="w-full bg-[#5D5DF6] text-white py-2 rounded-lg font-medium transition-all duration-200 hover:bg-[#4c4cf5] disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center" disabled={jobSubmitting}>
                {jobSubmitting ? '등록 중...' : '공고 등록 (비활성화됨)'}
              </button>
              {jobStatus === 'success' && <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-green-700 text-sm">공고 등록이 시뮬레이션되었습니다! (실제로는 저장되지 않음)</div>}
              {jobStatus === 'error' && <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">등록 실패(비밀번호 오류, 기업 미등록, 또는 서버오류)</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 