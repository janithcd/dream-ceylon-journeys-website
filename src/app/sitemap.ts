import type {
    MetadataRoute,
} from "next";

import {
    getDestinations,
} from "@/lib/destinations";

import {
    getDayTours,
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
).replace(
    /\/+$/,
    ""
);

type SitemapEntry =
    MetadataRoute
        .Sitemap[number];

type UnknownRecord =
    Record<
        string,
        unknown
    >;

function isRecord(
    value:
    unknown
): value is UnknownRecord {
    return (
        typeof value ===
        "object" &&
        value !==
        null &&
        !Array.isArray(
            value
        )
    );
}

function getString(
    value:
    unknown
): string {
    return typeof value ===
    "string"
        ? value.trim()
        : "";
}

function getSlug(
    value:
    unknown
): string {
    if (
        !isRecord(
            value
        )
    ) {
        return "";
    }

    return getString(
        value.slug
    );
}

function getLastModified(
    value:
    unknown
): Date | undefined {
    if (
        !isRecord(
            value
        )
    ) {
        return undefined;
    }

    const rawDate =
        value.updatedAt ??
        value.createdAt;

    if (
        typeof rawDate !==
        "string" &&
        !(rawDate instanceof Date)
    ) {
        return undefined;
    }

    const parsedDate =
        new Date(
            rawDate
        );

    return Number.isNaN(
        parsedDate.getTime()
    )
        ? undefined
        : parsedDate;
}

function createUrl(
    pathname:
    string
): string {
    const cleanPath =
        pathname.startsWith(
            "/"
        )
            ? pathname
            : `/${pathname}`;

    return `${siteUrl}${cleanPath}`;
}

function createDynamicEntry(
    pathname:
    string,
    value:
    unknown,
    priority:
    number
): SitemapEntry {
    const lastModified =
        getLastModified(
            value
        );

    return {
        url:
            createUrl(
                pathname
            ),

        changeFrequency:
            "monthly",

        priority,

        ...(lastModified
            ? {
                lastModified,
            }
            : {}),
    };
}

export default async function sitemap():
    Promise<MetadataRoute.Sitemap> {
    /*
     * Include only real public routes.
     *
     * Add privacy and terms pages later
     * after confirming their exact URLs.
     */
    const staticPages:
        MetadataRoute.Sitemap = [
        {
            url:
                createUrl(
                    "/"
                ),

            changeFrequency:
                "weekly",

            priority:
                1,
        },
        {
            url:
                createUrl(
                    "/about"
                ),

            changeFrequency:
                "monthly",

            priority:
                0.8,
        },
        {
            url:
                createUrl(
                    "/contact"
                ),

            changeFrequency:
                "monthly",

            priority:
                0.8,
        },
        {
            url:
                createUrl(
                    "/sri-lanka-tours"
                ),

            changeFrequency:
                "weekly",

            priority:
                0.9,
        },
        {
            url:
                createUrl(
                    "/day-tours"
                ),

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

            changeFrequency:
                "weekly",

            priority:
                0.9,
        },
        {
            url:
                createUrl(
                    "/experiences"
                ),

            changeFrequency:
                "monthly",

            priority:
                0.8,
        },
        {
            url:
                createUrl(
                    "/gallery"
                ),

            changeFrequency:
                "weekly",

            priority:
                0.7,
        },
        {
            url:
                createUrl(
                    "/vehicles"
                ),

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

            changeFrequency:
                "monthly",

            priority:
                0.9,
        },
    ];

    const [
        toursResult,
        dayToursResult,
        destinationsResult,
        vehiclesResult,
    ] =
        await Promise.allSettled([
            getTours(),
            getDayTours(),
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
                getSlug(
                    tour
                );

            if (
                !slug
            ) {
                continue;
            }

            dynamicPages.push(
                createDynamicEntry(
                    `/sri-lanka-tours/${encodeURIComponent(
                        slug
                    )}`,
                    tour,
                    0.8
                )
            );
        }
    } else {
        console.error(
            "[Sitemap Tours]",
            toursResult.reason
        );
    }

    if (
        dayToursResult.status ===
        "fulfilled"
    ) {
        for (
            const dayTour
            of dayToursResult.value
            ) {
            const slug =
                getSlug(
                    dayTour
                );

            if (
                !slug
            ) {
                continue;
            }

            dynamicPages.push(
                createDynamicEntry(
                    `/day-tours/${encodeURIComponent(
                        slug
                    )}`,
                    dayTour,
                    0.8
                )
            );
        }
    } else {
        console.error(
            "[Sitemap Day Tours]",
            dayToursResult.reason
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

            if (
                !slug
            ) {
                continue;
            }

            dynamicPages.push(
                createDynamicEntry(
                    `/sri-lanka-destinations/${encodeURIComponent(
                        slug
                    )}`,
                    destination,
                    0.8
                )
            );
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
                getSlug(
                    vehicle
                );

            if (
                !slug
            ) {
                continue;
            }

            dynamicPages.push(
                createDynamicEntry(
                    `/vehicles/${encodeURIComponent(
                        slug
                    )}`,
                    vehicle,
                    0.7
                )
            );
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
            SitemapEntry
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