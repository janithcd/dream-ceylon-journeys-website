import type { LucideIcon } from "lucide-react";

import {
    Binoculars,
    Landmark,
    Mountain,
    Palmtree,
    TrainFront,
    Waves,
} from "lucide-react";

export type SignatureExperience = {
    slug: string;
    title: string;
    eyebrow: string;
    description: string;
    image: string;
    imageAlt: string;
    destinations: string;
    season: string;
    icon: LucideIcon;
};

export const signatureExperiences: SignatureExperience[] =
    [
        {
            slug: "wildlife-safaris",
            title: "Wildlife Safaris",
            eyebrow: "Nature & Wildlife",
            description:
                "Search for Sri Lankan leopards, elephants, crocodiles, deer, monkeys, and tropical birdlife on private jeep safaris.",
            image: "/images/experiences/wildlife-safari.jpg",
            imageAlt:
                "Sri Lankan leopard on a wildlife safari in Yala National Park",
            destinations:
                "Yala, Udawalawe & Minneriya",
            season: "Available year-round",
            icon: Binoculars,
        },
        {
            slug: "scenic-train-journeys",
            title: "Scenic Train Journeys",
            eyebrow: "Hill Country",
            description:
                "Travel through tea estates, mountain villages, waterfalls, and mist-covered valleys on Sri Lanka’s famous railway routes.",
            image: "/images/experiences/scenic-train.jpg",
            imageAlt:
                "Scenic Sri Lankan train travelling through the green hill country",
            destinations:
                "Kandy, Nanu Oya & Ella",
            season: "Best from January to September",
            icon: TrainFront,
        },
        {
            slug: "ancient-heritage",
            title: "Ancient Heritage",
            eyebrow: "History & Culture",
            description:
                "Explore ancient capitals, royal palaces, sacred temples, cave shrines, monumental stupas, and centuries of Sri Lankan history.",
            image: "/images/experiences/ancient-heritage.jpg",
            imageAlt:
                "Ancient Sri Lankan temple and cultural heritage site",
            destinations:
                "Sigiriya, Anuradhapura & Polonnaruwa",
            season: "Available year-round",
            icon: Landmark,
        },
        {
            slug: "whale-watching",
            title: "Whale Watching",
            eyebrow: "Ocean Experience",
            description:
                "Join a responsible ocean excursion in search of blue whales, dolphins, and other marine life along Sri Lanka’s coastline.",
            image: "/images/experiences/whale-watching.jpg",
            imageAlt:
                "Whale watching excursion off the coast of Mirissa Sri Lanka",
            destinations:
                "Mirissa & Trincomalee",
            season: "Season depends on coast",
            icon: Waves,
        },
        {
            slug: "tropical-beaches",
            title: "Tropical Beaches",
            eyebrow: "Coastal Escape",
            description:
                "Unwind beside warm Indian Ocean waters with swimming, surfing, seafood, sunsets, and relaxed beachfront stays.",
            image: "/images/experiences/tropical-beaches.jpg",
            imageAlt:
                "Palm-fringed tropical beach on the southern coast of Sri Lanka",
            destinations:
                "Mirissa, Bentota & Trincomalee",
            season: "South coast: December to April",
            icon: Palmtree,
        },
        {
            slug: "tea-country-hiking",
            title: "Tea Country & Hiking",
            eyebrow: "Mountains & Nature",
            description:
                "Walk through tea plantations, climb scenic peaks, visit waterfalls, and experience the cool landscapes of Sri Lanka’s central highlands.",
            image: "/images/experiences/tea-country-hiking.jpg",
            imageAlt:
                "Green tea plantations and mountain hiking landscape in Sri Lanka",
            destinations:
                "Nuwara Eliya, Ella & Haputale",
            season: "Best from January to September",
            icon: Mountain,
        },
    ];