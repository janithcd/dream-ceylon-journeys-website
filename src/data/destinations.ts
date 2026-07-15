export type Destination = {
    slug: string;
    name: string;
    region: string;
    description: string;
    image: string;
    imageAlt: string;
    tag: string;
    layout: "featured" | "standard" | "wide";
};

export const destinations: Destination[] = [
    {
        slug: "sigiriya",
        name: "Sigiriya",
        region: "Cultural Triangle",
        description:
            "Climb the legendary Lion Rock and discover ancient gardens, frescoes, and royal history.",
        image: "/images/destinations/sigiriya.jpg",
        imageAlt:
            "Sigiriya Lion Rock surrounded by tropical forest in Sri Lanka",
        tag: "Ancient Wonder",
        layout: "featured",
    },
    {
        slug: "kandy",
        name: "Kandy",
        region: "Central Province",
        description:
            "Experience sacred traditions, royal heritage, and the peaceful beauty of Sri Lanka’s hill capital.",
        image: "/images/destinations/kandy.jpg",
        imageAlt:
            "Kandy Lake and Temple of the Sacred Tooth Relic in Sri Lanka",
        tag: "Culture",
        layout: "standard",
    },
    {
        slug: "ella",
        name: "Ella",
        region: "Hill Country",
        description:
            "Travel through tea-covered mountains, waterfalls, scenic railways, and peaceful villages.",
        image: "/images/destinations/ella.jpg",
        imageAlt:
            "Scenic green mountains and railway landscapes near Ella Sri Lanka",
        tag: "Scenic Escape",
        layout: "standard",
    },
    {
        slug: "yala",
        name: "Yala",
        region: "Southern Sri Lanka",
        description:
            "Enter Sri Lanka’s wilderness in search of leopards, elephants, crocodiles, and exotic birdlife.",
        image: "/images/destinations/yala.jpg",
        imageAlt:
            "Sri Lankan leopard in Yala National Park",
        tag: "Wildlife",
        layout: "standard",
    },
    {
        slug: "mirissa",
        name: "Mirissa",
        region: "South Coast",
        description:
            "Relax beside golden beaches, enjoy tropical sunsets, and experience unforgettable whale watching.",
        image: "/images/destinations/mirissa.jpg",
        imageAlt:
            "Palm-fringed tropical beach in Mirissa Sri Lanka",
        tag: "Beach & Activities",
        layout: "standard",
    },
    {
        slug: "galle",
        name: "Galle",
        region: "Southern Coast",
        description:
            "Walk through a living colonial fortress filled with heritage architecture, boutique shops, and ocean views.",
        image: "/images/destinations/galle.jpg",
        imageAlt:
            "Historic Galle Fort overlooking the Indian Ocean in Sri Lanka",
        tag: "Coastal Heritage",
        layout: "wide",
    },
];