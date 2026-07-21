import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
    CalendarDays,
    Check,
    Clock3,
    Compass,
    MapPin,
    Route,
    ShieldCheck,
    Sparkles,
    Users,
} from "lucide-react";

import {
    signatureExperiences,
    type SignatureExperience,
} from "@/data/signature-experiences";

const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000"
).replace(/\/+$/, "");

export const metadata: Metadata = {
    title:
        "Sri Lanka Experiences | Wildlife, Culture, Trains & Beaches",

    description:
        "Explore Sri Lanka experiences including wildlife safaris, ancient heritage, scenic train journeys, whale watching, tropical beaches, tea country and hiking.",

    alternates: {
        canonical:
            `${siteUrl}/experiences`,
    },

    openGraph: {
        title:
            "Sri Lanka Experiences | Dream Ceylon Journeys",

        description:
            "Build a private Sri Lanka journey around wildlife, culture, scenic railways, ocean encounters, beaches and hill-country adventures.",

        url:
            `${siteUrl}/experiences`,

        siteName:
            "Dream Ceylon Journeys",

        type:
            "website",

        images: [
            {
                url:
                    `${siteUrl}/images/experiences/wildlife-safari.jpg`,

                alt:
                    "Wildlife safari experience in Sri Lanka",
            },
        ],
    },

    twitter: {
        card:
            "summary_large_image",

        title:
            "Sri Lanka Experiences | Dream Ceylon Journeys",

        description:
            "Discover private wildlife, culture, train, beach and hill-country experiences across Sri Lanka.",

        images: [
            `${siteUrl}/images/experiences/wildlife-safari.jpg`,
        ],
    },
};

type DestinationLink = {
    label: string;
    href: string;
};

type ExperienceDetails = {
    introduction: string;
    highlights: string[];
    bestFor: string;
    typicalDuration: string;
    planningNote: string;
    destinationLinks: DestinationLink[];
    primaryLink: {
        label: string;
        href: string;
    };
};

const experienceDetails: Record<
    string,
    ExperienceDetails
