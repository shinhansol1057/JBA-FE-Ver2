export const getAnnouncements = async () => {
  const url = process.env.NEXT_PUBLIC_API_KEY + "/v1/api/post/notice?size=3";
  return await fetch(url, { cache: "no-store" }).then((res) => res.json());
};

export const getCompetitions = async () => {
  const url = process.env.NEXT_PUBLIC_API_KEY + "/v1/api/main/competition";
  return await fetch(url, { cache: "no-store" }).then((res) => res.json());
};

export const getGalleries = async () => {
  const url =
    process.env.NEXT_PUBLIC_API_KEY + "/v1/api/gallery?official=false&size=5";
  return await fetch(url, { cache: "no-store" }).then((res) => res.json());
};
