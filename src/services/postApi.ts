import { GetFileType } from "@/types/commonType";
import { Api } from "@/services/axios/api";
import confirmAlert from "@/libs/alert/ConfirmAlert";
import { findPostCategoryUrl } from "@/constants";
import { getBearerToken } from "@/utils/getBearerToken";

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

export const FetchAddPost = async (request: any) => {
  const blob: Blob = new Blob([JSON.stringify(request.body)], {
    type: "application/json",
  });
  const formData: FormData = new FormData();
  formData.append("body", blob);
  request.files.forEach((file: File) => formData.append("uploadFiles", file));

  return Api.post(
    `/v1/api/post/${request.postCategory}?isOfficial=${request.isOfficial}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: await getBearerToken(),
      },
    },
  );
};

export const FetchUpdatePost = async (request: {
  id: string;
  postCategory: string;
  body: {
    title: string;
    content: string;
    postImgs: GetFileType[];
    remainingFiles: GetFileType[];
  };
  files: File[];
  isOfficial: string;
}) => {
  const blob: Blob = new Blob([JSON.stringify(request.body)], {
    type: "application/json",
  });
  const formData: FormData = new FormData();
  formData.append("body", blob);
  request.files.forEach((file: File) => formData.append("uploadFiles", file));

  return Api.post(
    `/v1/api/post/${request.postCategory}/${request.id}?isOfficial=${request.isOfficial}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: await getBearerToken(),
      },
    },
  );
};

export const FetchDeletePost = async (id: string, category: string) => {
  let categoryListUrl = findPostCategoryUrl(category);
  return Api.delete(`/v1/api/post/${id}`, {
    headers: {
      Authorization: await getBearerToken(),
    },
  })
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
