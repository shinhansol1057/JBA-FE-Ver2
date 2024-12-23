import confirmAlert from "@/libs/alert/ConfirmAlert";
import { GetFileType } from "@/types/commonType";
import { Api } from "@/services/axios/api";
import { getBearerToken } from "@/utils/getBearerToken";

export const FetchGetGalleryList = async ({
  pageParam,
  queryKey,
}: {
  pageParam: number;
  queryKey: string[];
}) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_KEY +
      `/v1/api/gallery?keyword=${queryKey[1]}&page=${pageParam.toString()}&size=10&official=false`,
  );
  return res.json().catch((err) => {
    confirmAlert("warning", "오류 발생", "관리자에게 문의해주세요.").then(
      (res) => {
        if (res.isConfirmed) window.location.href = "/";
      },
    );
  });
};

export const FetchGetGalleryDetail = async (id: string) => {
  const url = process.env.NEXT_PUBLIC_API_KEY + `/v1/api/gallery/${id}`;
  const res = await fetch(url);
  return res.json();
};

export const FetchAddGallery = async (
  title: string,
  files: GetFileType[],
  isOfficial: boolean,
) => {
  const request: { title: string; imgs: GetFileType[] } = {
    title: title,
    imgs: files,
  };
  return Api.post(`/v1/api/gallery/register?official=${isOfficial}`, request, {
    headers: {
      Authorization: await getBearerToken(),
    },
  }).then((res) => {
    if (res.status === 200) {
      confirmAlert("success", "갤러리가 등록되었습니다").then((res) => {
        if (res.isConfirmed) window.location.href = "/media/gallery";
      });
    }
  });
};

export const FetchDeleteGallery = async (id: string) => {
  return Api.delete(`/v1/api/gallery/${id}`, {
    headers: {
      Authorization: await getBearerToken(),
    },
  })
    .then((res) => {
      if (res.status === 200) {
        confirmAlert("success", "갤러리가 삭제되었습니다").then((res) => {
          if (res.isConfirmed) window.location.href = "/media/gallery";
        });
      }
    })
    .catch((err) => {
      const data = err.response.data;
      if (data.detailMessage === "Gallery Not Found")
        confirmAlert("error", "갤러리를 찾을 수 없습니다").then((res) => {
          if (res.isConfirmed) window.location.href = "/media/gallery";
        });
    });
};

export const FetchUpdateGallery = async (
  id: string,
  title: string,
  files: GetFileType[],
  isOfficial: boolean,
) => {
  const request: { title: string; imgs: GetFileType[] } = {
    title: title,
    imgs: files,
  };
  return Api.put(`/v1/api/gallery/${id}?official=${isOfficial}`, request, {
    headers: {
      Authorization: await getBearerToken(),
    },
  })
    .then((res) => {
      if (res.status === 200) {
        confirmAlert("success", "갤러리가 수정되었습니다").then((res) => {
          if (res.isConfirmed) window.location.href = `/media/gallery/${id}`;
        });
      }
    })
    .catch((err) => {
      const data = err.response.data;
      if (data.detailMessage === "Gallery Not Found")
        confirmAlert("error", "갤러리를 찾을 수 없습니다").then((res) => {
          if (res.isConfirmed) window.location.href = "/media/gallery";
        });
      else if (data.detailMessage === "적어도 한개의 imgs는 필수입니다.")
        confirmAlert("error", "파일을 한 개 이상 업로드해주세요");
    });
};
