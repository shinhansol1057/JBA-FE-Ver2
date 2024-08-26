import { Api } from "@/services/axios/Api";
import confirmAlert from "@/libs/alert/ConfirmAlert";

export const addHandler = (
  title: string,
  url: string,
  content: string,
  router: any,
) => {
  const data: {
    title: string;
    url: string;
    content: string;
    isOfficial: boolean;
  } = {
    title: title,
    url: url,
    content: content,
    isOfficial: false,
  };
  Api.post("/v1/api/video/post", data)
    .then((res) => {
      if (res.status === 200) {
        confirmAlert("success", "영상 등록이 완료되었습니다").then((res) => {
          if (res.isConfirmed) router.back();
        });
      }
    })
    .catch((err) => {
      console.log(err);
      const data = err.response.data;
      if (data.detailMessage === "공백일 수 없습니다")
        confirmAlert("error", data.request + " 을 입력해주세요");
      if (data.code === 409)
        confirmAlert(
          "error",
          "제목이 중복되었습니다",
          "다른 제목을 입력해주세요.",
        );
    });
};

export const getVideoList = async ({
  pageParam,
  queryKey,
}: {
  pageParam: number;
  queryKey: string[];
}) => {
  const url =
    process.env.NEXT_PUBLIC_API_KEY +
    `/v1/api/video/get/videoList?size=10&page=${pageParam.toString()}&keyword=${queryKey[1]}&isOfficial=${queryKey[2]}`;
  const res = await fetch(url);
  return res.json();
};
