// app/admin/post/_components/post-card.tsx
import { Tag } from "antd"
import dayjs from "dayjs"
import { Post } from "../type"

interface Props {
  post: Post
}

const PostCard = ({ post }: Props) => {
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
              <Tag color="red" className="mr-2">
                공지
              </Tag>
            )}
            <span>{post.title}</span>
          </div>
        </div>
        <div>
          <span className="font-semibold">카테고리:</span>
          <Tag
            color={
              post.category === "notice" ? "blue" : post.category === "news" ? "green" : "orange"
            }
            className="ml-2"
          >
            {post.category === "notice" ? "공지사항" : post.category === "news" ? "뉴스" : "자료실"}
          </Tag>
        </div>
        <div>
          <span className="font-semibold">작성자:</span>
          <span className="ml-2">{post.writer}</span>
        </div>
        <div>
          <span className="font-semibold">상태:</span>
          <Tag
            color={post.status === "NORMAL" ? "green" : post.status === "HIDE" ? "orange" : "red"}
            className="ml-2"
          >
            {post.status}
          </Tag>
        </div>
        <div>
          <span className="font-semibold">조회수:</span>
          <span className="ml-2">{post.viewCount}</span>
        </div>
        <div>
          <span className="font-semibold">작성일시:</span>
          <span className="ml-2">{dayjs(post.createAt).format("YYYY-MM-DD HH:mm:ss")}</span>
        </div>
        <div>
          <span className="font-semibold">수정일시:</span>
          <span className="ml-2">{dayjs(post.updateAt).format("YYYY-MM-DD HH:mm:ss")}</span>
        </div>
      </div>
    </div>
  )
}

export default PostCard
