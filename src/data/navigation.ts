export type NavigationLink = {
    label: string;
    href: string;
    description?: string;

    /*
     * When true, this link is active only
     * when the pathname exactly matches.
     */
    exact?: boolean;
};

export type NavigationItem =
    NavigationLink & {
    children?: NavigationLink[];

    /*
     * Controls which routes activate
     * the top-level navigation item.
     *
     * This prevents shared child links
     * from activating multiple menus.
     */
    activePaths?: string[];
};

export const mainNavigation:
    NavigationItem[] = [
    {
        label: "Home",
        href: "/",
        exact: true,
        activePaths: [
            "/",
        ],
    },

    {
        label: "Tours",
        href: "/sri-lanka-tours",

        activePaths: [
            "/sri-lanka-tours",
            "/day-tours",
        ],

        children: [
            {
                label:
                    "Multi-Day Tours",

                href:
                    "/sri-lanka-tours",

                description:
                    "Browse private multi-day Sri Lanka tours and sample itineraries.",
            },
            {
                label:
                    "Day Tours",

                href:
                    "/day-tours",

                description:
                    "Explore private full-day experiences with a chauffeur-guide.",
            },
        ],
    },

    {
        label: "Destinations",
        href:
            "/sri-lanka-destinations",

        activePaths: [
            "/sri-lanka-destinations",
        ],

        children: [
            {
                label:
                    "All Destinations",

                href:
                    "/sri-lanka-destinations",

                description:
                    "Explore cultural cities, hill country, wildlife areas and beaches.",

                exact: true,
            },
            {
                label: "Sigiriya",
                href:
                    "/sri-lanka-destinations/sigiriya",
            },
            {
                label: "Dambulla",
                href:
                    "/sri-lanka-destinations/dambulla",
            },
            {
                label: "Kandy",
                href:
                    "/sri-lanka-destinations/kandy",
            },
            {
                label:
                    "Nuwara Eliya",

                href:
                    "/sri-lanka-destinations/nuwara-eliya",
            },
            {
                label: "Ella",
                href:
                    "/sri-lanka-destinations/ella",
            },
            {
                label: "Yala",
                href:
                    "/sri-lanka-destinations/yala",
            },
            {
                label: "Mirissa",
                href:
                    "/sri-lanka-destinations/mirissa",
            },
            {
                label: "Galle",
                href:
                    "/sri-lanka-destinations/galle",
            },
            {
                label:
                    "Anuradhapura",

                href:
                    "/sri-lanka-destinations/anuradhapura",
            },
            {
                label:
                    "Polonnaruwa",

                href:
                    "/sri-lanka-destinations/polonnaruwa",
            },
            {
                label:
                    "Trincomalee",

                href:
                    "/sri-lanka-destinations/trincomalee",
            },
        ],
    },

    {
        label: "Experiences",
        href: "/experiences",

        activePaths: [
            "/experiences",
        ],
    },

    {
        label: "Vehicles",
        href: "/vehicles",

        activePaths: [
            "/vehicles",
        ],

        children: [
            {
                label:
                    "All Vehicles",

                href:
                    "/vehicles",

                description:
                    "Browse all private vehicles available for Sri Lanka tours.",

                exact: true,
            },
            {
                label:
                    "Comfortable A/C Car",

                href:
                    "/vehicles/comfortable-ac-car",

                description:
                    "A private car for couples and small families.",
            },
            {
                label:
                    "Premium SUV",

                href:
                    "/vehicles/premium-suv",

                description:
                    "Additional comfort and luggage space for small groups.",
            },
            {
                label:
                    "Spacious Tour Van",

                href:
                    "/vehicles/spacious-tour-van",

                description:
                    "A comfortable option for families and larger groups.",
            },
        ],
    },

    {
        label: "About",
        href: "/about",

        activePaths: [
            "/about",
        ],
    },

    {
        label: "Contact",
        href: "/contact",

        activePaths: [
            "/contact",
        ],
    },
];

export const footerNavigation = {
    explore: [
        {
            label:
                "Sri Lanka Destinations",

            href:
                "/sri-lanka-destinations",
        },
        {
            label:
                "Private Tour Packages",

            href:
                "/sri-lanka-tours",
        },
        {
            label:
                "Sri Lanka Day Tours",

            href:
                "/day-tours",
        },
        {
            label:
                "Tour Gallery",

            href:
                "/gallery",
        },
        {
            label:
                "Our Vehicles",

            href:
                "/vehicles",
        },
    ],

    company: [
        {
            label:
                "About Dream Ceylon",

            href:
                "/about",
        },
        {
            label:
                "Why Travel With Us",

            href:
                "/about#why-us",
        },
        {
            label:
                "Contact Us",

            href:
                "/contact",
        },
        {
            label:
                "Plan Your Journey",

            href:
                "/plan-your-tour",
        },
    ],

    legal: [
        {
            label:
                "Privacy Policy",

            href:
                "/privacy",
        },
        {
            label:
                "Terms & Conditions",

            href:
                "/terms",
        },
    ],
} as const;