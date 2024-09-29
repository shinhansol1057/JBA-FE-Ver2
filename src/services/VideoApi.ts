import { Api } from "@/services/axios/Api";
import confirmAlert from "@/libs/alert/ConfirmAlert";
import { NormalApi } from "@/services/axios/NormalApi";
import { getSession } from "next-auth/react";

export const FetchAddVideo = async (
  title: string,
  url: string,
  content: string,
  router: any,
) => {
  const session = await getSession();
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
  Api.post("/v1/api/video/post", data, {
    headers: {
      Authorization: session?.accessToken,
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
    `/v1/api/video/get/videoList?size=10&page=${pageParam.toString()}&keyword=${queryKey[1]}&isOfficial=${queryKey[2]}`;
  const res = await fetch(url);
  return res.json();
};

export const FetchGetVideoDetail = async (id: string) => {
  return NormalApi.get(`v1/api/video/get?id=${id}`);
};

export const FetchDeleteVideo = async (id: string) => {
  const session = await getSession();
  Api.delete(`/v1/api/video/delete?id=${id}`, {
    headers: {
      Authorization: session?.accessToken,
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
  const session = await getSession();
  Api.put(`/v1/api/video/update`, data, {
    headers: {
      Authorization: session?.accessToken,
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