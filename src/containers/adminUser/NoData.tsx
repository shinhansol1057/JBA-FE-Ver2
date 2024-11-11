import { Empty } from "antd"

type Props = {
  message?: string
}

const NoData = ({ message = "데이터가 없습니다." }: Props) => {
  return (
    <div className='flex justify-center items-center h-64'>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={<span className='text-gray-500'>{message}</span>}
      />
    </div>
  )
}

export default NoData
