// components/user-card.tsx
import { User } from "../type"

interface UserCardProps {
  user: User
  onClick: (user: User) => void
}

const UserCard = ({ user, onClick }: UserCardProps) => {
  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md mb-4 cursor-pointer hover:bg-gray-50"
      onClick={() => onClick(user)}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <div>
          <span className="font-semibold">이름:</span>
          <span className="ml-2">{user.name}</span>
        </div>

        <div>
          <span className="font-semibold">권한:</span>
          <span
            className={`ml-2 px-2 py-1 rounded ${
              user.role === "일반" ? "bg-green-500" : "bg-red-500"
            } text-white`}
          >
            {user.role}
          </span>
        </div>

        <div>
          <span className="font-semibold">최근로그인:</span>
          <span className="ml-2">{user.loginAt ? user.loginAt.substring(0, 16) : "-"}</span>
        </div>

        <div>
          <span className="font-semibold">아이디:</span>
          <span className="ml-2">{user.userId}</span>
        </div>

        <div>
          <span className="font-semibold">가입일:</span>
          <span className="ml-2">{user.createAt.substring(0, 10)}</span>
        </div>

        <div>
          <span className="font-semibold">이메일:</span>
          <span className="ml-2">{user.email}</span>
        </div>

        <div>
          <span className="font-semibold">휴대폰:</span>
          <span className="ml-2">{user.phoneNum}</span>
        </div>

        <div>
          <span className="font-semibold">회원상태:</span>
          <span className="ml-2">{user.userStatus}</span>
        </div>
      </div>
    </div>
  )
}

export default UserCard
