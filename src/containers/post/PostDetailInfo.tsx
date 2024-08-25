import { getPostDetailType } from "@/types/PostType";
import PostContent from "@/components/common/PostContent";
import GetFileBox from "@/components/common/GetFileBox";
import { getFileType } from "@/types/CommonType";

type Props = {
  data: getPostDetailType;
};

const PostDetailInfo = ({ data }: Props) => {
  return (
    <div
      className={
        "mt-[20px] flex flex-col px-[7px] bg-white rounded-[8px] shadow-xl " +
        "w-[280px] sm:w-[400px] md:w-[800px] "
      }
    >
      <div
        className={
          "flex items-center border-b border-solid border-[#D9D9D9] text-[#4B4B4B] " +
          "text-[10px] sm:text-[12px] md:text-[16px] " +
          "min-h-[30px] sm:min-h-[40px] md:min-h-[50px] "
        }
      >
        <p className={"ml-[5px]"}>관리자</p>
        <p className={"mx-[10px]"}>{data.createAt}</p>
        <p>조회수 {data.viewCount}</p>
      </div>
      <div>
        <PostContent content={data.content} />
      </div>
    </div>
  );
};

export default PostDetailInfo;
