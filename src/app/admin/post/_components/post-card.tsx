import { Tag } from "antd"
import dayjs from "dayjs"
import { Post } from "../type"

interface Props {
  post: Post
}

const PostCard = ({ post }: Props) => {
  const getCategoryInfo = (category: string) => {
    switch (category) {
      case "notice":
        return { color: "blue", text: "공지사항" }
      case "news":
        return { color: "green", text: "뉴스" }
      default:
        return { color: "orange", text: "자료실" }
    }
  }
  console.log(post)

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="flex items-center">
          <span className="text-gray-600 w-20">게시물ID</span>
          <span>{post.postId}</span>
        </div>

        <div className="flex items-center col-span-1 sm:col-span-2 lg:col-span-3">
          <span className="text-gray-600 w-20 shrink-0">제목</span>
          <div className="flex items-center gap-2 w-full">
            {post.isAnnouncement && (
              <Tag color="red" className="shrink-0">
                공지
              </Tag>
            )}
            <span className="break-all">{post.title}</span>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-gray-600 w-20">카테고리</span>
          <Tag color={getCategoryInfo(post.category).color}>
            {getCategoryInfo(post.category).text}
          </Tag>
        </div>

        <div className="flex items-center">
          <span className="text-gray-600 w-20">작성자</span>
          <span>{post.writer}</span>
        </div>

        <div className="flex items-center">
          <span className="text-gray-600 w-20">작성일시</span>
          <span>{dayjs(post.createAt).format("YYYY-MM-DD HH:mm")}</span>
        </div>
      </div>
    </div>
  )
}

export default PostCard
