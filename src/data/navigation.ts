export type NavigationLink = {
    label: string;
    labelKey?: string;

    href: string;

    description?: string;
    descriptionKey?: string;

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
     */
    activePaths?: string[];
};

export const mainNavigation:
    NavigationItem[] = [
    {
        label: "Home",
        labelKey: "home",

        href: "/",

        exact: true,

        activePaths: [
            "/",
        ],
    },

    {
        label: "Tours",
        labelKey: "tours",

        href: "/sri-lanka-tours",

        activePaths: [
            "/sri-lanka-tours",
            "/day-tours",
        ],

        children: [
            {
                label:
                    "Multi-Day Tours",

                labelKey:
                    "multiDayTours",

                href:
                    "/sri-lanka-tours",

                description:
                    "Browse private multi-day Sri Lanka tours and sample itineraries.",

                descriptionKey:
                    "descriptions.multiDayTours",
            },
            {
                label:
                    "Day Tours",

                labelKey:
                    "dayTours",

                href:
                    "/day-tours",

                description:
                    "Explore private full-day experiences with a chauffeur-guide.",

                descriptionKey:
                    "descriptions.dayTours",
            },
        ],
    },

    {
        label:
            "Destinations",

        labelKey:
            "destinations",

        href:
            "/sri-lanka-destinations",

        activePaths: [
            "/sri-lanka-destinations",
        ],

        children: [
            {
                label:
                    "All Destinations",

                labelKey:
                    "allDestinations",

                href:
                    "/sri-lanka-destinations",

                description:
                    "Explore cultural cities, hill country, wildlife areas and beaches.",

                descriptionKey:
                    "descriptions.allDestinations",

                exact:
                    true,
            },
            {
                label:
                    "Sigiriya",

                labelKey:
                    "sigiriya",

                href:
                    "/sri-lanka-destinations/sigiriya",
            },
            {
                label:
                    "Dambulla",

                labelKey:
                    "dambulla",

                href:
                    "/sri-lanka-destinations/dambulla",
            },
            {
                label:
                    "Kandy",

                labelKey:
                    "kandy",

                href:
                    "/sri-lanka-destinations/kandy",
            },
            {
                label:
                    "Nuwara Eliya",

                labelKey:
                    "nuwaraEliya",

                href:
                    "/sri-lanka-destinations/nuwara-eliya",
            },
            {
                label:
                    "Ella",

                labelKey:
                    "ella",

                href:
                    "/sri-lanka-destinations/ella",
            },
            {
                label:
                    "Yala",

                labelKey:
                    "yala",

                href:
                    "/sri-lanka-destinations/yala",
            },
            {
                label:
                    "Mirissa",

                labelKey:
                    "mirissa",

                href:
                    "/sri-lanka-destinations/mirissa",
            },
            {
                label:
                    "Galle",

                labelKey:
                    "galle",

                href:
                    "/sri-lanka-destinations/galle",
            },
            {
                label:
                    "Anuradhapura",

                labelKey:
                    "anuradhapura",

                href:
                    "/sri-lanka-destinations/anuradhapura",
            },
            {
                label:
                    "Polonnaruwa",

                labelKey:
                    "polonnaruwa",

                href:
                    "/sri-lanka-destinations/polonnaruwa",
            },
            {
                label:
                    "Trincomalee",

                labelKey:
                    "trincomalee",

                href:
                    "/sri-lanka-destinations/trincomalee",
            },
        ],
    },

    {
        label:
            "Experiences",

        labelKey:
            "experiences",

        href:
            "/experiences",

        activePaths: [
            "/experiences",
        ],
    },

    {
        label:
            "Vehicles",

        labelKey:
            "vehicles",

        href:
            "/vehicles",

        activePaths: [
            "/vehicles",
        ],

        children: [
            {
                label:
                    "All Vehicles",

                labelKey:
                    "allVehicles",

                href:
                    "/vehicles",

                description:
                    "Browse all private vehicles available for Sri Lanka tours.",

                descriptionKey:
                    "descriptions.allVehicles",

                exact:
                    true,
            },
            {
                label:
                    "Comfortable A/C Car",

                labelKey:
                    "comfortableAcCar",

                href:
                    "/vehicles/comfortable-ac-car",

                description:
                    "A private car for couples and small families.",

                descriptionKey:
                    "descriptions.comfortableAcCar",
            },
            {
                label:
                    "Premium SUV",

                labelKey:
                    "premiumSuv",

                href:
                    "/vehicles/premium-suv",

                description:
                    "Additional comfort and luggage space for small groups.",

                descriptionKey:
                    "descriptions.premiumSuv",
            },
            {
                label:
                    "Spacious Tour Van",

                labelKey:
                    "spaciousTourVan",

                href:
                    "/vehicles/spacious-tour-van",

                description:
                    "A comfortable option for families and larger groups.",

                descriptionKey:
                    "descriptions.spaciousTourVan",
            },
        ],
    },

    {
        label:
            "About",

        labelKey:
            "about",

        href:
            "/about",

        activePaths: [
            "/about",
        ],
    },

    {
        label:
            "Contact",

        labelKey:
            "contact",

        href:
            "/contact",

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

            labelKey:
                "destinations",

            href:
                "/sri-lanka-destinations",
        },
        {
            label:
                "Private Tour Packages",

            labelKey:
                "privateTours",

            href:
                "/sri-lanka-tours",
        },
        {
            label:
                "Sri Lanka Day Tours",

            labelKey:
                "dayTours",

            href:
                "/day-tours",
        },
        {
            label:
                "Tour Gallery",

            labelKey:
                "gallery",

            href:
                "/gallery",
        },
        {
            label:
                "Our Vehicles",

            labelKey:
                "vehicles",

            href:
                "/vehicles",
        },
    ],

    company: [
        {
            label:
                "About Dream Ceylon",

            labelKey:
                "about",

            href:
                "/about",
        },
        {
            label:
                "Why Travel With Us",

            labelKey:
                "whyUs",

            href:
                "/about#why-us",
        },
        {
            label:
                "Contact Us",

            labelKey:
                "contact",

            href:
                "/contact",
        },
        {
            label:
                "Plan Your Journey",

            labelKey:
                "planJourney",

            href:
                "/plan-your-tour",
        },
    ],

    legal: [
        {
            label:
                "Privacy Policy",

            labelKey:
                "privacy",

            href:
                "/privacy",
        },
        {
            label:
                "Terms & Conditions",

            labelKey:
                "terms",

            href:
                "/terms",
        },
    ],
} as const;