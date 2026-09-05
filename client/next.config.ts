import type { NextConfig } from "next";
import withQRCode from "next-qr";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['192.168.1.3'],
  output: "standalone",
  reactCompiler: true,
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },  
  }
};

export default withQRCode(nextConfig);
