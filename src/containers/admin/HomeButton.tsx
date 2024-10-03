import Link from "next/link"
import { IoMdHome } from "react-icons/io"

export const HomeButton = () => {
  return (
    <Link href='/'>
      <IoMdHome className='h-8 w-8' />
    </Link>
  )
}
