import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "static.tacdn.com",
                port: "5000",
                pathname:
                    "/uploads/**",
            },
        ],
    },
};

export default nextConfig;
