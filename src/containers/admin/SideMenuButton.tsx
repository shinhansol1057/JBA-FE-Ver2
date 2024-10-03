"use client"
import { useSidebarStore } from "@/states/SidebarStore"
import { IoMdMenu } from "react-icons/io"

export const SideMenuButton = () => {
  const toggle = useSidebarStore((state) => state.toggle)

  return (
    <button onClick={toggle} className='lg:hidden'>
      <IoMdMenu className='h-8 w-8' />
    </button>
  )
}
