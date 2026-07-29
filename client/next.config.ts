import type { NextConfig } from "next";
import withQRCode from "next-qr";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  reactCompiler: true,
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default withQRCode(nextConfig);
