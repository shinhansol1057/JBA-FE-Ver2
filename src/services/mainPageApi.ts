export const getAnnouncements = async () => {
  const url = process.env.NEXT_PUBLIC_API_KEY + "/v1/api/post/notice?size=3";
  const res = await fetch(url, { cache: "no-store" });
  return await res.json();
};

export const getCompetitions = async () => {
  const url = process.env.NEXT_PUBLIC_API_KEY + "/v1/api/main/competition";
  const res = await fetch(url, { cache: "no-store" });
  return await res.json();
};

export const getGalleries = async () => {
  const url =
    process.env.NEXT_PUBLIC_API_KEY + "/v1/api/gallery?official=false&size=5";
  const res = await fetch(url, { cache: "no-store" });
  return await res.json();
};
