import { LogoutButton } from "@/containers/admin/LogoutButton"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <nav className='fixed h-16 w-full bg-black text-white flex items-center'>
        <div className='flex w-full px-8 justify-between'>
          <h1 className='font-extrabold text-2xl'>JBA 관리자 센터</h1>
          <LogoutButton />
        </div>
      </nav>
      <div className='pt-16'>{children}</div>
    </main>
  )
}

export default Layout
