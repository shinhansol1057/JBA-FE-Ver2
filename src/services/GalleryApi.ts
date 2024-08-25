import confirmAlert from "@/libs/alert/ConfirmAlert";

export const getGalleryList = async ({
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
    console.log(err);
    confirmAlert("warning", "오류 발생", "관리자에게 문의해주세요.").then(
      (res) => {
        if (res.isConfirmed) window.location.href = "/";
      },
    );
  });
};

export const getGalleryDetail = async (id: string) => {
  const url = process.env.NEXT_PUBLIC_API_KEY + `/v1/api/gallery/${id}`;
  const res = await fetch(url);
  return res.json();
};
