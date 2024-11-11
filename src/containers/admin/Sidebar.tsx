"use client"

import { cn } from "@/libs/utils/cn"
import { FetchGetUserInfo } from "@/services/user/UserApi"
import { useSidebarStore } from "@/states/SidebarStore"
import { User } from "@/types/Admin"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


const menuItems = [
  { href: "/admin/user", label: "회원 관리" },
  { href: "/admin/competition", label: "대회 관리" },
  { href: "/admin/post", label: "게시물 관리" },
  { href: "/admin/media", label: "미디어 관리" },
]

export const Sidebar = () => {
  const isOpen = useSidebarStore((state) => state.isOpen)
  const toggle = useSidebarStore((state) => state.toggle)
  const router = useRouter()
  const [userData, setUserData] = useState<User | null>(null);

  const handleNavigation = (href: string) => {
    router.push(href)
    toggle()
  }
 

  useEffect(() => {
    (async () => {
      const res = await FetchGetUserInfo();
      setUserData(res.data.data);
      console.log(res.data)
    })()
  }, []);

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 bg-black/50 z-10' onClick={toggle} />
      )}
      <div
        className={cn(
          "fixed inset-y-0 mt-16 left-0 z-20 w-64 bg-black text-white",
          "transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className='p-4'>
          <h2 className='text-2xl font-semibold'>{userData?.name} 님</h2>
          <hr className='my-8' />
          <div className='space-y-2'>
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className='flex items-center gap-x-2 py-2 hover:text-gray-300 transition'
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation(item.href)
                }}
              >
                <div className='h-3 w-3 rounded-full bg-white' />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
