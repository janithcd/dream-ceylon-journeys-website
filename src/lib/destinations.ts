export type WebsiteDestination = {
    id: string;
    slug: string;
    name: string;
    shortDescription: string;
    description: string;
    category: string;
    region: string;
    imageUrl: string;
    highlights: string[];
    bestTime: string;
    featured: boolean;
};

type UnknownRecord =
    Record<string, unknown>;

const getCrmApiUrl = () => {
    const apiUrl =
        process.env.CRM_API_URL ||
        process.env.NEXT_PUBLIC_API_URL ||
        "http://localhost:5000/api";

    return apiUrl.replace(
        /\/+$/,
        ""
    );
};

const getCrmOrigin = () => {
    try {
        return new URL(
            getCrmApiUrl()
        ).origin;
    } catch {
        return "http://localhost:5000";
    }
};

const cleanText = (
    value: unknown
) => {
    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    return String(
        value
    ).trim();
};

const slugify = (
    value: string
) => {
    return value
        .toLowerCase()
        .normalize("NFKD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .replace(
            /[^a-z0-9]+/g,
            "-"
        )
        .replace(
            /^-+|-+$/g,
            ""
        );
};

const getFirstText = (
    record: UnknownRecord,
    fields: string[]
) => {
    for (
        const field of fields
        ) {
        const value =
            cleanText(
                record[field]
            );

        if (value) {
            return value;
        }
    }

    return "";
};

const getStringArray = (
    value: unknown
) => {
    if (
        Array.isArray(value)
    ) {
        return value
            .map(cleanText)
            .filter(Boolean);
    }

    if (
        typeof value ===
        "string"
    ) {
        return value
            .split(
                /\r?\n|,/
            )
            .map(
                (item) =>
                    item.trim()
            )
            .filter(Boolean);
    }

    return [];
};

const resolveImageUrl = (
    value: unknown
) => {
    if (
        typeof value !== "string"
    ) {
        return "";
    }

    let imageUrl =
        value.trim();

    if (
        !imageUrl ||
        imageUrl ===
        "[object Object]"
    ) {
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
        ) ||
        imageUrl.startsWith(
            "data:"
        )
    ) {
        return imageUrl;
    }

    /*
     * Convert a stored Windows path such as:
     *
     * C:/project/backend/uploads/destinations/sigiriya.webp
     *
     * into:
     *
     * /uploads/destinations/sigiriya.webp
     */
    if (
        /^[a-z]:\//i.test(
            imageUrl
        )
    ) {
        const uploadsPosition =
            imageUrl
                .toLowerCase()
                .indexOf(
                    "/uploads/"
                );

        if (
            uploadsPosition ===
            -1
        ) {
            return "";
        }

        imageUrl =
            imageUrl.slice(
                uploadsPosition
            );
    }

    if (
        !imageUrl.startsWith(
            "/"
        )
    ) {
        imageUrl =
            `/${imageUrl}`;
    }

    return `${getCrmOrigin()}${imageUrl}`;
};

const extractImageValue = (
    value: unknown
): string => {
    if (
        typeof value ===
        "string"
    ) {
        return value.trim();
    }

    if (
        !value ||
        typeof value !==
        "object"
    ) {
        return "";
    }

    const imageRecord =
        value as UnknownRecord;

    const possibleFields = [
        "url",
        "secureUrl",
        "secure_url",
        "imageUrl",
        "image",
        "path",
        "src",
        "location",
        "filename",
    ];

    for (
        const field of
        possibleFields
        ) {
        const fieldValue =
            imageRecord[field];

        if (
            typeof fieldValue ===
            "string" &&
            fieldValue.trim()
        ) {
            return fieldValue.trim();
        }
    }

    return "";
};

const getDestinationImage = (
    record: UnknownRecord
) => {
    const directFields = [
        "imageUrl",
        "image",
        "coverImage",
        "featuredImage",
        "thumbnail",
        "mainImage",
        "heroImage",
        "bannerImage",
    ];

    for (
        const field of
        directFields
        ) {
        const imageValue =
            extractImageValue(
                record[field]
            );

        if (imageValue) {
            return resolveImageUrl(
                imageValue
            );
        }
    }

    const galleryFields = [
        "gallery",
        "images",
        "photos",
    ];

    for (
        const field of
        galleryFields
        ) {
        const gallery =
            record[field];

        if (
            !Array.isArray(
                gallery
            )
        ) {
            continue;
        }

        for (
            const image of
            gallery
            ) {
            const imageValue =
                extractImageValue(
                    image
                );

            if (imageValue) {
                return resolveImageUrl(
                    imageValue
                );
            }
        }
    }

    return "";
};

