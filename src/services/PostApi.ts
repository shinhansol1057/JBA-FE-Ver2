import { getFileType } from "@/types/CommonType";
import { Api } from "@/services/axios/Api";
import confirmAlert from "@/libs/alert/ConfirmAlert";
import { findPostCategoryUrl } from "@/constants/Post";
import axios from "axios";
import { NormalApi } from "@/services/axios/NormalApi";

export const FetchGetPostList = async ({
  pageParam,
  queryKey,
}: {
  pageParam: number;
  queryKey: string[];
}) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_KEY +
      `/v1/api/post/${queryKey[1]}?keyword=${queryKey[2]}&page=${pageParam}&size=10`,
  );
  return res.json();
};

export const FetchGetPostDetail = async (id: string, category: string) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_KEY + `/v1/api/post/${category}/${id}`,
  );
  return res.json();
};

export const FetchAddPost = (
  category: string,
  body: { title: string; content: string; postImgs: getFileType[] },
  files: File[],
  isOfficial: string,
  session: any,
) => {
  let categoryListUrl = findPostCategoryUrl(category);

  const blob: Blob = new Blob([JSON.stringify(body)], {
    type: "application/json",
  });
  const formData: FormData = new FormData();
  formData.append("body", blob);
  files.forEach((file: File) => formData.append("uploadFiles", file));

  return NormalApi.post(
    `/v1/api/post/${category}?isOfficial=${isOfficial}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: session.accessToken,
      },
    },
  )
    .then((res) => {
      if (res.status === 200) {
        confirmAlert("success", "게시물이 등록되었습니다.").then((res) => {
          if (res.isConfirmed) window.location.href = categoryListUrl;
        });
      }
    })
    .catch((err) => {
      const data = err.response.data;
      if (data.detailMessage === "제목은 필수입니다.")
        confirmAlert("error", "제목을 입력해주세요");
      else if (data.detailMessage === "내용은 필수입니다.")
        confirmAlert("error", "내용을 입력해주세요");
      else if (data.detailMessage === "Title Duplication")
        confirmAlert("error", "중복된 제목입니다");
    });
};

export const FetchUpdatePost = (
  id: string,
  category: string,
  body: {
    title: string;
    content: string;
    postImgs: getFileType[];
    remainingFiles: getFileType[];
  },
  files: File[],
  isOfficial: string,
) => {
  let categoryListUrl = findPostCategoryUrl(category);

  const blob: Blob = new Blob([JSON.stringify(body)], {
    type: "application/json",
  });
  const formData: FormData = new FormData();
  formData.append("body", blob);
  files.forEach((file: File) => formData.append("uploadFiles", file));

  return Api.put(
    `/v1/api/post/${category}/${id}?isOfficial=${isOfficial}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  )
    .then((res) => {
      if (res.status === 200) {
        confirmAlert("success", "게시물이 수정되었습니다.").then((res) => {
          if (res.isConfirmed) window.location.href = categoryListUrl;
        });
      }
    })
    .catch((err) => {
      const data = err.response.data;
      if (data.detailMessage === "제목은 필수입니다.")
        confirmAlert("error", "제목을 입력해주세요");
      else if (data.detailMessage === "내용은 필수입니다.")
        confirmAlert("error", "내용을 입력해주세요");
      else if (data.detailMessage === "Title Duplication")
        confirmAlert("error", "중복된 제목입니다");
      else if (data.detailMessage === "Post Not Found")
        confirmAlert("error", "게시글을 찾을 수 없습니다.").then((res) => {
          if (res.isConfirmed) window.location.href = categoryListUrl;
        });
    });
};

export const FetchDeletePost = (id: string, category: string) => {
  let categoryListUrl = findPostCategoryUrl(category);
  return Api.delete(`/v1/api/post/${id}`)
    .then((res) => {
      if (res.status === 200) {
        confirmAlert("success", "게시물이 삭제되었습니다").then((res) => {
          if (res.isConfirmed) window.location.href = categoryListUrl;
        });
      }
    })
    .catch((err) => {
      const data = err.response.data;
      if (data.detailMessage === "Post Not Found") {
        confirmAlert("error", "게시물을 찾을 수 없습니다").then((res) => {
          if (res.isConfirmed) window.location.href = categoryListUrl;
        });
      }
    });
};
