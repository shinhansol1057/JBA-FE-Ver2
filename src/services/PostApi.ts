export const getPostList = async ({
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
