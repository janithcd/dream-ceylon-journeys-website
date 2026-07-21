import type {
    MetadataRoute,
} from "next";

const siteUrl = (
    process.env
        .NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000"
).replace(/\/+$/, "");

const isPublicProductionSite =
    process.env.NODE_ENV ===
    "production" &&
    !siteUrl.includes(
        "localhost"
    ) &&
    !siteUrl.includes(
        "127.0.0.1"
    );

export default function robots(): MetadataRoute.Robots {
    if (
        !isPublicProductionSite
    ) {
        return {
            rules: {
                userAgent:
                    "*",

                disallow:
                    "/",
            },
        };
    }

    return {
        rules: {
            userAgent:
                "*",

            allow:
                "/",

            disallow: [
                "/api/",
            ],
        },

        sitemap:
            `${siteUrl}/sitemap.xml`,

        host:
        siteUrl,
    };
}