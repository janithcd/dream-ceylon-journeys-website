const CRM_API_URL = (
    process.env.CRM_API_URL ||
    "http://localhost:5000/api"
).replace(/\/+$/, "");

const CRM_ORIGIN = (() => {
    try {
        return new URL(
            CRM_API_URL
        ).origin;
    } catch {
        return "http://localhost:5000";
    }
})();

type UnknownRecord =
    Record<string, unknown>;

export type WebsiteTourDestination = {
    id: string;
    name: string;
    slug: string;
};

export type WebsiteTourDay = {
    day: number;
    title: string;
    description: string;

    destinations: string[];
    activities: string[];

    accommodation: string;
    meals: string[];
};

export type WebsiteTourPackage = {
    id: string;
    slug: string;
    title: string;

    shortDescription: string;
    description: string;

    durationDays: number;
    durationNights: number;
    durationLabel: string;

    price: number | null;
    currency: string;
    priceType: string;

    imageUrl: string;

    destinations:
        WebsiteTourDestination[];

    highlights: string[];
    inclusions: string[];
    exclusions: string[];

    itinerary: WebsiteTourDay[];

    tourType: string;
    difficulty: string;
    bestFor: string[];

    featured: boolean;
    active: boolean;
};

function isRecord(
    value: unknown
): value is UnknownRecord {
    return (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
    );
}

function getString(
    value: unknown,
    fallback = ""
): string {
    if (
        typeof value === "string"
    ) {
        return value.trim();
    }

    if (
        typeof value === "number"
    ) {
        return String(value);
    }

    return fallback;
}

function getNumber(
    value: unknown,
    fallback = 0
): number {
    if (
        typeof value === "number" &&
        Number.isFinite(value)
    ) {
        return value;
    }

    if (
        typeof value === "string" &&
        value.trim()
    ) {
        const parsed =
            Number(value);

        if (
            Number.isFinite(parsed)
        ) {
            return parsed;
        }
    }

    return fallback;
}

function getBoolean(
    value: unknown,
    fallback = false
): boolean {
    if (
        typeof value === "boolean"
    ) {
        return value;
    }

    if (
        typeof value === "string"
    ) {
        const normalized =
            value
                .trim()
                .toLowerCase();

        if (
            normalized === "true"
        ) {
            return true;
        }

        if (
            normalized === "false"
        ) {
            return false;
        }
    }

    return fallback;
}

