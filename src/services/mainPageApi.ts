export const getAnnouncements = async () => {
  const url = process.env.NEXT_PUBLIC_API_KEY + "/v1/api/post/notice?size=3";
  return await fetchJSON(url).then((res) => res.json());
};

export const getCompetitions = async () => {
  const url = process.env.NEXT_PUBLIC_API_KEY + "/v1/api/competition/main";
  return await fetchJSON(url).then((res) => res.json());
};

export const getGalleries = async () => {
  const url =
    process.env.NEXT_PUBLIC_API_KEY + "/v1/api/gallery?official=false&size=5";
  return await fetchJSON(url).then((res) => res.json());
};

async function fetchJSON(url: string, init: RequestInit = {}) {
  const res = await fetch(url, {
    cache: "no-store",
    redirect: "manual", // 30x 감지
    headers: {
      Accept: "application/json",
      "User-Agent":
        "Mozilla/5.0 (compatible; main/1.0; +https://www.jba.co.kr)",
      ...(init.headers || {}),
    },
    ...init,
  });

  const ct = res.headers.get("content-type") || "";
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("[API NOT OK]", res.status, url, ct, text.slice(0, 300));
    throw new Error(`Fetch failed ${res.status} ${res.statusText}`);
  }
  if (!ct.includes("application/json")) {
    const text = await res.text().catch(() => "");
    console.error(
      "[NON JSON]",
      res.status,
      url,
      ct,
      "LOC=",
      res.headers.get("location"),
      text.slice(0, 300),
    );
    throw new Error(`Expected JSON but got ${ct}`);
  }
  return res.json();
}
