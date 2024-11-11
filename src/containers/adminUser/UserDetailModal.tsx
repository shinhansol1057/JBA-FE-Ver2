"use client"

import React from "react"
import { Modal, Select, message } from "antd"
import { NormalApi } from "@/services/axios/NormalApi"
import { getBearerToken } from "@/utils/getBearerToken"
import { useRouter } from "next/navigation"

type Props = {
  visible: boolean
  onClose: () => void
  user: SearchUserData | null
  onSuccess?: () => void
}

const ROLE_OPTIONS = [
  { value: 'user', label: '일반 사용자' },
  { value: 'master', label: '마스터' },
  { value: 'referee', label: '심판' },
  { value: 'admin', label: '관리자' },
  { value: 'referee-leader', label: '심판장' },
  { value: 'table-official-leader', label: '테이블 오피셜 리더' },
  { value: 'table-official', label: '테이블 오피셜' }
]

const UserDetailModal = ({ visible, onClose, user, onSuccess }: Props) => {
  if (!user) return null

  const router = useRouter()

  const handlePermissionChange = async (permissionsStr: string) => {
    try {
      await NormalApi.put(
        `/v1/api/admin/user/${user.userId}/permission?permissionsStr=${permissionsStr}`, {
        },{
          headers: {
            Authorization: await getBearerToken(),
          },
        })
      message.success('권한이 성공적으로 변경되었습니다')
      onSuccess?.()
      router.refresh()
    } catch (error) {
      message.error('권한 변경에 실패했습니다')
      console.error('권한 변경 실패:', error)
    }
  }

  return (
    <Modal
      title={<span className="text-lg font-semibold text-gray-800">회원 상세 정보</span>}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <div className="space-y-2">
        {[
          { label: '아이디', value: user.userId },
          { label: '이름', value: user.name },
          { label: '소속팀', value: user.team || "없음" },
          { 
            label: '권한', 
            value: (
              <Select
                defaultValue={user.permission}
                style={{ width: 200 }}
                onChange={handlePermissionChange}
                options={ROLE_OPTIONS}
                className="ml-2"
              />
            )
          },
          { label: '이메일', value: user.email },
          { label: '휴대폰 번호', value: user.phoneNum },
          { label: '생년월일', value: user.dateOfBirth || "없음" },
          { label: '성별', value: user.gender || "없음" },
          { label: '회원상태', value: user.userStatus },
          { label: '최근로그인시간', value: user.loginAt || "없음" },
          { label: '가입일시', value: user.createAt },
          { label: '수정일시', value: user.updateAt || "없음" },
          { label: '삭제일시', value: user.deleteAt || "없음" },
          { label: '잠금일시', value: user.lockAt || "없음" },
          { label: '로그인실패수', value: user.failureCount }
        ].map((item, index) => (
          <div 
            key={index}
            className="flex py-2 px-4 hover:bg-gray-50 border-b last:border-b-0"
          >
            <span className="w-32 font-medium text-gray-600">{item.label}</span>
            <span className="text-gray-800">{typeof item.value === 'string' ? item.value : item.value}</span>
          </div>
        ))}
      </div>
    </Modal>
  )
}

export default UserDetailModal