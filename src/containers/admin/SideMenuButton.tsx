"use client"
import { useSidebarStore } from "@/states/SidebarStore"
import { IoMdMenu, IoMdClose } from "react-icons/io"
import { cn } from "@/libs/utils/cn"

export const SideMenuButton = () => {
  const isOpen = useSidebarStore((state) => state.isOpen)
  const toggle = useSidebarStore((state) => state.toggle)

  return (
    <button
      onClick={toggle}
      className={cn(
        "lg:hidden relative w-8 h-8",
        "transition-colors duration-300",
      )}
    >
      <IoMdMenu
        className={cn(
          "absolute inset-0 w-full h-full transition-opacity duration-300",
          isOpen ? "opacity-0" : "opacity-100",
        )}
      />
      <IoMdClose
        className={cn(
          "absolute inset-0 w-full h-full transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      />
    </button>
  )
}
