import { headers } from "next/headers";
import { FetchGetPostDetail } from "@/services/postApi";
import PostTitle from "@/components/common/PostTitle";
import PostDetailInfo from "@/containers/post/PostDetailInfo";
import { GetFileWithIdType } from "@/types/commonType";
import GetFileBox from "@/components/common/GetFileBox";

const PostDetail = async ({ id }: { id: string }) => {
  const headersList = headers();
  const url = headersList.get("x-pathname") || "";
  const parts = url.split("/");
  const category = parts[4];

  const data = await FetchGetPostDetail(id, category);
  return (
    <div className={"mt-5 w-[90%] md:w-[800px]"}>
      <PostTitle title={data?.data.title} />
      <PostDetailInfo data={data?.data} />
      <div className={"mt-5"}>
        {data.data.files.map((file: GetFileWithIdType) => {
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
