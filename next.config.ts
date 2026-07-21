import type {
    NextConfig,
} from "next";

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl =
    createNextIntlPlugin(
        "./src/i18n/request.ts"
    );

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol:
                    "https",

                hostname:
                    "static.tacdn.com",

                port:
                    "5000",

                pathname:
                    "/uploads/**",
            },
        ],
    },
};

export default withNextIntl(
    nextConfig
);