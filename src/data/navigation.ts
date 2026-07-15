export type NavigationItem = {
    label: string;
    href: string;
};

export const mainNavigation: NavigationItem[] = [
    { label: "Home", href: "/" },
    { label: "Destinations", href: "/destinations" },
    { label: "Tours", href: "/tours" },
    { label: "Experiences", href: "/experiences" },
    { label: "Vehicles", href: "/vehicles" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export const footerNavigation = {
    explore: [
        { label: "Sri Lanka Destinations", href: "/destinations" },
        { label: "Private Tour Packages", href: "/tours" },
        { label: "Travel Experiences", href: "/experiences" },
        { label: "Our Vehicles", href: "/vehicles" },
    ],
    company: [
        { label: "About Dream Ceylon", href: "/about" },
        { label: "Why Travel With Us", href: "/about#why-us" },
        { label: "Contact Us", href: "/contact" },
        { label: "Plan Your Journey", href: "/plan-your-tour" },
    ],
    legal: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms & Conditions", href: "/terms" },
    ],
} as const;
