import { getPublicPackages } from "@/lib/public-api";

import type { PublicPackage } from "@/types/public-api";

export type FeaturedTour = {
    slug: string;
    title: string;
    category: string;
    description: string;
    image: string;
    imageAlt: string;
    duration: string;
    destinationsCount: number;
    route: string[];
    highlights: string[];
    priceLabel: string;
    featured: boolean;
};

const fallbackImages = [
    "/images/tours/grand-sri-lanka-discovery.jpg",
    "/images/tours/culture-nature-escape.webp",
    "/images/tours/wildlife-coastal-adventure.jpg",
];

const fallbackTours: FeaturedTour[] = [
    {
        slug: "grand-sri-lanka-discovery",
        title: "Grand Sri Lanka Discovery",
        category: "Signature Journey",
        description:
            "A complete private journey combining ancient kingdoms, misty hill country, wildlife safaris, tropical beaches, and Sri Lankan culture.",
        image: fallbackImages[0],
        imageAlt:
            "A scenic private journey through Sri Lanka",
        duration: "14 Days",
        destinationsCount: 8,
        route: [
            "Negombo",
            "Sigiriya",
            "Kandy",
            "Nuwara Eliya",
            "Ella",
            "Yala",
            "Mirissa",
            "Galle",
        ],
        highlights: [
            "Cultural Heritage",
            "Scenic Train",
            "Wildlife Safari",
            "South Coast",
        ],
        priceLabel: "From USD 1,490",
        featured: true,
    },
    {
        slug: "culture-and-nature-escape",
        title: "Culture & Nature Escape",
        category: "Classic Sri Lanka",
        description:
            "Discover sacred cities, ancient monuments, tea-covered mountains, and unforgettable natural landscapes.",
        image: fallbackImages[1],
        imageAlt:
            "Ancient heritage and green mountain landscapes in Sri Lanka",
        duration: "10 Days",
        destinationsCount: 6,
        route: [
            "Negombo",
            "Sigiriya",
            "Kandy",
            "Nuwara Eliya",
            "Ella",
            "Colombo",
        ],
        highlights: [
            "Ancient Cities",
            "Local Culture",
            "Tea Country",
        ],
        priceLabel: "From USD 1,090",
        featured: false,
    },
    {
        slug: "wildlife-and-coastal-adventure",
        title: "Wildlife & Coastal Adventure",
        category: "Nature Journey",
        description:
            "Combine exciting wildlife encounters with tropical beaches, whale watching, and relaxed coastal experiences.",
        image: fallbackImages[2],
        imageAlt:
            "Sri Lankan wildlife safari and tropical coastal journey",
        duration: "7 Days",
        destinationsCount: 4,
        route: [
            "Yala",
            "Mirissa",
            "Galle",
            "Colombo",
        ],
        highlights: [
            "Leopard Safari",
            "Whale Watching",
            "Beach Escape",
        ],
        priceLabel: "From USD 790",
        featured: false,
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

function formatPrice(
    currency: string,
    price: number
): string {
    const formattedPrice =
        new Intl.NumberFormat("en-US", {
            maximumFractionDigits: 0,
        }).format(price);

    return `From ${currency.toUpperCase()} ${formattedPrice}`;
}

function getTourImage(
    imageUrl: string | undefined,
    index: number
): string {
    const fallbackImage =
        fallbackImages[
        index % fallbackImages.length
            ];

    if (!imageUrl) {
        return fallbackImage;
    }

    if (imageUrl.startsWith("/")) {
        return imageUrl;
    }

    try {
        const parsedUrl = new URL(imageUrl);

        /*
         * The CRM currently contains example.com
         * placeholder images. Use a real local image
         * until an actual hosted image is provided.
         */
        if (
            parsedUrl.hostname === "example.com" ||
            parsedUrl.hostname.endsWith(
                ".example.com"
            )
        ) {
            return fallbackImage;
        }

        return imageUrl;
    } catch {
        return fallbackImage;
    }
}

function getHighlights(
    crmPackage: PublicPackage
): string[] {
    const candidates = [
        crmPackage.category,
        ...(crmPackage.inclusions ?? []),
    ];

    return Array.from(
        new Set(
            candidates
                .map((item) => item.trim())
                .filter(Boolean)
        )
    ).slice(0, 4);
}

function mapPublicPackageToTour(
    crmPackage: PublicPackage,
    index: number
): FeaturedTour {
    const route = crmPackage.destinations
        .map((destination) => destination.name)
        .filter(Boolean);

    return {
        slug:
            createSlug(crmPackage.title) ||
            crmPackage._id,

        title: crmPackage.title,

        category: crmPackage.category,

        description: crmPackage.overview,

        image: getTourImage(
            crmPackage.imageUrl,
            index
        ),

        imageAlt: `${crmPackage.title} private Sri Lanka tour`,

        duration: `${crmPackage.durationDays} ${
            crmPackage.durationDays === 1
                ? "Day"
                : "Days"
        }`,

        destinationsCount: route.length,

        route:
            route.length > 0
                ? route
                : ["Sri Lanka"],

        highlights:
            getHighlights(crmPackage),

        priceLabel: formatPrice(
            crmPackage.currency,
            crmPackage.priceFrom
        ),

        featured: crmPackage.isFeatured,
    };
}

export async function getFeaturedTours(): Promise<
    FeaturedTour[]
> {
    const response = await getPublicPackages();

    const crmTours =
        response?.packages
            ?.filter(
                (crmPackage) =>
                    crmPackage.isFeatured
            )
            .slice(0, 3)
            .map(mapPublicPackageToTour) ?? [];

    /*
     * Use CRM packages first. Fill any remaining
     * homepage spaces with fallback content.
     */
    if (crmTours.length >= 3) {
        return crmTours;
    }

    const crmSlugs = new Set(
        crmTours.map((tour) => tour.slug)
    );

    const availableFallbacks =
        fallbackTours.filter(
            (tour) => !crmSlugs.has(tour.slug)
        );

    return [
        ...crmTours,
        ...availableFallbacks.slice(
            0,
            3 - crmTours.length
        ),
    ];
}