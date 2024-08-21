export const getCompetitionList = async ({
  pageParam,
  queryKey,
}: {
  pageParam: number;
  queryKey: string[];
}) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_KEY +
      `/v1/api/competition?status=${queryKey[1]}&page=${pageParam.toString()}&size=10`,
  );
  return res.json();
};

export const getCompetitionDetail = async (id: string) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_KEY + `/v1/api/competition/detail/${id}`,
  );
  return res.json();
};
