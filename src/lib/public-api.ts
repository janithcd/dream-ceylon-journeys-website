import "server-only";

import type {
    PublicHomeResponse,
    PublicPackagesResponse,
} from "@/types/public-api";

const API_BASE_URL =
    process.env.CRM_API_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    "http://localhost:5000/api";

async function fetchPublicData<T>(
    endpoint: string
): Promise<T | null> {
    try {
        const response = await fetch(
            `${API_BASE_URL}${endpoint}`,
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
            console.error(
                `Dream Ceylon API request failed: ${response.status} ${response.statusText}`
            );

            return null;
        }

        return (await response.json()) as T;
    } catch (error) {
        console.error(
            `Dream Ceylon API connection failed for ${endpoint}:`,
            error
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