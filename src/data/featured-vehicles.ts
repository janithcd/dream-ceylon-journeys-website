import "server-only";

import { getPublicHome } from "@/lib/public-api";

import type {
    PublicVehicle,
} from "@/types/public-api";

export type FeaturedVehicle = {
    id: string;
    slug: string;
    name: string;
    type: string;
    capacity: number;
    pricePerDay: number;
    currency: string;
    description: string;
    features: string[];
    image: string;
    imageAlt: string;
};

const fallbackVehicles: FeaturedVehicle[] = [
    {
        id: "fallback-car",
        slug: "comfortable-ac-car",
        name: "Comfortable A/C Car",
        type: "Car",
        capacity: 3,
        pricePerDay: 80,
        currency: "USD",
        description:
            "A comfortable private car ideal for couples and small families travelling around Sri Lanka.",
        features: [
            "Air-conditioned interior",
            "Licensed chauffeur guide",
            "Airport pickup",
            "Comfortable luggage space",
        ],
        image: "/images/vehicles/car.png",
        imageAlt:
            "Private air-conditioned car for Sri Lanka tours",
    },
    {
        id: "fallback-suv",
        slug: "premium-suv",
        name: "Premium SUV",
        type: "SUV",
        capacity: 4,
        pricePerDay: 95,
        currency: "USD",
        description:
            "A premium private SUV offering additional comfort and luggage capacity for families and small groups.",
        features: [
            "Spacious air-conditioned cabin",
            "Extra passenger comfort",
            "Generous luggage space",
            "Experienced chauffeur guide",
        ],
        image: "/images/vehicles/suv.png",
        imageAlt:
            "Premium private SUV for Sri Lanka tours",
    },
    {
        id: "fallback-van",
        slug: "spacious-tour-van",
        name: "Spacious Tour Van",
        type: "Van",
        capacity: 7,
        pricePerDay: 110,
        currency: "USD",
        description:
            "A spacious private van designed for families and small groups travelling on longer Sri Lanka tours.",
        features: [
            "Comfortable reclining seats",
            "Large luggage capacity",
            "Air-conditioned interior",
            "Licensed chauffeur guide",
        ],
        image: "/images/vehicles/van.png",
        imageAlt:
            "Spacious private tour van for Sri Lanka holidays",
    },
];

function createSlug(value: string): string {
    return value
        .toLowerCase()
        .trim()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function getLocalVehicleImage(
    type: string
): string {
    const normalizedType =
        type.toLowerCase();

    if (normalizedType.includes("suv")) {
        return "/images/vehicles/suv.png";
    }

    if (
        normalizedType.includes("van") ||
        normalizedType.includes("minivan")
    ) {
        return "/images/vehicles/van.png";
    }

    return "/images/vehicles/car.png";
}

function resolveVehicleImage(
    vehicle: PublicVehicle
): string {
    const fallbackImage =
        getLocalVehicleImage(vehicle.type);

    if (!vehicle.imageUrl) {
        return fallbackImage;
    }

    if (vehicle.imageUrl.startsWith("/")) {
        return vehicle.imageUrl;
    }

    try {
        const parsedUrl = new URL(
            vehicle.imageUrl
        );

        if (
            parsedUrl.hostname ===
            "example.com" ||
            parsedUrl.hostname.endsWith(
                ".example.com"
            )
        ) {
            return fallbackImage;
        }
    } catch {
        return fallbackImage;
    }

    /*
     * Continue using local transparent images
     * until an approved remote image provider
     * is configured in next.config.ts.
     */
    return fallbackImage;
}

function mapPublicVehicle(
    vehicle: PublicVehicle
): FeaturedVehicle {
    return {
        id: vehicle._id,

        slug:
            createSlug(vehicle.name) ||
            vehicle._id,

        name: vehicle.name,

        type: vehicle.type,

        capacity: vehicle.capacity,

        pricePerDay:
        vehicle.pricePerDay,

        currency:
            vehicle.currency || "USD",

        description:
        vehicle.description,

        features:
            vehicle.features?.slice(0, 4) ??
            [],

        image:
            resolveVehicleImage(vehicle),

        imageAlt:
            `${vehicle.name} for private Sri Lanka tours`,
    };
}

export async function getFeaturedVehicles(): Promise<
    FeaturedVehicle[]
> {
    const response = await getPublicHome();

    const crmVehicles =
        response?.featuredVehicles
            ?.filter(
                (vehicle) =>
                    vehicle.isFeatured
            )
            .slice(0, 3)
            .map(mapPublicVehicle) ?? [];

    if (crmVehicles.length >= 3) {
        return crmVehicles;
    }

    const existingTypes = new Set(
        crmVehicles.map((vehicle) =>
            vehicle.type.toLowerCase()
        )
    );

    const availableFallbacks =
        fallbackVehicles.filter(
            (vehicle) =>
                !existingTypes.has(
                    vehicle.type.toLowerCase()
                )
        );

    return [
        ...crmVehicles,
        ...availableFallbacks.slice(
            0,
            3 - crmVehicles.length
        ),
    ];
}