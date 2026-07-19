import "server-only";

import { getPublicHome } from "@/lib/public-api";

import type {
    PublicDestination,
} from "@/types/public-api";

export type Destination = {
    slug: string;
    name: string;
    region: string;
    category: string;
    tag: string;
    description: string;
    bestFor: string;
    image: string;
    imageAlt: string;
    isPopular: boolean;
};

/*
 * Homepage destination images always come from
 * the Next.js public/images/destinations folder.
 *
 * CRM data may update:
 * - Name
 * - Province
 * - Category
 * - Description
 * - Best-for content
 * - Popular status
 *
 * CRM image URLs are deliberately ignored here.
 */
const fallbackDestinations: Destination[] = [
    {
        slug: "sigiriya",
        name: "Sigiriya",
        region: "Central Province",
        category: "Cultural",
        tag: "Ancient Heritage",
        description:
            "Explore Sigiriya Rock Fortress, ancient gardens, remarkable frescoes, and panoramic views across Sri Lanka’s Cultural Triangle.",
        bestFor:
            "History, culture, photography, and heritage tours",
        image:
            "/images/destinations/sigiriya-rock-fortress-sri-lanka.jpg",
        imageAlt:
            "Sigiriya Rock Fortress rising above the tropical forest in Sri Lanka",
        isPopular: true,
    },
    {
        slug: "kandy",
        name: "Kandy",
        region: "Central Province",
        category: "Cultural",
        tag: "Culture & Tradition",
        description:
            "Experience sacred traditions, Kandy Lake, royal heritage, traditional arts, and the scenic beauty of Sri Lanka’s hill capital.",
        bestFor:
            "Culture, temples, photography, and heritage tours",
        image:
            "/images/destinations/kandy-cultural-city-sri-lanka.jpg",
        imageAlt:
            "Kandy Lake and cultural city surrounded by green hills in Sri Lanka",
        isPopular: true,
    },
    {
        slug: "ella",
        name: "Ella",
        region: "Uva Province",
        category: "Nature",
        tag: "Scenic Hill Country",
        description:
            "Discover tea-covered mountains, the Nine Arch Bridge, waterfalls, hiking trails, and one of Sri Lanka’s most scenic train journeys.",
        bestFor:
            "Train journeys, hiking, waterfalls, and photography",
        image:
            "/images/destinations/ella-nine-arch-bridge-sri-lanka.jpg",
        imageAlt:
            "Nine Arch Bridge and green hill-country landscape near Ella Sri Lanka",
        isPopular: true,
    },
    {
        slug: "yala",
        name: "Yala",
        region: "Southern Sri Lanka",
        category: "Wildlife",
        tag: "Wildlife Safari",
        description:
            "Journey through Yala’s wilderness in search of leopards, elephants, crocodiles, birdlife, and dramatic natural landscapes.",
        bestFor:
            "Leopard safaris, elephants, nature, and wildlife photography",
        image:
            "/images/destinations/yala-national-park-safari-sri-lanka.jpg",
        imageAlt:
            "Sri Lankan leopard during a wildlife safari in Yala National Park",
        isPopular: true,
    },
    {
        slug: "mirissa",
        name: "Mirissa",
        region: "Southern Province",
        category: "Beach",
        tag: "Beach & Activities",
        description:
            "Relax beside tropical beaches and enjoy whale watching, surfing, coconut-lined viewpoints, seafood, and memorable south-coast sunsets.",
        bestFor:
            "Whale watching, beaches, surfing, and couples",
        image:
            "/images/destinations/mirissa-beach-whale-watching-sri-lanka.jpg",
        imageAlt:
            "Palm-fringed Mirissa Beach on the south coast of Sri Lanka",
        isPopular: true,
    },
    {
        slug: "galle",
        name: "Galle",
        region: "Southern Province",
        category: "Cultural",
        tag: "Coastal Heritage",
        description:
            "Walk through historic Galle Fort and discover colonial architecture, boutique cafés, museums, ocean views, and south-coast character.",
        bestFor:
            "History, architecture, cafés, walking, and photography",
        image:
            "/images/destinations/galle-fort-sri-lanka.jpg",
        imageAlt:
            "Historic Galle Fort beside the Indian Ocean in Sri Lanka",
        isPopular: true,
    },
];

