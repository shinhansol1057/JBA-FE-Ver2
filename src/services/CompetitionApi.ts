export const getPostList = async ({ pageParam, queryKey }) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_KEY +
      `/v1/api/competition?status=${queryKey[1]}&year=2024&page=${pageParam}&size=10`,
  );
  return res.json();
};
