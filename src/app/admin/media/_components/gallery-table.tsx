// app/admin/gallery/_components/gallery-table.tsx
'use client'

import { Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import * as XLSX from 'xlsx'
import GalleryCard from './gallery-card'
import { Gallery } from '../api'

interface Props {
  initialData: {
    totalGalleries: number
    galleries: Gallery[]
  }
  pageSize: number
}

const GalleryTable = ({ initialData, pageSize }: Props) => {
  const handleExcelDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      initialData.galleries.map((gallery) => ({
        제목: gallery.title,
        이메일: gallery.email,
        공식여부: gallery.isOfficial ? '공식' : '일반',
        상태: gallery.galleryStatus,
        생성일: gallery.createAt,
        수정일: gallery.updateAt || '-',
        삭제일: gallery.deleteAt || '-'
      }))
    )

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Galleries')

    const date = new Date().toISOString().split('T')[0]
    XLSX.writeFile(workbook, `gallery_list_${date}.xlsx`)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span>총 {initialData.totalGalleries}건</span>
        <Button icon={<DownloadOutlined />} onClick={() => {}}>
          미디어 등록
        </Button>
        <Button icon={<DownloadOutlined />} onClick={handleExcelDownload}>
          엑셀 다운로드
        </Button>
      </div>

      {initialData.galleries.length > 0 ? (
        <div className="space-y-4">
          {initialData.galleries.map((gallery) => (
            <GalleryCard key={gallery.galleryId} gallery={gallery} />
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

export default GalleryTable
