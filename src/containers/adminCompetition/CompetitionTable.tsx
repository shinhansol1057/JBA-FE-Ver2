"use client"

import React from "react"
import { Table, Tag, Button } from "antd"
import { DownloadOutlined } from "@ant-design/icons"
import type { ColumnType } from "antd/es/table"
import * as XLSX from "xlsx"

interface Competition {
  competitionId: number
  userEmail: string
  situation: string
  phase: string
  divisions: string[]
  competitionName: string
  startDate: string
  endDate: string
  content: string
  link: string | null
  files: any[]
  status: string
  createAt: string
  updateAt: string
  deleteAt: string | null
}

type Props = {
  competitionData: Competition[]
  pageSize: number
}

const CompetitionTable = ({ competitionData, pageSize }: Props) => {
  console.log(competitionData)
  const handleExcelDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      competitionData.map((comp) => ({
        대회명: comp.competitionName,
        부문: comp.divisions.join(', '),
        상태: comp.situation,
        시작일: new Date(comp.startDate).toLocaleDateString(),
        종료일: new Date(comp.endDate).toLocaleDateString(),
        작성자: comp.userEmail,
        생성일: comp.createAt,
      }))
    )

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Competitions")

    const date = new Date().toISOString().split("T")[0]
    XLSX.writeFile(workbook, `competition_list_${date}.xlsx`)
  }

  const columns: ColumnType<Competition>[] = [
    { 
      title: '대회명',
      dataIndex: 'competitionName',
      key: 'competitionName',
    },
    {
      title: '부문',
      dataIndex: 'divisions',
      key: 'divisions',
      className: 'hidden sm:table-cell',
      render: (divisions: string[]) => (
        <div className="flex flex-wrap gap-1">
          {divisions.map((division) => (
            <Tag key={division} color="blue">
              {division}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: '상태',
      dataIndex: 'situation',
      key: 'situation',
      render: (situation: string) => {
        const color = situation === '예정' ? 'green' : 
                     situation === '진행중' ? 'blue' : 'red'
        return <Tag color={color}>{situation}</Tag>
      },
    },
    {
      title: '시작일',
      dataIndex: 'startDate',
      key: 'startDate',
      className: 'hidden md:table-cell',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: '종료일',
      dataIndex: 'endDate',
      key: 'endDate',
      className: 'hidden md:table-cell',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: '작성자',
      dataIndex: 'userEmail',
      key: 'userEmail',
      className: 'hidden lg:table-cell',
    },
    {
      title: '관리',
      key: 'action',
      render: (_, record) => (
        <div className="space-x-2">
          <Button type="link" size="small">수정</Button>
          <Button type="link" danger size="small">삭제</Button>
        </div>
      ),
    },
  ]

  return (
    <>
      <div className='flex justify-between items-center mb-4'>
        <span>총 {competitionData?.length ?? 0}건</span>
        <Button icon={<DownloadOutlined />} onClick={handleExcelDownload}>
          엑셀 다운로드
        </Button>
      </div>
      {competitionData && competitionData.length > 0 ? (
        <Table 
          columns={columns}
          dataSource={competitionData.map(comp => ({ ...comp, key: comp.competitionId }))}
          pagination={{
            pageSize: pageSize,
            position: ['bottomCenter'],
            showSizeChanger: false,
          }}
          className='bg-white rounded-lg shadow-md'
        />
      ) : (
        <div className="text-center py-10 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">검색 결과가 없습니다.</p>
        </div>
      )}
    </>
  )
}

export default CompetitionTable