function slugify(
    value: string
): string {
    return value
        .trim()
        .toLowerCase()
        .replace(/['’]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function createExcerpt(
    value: string,
    maximumLength = 190
): string {
    const cleanValue =
        value
            .replace(/\s+/g, " ")
            .trim();

    if (
        cleanValue.length <=
        maximumLength
    ) {
        return cleanValue;
    }

    return `${cleanValue
        .slice(
            0,
            maximumLength
        )
        .trim()
        .replace(
            /[.,;:!?-]+$/,
            ""
        )}...`;
}

function getStringArray(
    value: unknown
): string[] {
    if (
        typeof value === "string"
    ) {
        return value
            .split(/\r?\n|,/)
            .map((item) =>
                item.trim()
            )
            .filter(Boolean);
    }

    if (!Array.isArray(value)) {
        return [];
    }

    return value
        .map((item) => {
            if (
                typeof item ===
                "string"
            ) {
                return item.trim();
            }

            if (isRecord(item)) {
                return getString(
                    item.name ??
                    item.title ??
                    item.label ??
                    item.description
                );
            }

            return "";
        })
        .filter(Boolean);
}

function resolveImageUrl(
    value: unknown
): string {
    let imageUrl = "";

    if (
        typeof value === "string"
    ) {
        imageUrl =
            value.trim();
    } else if (
        isRecord(value)
    ) {
        imageUrl =
            getString(
                value.url ??
                value.secureUrl ??
                value.path ??
                value.src ??
                value.imageUrl
            );
    } else if (
        Array.isArray(value) &&
        value.length > 0
    ) {
        return resolveImageUrl(
            value[0]
        );
    }

    if (!imageUrl) {
        return "";
    }

    imageUrl =
        imageUrl.replace(
            /\\/g,
            "/"
        );

    if (
        imageUrl.startsWith(
            "http://"
        ) ||
        imageUrl.startsWith(
            "https://"
        )
    ) {
        return imageUrl;
    }

    if (
        imageUrl.startsWith("//")
    ) {
        return `https:${imageUrl}`;
    }

    const cleanPath =
        imageUrl.startsWith("/")
            ? imageUrl
            : `/${imageUrl}`;

    return `${CRM_ORIGIN}${cleanPath}`;
}

function normalizeDestination(
    value: unknown
): WebsiteTourDestination | null {
    if (
        typeof value === "string"
    ) {
        const name =
            value.trim();

        if (!name) {
            return null;
        }

        return {
            id: slugify(name),
            name,
            slug: slugify(name),
        };
    }

    if (!isRecord(value)) {
        return null;
    }

    const name =
        getString(
            value.name ??
            value.title ??
            value.destinationName
        );

    if (!name) {
        return null;
    }

    const id =
        getString(
            value._id ??
            value.id
        ) || slugify(name);

    const slug =
        getString(
            value.slug
        ) || slugify(name);

    return {
        id,
        name,
        slug,
    };
}

function normalizeDestinations(
    value: unknown
): WebsiteTourDestination[] {
    if (!Array.isArray(value)) {
        return [];
    }

    return value
        .map(
            normalizeDestination
        )
        .filter(
            (
                destination
            ): destination is WebsiteTourDestination =>
                destination !== null
        );
}

function normalizeItineraryDay(
    value: unknown,
    index: number
): WebsiteTourDay {
    if (!isRecord(value)) {
        return {
            day: index + 1,
            title:
                `Day ${index + 1}`,
            description:
                getString(value),

            destinations: [],
            activities: [],

            accommodation: "",
            meals: [],
        };
    }

    const day =
        getNumber(
            value.day ??
            value.dayNumber ??
            value.order,
            index + 1
        );

    const title =
        getString(
            value.title ??
            value.heading ??
            value.dayTitle
        ) || `Day ${day}`;

    return {
        day,
        title,

        description:
            getString(
                value.description ??
                value.details ??
                value.summary
            ),

        destinations:
            getStringArray(
                value.destinations ??
                value.locations ??
                value.places
            ),

        activities:
            getStringArray(
                value.activities ??
                value.highlights
            ),

        accommodation:
            getString(
                value.accommodation ??
                value.hotel ??
                value.stay
            ),

        meals:
            getStringArray(
                value.meals
            ),
    };
}

function normalizeItinerary(
    value: unknown
): WebsiteTourDay[] {
    if (!Array.isArray(value)) {
        return [];
    }

    return value
        .map(
            normalizeItineraryDay
        )
        .sort(
            (firstDay, secondDay) =>
                firstDay.day -
                secondDay.day
        );
}

function normalizeDuration(
    item: UnknownRecord
): {
    days: number;
    nights: number;
    label: string;
} {
    const durationObject =
        isRecord(item.duration)
            ? item.duration
            : null;

    let days =
        getNumber(
            item.durationDays ??
            item.days ??
            durationObject?.days
        );

    let nights =
        getNumber(
            item.durationNights ??
            item.nights ??
            durationObject?.nights
        );

    const durationText =
        getString(
            item.durationLabel ??
            item.durationText ??
            (
                typeof item.duration ===
                "string"
                    ? item.duration
                    : ""
            )
        );

    if (
        days === 0 &&
        durationText
    ) {
        const dayMatch =
            durationText.match(
                /(\d+)\s*day/i
            );

        if (dayMatch) {
            days =
                Number(
                    dayMatch[1]
                );
        }
    }

    if (
        nights === 0 &&
        durationText
    ) {
        const nightMatch =
            durationText.match(
                /(\d+)\s*night/i
            );

        if (nightMatch) {
            nights =
                Number(
                    nightMatch[1]
                );
        }
    }

    if (
        nights === 0 &&
        days > 1
    ) {
        nights =
            days - 1;
    }

    let label =
        durationText;

    if (!label && days > 0) {
        label =
            `${days} ${
                days === 1
                    ? "Day"
                    : "Days"
            }`;

        if (nights > 0) {
            label +=
                ` / ${nights} ${
                    nights === 1
                        ? "Night"
                        : "Nights"
                }`;
        }
    }

    return {
        days,
        nights,
        label:
            label ||
            "Custom duration",
    };
}

function normalizePrice(
    item: UnknownRecord
): {
    price: number | null;
    currency: string;
    priceType: string;
} {
    const priceObject =
        isRecord(item.price)
            ? item.price
            : null;

    const rawPrice =
        item.priceFrom ??
        item.startingPrice ??
        item.basePrice ??
        item.priceFromAmount ??
        priceObject?.amount ??
        (
            typeof item.price ===
            "number"
                ? item.price
                : null
        );

    const parsedPrice =
        rawPrice === null ||
        rawPrice === undefined ||
        rawPrice === ""
            ? null
            : getNumber(
                rawPrice,
                Number.NaN
            );

    return {
        price:
            parsedPrice !== null &&
            Number.isFinite(
                parsedPrice
            )
                ? parsedPrice
                : null,

        currency:
            getString(
                item.currency ??
                priceObject?.currency,
                "USD"
            ).toUpperCase(),

        priceType:
            getString(
                item.priceType ??
                priceObject?.type,
                "Starting from"
            ),
    };
}

function normalizeActiveStatus(
    item: UnknownRecord
): boolean {
    if (
        item.active !== undefined
    ) {
        return getBoolean(
            item.active,
            true
        );
    }

    if (
        item.isActive !== undefined
    ) {
        return getBoolean(
            item.isActive,
            true
        );
    }

    const status =
        getString(
            item.status
        ).toLowerCase();

    if (!status) {
        /*
         * The public API currently does not include
         * the package status field. Public packages
         * should therefore be treated as active.
         */
        return true;
    }

    return status === "active";
}

export function normalizeTourPackage(
    value: unknown
): WebsiteTourPackage | null {
    if (!isRecord(value)) {
        return null;
    }

    const title =
        getString(
            value.title ??
            value.name ??
            value.packageName ??
            value.tourName
        );

    if (!title) {
        return null;
    }

    const id =
        getString(
            value._id ??
            value.id
        ) || slugify(title);

    const slug =
        getString(
            value.slug
        ) || slugify(title);

    const overview =
        getString(
            value.overview ??
            value.description ??
            value.details ??
            value.summary
        );

    const explicitShortDescription =
        getString(
            value.shortDescription ??
            value.excerpt ??
            value.tagline
        );

    const duration =
        normalizeDuration(value);

    const price =
        normalizePrice(value);

    const active =
        normalizeActiveStatus(
            value
        );

    return {
        id,
        slug,
        title,

        shortDescription:
            explicitShortDescription ||
            createExcerpt(
                overview
            ),

        description:
        overview,

        durationDays:
        duration.days,

        durationNights:
        duration.nights,

        durationLabel:
        duration.label,

        price:
        price.price,

        currency:
        price.currency,

        priceType:
        price.priceType,

        imageUrl:
            resolveImageUrl(
                value.imageUrl ??
                value.coverImage ??
                value.featuredImage ??
                value.image ??
                value.images
            ),

        destinations:
            normalizeDestinations(
                value.destinations ??
                value.destinationIds ??
                value.places
            ),

        highlights:
            getStringArray(
                value.highlights ??
                value.keyHighlights
            ),

        inclusions:
            getStringArray(
                value.inclusions ??
                value.includes
            ),

        exclusions:
            getStringArray(
                value.exclusions ??
                value.excludes
            ),

        itinerary:
            normalizeItinerary(
                value.itinerary ??
                value.days ??
                value.dailyItinerary
            ),

        tourType:
            getString(
                value.tourType ??
                value.category ??
                value.type,
                "Private Tour"
            ),

        difficulty:
            getString(
                value.difficulty ??
                value.activityLevel,
                "Suitable for most travellers"
            ),

        bestFor:
            getStringArray(
                value.bestFor ??
                value.suitableFor ??
                value.travelStyles
            ),

        featured:
            getBoolean(
                value.featured ??
                value.isFeatured,
                false
            ),

        active,
    };
}

function extractPackageArray(
    payload: unknown
): unknown[] {
    if (Array.isArray(payload)) {
        return payload;
    }

    if (!isRecord(payload)) {
        return [];
    }

    const directArrays = [
        payload.packages,
        payload.tourPackages,
        payload.tours,
        payload.results,
        payload.items,
    ];

    for (
        const possibleArray
        of directArrays
        ) {
        if (
            Array.isArray(
                possibleArray
            )
        ) {
            return possibleArray;
        }
    }

    if (
        Array.isArray(
            payload.data
        )
    ) {
        return payload.data;
    }

    if (
        isRecord(
            payload.data
        )
    ) {
        const nestedArrays = [
            payload.data.packages,
            payload.data
                .tourPackages,
            payload.data.tours,
            payload.data.results,
            payload.data.items,
        ];

        for (
            const possibleArray
            of nestedArrays
            ) {
            if (
                Array.isArray(
                    possibleArray
                )
            ) {
                return possibleArray;
            }
        }
    }

    return [];
}

export async function getTours(): Promise<
    WebsiteTourPackage[]
> {
    const response =
        await fetch(
            `${CRM_API_URL}/public/packages`,
            {
                /*
                 * Disable caching while package
                 * management is under development.
                 */
                cache: "no-store",
            }
        );

    if (!response.ok) {
        throw new Error(
            `Unable to retrieve tour packages. CRM returned ${response.status}.`
        );
    }

    const payload: unknown =
        await response.json();

    return extractPackageArray(
        payload
    )
        .map(
            normalizeTourPackage
        )
        .filter(
            (
                tour
            ): tour is WebsiteTourPackage =>
                tour !== null &&
                tour.active
        );
}

export async function getTourBySlug(
    slug: string
): Promise<WebsiteTourPackage | null> {
    const normalizedSlug =
        slug
            .trim()
            .toLowerCase();

    if (!normalizedSlug) {
        return null;
    }

    const tours =
        await getTours();

    return (
        tours.find(
            (tour) =>
                tour.slug.toLowerCase() ===
                normalizedSlug
        ) ?? null
    );
}