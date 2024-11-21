// app/admin/post/_components/post-table.tsx
"use client"

import { Button } from "antd"
import { DownloadOutlined } from "@ant-design/icons"
import * as XLSX from "xlsx"
import dayjs from "dayjs"
import { PostResponse } from "../type"
import PostCard from "./post-card"

interface Props {
  initialData: PostResponse["data"]
}

const PostTable = ({ initialData }: Props) => {
  const handleExcelDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      initialData.posts.map((post) => ({
        게시물아이디: post.postId,
        제목: post.title,
        카테고리: post.category,
        작성자: post.writer,
        상태: post.status,
        조회수: post.viewCount,
        작성일: dayjs(post.createAt).format("YYYY-MM-DD HH:mm:ss"),
        수정일: dayjs(post.updateAt).format("YYYY-MM-DD HH:mm:ss"),
        삭제일: post.deleteAt ? dayjs(post.deleteAt).format("YYYY-MM-DD HH:mm:ss") : "-"
      }))
    )

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Posts")
    XLSX.writeFile(workbook, `게시물관리_${dayjs().format("YYYYMMDD")}.xlsx`)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b flex justify-between items-center">
        <span>총 {initialData.totalPosts}건</span>
        <Button icon={<DownloadOutlined />} onClick={handleExcelDownload}>
          엑셀 다운로드
        </Button>
      </div>

      <div className="space-y-4 p-4">
        {initialData.posts.length > 0 ? (
          initialData.posts.map((post) => <PostCard key={post.postId} post={post} />)
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostTable
