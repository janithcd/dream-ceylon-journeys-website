import "server-only";

import type {
    PublicHomeResponse,
    PublicPackagesResponse,
    PublicTripadvisorReviewsResponse,
} from "@/types/public-api";

const API_BASE_URL =
    process.env.CRM_API_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    "http://127.0.0.1:5000/api";

async function fetchPublicData<T>(
    endpoint: string
): Promise<T | null> {
    const requestUrl =
        `${API_BASE_URL}${endpoint}`;

    try {
        const response = await fetch(
            requestUrl,
            {
                headers: {
                    Accept: "application/json",
                },

                next: {
                    revalidate: 300,
                },
            }
        );

        if (!response.ok) {
            console.warn(
                `[CRM API] ${endpoint} returned ${response.status}.`
            );

            return null;
        }

        return (await response.json()) as T;
    } catch {
        console.warn(
            `[CRM API] Could not connect to ${requestUrl}.`
        );

        return null;
    }
}

async function fetchLivePublicData<T>(
    endpoint: string
): Promise<T | null> {
    const requestUrl =
        `${API_BASE_URL}${endpoint}`;

    try {
        const response = await fetch(
            requestUrl,
            {
                headers: {
                    Accept: "application/json",
                },

                cache: "no-store",
            }
        );

        if (!response.ok) {
            console.warn(
                `[CRM API] ${endpoint} returned ${response.status}.`
            );

            return null;
        }

        return (await response.json()) as T;
    } catch {
        console.warn(
            `[CRM API] Could not connect to ${requestUrl}.`
        );

        return null;
    }
}

export async function getPublicPackages() {
    return fetchPublicData<PublicPackagesResponse>(
        "/public/packages"
    );
}

export async function getPublicHome() {
    return fetchPublicData<PublicHomeResponse>(
        "/public/home"
    );
}

export async function getPublicTripadvisorReviews(
    language = "en"
) {
    const query =
        new URLSearchParams({
            language,
        });

    return fetchLivePublicData<PublicTripadvisorReviewsResponse>(
        `/public/tripadvisor-reviews?${query.toString()}`
    );
}