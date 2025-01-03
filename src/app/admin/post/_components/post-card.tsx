import { Tag, Button, Modal } from 'antd'
import dayjs from 'dayjs'
import { Post } from '../type'
import { useRouter } from 'next/navigation'

interface Props {
  post: Post
  isAnnouncement?: boolean
}

const PostCard = ({ post, isAnnouncement }: Props) => {
  const router = useRouter()

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'notice':
        return { color: 'blue', text: '공지사항' }
      case 'news':
        return { color: 'green', text: '뉴스' }
      default:
        return { color: 'orange', text: '자료실' }
    }
  }

  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-sm hover:bg-gray-50 transition-colors 
      ${isAnnouncement ? 'border-l-4 border-red-500' : ''}`}
    >
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          {/* 게시물 기본 정보 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="flex items-center">
              <span className="text-gray-600 w-20 shrink-0">게시물ID</span>
              <span>{post.postId}</span>
            </div>

            {/* 제목 영역 - 전체 너비 사용 */}
            <div className="flex items-center col-span-1 sm:col-span-2 lg:col-span-4">
              <span className="text-gray-600 w-20 shrink-0">제목</span>
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="truncate flex-1">{post.title}</span>
                {isAnnouncement && (
                  <Tag color="red" className="shrink-0 ml-2">
                    공지
                  </Tag>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <span className="text-gray-600 w-20 shrink-0">카테고리</span>
              <Tag color={getCategoryInfo(post.category).color}>
                {getCategoryInfo(post.category).text}
              </Tag>
            </div>

            <div className="flex items-center">
              <span className="text-gray-600 w-20 shrink-0">작성자</span>
              <span>{post.writer}</span>
            </div>

            <div className="flex items-center">
              <span className="text-gray-600 w-20 shrink-0">작성일시</span>
              <span>{dayjs(post.createAt).format('YYYY-MM-DD HH:mm')}</span>
            </div>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex lg:flex-col gap-2 justify-end">
          <Button
            type="primary"
            onClick={() => router.push(`/post/update/${post.postId}`)}
            className="w-20"
          >
            수정
          </Button>
          <Button
            danger
            className="w-20"
            onClick={() => {
              Modal.confirm({
                title: '게시물 삭제',
                content: '정말로 이 게시물을 삭제하시겠습니까?',
                okText: '삭제',
                cancelText: '취소',
                onOk: async () => {
                  try {
                    router.refresh()
                  } catch (error) {
                    console.error('게시물 삭제 실패:', error)
                  }
                }
              })
            }}
          >
            삭제
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PostCard
