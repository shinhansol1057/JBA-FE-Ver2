/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true, //styled-component의 className을 서버와 클라이언트에서 일관성있게 만들어준다.
  },
  async rewrites() {
    return [
      {
        source: "/v1/api/:path*",
        destination: "https://jba.easymotion.kr/v1/api/:path*", // 백엔드 실제 주소
      },
    ];
  },
  images: {
    domains: ["jba.easymotion.kr", "img.youtube.com"], // 여기에 허용할 이미지 호스트 추가
  },
};

export default nextConfig;
