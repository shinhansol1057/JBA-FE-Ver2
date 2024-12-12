import { AdminTitle } from "@/containers/admin/AdminTitle"
import { HomeButton } from "@/containers/admin/HomeButton"
import { Sidebar } from "@/containers/admin/Sidebar"
import { SideMenuButton } from "@/containers/admin/SideMenuButton"

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <nav className="fixed h-16 w-full bg-black text-white flex items-center z-10">
          <div className="flex items-center w-full px-4 justify-between">
            <div className="flex items-center gap-x-4">
              <SideMenuButton />
              <AdminTitle />
            </div>
            <HomeButton />
          </div>
        </nav>
        <main className="pt-16 flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
