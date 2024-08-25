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
      if (res.status === 200) router.back();
    })
    .catch((err) => {
      console.log(err);
      const data = err.response.data;
      if (data.detailMessage === "공백일 수 없습니다")
        confirmAlert("error", data.request + " 을 입력해주세요");
    });
};