function createSlug(
    value: string
): string {
    return value
        .toLowerCase()
        .trim()
        .replace(/&/g, "and")
        .replace(
            /[^a-z0-9]+/g,
            "-"
        )
        .replace(
            /^-+|-+$/g,
            ""
        );
}

function getCategoryTag(
    category: string
): string {
    const normalizedCategory =
        category
            .trim()
            .toLowerCase();

    if (
        normalizedCategory.includes(
            "wildlife"
        )
    ) {
        return "Wildlife Safari";
    }

    if (
        normalizedCategory.includes(
            "beach"
        )
    ) {
        return "Beach Escape";
    }

    if (
        normalizedCategory.includes(
            "nature"
        ) ||
        normalizedCategory.includes(
            "hill"
        )
    ) {
        return "Scenic Nature";
    }

    if (
        normalizedCategory.includes(
            "cultural"
        ) ||
        normalizedCategory.includes(
            "historical"
        ) ||
        normalizedCategory.includes(
            "religious"
        )
    ) {
        return "Culture & Heritage";
    }

    if (
        normalizedCategory.includes(
            "adventure"
        )
    ) {
        return "Outdoor Adventure";
    }

    return (
        category ||
        "Sri Lanka Experience"
    );
}

function mapCrmDestination(
    crmDestination: PublicDestination,
    fallback: Destination
): Destination {
    const crmName =
        crmDestination.name?.trim() ||
        fallback.name;

    const category =
        crmDestination.category?.trim() ||
        fallback.category;

    const region =
        crmDestination.province?.trim() ||
        fallback.region;

    const description =
        crmDestination.shortDescription?.trim() ||
        fallback.description;

    const bestFor =
        crmDestination.bestFor?.trim() ||
        fallback.bestFor;

    return {
        slug:
            createSlug(crmName) ||
            fallback.slug,

        name:
        crmName,

        region,

        category,

        tag:
            getCategoryTag(
                category
            ),

        description,

        bestFor,

        /*
         * Always use the local website image.
         * Do not use crmDestination.imageUrl here.
         */
        image:
        fallback.image,

        imageAlt:
        fallback.imageAlt,

        isPopular:
            crmDestination.isPopular ??
            fallback.isPopular,
    };
}

export async function getPopularDestinations(
    limit = 6
): Promise<Destination[]> {
    try {
        const response =
            await getPublicHome();

        const crmDestinations =
            response?.popularDestinations ??
            [];

        const crmBySlug =
            new Map<
                string,
                PublicDestination
            >();

        crmDestinations.forEach(
            (destination) => {
                if (
                    !destination.name
                ) {
                    return;
                }

                crmBySlug.set(
                    createSlug(
                        destination.name
                    ),
                    destination
                );
            }
        );

        /*
         * Maintain the deliberate homepage order:
         *
         * 1. Sigiriya
         * 2. Kandy
         * 3. Ella
         * 4. Yala
         * 5. Mirissa
         * 6. Galle
         */
        const destinations =
            fallbackDestinations.map(
                (fallback) => {
                    const crmDestination =
                        crmBySlug.get(
                            fallback.slug
                        );

                    if (
                        !crmDestination
                    ) {
                        return fallback;
                    }

                    return mapCrmDestination(
                        crmDestination,
                        fallback
                    );
                }
            );

        return destinations
            .filter(
                (destination) =>
                    destination.isPopular
            )
            .slice(
                0,
                Math.max(
                    0,
                    limit
                )
            );
    } catch (error) {
        /*
         * The homepage must still work when
         * the CRM backend is temporarily offline.
         */
        console.error(
            "[Popular Destinations]",
            error
        );

        return fallbackDestinations.slice(
            0,
            Math.max(
                0,
                limit
            )
        );
    }
}