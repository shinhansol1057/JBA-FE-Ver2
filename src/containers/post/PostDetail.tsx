import { headers } from "next/headers";
import { getPostDetail } from "@/services/PostApi";
import PostTitle from "@/components/common/PostTitle";
import PostDetailInfo from "@/containers/post/PostDetailInfo";
import { getFileType } from "@/types/CommonType";
import GetFileBox from "@/components/common/GetFileBox";

const PostDetail = async ({ id }: { id: string }) => {
  const headersList = headers();
  const url = headersList.get("referer");
  const parts = url.split("/");
  const category = parts[4];

  const data = await getPostDetail(id, category);
  console.log(data);
  return (
    <div className={"mt-[20px]"}>
      <PostTitle title={data.data.title} />
      <PostDetailInfo data={data.data} />
      <div className={"mt-[20px] "}>
        {data.data.files.map((file: getFileType) => {
          return (
            <GetFileBox
              fileName={file.fileName}
              fileUrl={file.fileUrl}
              key={file.fileId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PostDetail;
