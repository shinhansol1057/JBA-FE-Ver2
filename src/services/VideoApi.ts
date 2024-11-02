import { Api } from "@/services/axios/Api";
import confirmAlert from "@/libs/alert/ConfirmAlert";
import { NormalApi } from "@/services/axios/NormalApi";
import { getBearerToken } from "@/utils/getBearerToken";

export const FetchAddVideo = async (
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
  Api.post("/v1/api/video", data, {
    headers: {
      Authorization: await getBearerToken(),
    },
  })
    .then((res) => {
      if (res.status === 200) {
        confirmAlert("success", "영상 등록이 완료되었습니다").then((res) => {
          if (res.isConfirmed) router.push("/media/video");
        });
      }
    })
    .catch((err) => {
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

export const FetchGetVideoList = async ({
  pageParam,
  queryKey,
}: {
  pageParam: number;
  queryKey: string[];
}) => {
  const url =
    process.env.NEXT_PUBLIC_API_KEY +
    `/v1/api/video?size=10&page=${pageParam.toString()}&keyword=${queryKey[1]}&isOfficial=${queryKey[2]}`;
  const res = await fetch(url);
  return res.json();
};

export const FetchGetVideoDetail = async (id: string) => {
  return NormalApi.get(`v1/api/video/${id}`);
};

export const FetchDeleteVideo = async (id: string) => {
  Api.delete(`/v1/api/video?id=${id}`, {
    headers: {
      Authorization: await getBearerToken(),
    },
  }).then((res) => {
    if (res.status === 200)
      confirmAlert("success", "영상 삭제가 완료되었습니다")
        .then((res) => {
          if (res.isConfirmed) window.location.reload();
        })
        .catch((err) => {
          const data = err.response.data;
          if (data.detailMessage === "이미 삭제된 게시물입니다.")
            confirmAlert("error", "이미 삭제된 영상입니다.").then((res) => {
              if (res.isConfirmed) window.location.reload();
            });
          else if (data.detailMessage === "게시물을 찾을 수 없습니다,")
            confirmAlert("error", "게시물을 찾을 수 없습니다.").then((res) => {
              if (res.isConfirmed) window.location.reload();
            });
        });
  });
};

export const updateVideo = async (data: {
  videoId: string;
  title: string;
  url: string;
  content: string;
}) => {
  Api.put(`/v1/api/video`, data, {
    headers: {
      Authorization: await getBearerToken(),
    },
  })
    .then((res) => {
      if (res.status === 200)
        confirmAlert("success", "영상 수정이 완료되었습니다").then((res) => {
          if (res.isConfirmed) window.location.href = "/media/video";
        });
    })
    .catch((err) => {
      const data = err.response.data;
      if (data.detailMessage === "공백일 수 없습니다")
        confirmAlert("error", data.request + " 을 입력해주세요");
      else if (data.code === 409)
        confirmAlert(
          "error",
          "제목이 중복되었습니다",
          "다른 제목을 입력해주세요.",
        );
      else if (data.detailMessage === "게시물을 찾을 수 없습니다,")
        confirmAlert("error", "게시물을 찾을 수 없습니다").then((res) => {
          if (res.isConfirmed) window.location.href = "/media/video";
        });
    });
};

export const FetchMainVideoList = async () => {
  const url =
    process.env.NEXT_PUBLIC_API_KEY +
    `/v1/api/video?size=3&keyword=&page=0&isOfficial=false`;
  const res = await fetch(url);
  return res.json();
};
