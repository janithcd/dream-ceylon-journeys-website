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
            "History, culture, photography, heritage tours",
        image:
            "/images/destinations/sigiriya.jpg",
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
            "Experience sacred traditions, Kandy Lake, traditional arts, royal heritage, and the scenic beauty of Sri Lanka’s hill capital.",
        bestFor:
            "Culture, temples, photography, heritage tours",
        image:
            "/images/destinations/kandy.jpg",
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
            "Train journeys, hiking, waterfalls, photography",
        image:
            "/images/destinations/ella.jpg",
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
            "Journey through Yala’s wilderness in search of leopards, elephants, crocodiles, exotic birdlife, and dramatic natural landscapes.",
        bestFor:
            "Leopard safaris, elephants, wildlife photography",
        image:
            "/images/destinations/yala.jpg",
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
            "Whale watching, beaches, surfing, couples",
        image:
            "/images/destinations/mirissa.jpg",
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
            "History, architecture, cafés, photography",
        image:
            "/images/destinations/galle.jpg",
        imageAlt:
            "Historic Galle Fort beside the Indian Ocean in Sri Lanka",
        isPopular: true,
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

function getCategoryTag(
    category: string
): string {
    const normalizedCategory =
        category.toLowerCase();

    if (
        normalizedCategory.includes("wildlife")
    ) {
        return "Wildlife Safari";
    }

    if (
        normalizedCategory.includes("beach")
    ) {
        return "Beach Escape";
    }

    if (
        normalizedCategory.includes("nature")
    ) {
        return "Scenic Nature";
    }

    if (
        normalizedCategory.includes("cultural")
    ) {
        return "Culture & Heritage";
    }

    if (
        normalizedCategory.includes("adventure")
    ) {
        return "Outdoor Adventure";
    }

    return category || "Sri Lanka Experience";
}

function resolveDestinationImage(
    imageUrl: string | undefined,
    fallbackImage: string
): string {
    if (!imageUrl) {
        return fallbackImage;
    }

    /*
     * Local website paths work immediately with
     * Next Image and require no remote host setup.
     */
    if (imageUrl.startsWith("/")) {
        return imageUrl;
    }

    /*
     * The CRM currently contains example.com
     * placeholder URLs. Do not send those URLs
     * to Next Image.
     */
    try {
        const parsedUrl = new URL(imageUrl);

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
     * Continue using a local image until an
     * approved remote image provider such as
     * Cloudinary is configured in next.config.ts.
     */
    return fallbackImage;
}

function mapCrmDestination(
    crmDestination: PublicDestination,
    fallback?: Destination
): Destination {
    const slug = createSlug(
        crmDestination.name
    );

    const category =
        crmDestination.category ??
        fallback?.category ??
        "Destination";

    const region =
        crmDestination.province ??
        fallback?.region ??
        "Sri Lanka";

    const description =
        crmDestination.shortDescription?.trim() ||
        fallback?.description ||
        `Discover ${crmDestination.name}, one of Sri Lanka’s remarkable travel destinations.`;

    const bestFor =
        crmDestination.bestFor?.trim() ||
        fallback?.bestFor ||
        "Private tours, culture, nature, and photography";

    const fallbackImage =
        fallback?.image ??
        "/images/destinations/sigiriya.jpg";

    return {
        slug,
        name: crmDestination.name,
        region,
        category,

        tag:
            fallback?.tag ??
            getCategoryTag(category),

        description,
        bestFor,

        image: resolveDestinationImage(
            crmDestination.imageUrl,
            fallbackImage
        ),

        imageAlt:
            fallback?.imageAlt ??
            `${crmDestination.name} travel destination in ${region}, Sri Lanka`,

        isPopular:
            crmDestination.isPopular ?? true,
    };
}

export async function getPopularDestinations(
    limit = 6
): Promise<Destination[]> {
    const response = await getPublicHome();

    const crmDestinations =
        response?.popularDestinations ?? [];

    const crmBySlug = new Map<
        string,
        PublicDestination
    >();

    crmDestinations.forEach(
        (destination) => {
            crmBySlug.set(
                createSlug(destination.name),
                destination
            );
        }
    );

    /*
     * Keep a deliberate homepage order.
     * CRM content overrides matching records.
     */
    const mergedDestinations =
        fallbackDestinations.map(
            (fallback) => {
                const crmDestination =
                    crmBySlug.get(
                        fallback.slug
                    );

                if (!crmDestination) {
                    return fallback;
                }

                return mapCrmDestination(
                    crmDestination,
                    fallback
                );
            }
        );

    const fallbackSlugs = new Set(
        fallbackDestinations.map(
            (destination) =>
                destination.slug
        )
    );

    /*
     * Append any additional popular CRM
     * destinations not included in the
     * six main fallback destinations.
     */
    const additionalCrmDestinations =
        crmDestinations
            .filter(
                (destination) =>
                    !fallbackSlugs.has(
                        createSlug(
                            destination.name
                        )
                    )
            )
            .map((destination) =>
                mapCrmDestination(destination)
            );

    return [
        ...mergedDestinations,
        ...additionalCrmDestinations,
    ]
        .filter(
            (destination) =>
                destination.isPopular
        )
        .slice(0, limit);
}