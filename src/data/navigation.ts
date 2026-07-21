export type NavigationLink = {
    label: string;
    href: string;
    description?: string;
};

export type NavigationItem = NavigationLink & {
    children?: NavigationLink[];
};

export const mainNavigation: NavigationItem[] = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "Tours",
        href: "/sri-lanka-tours",
        children: [
            {
                label: "All Sri Lanka Tours",
                href: "/sri-lanka-tours",
                description:
                    "Browse private multi-day Sri Lanka tours and sample itineraries.",
            },
            {
                label: "Day Tours",
                href: "/day-tours",
                description:
                    "Explore private full-day experiences with a chauffeur-guide.",
            },
            {
                label: "Tailor-Made Tour",
                href: "/plan-your-tour",
                description:
                    "Create a private journey around your dates and interests.",
            },
            {
                label: "Tour Gallery",
                href: "/gallery",
                description:
                    "View authentic moments from journeys around Sri Lanka.",
            },
        ],
    },
    {
        label: "Destinations",
        href: "/sri-lanka-destinations",
        children: [
            {
                label: "All Destinations",
                href: "/sri-lanka-destinations",
                description:
                    "Explore cultural cities, hill country, wildlife and beaches.",
            },
            {
                label: "Destination Gallery",
                href: "/gallery",
                description:
                    "See real photographs from journeys around Sri Lanka.",
            },
            {
                label: "Plan Around Destinations",
                href: "/plan-your-tour",
                description:
                    "Tell us which places you would like to include.",
            },
        ],
    },
    {
        label: "Experiences",
        href: "/gallery",
        children: [
            {
                label: "Tour Gallery",
                href: "/gallery",
                description:
                    "Discover wildlife, culture, landscapes and guest moments.",
            },
            {
                label: "Explore Destinations",
                href: "/sri-lanka-destinations",
                description:
                    "Find the best places for culture, nature and relaxation.",
            },
            {
                label: "Multi-Day Tours",
                href: "/sri-lanka-tours",
                description:
                    "Choose a private itinerary containing your preferred experiences.",
            },
            {
                label: "Day Tours",
                href: "/day-tours",
                description:
                    "Find a private one-day experience from your preferred location.",
            },
        ],
    },
    {
        label: "Vehicles",
        href: "/vehicles",
        children: [
            {
                label: "All Vehicles",
                href: "/vehicles",
                description:
                    "Browse private cars, SUVs and vans for Sri Lanka tours.",
            },
            {
                label: "Request a Vehicle",
                href: "/plan-your-tour",
                description:
                    "Let us recommend a vehicle for your group and luggage.",
            },
            {
                label: "Travel Gallery",
                href: "/gallery",
                description:
                    "See real travel moments from around the island.",
            },
        ],
    },
    {
        label: "About",
        href: "/about",
    },
    {
        label: "Contact",
        href: "/contact",
    },
];

export const footerNavigation = {
    explore: [
        {
            label: "Sri Lanka Destinations",
            href: "/sri-lanka-destinations",
        },
        {
            label: "Private Tour Packages",
            href: "/sri-lanka-tours",
        },
        {
            label: "Sri Lanka Day Tours",
            href: "/day-tours",
        },
        {
            label: "Tour Gallery",
            href: "/gallery",
        },
        {
            label: "Our Vehicles",
            href: "/vehicles",
        },
    ],

    company: [
        {
            label: "About Dream Ceylon",
            href: "/about",
        },
        {
            label: "Why Travel With Us",
            href: "/about#why-us",
        },
        {
            label: "Contact Us",
            href: "/contact",
        },
        {
            label: "Plan Your Journey",
            href: "/plan-your-tour",
        },
    ],

    legal: [
        {
            label: "Privacy Policy",
            href: "/privacy",
        },
        {
            label: "Terms & Conditions",
            href: "/terms",
        },
    ],
} as const;
