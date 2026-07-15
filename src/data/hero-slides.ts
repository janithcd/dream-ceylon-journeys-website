export type HeroSlide = {
    id: string;
    image: string;
    imageAlt: string;
    eyebrow: string;
    title: string;
    accent: string;
    description: string;
    location: string;
    primaryCta: {
        label: string;
        href: string;
    };
};

export const heroSlides: HeroSlide[] = [
    {
        id: "sigiriya",
        image: "/images/hero/sigiriya-sunrise.jpg",
        imageAlt:
            "Sigiriya Lion Rock rising above the green forest at sunrise in Sri Lanka",
        eyebrow: "Tailor-made Sri Lanka tours",
        title: "Ancient wonders.",
        accent: "Unforgettable journeys.",
        description:
            "Explore timeless kingdoms, misty highlands, wild national parks, and tropical shores on a private journey designed around you.",
        location: "Sigiriya Cultural Triangle",
        primaryCta: {
            label: "Design My Journey",
            href: "/plan-your-tour",
        },
    },
    {
        id: "ella",
        image: "/images/hero/ella-train.jpg",
        imageAlt:
            "Blue train travelling through the lush green tea country near Ella, Sri Lanka",
        eyebrow: "Scenic island experiences",
        title: "Slow down.",
        accent: "Follow the rails.",
        description:
            "Travel through emerald tea country, mountain villages, waterfalls, and some of the most beautiful railway landscapes in Asia.",
        location: "Ella Hill Country",
        primaryCta: {
            label: "Explore Our Tours",
            href: "/tours",
        },
    },
    {
        id: "yala",
        image: "/images/hero/yala-wildlife.jpg",
        imageAlt:
            "Sri Lankan leopard resting in the wilderness of Yala National Park",
        eyebrow: "Wildlife and nature",
        title: "Enter the wild.",
        accent: "Feel Sri Lanka.",
        description:
            "Experience unforgettable safaris, tropical forests, elephants, leopards, and extraordinary biodiversity with trusted local experts.",
        location: "Yala National Park",
        primaryCta: {
            label: "Discover Experiences",
            href: "/experiences",
        },
    },
    {
        id: "mirissa",
        image: "/images/hero/mirissa-coast.jpg",
        imageAlt:
            "Golden tropical beach and palm-fringed coastline in Mirissa, Sri Lanka",
        eyebrow: "Private coastal escapes",
        title: "Golden shores.",
        accent: "Endless horizons.",
        description:
            "Unwind beside warm Indian Ocean waters, discover hidden beaches, and add whale watching, surfing, or complete relaxation to your holiday.",
        location: "Mirissa South Coast",
        primaryCta: {
            label: "View Destinations",
            href: "/destinations",
        },
    },
];