> = {
    "wildlife-safaris": {
        introduction:
            "Sri Lanka’s national parks offer memorable private jeep safaris through forests, grasslands, wetlands and dry-zone wilderness. Your route can be planned around the wildlife you hope to see, the season and the rest of your holiday.",

        highlights: [
            "Private jeep safari arrangements",
            "Opportunities to observe elephants, leopards and birdlife",
            "Morning or afternoon safari options",
            "Routes connected with cultural and beach destinations",
        ],

        bestFor:
            "Wildlife lovers, families, photographers and first-time visitors",

        typicalDuration:
            "Half-day or full-day safari",

        planningNote:
            "Wildlife sightings depend on natural conditions and can never be guaranteed. Park choice and safari time should be confirmed according to the season and your route.",

        destinationLinks: [
            {
                label:
                    "Explore Yala",
                href:
                    "/sri-lanka-destinations/yala",
            },
        ],

        primaryLink: {
            label:
                "View wildlife day tours",
            href:
                "/day-tours",
        },
    },

    "scenic-train-journeys": {
        introduction:
            "Sri Lanka’s hill-country railway passes through tea plantations, mountain villages, forests, valleys and waterfalls. A private chauffeur-guide can handle your luggage and meet you after the selected train section.",

        highlights: [
            "Kandy, Nanu Oya and Ella railway sections",
            "Tea-country views and mountain scenery",
            "Driver coordination before and after the train",
            "Flexible alternatives when seats are unavailable",
        ],

        bestFor:
            "Couples, photographers, families and scenic-travel enthusiasts",

        typicalDuration:
            "Around 2–7 hours depending on the selected section",

        planningNote:
            "Train seats and schedules are subject to availability and operational changes. The journey should be planned early, with a practical road alternative kept available.",

        destinationLinks: [
            {
                label:
                    "Explore Kandy",
                href:
                    "/sri-lanka-destinations/kandy",
            },
            {
                label:
                    "Explore Ella",
                href:
                    "/sri-lanka-destinations/ella",
            },
        ],

        primaryLink: {
            label:
                "Find a hill-country tour",
            href:
                "/sri-lanka-tours",
        },
    },

    "ancient-heritage": {
        introduction:
            "Discover ancient capitals, royal citadels, cave temples, sacred shrines and living traditions across Sri Lanka’s Cultural Triangle and central highlands. Visits can be paced around your interests and comfort.",

        highlights: [
            "Sigiriya Rock Fortress and ancient gardens",
            "Dambulla cave-temple heritage",
            "Sacred cities and monumental stupas",
            "Kandy’s royal and religious traditions",
        ],

        bestFor:
            "History lovers, cultural travellers, families and photographers",

        typicalDuration:
            "Single visits, day tours or multi-day cultural routes",

        planningNote:
            "Temple visits require respectful clothing, while some heritage sites involve stairs, heat and extended walking. The order of visits can be adjusted for comfort.",

        destinationLinks: [
            {
                label:
                    "Explore Sigiriya",
                href:
                    "/sri-lanka-destinations/sigiriya",
            },
            {
                label:
                    "Explore Kandy",
                href:
                    "/sri-lanka-destinations/kandy",
            },
        ],

        primaryLink: {
            label:
                "View cultural tours",
            href:
                "/sri-lanka-tours",
        },
    },

    "whale-watching": {
        introduction:
            "Sri Lanka’s coastline offers seasonal opportunities to search for whales, dolphins and other marine life. Excursions can be combined with a relaxed south-coast stay or included in a longer private journey.",

        highlights: [
            "Seasonal whale and dolphin excursions",
            "Coastal departures based on the travel month",
            "Easy combination with beach stays",
            "Private road transport to the departure point",
        ],

        bestFor:
            "Marine-life enthusiasts, couples, families and photographers",

        typicalDuration:
            "Usually an early-morning half-day excursion",

        planningNote:
            "Sea conditions, departure schedules and sightings vary. The suitable coast depends on the season, and excursions may be changed or cancelled for safety.",

        destinationLinks: [
            {
                label:
                    "Explore Mirissa",
                href:
                    "/sri-lanka-destinations/mirissa",
            },
        ],

        primaryLink: {
            label:
                "Request a coastal day tour",
            href:
                "/day-tours",
        },
    },

    "tropical-beaches": {
        introduction:
            "Relax on palm-fringed shores, swim in warm water, enjoy seafood, watch tropical sunsets or add surfing and water activities. We match the coast to your travel month and preferred atmosphere.",

        highlights: [
            "Relaxed south-coast and east-coast stays",
            "Swimming, surfing and optional water activities",
            "Sunsets, seafood and coastal viewpoints",
            "Easy connections with Galle and wildlife regions",
        ],

        bestFor:
            "Couples, honeymooners, families and travellers seeking relaxation",

        typicalDuration:
            "One day to several nights",

        planningNote:
            "Beach and sea conditions differ by coast and month. The final beach should be selected according to season, swimming conditions and onward travel plans.",

        destinationLinks: [
            {
                label:
                    "Explore Mirissa",
                href:
                    "/sri-lanka-destinations/mirissa",
            },
            {
                label:
                    "Explore Galle",
                href:
                    "/sri-lanka-destinations/galle",
            },
        ],

        primaryLink: {
            label:
                "Build a beach holiday",
            href:
                "/plan-your-tour",
        },
    },

    "tea-country-hiking": {
        introduction:
            "Sri Lanka’s central highlands combine tea estates, cool mountain air, waterfalls, viewpoints and walking trails. Experiences range from gentle plantation visits to rewarding scenic hikes.",

        highlights: [
            "Tea plantations and factory visits",
            "Ella viewpoints and walking trails",
            "Waterfalls and mountain landscapes",
            "Flexible walks matched to your fitness level",
        ],

        bestFor:
            "Nature lovers, active couples, photographers and relaxed hikers",

        typicalDuration:
            "A few hours to several hill-country days",

        planningNote:
            "Weather changes quickly in the highlands. Walking times and trail choices should be adjusted for fitness, rain, visibility and daylight.",

        destinationLinks: [
            {
                label:
                    "Explore Ella",
                href:
                    "/sri-lanka-destinations/ella",
            },
            {
                label:
                    "Explore Kandy",
                href:
                    "/sri-lanka-destinations/kandy",
            },
        ],

        primaryLink: {
            label:
                "View hill-country tours",
            href:
                "/sri-lanka-tours",
        },
    },
};

