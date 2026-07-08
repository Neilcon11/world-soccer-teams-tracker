import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pitch: "#0d7a4f",
        night: "#101828",
        sun: "#ffcf56",
      },
      boxShadow: {
        card: "0 16px 45px rgba(16, 24, 40, 0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
