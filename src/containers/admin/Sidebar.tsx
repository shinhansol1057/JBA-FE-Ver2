"use client"

import { cn } from "@/libs/utils/cn"
import { useSidebarStore } from "@/states/SidebarStore"
import Link from "next/link"

type Props = {
  username: string
}

export const Sidebar = ({ username }: Props) => {
  const isOpen = useSidebarStore((state) => state.isOpen)

  return (
    <>
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-10 lg:hidden'
          onClick={() => useSidebarStore.getState().toggle()}
        />
      )}
      <div
        className={cn(
          "fixed inset-y-0 mt-16 left-0 z-20 w-64 bg-black text-white",
          "transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:relative lg:translate-x-0",
        )}
      >
        <div className='p-4'>
          <h2 className='text-2xl font-semibold'>{username} 님</h2>
          <hr className='my-8' />
          <div className='space-y-2'>
            <Link
              href='/admin/user'
              className='flex items-center gap-x-2 py-2 hover:hover:text-gray-300 transition'
            >
              <div className='h-3 w-3 rounded-full bg-white ' />
              <span>회원 관리</span>
            </Link>
            <Link
              href='/admin/competition'
              className='flex items-center gap-x-2 py-2 hover:hover:text-gray-300 transition'
            >
              <div className='h-3 w-3 rounded-full bg-white ' />
              <span>대회 관리</span>
            </Link>
            <Link
              href='/admin/post'
              className='flex items-center gap-x-2 py-2 hover:hover:text-gray-300 transition'
            >
              <div className='h-3 w-3 rounded-full bg-white ' />
              <span>게시물 관리</span>
            </Link>
            <Link
              href='/admin/media'
              className='flex items-center gap-x-2 py-2 hover:hover:text-gray-300 transition'
            >
              <div className='h-3 w-3 rounded-full bg-white ' />
              <span>미디어 관리</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