function getExperienceDetails(
    experience: SignatureExperience
): ExperienceDetails {
    return (
        experienceDetails[
            experience.slug
            ] || {
            introduction:
            experience.description,

            highlights: [
                experience.description,
            ],

            bestFor:
                "Private travellers",

            typicalDuration:
                "Flexible",

            planningNote:
                "Final arrangements are confirmed according to your route, dates and preferences.",

            destinationLinks:
                [],

            primaryLink: {
                label:
                    "Plan this experience",
                href:
                    "/plan-your-tour",
            },
        }
    );
}

function ExperienceHeroCollage() {
    const collageExperiences =
        signatureExperiences.slice(
            0,
            3
        );

    return (
        <div
            className="
                grid h-[440px]
                grid-cols-2 gap-3
                overflow-hidden
                rounded-[2.25rem]
                border border-white/15
                bg-white/10 p-3
                shadow-[0_35px_100px_rgba(0,0,0,0.28)]
                backdrop-blur
            "
        >
            {collageExperiences.map(
                (
                    experience,
                    index
                ) => (
                    <div
                        key={
                            experience.slug
                        }
                        className={`
                            relative
                            overflow-hidden
                            rounded-[1.5rem]
                            ${
                            index === 0
                                ? "row-span-2"
                                : ""
                        }
                        `}
                    >
                        <Image
                            src={
                                experience.image
                            }
                            alt={
                                experience.imageAlt
                            }
                            fill
                            priority
                            sizes="
                                (max-width: 1023px) 50vw,
                                25vw
                            "
                            className="
                                object-cover
                            "
                        />

                        <div
                            className="
                                absolute inset-0
                                bg-gradient-to-t
                                from-black/65
                                via-black/5
                                to-transparent
                            "
                        />

                        <span
                            className="
                                absolute
                                bottom-4 left-4
                                right-4
                                text-sm
                                font-bold
                                text-white
                            "
                        >
                            {
                                experience.title
                            }
                        </span>
                    </div>
                )
            )}
        </div>
    );
}