const normalizeDestination = (
    value: unknown,
    index: number
): WebsiteDestination | null => {
    if (
        !value ||
        typeof value !==
        "object"
    ) {
        return null;
    }

    const record =
        value as UnknownRecord;

    const name =
        getFirstText(
            record,
            [
                "name",
                "title",
                "destinationName",
            ]
        );

    if (!name) {
        return null;
    }

    const id =
        getFirstText(
            record,
            [
                "_id",
                "id",
            ]
        ) ||
        `destination-${index}`;

    const slug =
        getFirstText(
            record,
            [
                "slug",
                "seoSlug",
            ]
        ) ||
        slugify(name);

    const shortDescription =
        getFirstText(
            record,
            [
                "shortDescription",
                "summary",
                "excerpt",
                "overview",
                "tagline",
                "description",
            ]
        );

    const description =
        getFirstText(
            record,
            [
                "description",
                "longDescription",
                "content",
                "overview",
                "shortDescription",
            ]
        );

    const category =
        getFirstText(
            record,
            [
                "category",
                "type",
            ]
        ) ||
        "Sri Lanka Destination";

    const region =
        getFirstText(
            record,
            [
                "region",
                "province",
                "location",
                "area",
            ]
        );

    const bestTime =
        getFirstText(
            record,
            [
                "bestTime",
                "bestTimeToVisit",
                "season",
            ]
        );

    const highlights =
        getStringArray(
            record.highlights ||
            record.attractions ||
            record.activities ||
            record.thingsToDo
        );

    const featured =
        record.featured ===
        true ||
        record.isFeatured ===
        true;

    return {
        id,
        slug,
        name,
        shortDescription,
        description,
        category,
        region,
        imageUrl:
            getDestinationImage(
                record
            ),
        highlights,
        bestTime,
        featured,
    };
};

const extractDestinationRecords = (
    payload: unknown
): unknown[] => {
    if (
        Array.isArray(payload)
    ) {
        return payload;
    }

    if (
        !payload ||
        typeof payload !==
        "object"
    ) {
        return [];
    }

    const record =
        payload as UnknownRecord;

    const possibleArrays = [
        record.destinations,
        record.data,
        record.items,
        record.results,
    ];

    for (
        const candidate of
        possibleArrays
        ) {
        if (
            Array.isArray(
                candidate
            )
        ) {
            return candidate;
        }
    }

    return [];
};

export const getDestinations =
    async (): Promise<
        WebsiteDestination[]
    > => {
        const response =
            await fetch(
                `${getCrmApiUrl()}/public/destinations`,
                {
                    next: {
                        revalidate:
                            300,
                    },
                }
            );

        if (!response.ok) {
            throw new Error(
                `Failed to load destinations. CRM returned ${response.status}.`
            );
        }

        const payload: unknown =
            await response.json();

        return extractDestinationRecords(
            payload
        )
            .map(
                (
                    destination,
                    index
                ) =>
                    normalizeDestination(
                        destination,
                        index
                    )
            )
            .filter(
                (
                    destination
                ): destination is WebsiteDestination =>
                    destination !==
                    null
            )
            .sort(
                (
                    first,
                    second
                ) => {
                    if (
                        first.featured !==
                        second.featured
                    ) {
                        return first.featured
                            ? -1
                            : 1;
                    }

                    return first.name.localeCompare(
                        second.name
                    );
                }
            );
    };

export const getDestinationBySlug =
    async (
        slug: string
    ): Promise<
        WebsiteDestination | null
    > => {
        const destinations =
            await getDestinations();

        const normalizedSlug =
            slugify(slug);

        return (
            destinations.find(
                (destination) =>
                    destination.slug ===
                    slug ||
                    slugify(
                        destination.slug
                    ) ===
                    normalizedSlug
            ) || null
        );
    };