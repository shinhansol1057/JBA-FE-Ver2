import type { Config } from "tailwindcss";

const config: {
  plugins: any[];
  theme: { extend: { backgroundImage: { banner: string }; colors: {} } };
  content: string[]
} = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "banner": "url('/banner.jpeg')",
      },
      colors: {},
    },
  },
  plugins: [],
};
export default config;
