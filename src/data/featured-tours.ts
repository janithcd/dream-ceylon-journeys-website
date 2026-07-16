export type FeaturedTour = {
    slug: string;
    title: string;
    category: string;
    description: string;
    image: string;
    imageAlt: string;
    duration: string;
    destinationsCount: number;
    route: string[];
    highlights: string[];
    priceLabel: string;
    featured: boolean;
};

export const featuredTours: FeaturedTour[] = [
    {
        slug: "grand-sri-lanka-discovery",
        title: "Grand Sri Lanka Discovery",
        category: "Signature Journey",
        description:
            "A complete private journey combining ancient kingdoms, misty hill country, wildlife safaris, tropical beaches, and Sri Lankan culture.",
        image: "/images/tours/grand-sri-lanka-discovery.jpg",
        imageAlt:
            "Scenic Sri Lanka journey featuring Sigiriya, hill country, wildlife, and beaches",
        duration: "14 Days",
        destinationsCount: 8,
        route: [
            "Negombo",
            "Sigiriya",
            "Kandy",
            "Nuwara Eliya",
            "Ella",
            "Yala",
            "Mirissa",
            "Galle",
        ],
        highlights: [
            "Cultural Heritage",
            "Scenic Train",
            "Wildlife Safari",
            "South Coast",
        ],
        priceLabel: "From USD 1,490",
        featured: true,
    },
    {
        slug: "culture-and-nature-escape",
        title: "Culture & Nature Escape",
        category: "Classic Sri Lanka",
        description:
            "Discover sacred cities, ancient monuments, tea-covered mountains, and unforgettable natural landscapes.",
        image: "/images/tours/culture-nature-escape.jpg",
        imageAlt:
            "Ancient temple and scenic green mountains in Sri Lanka",
        duration: "10 Days",
        destinationsCount: 6,
        route: [
            "Negombo",
            "Sigiriya",
            "Kandy",
            "Nuwara Eliya",
            "Ella",
            "Colombo",
        ],
        highlights: [
            "Ancient Cities",
            "Local Culture",
            "Tea Country",
        ],
        priceLabel: "From USD 1,090",
        featured: false,
    },
    {
        slug: "wildlife-and-coastal-adventure",
        title: "Wildlife & Coastal Adventure",
        category: "Nature Journey",
        description:
            "Combine exciting wildlife encounters with tropical beaches, whale watching, and relaxed coastal experiences.",
        image: "/images/tours/wildlife-coastal-adventure.jpg",
        imageAlt:
            "Sri Lankan wildlife safari and tropical south coast beach",
        duration: "7 Days",
        destinationsCount: 4,
        route: [
            "Yala",
            "Mirissa",
            "Galle",
            "Colombo",
        ],
        highlights: [
            "Leopard Safari",
            "Whale Watching",
            "Beach Escape",
        ],
        priceLabel: "From USD 790",
        featured: false,
    },
];