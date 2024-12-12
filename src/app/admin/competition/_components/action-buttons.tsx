'use client'

import React from 'react'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'
import { PlusOutlined } from '@ant-design/icons'

const ActionButtons = () => {
  const router = useRouter()

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-wrap gap-2">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => router.push(`/jeju-competition/info/add`)}
      >
        대회 등록
      </Button>
    </div>
  )
}

export default ActionButtons
