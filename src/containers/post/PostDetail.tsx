import { headers } from "next/headers";
import { FetchGetPostDetail } from "@/services/PostApi";
import PostTitle from "@/components/common/PostTitle";
import PostDetailInfo from "@/containers/post/PostDetailInfo";
import { getFileWithIdType } from "@/types/CommonType";
import GetFileBox from "@/components/common/GetFileBox";

const PostDetail = async ({ id }: { id: string }) => {
  const headersList = headers();
  const url = headersList.get("x-pathname") || "";
  const parts = url.split("/");
  const category = parts[4];

  const data = await FetchGetPostDetail(id, category);
  return (
    <div className={"mt-[20px]"}>
      <PostTitle title={data?.data.title} />
      <PostDetailInfo data={data?.data} />
      <div className={"mt-[20px] "}>
        {data.data.files.map((file: getFileWithIdType) => {
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
