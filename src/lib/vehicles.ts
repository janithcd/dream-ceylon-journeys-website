import "server-only";

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

export type WebsiteVehicle = {
    id: string;
    slug: string;

    name: string;
    type: string;

    capacity: number;

    pricePerDay: number | null;
    currency: string;

    imageUrl: string;

    description: string;
    shortDescription: string;

    features: string[];

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
    maximumLength = 170
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

    const normalizedPath =
        imageUrl.startsWith("/")
            ? imageUrl
            : `/${imageUrl}`;

    return `${CRM_ORIGIN}${normalizedPath}`;
}

function normalizeActiveStatus(
    value: UnknownRecord
): boolean {
    if (
        value.active !== undefined
    ) {
        return getBoolean(
            value.active,
            true
        );
    }

    if (
        value.isActive !== undefined
    ) {
        return getBoolean(
            value.isActive,
            true
        );
    }

    const status =
        getString(
            value.status
        ).toLowerCase();


    if (!status) {
        return true;
    }

    return status === "active";
}

export function normalizeVehicle(
    value: unknown
): WebsiteVehicle | null {
    if (!isRecord(value)) {
        return null;
    }

    const name =
        getString(
            value.name ??
            value.vehicleName ??
            value.title
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

    const description =
        getString(
            value.description ??
            value.overview ??
            value.details
        );

    const rawPrice =
        value.pricePerDay ??
        value.dailyRate ??
        value.price ??
        value.ratePerDay;

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
        id,
        slug,

        name,

        type:
            getString(
                value.type ??
                value.category,
                "Private Vehicle"
            ),

        capacity:
            Math.max(
                getNumber(
                    value.capacity ??
                    value.passengerCapacity ??
                    value.seats,
                    1
                ),
                1
            ),

        pricePerDay:
            parsedPrice !== null &&
            Number.isFinite(
                parsedPrice
            )
                ? parsedPrice
                : null,

        currency:
            getString(
                value.currency,
                "USD"
            ).toUpperCase(),

        imageUrl:
            resolveImageUrl(
                value.imageUrl ??
                value.coverImage ??
                value.featuredImage ??
                value.image ??
                value.images
            ),

        description,

        shortDescription:
            getString(
                value.shortDescription ??
                value.excerpt
            ) ||
            createExcerpt(
                description
            ),

        features:
            getStringArray(
                value.features ??
                value.amenities ??
                value.facilities
            ),

        featured:
            getBoolean(
                value.isFeatured ??
                value.featured,
                false
            ),

        active:
            normalizeActiveStatus(
                value
            ),
    };
}

function extractVehicleArray(
    payload: unknown
): unknown[] {
    if (Array.isArray(payload)) {
        return payload;
    }

    if (!isRecord(payload)) {
        return [];
    }

    const directArrays = [
        payload.vehicles,
        payload.featuredVehicles,
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
            payload.data.vehicles,
            payload.data
                .featuredVehicles,
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

export async function getVehicles(): Promise<
    WebsiteVehicle[]
> {
    const response =
        await fetch(
            `${CRM_API_URL}/public/vehicles?limit=100`,
            {
                cache:
                    "no-store",
            }
        );

    if (!response.ok) {
        throw new Error(
            `Unable to retrieve vehicles. CRM returned ${response.status}.`
        );
    }

    const payload: unknown =
        await response.json();

    return extractVehicleArray(
        payload
    )
        .map(
            normalizeVehicle
        )
        .filter(
            (
                vehicle
            ): vehicle is WebsiteVehicle =>
                vehicle !== null &&
                vehicle.active
        );
}

export async function getFeaturedVehicles(): Promise<
    WebsiteVehicle[]
> {
    const vehicles =
        await getVehicles();

    const featured =
        vehicles.filter(
            (vehicle) =>
                vehicle.featured
        );

    /*
     * Fall back to the first active vehicles
     * when no vehicle has been marked featured.
     */
    return featured.length > 0
        ? featured.slice(0, 6)
        : vehicles.slice(0, 6);
}

export async function getVehicleBySlug(
    slug: string
): Promise<WebsiteVehicle | null> {
    const normalizedSlug =
        slug
            .trim()
            .toLowerCase();

    if (!normalizedSlug) {
        return null;
    }

    const vehicles =
        await getVehicles();

    return (
        vehicles.find(
            (vehicle) =>
                vehicle.slug
                    .toLowerCase() ===
                normalizedSlug
        ) ?? null
    );
}