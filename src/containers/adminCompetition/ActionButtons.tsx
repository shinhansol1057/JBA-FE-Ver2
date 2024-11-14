"use client"

import React from "react"
import { Button } from "antd"
import { useRouter } from "next/navigation"
import { 
  PlusOutlined, 
  EditOutlined, 
  TrophyOutlined, 
  TeamOutlined,
  FileTextOutlined 
} from "@ant-design/icons"

const ActionButtons = () => {
  const router = useRouter()

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-wrap gap-2">
      <Button 
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => router.push('/test')}
      >
        대회 등록
      </Button>
      <Button
        icon={<EditOutlined />}
        onClick={() => router.push('/test')}
      >
        대회 수정
      </Button>
      <Button
        icon={<TrophyOutlined />}
        onClick={() => router.push('/test')}
      >
        대회 결과 등록
      </Button>
      <Button
        icon={<TeamOutlined />}
        onClick={() => router.push('/test')}
      >
        참가자 관리
      </Button>
      <Button
        icon={<FileTextOutlined />}
        onClick={() => router.push('/test')}
      >
        첨부파일 관리
      </Button>
    </div>
  )
}

export default ActionButtons