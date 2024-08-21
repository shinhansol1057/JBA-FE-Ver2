type Props = {
  pageParam: number;
  queryKey: string[];
};

export const getPostList = async ({ pageParam, queryKey }: Props) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_KEY +
      `/v1/api/competition?status=${queryKey[1]}&page=${pageParam.toString()}&size=10`,
  );
  return res.json();
};
