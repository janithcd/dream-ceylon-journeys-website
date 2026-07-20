import type {
    MetadataRoute,
} from "next";

import {
    getDestinations,
} from "@/lib/destinations";

import {
    getTours,
} from "@/lib/tours";

import {
    getVehicles,
} from "@/lib/vehicles";

export const revalidate =
    3600;

const siteUrl = (
    process.env
        .NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000"
).replace(/\/+$/, "");

type UnknownRecord =
    Record<string, unknown>;

function isRecord(
    value: unknown
): value is UnknownRecord {
    return (
        typeof value ===
        "object" &&
        value !== null &&
        !Array.isArray(value)
    );
}

function getString(
    value: unknown
): string {
    return typeof value ===
    "string"
        ? value.trim()
        : "";
}

function getSlug(
    value: unknown
): string {
    if (!isRecord(value)) {
        return "";
    }

    return getString(
        value.slug
    );
}

function getLastModified(
    value: unknown
): Date {
    const fallback =
        new Date();

    if (!isRecord(value)) {
        return fallback;
    }

    const rawDate =
        value.updatedAt ??
        value.createdAt;

    if (
        typeof rawDate !==
        "string" &&
        !(rawDate instanceof Date)
    ) {
        return fallback;
    }

    const parsedDate =
        new Date(rawDate);

    return Number.isNaN(
        parsedDate.getTime()
    )
        ? fallback
        : parsedDate;
}

function createUrl(
    pathname: string
): string {
    const cleanPath =
        pathname.startsWith("/")
            ? pathname
            : `/${pathname}`;

    return `${siteUrl}${cleanPath}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now =
        new Date();

    const staticPages:
        MetadataRoute.Sitemap = [
        {
            url:
                createUrl("/"),

            lastModified:
            now,

            changeFrequency:
                "weekly",

            priority:
                1,
        },
        {
            url:
                createUrl(
                    "/sri-lanka-tours"
                ),

            lastModified:
            now,

            changeFrequency:
                "weekly",

            priority:
                0.9,
        },
        {
            url:
                createUrl(
                    "/sri-lanka-destinations"
                ),

            lastModified:
            now,

            changeFrequency:
                "weekly",

            priority:
                0.9,
        },
        {
            url:
                createUrl(
                    "/vehicles"
                ),

            lastModified:
            now,

            changeFrequency:
                "weekly",

            priority:
                0.8,
        },
        {
            url:
                createUrl(
                    "/plan-your-tour"
                ),

            lastModified:
            now,

            changeFrequency:
                "monthly",

            priority:
                0.9,
        },
    ];

    const [
        toursResult,
        destinationsResult,
        vehiclesResult,
    ] =
        await Promise.allSettled([
            getTours(),
            getDestinations(),
            getVehicles(),
        ]);

    const dynamicPages:
        MetadataRoute.Sitemap =
        [];

    if (
        toursResult.status ===
        "fulfilled"
    ) {
        for (
            const tour
            of toursResult.value
            ) {
            const slug =
                getSlug(tour);

            if (!slug) {
                continue;
            }

            dynamicPages.push({
                url:
                    createUrl(
                        `/sri-lanka-tours/${encodeURIComponent(
                            slug
                        )}`
                    ),

                lastModified:
                    getLastModified(
                        tour
                    ),

                changeFrequency:
                    "monthly",

                priority:
                    0.8,
            });
        }
    } else {
        console.error(
            "[Sitemap Tours]",
            toursResult.reason
        );
    }

    if (
        destinationsResult.status ===
        "fulfilled"
    ) {
        for (
            const destination
            of destinationsResult.value
            ) {
            const slug =
                getSlug(
                    destination
                );

            if (!slug) {
                continue;
            }

            dynamicPages.push({
                url:
                    createUrl(
                        `/sri-lanka-destinations/${encodeURIComponent(
                            slug
                        )}`
                    ),

                lastModified:
                    getLastModified(
                        destination
                    ),

                changeFrequency:
                    "monthly",

                priority:
                    0.8,
            });
        }
    } else {
        console.error(
            "[Sitemap Destinations]",
            destinationsResult.reason
        );
    }

    if (
        vehiclesResult.status ===
        "fulfilled"
    ) {
        for (
            const vehicle
            of vehiclesResult.value
            ) {
            const slug =
                getSlug(vehicle);

            if (!slug) {
                continue;
            }

            dynamicPages.push({
                url:
                    createUrl(
                        `/vehicles/${encodeURIComponent(
                            slug
                        )}`
                    ),

                lastModified:
                    getLastModified(
                        vehicle
                    ),

                changeFrequency:
                    "monthly",

                priority:
                    0.7,
            });
        }
    } else {
        console.error(
            "[Sitemap Vehicles]",
            vehiclesResult.reason
        );
    }

    const uniquePages =
        new Map<
            string,
            MetadataRoute.Sitemap[number]
        >();

    for (
        const page
        of [
        ...staticPages,
        ...dynamicPages,
    ]
        ) {
        uniquePages.set(
            page.url,
            page
        );
    }

    return Array.from(
        uniquePages.values()
    );
}