export default function ExperiencesPage() {
    const collectionJsonLd = {
        "@context":
            "https://schema.org",

        "@type":
            "CollectionPage",

        name:
            "Sri Lanka Experiences",

        description:
            "Private Sri Lanka wildlife, cultural, railway, ocean, beach and hill-country experiences.",

        url:
            `${siteUrl}/experiences`,

        mainEntity: {
            "@type":
                "ItemList",

            numberOfItems:
            signatureExperiences.length,

            itemListElement:
                signatureExperiences.map(
                    (
                        experience,
                        index
                    ) => ({
                        "@type":
                            "ListItem",

                        position:
                            index + 1,

                        name:
                        experience.title,

                        description:
                        experience.description,

                        url:
                            `${siteUrl}/experiences#${experience.slug}`,

                        image:
                            `${siteUrl}${experience.image}`,
                    })
                ),
        },
    };

    return (
        <main className="bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html:
                        JSON.stringify(
                            collectionJsonLd
                        ).replace(
                            /</g,
                            "\\u003c"
                        ),
                }}
            />

            <section
                className="
                    relative isolate
                    overflow-hidden
                    bg-[#043F3B]
                    px-6 pb-24 pt-32
                    text-white
                    sm:pb-28 sm:pt-40
                "
            >
                <div
                    aria-hidden="true"
                    className="
                        absolute inset-0
                        -z-30
                        bg-gradient-to-br
                        from-[#043F3B]
                        via-[#075B56]
                        to-[#008D86]
                    "
                />

                <div
                    aria-hidden="true"
                    className="
                        absolute inset-0
                        -z-20
                        bg-[radial-gradient(circle_at_top_right,rgba(254,197,46,0.22),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(198,45,82,0.28),transparent_38%)]
                    "
                />

                <div
                    className="
                        mx-auto grid
                        max-w-7xl gap-14
                        lg:grid-cols-[1.05fr_0.95fr]
                        lg:items-center
                    "
                >
                    <div>
                        <div
                            className="
                                inline-flex
                                items-center gap-2
                                rounded-full
                                border border-white/20
                                bg-white/10
                                px-4 py-2
                                text-sm font-semibold
                                backdrop-blur
                            "
                        >
                            <Sparkles
                                className="
                                    h-4 w-4
                                    text-[#FEC52E]
                                "
                                aria-hidden="true"
                            />

                            Signature Sri Lanka experiences
                        </div>

                        <h1
                            className="
                                mt-7
                                max-w-4xl
                                font-display
                                text-4xl font-semibold
                                leading-tight
                                sm:text-5xl
                                lg:text-6xl
                            "
                        >
                            Experience Sri Lanka beyond
                            the ordinary
                        </h1>

                        <p
                            className="
                                mt-6
                                max-w-3xl
                                text-lg leading-8
                                text-white/82
                            "
                        >
                            Build a private journey around
                            wildlife, ancient culture,
                            scenic railways, marine life,
                            tropical beaches and the cool
                            tea-covered highlands.
                        </p>

                        <div
                            className="
                                mt-9 flex
                                flex-col gap-4
                                sm:flex-row
                                sm:flex-wrap
                            "
                        >
                            <Link
                                href="#explore-experiences"
                                className="
                                    inline-flex
                                    min-h-14
                                    items-center
                                    justify-center gap-2
                                    rounded-full
                                    bg-[#FEC52E]
                                    px-8
                                    font-bold
                                    text-[#173F3B]
                                    shadow-lg
                                    transition
                                    hover:-translate-y-0.5
                                    hover:bg-white
                                "
                            >
                                Explore Experiences

                                <ArrowRight
                                    className="
                                        h-4 w-4
                                    "
                                    aria-hidden="true"
                                />
                            </Link>

                            <Link
                                href="/plan-your-tour"
                                className="
                                    inline-flex
                                    min-h-14
                                    items-center
                                    justify-center gap-2
                                    rounded-full
                                    border border-white/35
                                    bg-white/10
                                    px-8
                                    font-semibold
                                    text-white
                                    backdrop-blur
                                    transition
                                    hover:bg-white
                                    hover:text-[#043F3B]
                                "
                            >
                                Build My Journey

                                <Route
                                    className="
                                        h-4 w-4
                                    "
                                    aria-hidden="true"
                                />
                            </Link>
                        </div>
                    </div>

                    <ExperienceHeroCollage />
                </div>
            </section>

            <section
                className="
                    border-b
                    border-slate-200
                    bg-[#F7FAF9]
                    px-6 py-8
                "
            >
                <div
                    className="
                        mx-auto grid
                        max-w-7xl gap-5
                        sm:grid-cols-2
                        lg:grid-cols-4
                    "
                >
                    {[
                        {
                            icon:
                            Compass,

                            title:
                                "Locally planned",

                            text:
                                "Practical advice from Sri Lankan travel experts",
                        },
                        {
                            icon:
                            Route,

                            title:
                                "Flexible routes",

                            text:
                                "Combine experiences across one private itinerary",
                        },
                        {
                            icon:
                            Users,

                            title:
                                "Private travel",

                            text:
                                "Experiences arranged around your own group",
                        },
                        {
                            icon:
                            ShieldCheck,

                            title:
                                "Human confirmed",

                            text:
                                "Final timings and availability checked before travel",
                        },
                    ].map(
                        ({
                             icon: Icon,
                             title,
                             text,
                         }) => (
                            <div
                                key={title}
                                className="
                                    flex
                                    items-center
                                    gap-4
                                "
                            >
                                <div
                                    className="
                                        flex h-12 w-12
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-[#008D86]/10
                                        text-[#008D86]
                                    "
                                >
                                    <Icon
                                        className="
                                            h-5 w-5
                                        "
                                        aria-hidden="true"
                                    />
                                </div>

                                <div>
                                    <p
                                        className="
                                            font-bold
                                            text-slate-900
                                        "
                                    >
                                        {title}
                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            text-sm
                                            text-slate-600
                                        "
                                    >
                                        {text}
                                    </p>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </section>

            <section
                id="explore-experiences"
                className="
                    scroll-mt-24
                    px-6 py-20
                    sm:py-24
                "
            >
                <div
                    className="
                        mx-auto
                        max-w-7xl
                    "
                >
                    <div
                        className="
                            mx-auto
                            max-w-4xl
                            text-center
                        "
                    >
                        <p
                            className="
                                text-sm font-bold
                                uppercase
                                tracking-[0.2em]
                                text-[#C62D52]
                            "
                        >
                            Choose what inspires you
                        </p>

                        <h2
                            className="
                                mt-4
                                font-display
                                text-3xl font-semibold
                                text-slate-900
                                sm:text-5xl
                            "
                        >
                            Six signature ways to
                            experience Sri Lanka
                        </h2>

                        <p
                            className="
                                mx-auto mt-5
                                max-w-3xl
                                text-lg leading-8
                                text-slate-600
                            "
                        >
                            Select one experience for a
                            private day trip or combine
                            several into a tailor-made
                            island journey.
                        </p>
                    </div>

                    <div
                        className="
                            mt-10 flex
                            flex-wrap
                            justify-center
                            gap-3
                        "
                    >
                        {signatureExperiences.map(
                            (experience) => {
                                const Icon =
                                    experience.icon;

                                return (
                                    <Link
                                        key={
                                            experience.slug
                                        }
                                        href={
                                            `#${experience.slug}`
                                        }
                                        className="
                                            inline-flex
                                            items-center
                                            gap-2
                                            rounded-full
                                            border
                                            border-slate-200
                                            bg-white
                                            px-4 py-2.5
                                            text-sm
                                            font-bold
                                            text-slate-700
                                            shadow-sm
                                            transition
                                            hover:border-[#008D86]
                                            hover:bg-[#008D86]
                                            hover:text-white
                                        "
                                    >
                                        <Icon
                                            className="
                                                h-4 w-4
                                            "
                                            aria-hidden="true"
                                        />

                                        {
                                            experience.title
                                        }
                                    </Link>
                                );
                            }
                        )}
                    </div>
                </div>
            </section>

            <section
                className="
                    px-6 pb-24
                    sm:pb-28
                "
            >
                <div
                    className="
                        mx-auto
                        max-w-7xl
                        space-y-16
                    "
                >
                    {signatureExperiences.map(
                        (
                            experience,
                            index
                        ) => {
                            const details =
                                getExperienceDetails(
                                    experience
                                );

                            const Icon =
                                experience.icon;

                            const imageFirst =
                                index % 2 === 0;

                            return (
                                <article
                                    id={
                                        experience.slug
                                    }
                                    key={
                                        experience.slug
                                    }
                                    className="
                                        scroll-mt-28
                                        overflow-hidden
                                        rounded-[2.25rem]
                                        border
                                        border-slate-200
                                        bg-white
                                        shadow-[0_20px_70px_rgba(24,40,38,0.08)]
                                    "
                                >
                                    <div
                                        className="
                                            grid
                                            lg:grid-cols-2
                                        "
                                    >
                                        <div
                                            className={`
                                                relative
                                                min-h-[360px]
                                                lg:min-h-[620px]
                                                ${
                                                imageFirst
                                                    ? "lg:order-1"
                                                    : "lg:order-2"
                                            }
                                            `}
                                        >
                                            <Image
                                                src={
                                                    experience.image
                                                }
                                                alt={
                                                    experience.imageAlt
                                                }
                                                fill
                                                sizes="
                                                    (max-width: 1023px) 100vw,
                                                    50vw
                                                "
                                                className="
                                                    object-cover
                                                "
                                            />

                                            <div
                                                className="
                                                    absolute inset-0
                                                    bg-gradient-to-t
                                                    from-black/75
                                                    via-transparent
                                                    to-black/5
                                                "
                                            />

                                            <div
                                                className="
                                                    absolute
                                                    bottom-0 left-0
                                                    right-0
                                                    p-7
                                                    text-white
                                                    sm:p-9
                                                "
                                            >
                                                <div
                                                    className="
                                                        inline-flex
                                                        items-center
                                                        gap-2
                                                        rounded-full
                                                        border
                                                        border-white/25
                                                        bg-black/20
                                                        px-4 py-2
                                                        text-xs
                                                        font-bold
                                                        uppercase
                                                        tracking-[0.16em]
                                                        backdrop-blur
                                                    "
                                                >
                                                    <Icon
                                                        className="
                                                            h-4 w-4
                                                            text-[#FEC52E]
                                                        "
                                                        aria-hidden="true"
                                                    />

                                                    {
                                                        experience.eyebrow
                                                    }
                                                </div>

                                                <h2
                                                    className="
                                                        mt-5
                                                        font-display
                                                        text-4xl
                                                        font-semibold
                                                        sm:text-5xl
                                                    "
                                                >
                                                    {
                                                        experience.title
                                                    }
                                                </h2>
                                            </div>
                                        </div>

                                        <div
                                            className={`
                                                flex flex-col
                                                justify-center
                                                p-7
                                                sm:p-10
                                                lg:p-12
                                                ${
                                                imageFirst
                                                    ? "lg:order-2"
                                                    : "lg:order-1"
                                            }
                                            `}
                                        >
                                            <p
                                                className="
                                                    text-lg
                                                    leading-8
                                                    text-slate-600
                                                "
                                            >
                                                {
                                                    details.introduction
                                                }
                                            </p>

                                            <div
                                                className="
                                                    mt-8
                                                    grid gap-4
                                                    sm:grid-cols-2
                                                "
                                            >
                                                <div
                                                    className="
                                                        rounded-2xl
                                                        bg-[#F7FAF9]
                                                        p-5
                                                    "
                                                >
                                                    <Users
                                                        className="
                                                            h-5 w-5
                                                            text-[#008D86]
                                                        "
                                                        aria-hidden="true"
                                                    />

                                                    <p
                                                        className="
                                                            mt-3
                                                            text-xs
                                                            font-bold
                                                            uppercase
                                                            tracking-wider
                                                            text-slate-500
                                                        "
                                                    >
                                                        Best for
                                                    </p>

                                                    <p
                                                        className="
                                                            mt-2
                                                            font-semibold
                                                            leading-6
                                                            text-slate-900
                                                        "
                                                    >
                                                        {
                                                            details.bestFor
                                                        }
                                                    </p>
                                                </div>

                                                <div
                                                    className="
                                                        rounded-2xl
                                                        bg-[#F7FAF9]
                                                        p-5
                                                    "
                                                >
                                                    <Clock3
                                                        className="
                                                            h-5 w-5
                                                            text-[#008D86]
                                                        "
                                                        aria-hidden="true"
                                                    />

                                                    <p
                                                        className="
                                                            mt-3
                                                            text-xs
                                                            font-bold
                                                            uppercase
                                                            tracking-wider
                                                            text-slate-500
                                                        "
                                                    >
                                                        Typical duration
                                                    </p>

                                                    <p
                                                        className="
                                                            mt-2
                                                            font-semibold
                                                            leading-6
                                                            text-slate-900
                                                        "
                                                    >
                                                        {
                                                            details.typicalDuration
                                                        }
                                                    </p>
                                                </div>
                                            </div>

                                            <div
                                                className="
                                                    mt-8
                                                "
                                            >
                                                <h3
                                                    className="
                                                        text-xl
                                                        font-bold
                                                        text-slate-900
                                                    "
                                                >
                                                    Experience highlights
                                                </h3>

                                                <div
                                                    className="
                                                        mt-5
                                                        space-y-3
                                                    "
                                                >
                                                    {details.highlights.map(
                                                        (
                                                            highlight
                                                        ) => (
                                                            <div
                                                                key={
                                                                    highlight
                                                                }
                                                                className="
                                                                    flex
                                                                    items-start
                                                                    gap-3
                                                                    text-sm
                                                                    leading-6
                                                                    text-slate-700
                                                                "
                                                            >
                                                                <Check
                                                                    className="
                                                                        mt-0.5
                                                                        h-5 w-5
                                                                        shrink-0
                                                                        text-[#008D86]
                                                                    "
                                                                    aria-hidden="true"
                                                                />

                                                                <span>
                                                                    {
                                                                        highlight
                                                                    }
                                                                </span>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                            <div
                                                className="
                                                    mt-8
                                                    rounded-2xl
                                                    border
                                                    border-[#FEC52E]/30
                                                    bg-[#FEC52E]/10
                                                    p-5
                                                "
                                            >
                                                <div
                                                    className="
                                                        flex
                                                        items-start
                                                        gap-3
                                                    "
                                                >
                                                    <CalendarDays
                                                        className="
                                                            mt-0.5
                                                            h-5 w-5
                                                            shrink-0
                                                            text-[#C62D52]
                                                        "
                                                        aria-hidden="true"
                                                    />

                                                    <div>
                                                        <p
                                                            className="
                                                                font-bold
                                                                text-slate-900
                                                            "
                                                        >
                                                            Planning note
                                                        </p>

                                                        <p
                                                            className="
                                                                mt-2
                                                                text-sm
                                                                leading-6
                                                                text-slate-700
                                                            "
                                                        >
                                                            {
                                                                details.planningNote
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                className="
                                                    mt-8 flex
                                                    flex-col gap-4
                                                    border-t
                                                    border-slate-200
                                                    pt-7
                                                "
                                            >
                                                {details.destinationLinks.length >
                                                    0 && (
                                                        <div>
                                                            <p
                                                                className="
                                                                text-xs
                                                                font-bold
                                                                uppercase
                                                                tracking-wider
                                                                text-slate-500
                                                            "
                                                            >
                                                                Related destinations
                                                            </p>

                                                            <div
                                                                className="
                                                                mt-3
                                                                flex
                                                                flex-wrap
                                                                gap-2
                                                            "
                                                            >
                                                                {details.destinationLinks.map(
                                                                    (
                                                                        destination
                                                                    ) => (
                                                                        <Link
                                                                            key={
                                                                                destination.href
                                                                            }
                                                                            href={
                                                                                destination.href
                                                                            }
                                                                            className="
                                                                            inline-flex
                                                                            items-center
                                                                            gap-2
                                                                            rounded-full
                                                                            bg-[#008D86]/10
                                                                            px-4 py-2
                                                                            text-sm
                                                                            font-bold
                                                                            text-[#006D68]
                                                                            transition
                                                                            hover:bg-[#008D86]
                                                                            hover:text-white
                                                                        "
                                                                        >
                                                                            <MapPin
                                                                                className="
                                                                                h-4 w-4
                                                                            "
                                                                                aria-hidden="true"
                                                                            />

                                                                            {
                                                                                destination.label
                                                                            }
                                                                        </Link>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}

                                                <div
                                                    className="
                                                        flex
                                                        flex-col gap-3
                                                        sm:flex-row
                                                        sm:flex-wrap
                                                    "
                                                >
                                                    <Link
                                                        href={
                                                            details.primaryLink.href
                                                        }
                                                        className="
                                                            inline-flex
                                                            min-h-12
                                                            items-center
                                                            justify-center
                                                            gap-2
                                                            rounded-full
                                                            bg-[#C62D52]
                                                            px-6
                                                            text-sm
                                                            font-bold
                                                            text-white
                                                            transition
                                                            hover:-translate-y-0.5
                                                            hover:bg-[#A92343]
                                                        "
                                                    >
                                                        {
                                                            details.primaryLink.label
                                                        }

                                                        <ArrowRight
                                                            className="
                                                                h-4 w-4
                                                            "
                                                            aria-hidden="true"
                                                        />
                                                    </Link>

                                                    <Link
                                                        href="/plan-your-tour"
                                                        className="
                                                            inline-flex
                                                            min-h-12
                                                            items-center
                                                            justify-center
                                                            gap-2
                                                            rounded-full
                                                            border
                                                            border-slate-300
                                                            bg-white
                                                            px-6
                                                            text-sm
                                                            font-bold
                                                            text-slate-800
                                                            transition
                                                            hover:border-[#008D86]
                                                            hover:text-[#008D86]
                                                        "
                                                    >
                                                        Add to My Journey
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        }
                    )}
                </div>
            </section>

            <section
                className="
                    bg-[#F7FAF9]
                    px-6 py-20
                "
            >
                <div
                    className="
                        mx-auto grid
                        max-w-7xl gap-10
                        overflow-hidden
                        rounded-[2.25rem]
                        bg-[#043F3B]
                        p-8
                        text-white
                        shadow-lg
                        lg:grid-cols-[1fr_auto]
                        lg:items-center
                        lg:p-12
                    "
                >
                    <div>
                        <p
                            className="
                                text-sm font-bold
                                uppercase
                                tracking-[0.2em]
                                text-[#FEC52E]
                            "
                        >
                            Tailor-made experiences
                        </p>

                        <h2
                            className="
                                mt-4
                                font-display
                                text-3xl
                                font-semibold
                                sm:text-4xl
                            "
                        >
                            Combine the experiences that
                            inspire you
                        </h2>

                        <p
                            className="
                                mt-4
                                max-w-3xl
                                leading-7
                                text-white/80
                            "
                        >
                            Share your dates, interests,
                            preferred destinations and
                            travel pace. Our local team
                            will connect your favourite
                            experiences into a practical
                            private route.
                        </p>
                    </div>

                    <div
                        className="
                            flex flex-col
                            gap-3
                            sm:flex-row
                            lg:flex-col
                            xl:flex-row
                        "
                    >
                        <Link
                            href="/sri-lanka-tours"
                            className="
                                inline-flex
                                min-h-13
                                items-center
                                justify-center
                                gap-2
                                rounded-full
                                border
                                border-white/30
                                bg-white/10
                                px-7
                                font-bold
                                text-white
                                transition
                                hover:bg-white
                                hover:text-[#043F3B]
                            "
                        >
                            View Tour Packages
                        </Link>

                        <Link
                            href="/plan-your-tour"
                            className="
                                inline-flex
                                min-h-13
                                items-center
                                justify-center
                                gap-2
                                rounded-full
                                bg-[#FEC52E]
                                px-7
                                font-bold
                                text-[#173F3B]
                                transition
                                hover:-translate-y-0.5
                                hover:bg-white
                            "
                        >
                            Plan My Journey

                            <ArrowRight
                                className="
                                    h-4 w-4
                                "
                                aria-hidden="true"
                            />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
