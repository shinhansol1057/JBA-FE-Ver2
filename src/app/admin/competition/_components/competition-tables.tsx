// app/admin/competition/_components/competition-table.tsx
"use client"

import { Button } from "antd"
import { DownloadOutlined } from "@ant-design/icons"
import * as XLSX from "xlsx"
import { CompetitionResponse } from "../type"
import CompetitionCard from "./competition-card"

interface Props {
  initialData: CompetitionResponse["data"]
  pageSize: number
}

const CompetitionTable = ({ initialData, pageSize }: Props) => {
  const handleExcelDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      initialData.content.map((comp) => ({
        대회명: comp.competitionName,
        부문: comp.divisions.join(", "),
        상태: comp.situation,
        시작일: new Date(comp.startDate).toLocaleDateString(),
        종료일: new Date(comp.endDate).toLocaleDateString(),
        작성자: comp.userEmail,
        생성일: comp.createAt
      }))
    )

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Competitions")

    const date = new Date().toISOString().split("T")[0]
    XLSX.writeFile(workbook, `competition_list_${date}.xlsx`)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span>총 {initialData.totalElements}건</span>
        <Button icon={<DownloadOutlined />} onClick={handleExcelDownload}>
          엑셀 다운로드
        </Button>
      </div>

      {initialData.content.length > 0 ? (
        <div className="space-y-4">
          {initialData.content.map((competition) => (
            <CompetitionCard key={competition.competitionId} competition={competition} />
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
