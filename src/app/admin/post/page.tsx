"use client"

import React, { useState, useEffect } from "react"
import { Table, Tag, Button, Select, Input, DatePicker, message } from "antd"
import { SearchOutlined, UndoOutlined, DownloadOutlined } from "@ant-design/icons"
import { useRouter, useSearchParams } from "next/navigation"
import dayjs from "dayjs"
import * as XLSX from "xlsx"
import { NormalApi } from "@/services/axios/NormalApi"
import { getBearerToken } from "@/utils/getBearerToken"

const { RangePicker } = DatePicker
const { Option } = Select

interface Post {
  postId: number
  isAnnouncement: boolean
  title: string
  writer: string
  createAt: string
  viewCount: number
  status: string
  category: string
  updateAt: string
  deleteAt: string | null
}

interface PostResponse {
  code: number
  message: string
  data: {
    totalPages: number
    totalPosts: number
    posts: Post[]
  }
}

const Page = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [searchType, setSearchType] = useState("title")
  const [searchKeyword, setSearchKeyword] = useState("")
  const [category, setCategory] = useState("notice")
  const [dateRange, setDateRange] = useState<[string, string] | null>([
    dayjs().subtract(30, 'days').format('YYYY-MM-DD'),
    dayjs().format('YYYY-MM-DD')
  ])
  const [pageSize, setPageSize] = useState(20)
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: String(currentPage - 1),
        size: String(pageSize),
        category: category,
      })

      if (searchKeyword) {
        params.append("keyword", searchKeyword)
        params.append("searchType", searchType)
      }

      if (dateRange) {
        params.append("startDate", dateRange[0])
        params.append("endDate", dateRange[1])
      }

      const response = await NormalApi.get<PostResponse>(`/v1/api/post/${category}`, {
        params,
        headers: {
          Authorization: await getBearerToken(),
        },
      })
      
      if (response.data.code === 200) {
        setPosts(response.data.data.posts)
        setTotal(response.data.data.totalPosts)
      } else {
        message.error("데이터 조회에 실패했습니다.")
      }
    } catch (error) {
      message.error("데이터 조회 중 오류가 발생했습니다.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [currentPage, pageSize])

  const handleExcelDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      posts.map((post) => ({
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

  const handleSearch = () => {
    setCurrentPage(1)
    fetchPosts()
  }

  const handleReset = () => {
    setSearchType("title")
    setSearchKeyword("")
    setCategory("notice")
    setDateRange([
      dayjs().subtract(30, 'days').format('YYYY-MM-DD'),
      dayjs().format('YYYY-MM-DD')
    ])
    setCurrentPage(1)
    setPageSize(20)
    fetchPosts()
  }

  const PostCard = ({ post }: { post: Post }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md mb-4 cursor-pointer hover:bg-gray-50">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <div>
            <span className="font-semibold">게시물ID:</span>
            <span className="ml-2">{post.postId}</span>
          </div>

          <div>
            <span className="font-semibold">제목:</span>
            <div className="flex items-center ml-2">
              {post.isAnnouncement && (
                <Tag color="red" className="mr-2">공지</Tag>
              )}
              <span>{post.title}</span>
            </div>
          </div>

          <div>
            <span className="font-semibold">카테고리:</span>
            <Tag 
              color={
                post.category === 'notice' ? 'blue' :
                post.category === 'news' ? 'green' : 'orange'
              }
              className="ml-2"
            >
              {post.category === 'notice' ? '공지사항' :
               post.category === 'news' ? '뉴스' : '자료실'}
            </Tag>
          </div>

          <div>
            <span className="font-semibold">작성자:</span>
            <span className="ml-2">{post.writer}</span>
          </div>

          <div className="sm:block">
            <span className="font-semibold">상태:</span>
            <Tag 
              color={
                post.status === 'NORMAL' ? 'green' :
                post.status === 'HIDE' ? 'orange' : 'red'
              }
              className="ml-2"
            >
              {post.status}
            </Tag>
          </div>

          <div className="sm:block">
            <span className="font-semibold">조회수:</span>
            <span className="ml-2">{post.viewCount}</span>
          </div>

          <div className="md:block">
            <span className="font-semibold">작성일시:</span>
            <span className="ml-2">
              {dayjs(post.createAt).format("YYYY-MM-DD HH:mm:ss")}
            </span>
          </div>

          <div className="lg:block">
            <span className="font-semibold">수정일시:</span>
            <span className="ml-2">
              {dayjs(post.updateAt).format("YYYY-MM-DD HH:mm:ss")}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
          <Select
            value={searchType}
            onChange={setSearchType}
            style={{ width: 200 }}
          >
            <Option value="title">제목</Option>
            <Option value="userEmail">유저이메일</Option>
            <Option value="postId">게시물아이디</Option>
          </Select>
          
          <Input
            placeholder="검색어를 입력하세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            style={{ width: "100%" }}
            onPressEnter={handleSearch}
          />
          
          <RangePicker
            value={dateRange ? [dayjs(dateRange[0]), dayjs(dateRange[1])] : null}
            onChange={(_, dateStrings) => setDateRange(dateStrings as [string, string])}
            style={{ width: "100%" }}
          />
          
          <Select
            value={pageSize}
            onChange={setPageSize}
            style={{ width: 200 }}
          >
            <Option value={20}>20개씩 보기</Option>
            <Option value={50}>50개씩 보기</Option>
            <Option value={100}>100개씩 보기</Option>
          </Select>
        </div>

        <div className="flex justify-end space-x-2">
          <Button 
            icon={<UndoOutlined />}
            onClick={handleReset}
          >
            초기화
          </Button>
          <Button 
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
          >
            검색
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b flex justify-between items-center">
          <span>총 {total}건</span>
          <Button 
            icon={<DownloadOutlined />}
            onClick={handleExcelDownload}
          >
            엑셀 다운로드
          </Button>
        </div>
        
        <div className="space-y-4 p-4">
          {posts && posts.length > 0 ? (
            posts.map(post => (
              <PostCard key={post.postId} post={post} />
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page