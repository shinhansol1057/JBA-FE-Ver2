// import { useState, useEffect } from "react"
// import * as XLSX from "xlsx"
//
// export const useUserTable = (userData: SearchUserData[], pageSize: number) => {
//   const [modalVisible, setModalVisible] = useState(false)
//   const [selectedUser, setSelectedUser] = useState<SearchUserData | null>(null)
//   const [windowWidth, setWindowWidth] = useState(
//     typeof window !== "undefined" ? window.innerWidth : 0,
//   )
//
//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth)
//     window.addEventListener("resize", handleResize)
//     return () => window.removeEventListener("resize", handleResize)
//   }, [])
//
//   const handleExcelDownload = () => {
//     const worksheet = XLSX.utils.json_to_sheet(
//       userData.map((user) => ({
//         아이디: user.userId,
//         이름: user.name,
//         소속팀: user.team || "-",
//         권한: user.permission,
//         이메일: user.email,
//         휴대폰번호: user.phoneNum,
//         회원상태: user.userStatus,
//         최근로그인시간: user.loginAt || "-",
//         가입일시: user.createAt,
//         로그인실패수: user.failureCount,
//       })),
//     )
//
//     const workbook = XLSX.utils.book_new()
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Users")
//
//     const date = new Date().toISOString().split("T")[0]
//     XLSX.writeFile(workbook, `user_list_${date}.xlsx`)
//   }
//
//   const handleRowClick = (record: SearchUserData) => {
//     setSelectedUser(record)
//     setModalVisible(true)
//   }
//
//   return {
//     windowWidth,
//     modalVisible,
//     selectedUser,
//     pageSize,
//     handleExcelDownload,
//     handleRowClick,
//     setModalVisible,
//   }
// }
