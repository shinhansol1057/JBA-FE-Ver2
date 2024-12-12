// components/user-card.tsx
import { User } from '../type'
import { Select, message } from 'antd'
import { useRouter } from 'next/navigation'
import { updateUserRole } from '@/action/admin'

interface UserCardProps {
  user: User
}

const ROLE_OPTIONS = [
  { value: 'user', label: '일반 사용자' },
  { value: 'master', label: '마스터' },
  { value: 'admin', label: '관리자' },
  { value: 'referee', label: '심판' },
  { value: 'referee-leader', label: '심판이사' },
  { value: 'table-official', label: '경기부' },
  { value: 'table-official-leader', label: '경기이사' }
]

const getPermissionColor = (permission: string): string => {
  const colorMap: Record<string, string> = {
    user: 'bg-green-500',
    master: 'bg-blue-500',
    admin: 'bg-red-500',
    referee: 'bg-yellow-500',
    'referee-leader': 'bg-purple-500',
    'table-official': 'bg-orange-500',
    'table-official-leader': 'bg-teal-500'
  }

  return colorMap[permission] || 'bg-gray-500'
}

const UserCard = ({ user }: UserCardProps) => {
  const router = useRouter()

  const handleRoleChange = async (role: string) => {
    const result = await updateUserRole(user.userId, role)
    if (!result.success) {
      message.error(result.message)
      return
    }
    message.success(result.message)
    router.refresh()
  }

  const translateUserStatus = (status: string): { text: string; color: string } => {
    const statusMap: Record<string, { text: string; color: string }> = {
      normal: { text: '정상', color: 'bg-green-100 text-green-600' },
      hide: { text: '숨김', color: 'bg-gray-100 text-gray-600' },
      delete: { text: '삭제', color: 'bg-red-100 text-red-600' },
      locked: { text: '잠김', color: 'bg-yellow-100 text-yellow-600' }
    }

    return statusMap[status] || { text: '알 수 없음', color: 'bg-gray-100 text-gray-500' }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 hover:bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* 이름 & 아이디 그룹 */}
        <div className="flex flex-col space-y-2">
          <div>
            <span className="font-semibold">이름:</span>
            <span className="ml-2">{user.name}</span>
          </div>
          <div>
            <span className="font-semibold">아이디:</span>
            <span className="ml-2">{user.userId}</span>
          </div>
        </div>

        {/* 권한 설정 그룹 */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <span className="font-semibold block mb-2">권한:</span>
          <div className="flex flex-col space-y-2">
            <Select
              defaultValue={user.permission}
              style={{ width: '100%', maxWidth: '200px' }}
              onChange={handleRoleChange}
              options={ROLE_OPTIONS}
              popupMatchSelectWidth={false}
            />
            <span
              className={`px-2 py-1 rounded ${getPermissionColor(user.permission)} text-white text-center`}
              style={{ maxWidth: '200px' }}
            >
              {user.permission}
            </span>
          </div>
        </div>

        {/* 연락처 정보 그룹 */}
        <div className="flex flex-col space-y-2">
          <div>
            <span className="font-semibold">이메일:</span>
            <span className="ml-2 break-all">{user.email}</span>
          </div>
          <div>
            <span className="font-semibold">휴대폰:</span>
            <span className="ml-2">{user.phoneNum}</span>
          </div>
        </div>

        {/* 날짜 정보 그룹 */}
        {/* 날짜 정보 그룹 */}
        <div className="flex flex-col space-y-2">
          <div>
            <span className="font-semibold">최근로그인:</span>
            <span className="ml-2">{user.loginAt ? user.loginAt.substring(0, 16) : '-'}</span>
          </div>
          <div>
            <span className="font-semibold">가입일:</span>
            <span className="ml-2">{user.createAt.substring(0, 10)}</span>
          </div>
          <div>
            <span className="font-semibold">수정일:</span>
            <span className="ml-2">{user.updateAt ? user.updateAt.substring(0, 16) : '없음'}</span>
          </div>
          <div>
            <span className="font-semibold">삭제일:</span>
            <span className="ml-2 text-red-600">
              {user.deleteAt ? user.deleteAt.substring(0, 16) : '없음'}
            </span>
          </div>
          <div>
            <span className="font-semibold">잠금일:</span>
            <span className="ml-2 text-yellow-600">
              {user.lockAt ? user.lockAt.substring(0, 16) : '없음'}
            </span>
          </div>
          <div>
            <span className="font-semibold">회원상태:</span>
            <span
              className={`ml-2 px-2 py-1 rounded-full text-sm ${translateUserStatus(user.userStatus).color}`}
            >
              {translateUserStatus(user.userStatus).text}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCard
