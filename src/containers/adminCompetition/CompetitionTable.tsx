"use client"

import React, { useEffect, useState } from "react"
import { Table, Tag, Button } from "antd"
import { DownloadOutlined } from "@ant-design/icons"
import type { ColumnType } from "antd/es/table"
import * as XLSX from "xlsx"
import { getCompetitions, GetCompetitionsParams } from "@/services/admin/competition"

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
  searchParams: GetCompetitionsParams
  pageSize: number
}

const CompetitionTable = ({ searchParams, pageSize }: Props) => {
  const [data, setData] = useState<Competition[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await getCompetitions(searchParams)
        setData(response.content)
      } catch (err) {
        console.error("Error fetching competitions:", err)
        setError("데이터를 불러오는 중 오류가 발생했습니다.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [searchParams])

  const handleExcelDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((comp) => ({
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

  const CompetitionCard = ({ competition }: { competition: Competition }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <span className="font-semibold">대회명:</span>
            <span className="ml-2">{competition.competitionName}</span>
          </div>
          
          <div>
            <span className="font-semibold">부문:</span>
            <div className="inline-flex flex-wrap gap-1 ml-2">
              {competition.divisions.map((division) => (
                <Tag key={division} color="blue">
                  {division}
                </Tag>
              ))}
            </div>
          </div>

          <div>
            <span className="font-semibold">상태:</span>
            <Tag 
              className="ml-2"
              color={
                competition.situation === '예정' ? 'green' : 
                competition.situation === '진행중' ? 'blue' : 'red'
              }
            >
              {competition.situation}
            </Tag>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <span className="font-semibold">기간:</span>
            <span className="ml-2">
              {new Date(competition.startDate).toLocaleDateString()} ~ 
              {new Date(competition.endDate).toLocaleDateString()}
            </span>
          </div>

          <div className="lg:col-span-1">
            <span className="font-semibold">작성자:</span>
            <span className="ml-2">{competition.userEmail}</span>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <span className="font-semibold">관리:</span>
            <div className="inline-flex space-x-2 ml-2">
              <Button type="link" size="small">수정</Button>
              <Button type="link" danger size="small">삭제</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading) return <div>로딩 중...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="space-y-4">
      <div className='flex justify-between items-center'>
        <span>총 {data?.length ?? 0}건</span>
        <Button icon={<DownloadOutlined />} onClick={handleExcelDownload}>
          엑셀 다운로드
        </Button>
      </div>

      {data && data.length > 0 ? (
        <div className="space-y-4">
          {data.map(competition => (
            <CompetitionCard 
              key={competition.competitionId} 
              competition={competition} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  )
}

export default CompetitionTable