import type {
    Metadata,
} from "next";

import Link from "next/link";

import {
    notFound,
} from "next/navigation";

import type {
    LucideIcon,
} from "lucide-react";

import {
    ArrowLeft,
    ArrowRight,
    BedDouble,
    BookOpen,
    CalendarDays,
    CarFront,
    CheckCircle2,
    Clock3,
    CloudSun,
    Compass,
    ExternalLink,
    Footprints,
    Info,
    Landmark,
    MapPin,
    MapPinned,
    MessageCircle,
    Mountain,
    Navigation,
    Route,
    ShieldCheck,
    Sparkles,
    ThermometerSun,
} from "lucide-react";

import {
    getDestinationBySlug,
    getDestinations,
} from "@/lib/destinations";

import {
    getDestinationDetail,
    type DestinationDetail,
    type DestinationFactIcon,
} from "@/data/destination-details";

type DestinationPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000"
).replace(/\/+$/, "");

const whatsappNumber = (
    process.env
        .NEXT_PUBLIC_WHATSAPP_NUMBER ||
    "94775124645"
).replace(/\D/g, "");

const FACT_ICONS: Record<
    DestinationFactIcon,
    LucideIcon
> = {
    temperature:
    ThermometerSun,

    stay:
    BedDouble,

    season:
    CalendarDays,

    location:
    MapPin,

    heritage:
    Landmark,

    elevation:
    Mountain,
};

const createWhatsAppUrl = (
    destinationName: string
) => {
    const message =
        `Hello Dream Ceylon Journeys, I would like to plan a private Sri Lanka tour including ${destinationName}. Please help me prepare a suitable route.`;

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message
    )}`;
};

const createDescriptionParagraphs = (
    description: string
) => {
    if (!description) {
        return [];
    }

    return description
        .split(/\r?\n+/)
        .map(
            (paragraph) =>
                paragraph.trim()
        )
        .filter(Boolean);
};

const serializeJsonLd = (
    schema: unknown
) => {
    return JSON.stringify(
        schema
    ).replace(
        /</g,
        "\\u003c"
    );
};

const QuickFactIcon = ({
                           icon,
                       }: {
    icon: DestinationFactIcon;
}) => {
    const Icon =
        FACT_ICONS[icon] ||
        Info;

    return (
        <Icon
            className="h-5 w-5"
            aria-hidden="true"
        />
    );
};

const getFactIconClasses = (
    index: number
) => {
    const themes = [
        "bg-[#008D86]/10 text-[#008D86]",
        "bg-[#FEC52E]/20 text-[#806000]",
        "bg-[#C62D52]/10 text-[#C62D52]",
        "bg-blue-50 text-blue-600",
        "bg-violet-50 text-violet-600",
    ];

    return themes[
    index %
    themes.length
        ];
};

export const revalidate = 300;

export const dynamicParams = true;

export async function generateStaticParams() {
    try {
        const destinations =
            await getDestinations();

        return destinations.map(
            (destination) => ({
                slug:
                destination.slug,
            })
        );
    } catch (error) {
        console.error(
            "[Destination Static Parameters]",
            error
        );

        return [];
    }
}

export async function generateMetadata({
                                           params,
                                       }: DestinationPageProps): Promise<Metadata> {
    const {
        slug,
    } = await params;

    let destination = null;

    try {
        destination =
            await getDestinationBySlug(
                slug
            );
    } catch (error) {
        console.error(
            "[Destination Metadata]",
            error
        );
    }

    if (!destination) {
        return {
            title:
                "Destination Not Found | Dream Ceylon Journeys",

            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const title =
        `${destination.name} Travel Guide & Private Tours | Sri Lanka`;

    const description =
        destination.shortDescription ||
        destination.description ||
        `Plan a private tour to ${destination.name}, Sri Lanka, with destination information, nearby places, route guidance and a local chauffeur-guide.`;

    const destinationUrl =
        `${siteUrl}/sri-lanka-destinations/${destination.slug}`;

    return {
        title,

        description,

        alternates: {
            canonical:
            destinationUrl,
        },

        openGraph: {
            title,

            description,

            url:
            destinationUrl,

            siteName:
                "Dream Ceylon Journeys",

            type:
                "website",

            images:
                destination.imageUrl
                    ? [
                        {
                            url:
                            destination.imageUrl,

                            alt:
                                `${destination.name}, Sri Lanka`,
                        },
                    ]
                    : undefined,
        },

        twitter: {
            card:
                "summary_large_image",

            title,

            description,

            images:
                destination.imageUrl
                    ? [
                        destination.imageUrl,
                    ]
                    : undefined,
        },
    };
}

export default async function DestinationDetailsPage({
                                                         params,
                                                     }: DestinationPageProps) {
    const {
        slug,
    } = await params;

    let destination = null;

    let relatedDestinations: Awaited<
        ReturnType<
            typeof getDestinations
        >
    > = [];

    try {
        const [
            selectedDestination,
            allDestinations,
        ] = await Promise.all([
            getDestinationBySlug(
                slug
            ),

            getDestinations(),
        ]);

        destination =
            selectedDestination;

        relatedDestinations =
            allDestinations
                .filter(
                    (item) =>
                        item.slug !==
                        selectedDestination
                            ?.slug
                )
                .slice(0, 3);
    } catch (error) {
        console.error(
            "[Destination Details]",
            error
        );
    }

    if (!destination) {
        notFound();
    }

    const detail:
        DestinationDetail | null =
        getDestinationDetail(
            destination.slug
        );

    const descriptionParagraphs =
        createDescriptionParagraphs(
            destination.description
        );

    const introductionParagraphs =
        detail?.introduction
            .length
            ? detail.introduction
            : descriptionParagraphs;

    const destinationUrl =
        `${siteUrl}/sri-lanka-destinations/${destination.slug}`;

    const whatsappUrl =
        createWhatsAppUrl(
            destination.name
        );

    const breadcrumbSchema = {
        "@context":
            "https://schema.org",

        "@type":
            "BreadcrumbList",

        itemListElement: [
            {
                "@type":
                    "ListItem",

                position: 1,

                name:
                    "Home",

                item:
                siteUrl,
            },
            {
                "@type":
                    "ListItem",

                position: 2,

                name:
                    "Sri Lanka Destinations",

                item:
                    `${siteUrl}/sri-lanka-destinations`,
            },
            {
                "@type":
                    "ListItem",

                position: 3,

                name:
                destination.name,

                item:
                destinationUrl,
            },
        ],
    };

    const destinationSchema = {
        "@context":
            "https://schema.org",

        "@type":
            "TouristDestination",

        name:
        destination.name,

        description:
            destination.shortDescription ||
            destination.description,

        url:
        destinationUrl,

        image:
            destination.imageUrl
                ? [
                    destination.imageUrl,
                ]
                : undefined,

        geo:
            detail
                ? {
                    "@type":
                        "GeoCoordinates",

                    latitude:
                    detail.location
                        .latitude,

                    longitude:
                    detail.location
                        .longitude,
                }
                : undefined,

        containedInPlace: {
            "@type":
                "Country",

            name:
                "Sri Lanka",
        },
    };

    const faqSchema =
        detail?.faqs.length
            ? {
                "@context":
                    "https://schema.org",

                "@type":
                    "FAQPage",

                mainEntity:
                    detail.faqs.map(
                        (faq) => ({
                            "@type":
                                "Question",

                            name:
                            faq.question,

                            acceptedAnswer:
                                {
                                    "@type":
                                        "Answer",

                                    text:
                                    faq.answer,
                                },
                        })
                    ),
            }
            : null;

    return (
        <main className="bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html:
                        serializeJsonLd(
                            breadcrumbSchema
                        ),
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html:
                        serializeJsonLd(
                            destinationSchema
                        ),
                }}
            />

            {faqSchema ? (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html:
                            serializeJsonLd(
                                faqSchema
                            ),
                    }}
                />
            ) : null}

            {/* Hero */}
            <section className="relative isolate min-h-[620px] overflow-hidden text-white">
                {destination.imageUrl ? (
                    <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={
                                destination.imageUrl
                            }
                            alt={`${destination.name}, Sri Lanka`}
                            className="absolute inset-0 -z-30 h-full w-full object-cover object-center"
                        />

                        <div className="absolute inset-0 -z-20 bg-[#033F3B]/25" />

                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#032F2D]/95 via-[#064E49]/75 to-[#064E49]/20" />
                    </>
                ) : (
                    <div className="absolute inset-0 -z-30 bg-gradient-to-br from-[#043F3B] via-[#075E58] to-[#008D86]" />
                )}

                <div className="absolute -right-20 -top-20 -z-10 h-80 w-80 rounded-full bg-[#FEC52E]/15 blur-3xl" />

                <div className="absolute -bottom-32 -left-20 -z-10 h-96 w-96 rounded-full bg-[#C62D52]/20 blur-3xl" />

                <div className="mx-auto flex min-h-[620px] max-w-7xl items-end px-6 pb-20 pt-32 sm:pb-24">
                    <div className="max-w-4xl">
                        <nav
                            aria-label="Breadcrumb"
                            className="mb-7 flex flex-wrap items-center gap-2 text-sm text-white/75"
                        >
                            <Link
                                href="/"
                                className="transition hover:text-white"
                            >
                                Home
                            </Link>

                            <span>
                                /
                            </span>

                            <Link
                                href="/sri-lanka-destinations"
                                className="transition hover:text-white"
                            >
                                Destinations
                            </Link>

                            <span>
                                /
                            </span>

                            <span className="text-white">
                                {
                                    destination.name
                                }
                            </span>
                        </nav>

                        <div className="mb-5 flex flex-wrap gap-3">
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md">
                                <Sparkles className="h-4 w-4 text-[#FEC52E]" />

                                {
                                    destination.category
                                }
                            </span>

                            {destination.region ? (
                                <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md">
                                    <MapPin className="h-4 w-4 text-[#FEC52E]" />

                                    {
                                        destination.region
                                    }
                                </span>
                            ) : null}
                        </div>

                        <h1 className="max-w-4xl text-4xl font-bold leading-tight drop-shadow-lg sm:text-5xl lg:text-6xl">
                            Explore{" "}
                            {
                                destination.name
                            }
                        </h1>

                        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/90 drop-shadow">
                            {destination.shortDescription ||
                                `Discover ${destination.name} with a private local chauffeur-guide and a journey designed around your preferred pace.`}
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                href="/plan-your-tour"
                                className="inline-flex items-center gap-2 rounded-full bg-[#FEC52E] px-6 py-3 font-bold text-[#173F3B] shadow-lg transition hover:-translate-y-0.5 hover:bg-white"
                            >
                                Include in My Tour

                                <ArrowRight className="h-4 w-4" />
                            </Link>

                            <a
                                href={
                                    whatsappUrl
                                }
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#063E3A]"
                            >
                                <MessageCircle className="h-4 w-4" />

                                Ask on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick facts */}
            {detail?.quickFacts.length ? (
                <section className="relative z-10 -mt-10 px-6">
                    <div className="mx-auto grid max-w-7xl gap-4 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_22px_70px_rgba(20,45,41,0.12)] sm:grid-cols-2 lg:grid-cols-5 lg:p-7">
                        {detail.quickFacts.map(
                            (
                                fact,
                                index
                            ) => (
                                <div
                                    key={
                                        fact.label
                                    }
                                    className="flex items-start gap-4 rounded-2xl p-3"
                                >
                                    <div
                                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${getFactIconClasses(
                                            index
                                        )}`}
                                    >
                                        <QuickFactIcon
                                            icon={
                                                fact.icon
                                            }
                                        />
                                    </div>

                                    <div>
                                        <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                                            {
                                                fact.label
                                            }
                                        </span>

                                        <strong className="mt-1 block text-base leading-6 text-slate-900">
                                            {
                                                fact.value
                                            }
                                        </strong>

                                        {fact.note ? (
                                            <p className="mt-1 text-xs leading-5 text-slate-500">
                                                {
                                                    fact.note
                                                }
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </section>
            ) : null}

            {/* Overview */}
            <section className="px-6 py-20 sm:py-24">
                <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_360px]">
                    <article>
                        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#C62D52]">
                            Destination guide
                        </p>

                        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                            About{" "}
                            {
                                destination.name
                            }
                        </h2>

                        <div className="mt-7 space-y-5 text-base leading-8 text-slate-600">
                            {introductionParagraphs.length >
                            0 ? (
                                introductionParagraphs.map(
                                    (
                                        paragraph,
                                        index
                                    ) => (
                                        <p
                                            key={`${destination.id}-introduction-${index}`}
                                        >
                                            {
                                                paragraph
                                            }
                                        </p>
                                    )
                                )
                            ) : (
                                <>
                                    <p>
                                        {
                                            destination.name
                                        }{" "}
                                        is one of
                                        Sri Lanka&apos;s
                                        most rewarding
                                        places to
                                        include in a
                                        private
                                        itinerary.
                                    </p>

                                    <p>
                                        Dream Ceylon
                                        Journeys can
                                        connect this
                                        destination
                                        with nearby
                                        attractions,
                                        scenic routes,
                                        wildlife regions
                                        and coastal
                                        areas.
                                    </p>
                                </>
                            )}
                        </div>

                        {destination.highlights
                            .length >
                        0 ? (
                            <div className="mt-10">
                                <h3 className="text-xl font-bold text-slate-900">
                                    Destination
                                    highlights
                                </h3>

                                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                    {destination.highlights.map(
                                        (
                                            highlight
                                        ) => (
                                            <div
                                                key={
                                                    highlight
                                                }
                                                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5"
                                            >
                                                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#008D86]" />

                                                <span className="font-medium leading-6 text-slate-700">
                                                    {
                                                        highlight
                                                    }
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        ) : null}
                    </article>

                    <aside className="space-y-6">
                        <div className="rounded-3xl border border-slate-200 bg-[#F7FAF9] p-7">
                            <h2 className="text-xl font-bold text-slate-900">
                                Plan your visit
                            </h2>

                            <div className="mt-6 space-y-5">
                                {destination.region ? (
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#008D86]/10 text-[#008D86]">
                                            <MapPin className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                                                Region
                                            </span>

                                            <strong className="mt-1 block text-slate-900">
                                                {
                                                    destination.region
                                                }
                                            </strong>
                                        </div>
                                    </div>
                                ) : null}

                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FEC52E]/20 text-[#836000]">
                                        <Compass className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Experience
                                        </span>

                                        <strong className="mt-1 block text-slate-900">
                                            {
                                                destination.category
                                            }
                                        </strong>
                                    </div>
                                </div>

                                {destination.bestTime ? (
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#C62D52]/10 text-[#C62D52]">
                                            <CalendarDays className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                                                Best time
                                            </span>

                                            <strong className="mt-1 block text-slate-900">
                                                {
                                                    destination.bestTime
                                                }
                                            </strong>
                                        </div>
                                    </div>
                                ) : null}

                                {detail ? (
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                            <BedDouble className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                                                Suggested stay
                                            </span>

                                            <strong className="mt-1 block text-slate-900">
                                                {
                                                    detail.recommendedStay
                                                }
                                            </strong>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        <div className="rounded-3xl bg-[#063E3A] p-7 text-white shadow-xl">
                            <Route className="h-8 w-8 text-[#FEC52E]" />

                            <h2 className="mt-5 text-2xl font-bold">
                                Add{" "}
                                {
                                    destination.name
                                }{" "}
                                to your private
                                journey
                            </h2>

                            <p className="mt-4 leading-7 text-white/75">
                                We will connect
                                this destination
                                with a practical
                                route, comfortable
                                transport and
                                experiences suited
                                to your interests.
                            </p>

                            <Link
                                href="/plan-your-tour"
                                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FEC52E] px-5 py-3 font-bold text-[#173F3B] transition hover:bg-white"
                            >
                                Plan My Journey

                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </aside>
                </div>
            </section>

            {/* Activities */}
            {detail?.activities.length ? (
                <section className="bg-[#F7FAF9] px-6 py-20 sm:py-24">
                    <div className="mx-auto max-w-7xl">
                        <div className="max-w-3xl">
                            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#C62D52]">
                                Things to do
                            </p>

                            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                                Top experiences
                                in{" "}
                                {
                                    destination.name
                                }
                            </h2>

                            <p className="mt-5 leading-8 text-slate-600">
                                Choose activities
                                according to your
                                available time,
                                fitness, weather
                                conditions and
                                preferred travel
                                pace.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {detail.activities.map(
                                (
                                    activity,
                                    index
                                ) => (
                                    <article
                                        key={
                                            activity.title
                                        }
                                        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                                    >
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#008D86]/10 text-[#008D86]">
                                                <Footprints className="h-6 w-6" />
                                            </div>

                                            <span className="text-sm font-bold text-slate-300">
                                                {String(
                                                    index +
                                                    1
                                                ).padStart(
                                                    2,
                                                    "0"
                                                )}
                                            </span>
                                        </div>

                                        <h3 className="mt-5 text-xl font-bold text-slate-900">
                                            {
                                                activity.title
                                            }
                                        </h3>

                                        <p className="mt-3 leading-7 text-slate-600">
                                            {
                                                activity.description
                                            }
                                        </p>

                                        <div className="mt-6 space-y-3 border-t border-slate-100 pt-5 text-sm">
                                            {activity.duration ? (
                                                <div className="flex items-start gap-3">
                                                    <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[#008D86]" />

                                                    <span className="text-slate-600">
                                                        <strong className="text-slate-800">
                                                            Duration:
                                                        </strong>{" "}
                                                        {
                                                            activity.duration
                                                        }
                                                    </span>
                                                </div>
                                            ) : null}

                                            {activity.bestTime ? (
                                                <div className="flex items-start gap-3">
                                                    <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-[#C62D52]" />

                                                    <span className="text-slate-600">
                                                        <strong className="text-slate-800">
                                                            Best time:
                                                        </strong>{" "}
                                                        {
                                                            activity.bestTime
                                                        }
                                                    </span>
                                                </div>
                                            ) : null}

                                            {activity.difficulty ? (
                                                <div className="flex items-start gap-3">
                                                    <Compass className="mt-0.5 h-4 w-4 shrink-0 text-[#806000]" />

                                                    <span className="text-slate-600">
                                                        <strong className="text-slate-800">
                                                            Difficulty:
                                                        </strong>{" "}
                                                        {
                                                            activity.difficulty
                                                        }
                                                    </span>
                                                </div>
                                            ) : null}
                                        </div>
                                    </article>
                                )
                            )}
                        </div>
                    </div>
                </section>
            ) : null}

            {/* Climate */}
            {detail ? (
                <section className="px-6 py-20 sm:py-24">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-10 rounded-[2rem] bg-[#063E3A] p-8 text-white lg:grid-cols-[0.85fr_1.15fr] lg:p-12">
                            <div>
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[#FEC52E]">
                                    <CloudSun className="h-7 w-7" />
                                </div>

                                <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-[#FEC52E]">
                                    Weather and
                                    climate
                                </p>

                                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                                    Best time to
                                    visit{" "}
                                    {
                                        destination.name
                                    }
                                </h2>

                                <p className="mt-5 leading-8 text-white/75">
                                    {
                                        detail.climate
                                            .advice
                                    }
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-5">
                                    <ThermometerSun className="h-5 w-5 text-[#FEC52E]" />

                                    <h3 className="mt-4 font-bold">
                                        Temperature
                                    </h3>

                                    <p className="mt-2 text-sm leading-7 text-white/70">
                                        {
                                            detail.climate
                                                .temperatureRange
                                        }
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-5">
                                    <CalendarDays className="h-5 w-5 text-[#FEC52E]" />

                                    <h3 className="mt-4 font-bold">
                                        Best months
                                    </h3>

                                    <p className="mt-2 text-sm leading-7 text-white/70">
                                        {
                                            detail.climate
                                                .bestMonths
                                        }
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-5">
                                    <CloudSun className="h-5 w-5 text-[#FEC52E]" />

                                    <h3 className="mt-4 font-bold">
                                        Relatively
                                        drier periods
                                    </h3>

                                    <p className="mt-2 text-sm leading-7 text-white/70">
                                        {
                                            detail.climate
                                                .relativelyDrierPeriods
                                        }
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-5">
                                    <Info className="h-5 w-5 text-[#FEC52E]" />

                                    <h3 className="mt-4 font-bold">
                                        Wetter periods
                                    </h3>

                                    <p className="mt-2 text-sm leading-7 text-white/70">
                                        {
                                            detail.climate
                                                .wetterPeriods
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : null}

            {/* Map and nearby places */}
            {detail ? (
                <section className="bg-[#F7FAF9] px-6 py-20 sm:py-24">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                            <div>
                                <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#C62D52]">
                                    Location
                                </p>

                                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                                    Where is{" "}
                                    {
                                        destination.name
                                    }
                                    ?
                                </h2>

                                <p className="mt-5 leading-8 text-slate-600">
                                    {
                                        detail.location
                                            .areaDescription
                                    }
                                </p>

                                <div className="mt-7 flex flex-wrap gap-3">
                                    <a
                                        href={
                                            detail.location
                                                .directionsUrl
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full bg-[#008D86] px-5 py-3 font-bold text-white transition hover:bg-[#006F69]"
                                    >
                                        <Navigation className="h-4 w-4" />

                                        Open in Google
                                        Maps
                                    </a>

                                    <a
                                        href={
                                            whatsappUrl
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 font-bold text-slate-800 transition hover:border-[#008D86] hover:text-[#008D86]"
                                    >
                                        <MessageCircle className="h-4 w-4" />

                                        Ask about
                                        transport
                                    </a>
                                </div>
                            </div>

                            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                                <iframe
                                    title={`${destination.name} location map`}
                                    src={
                                        detail.location
                                            .mapEmbedUrl
                                    }
                                    className="h-[400px] w-full border-0"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    allowFullScreen
                                />
                            </div>
                        </div>

                        {detail.nearbyPlaces
                            .length >
                        0 ? (
                            <div className="mt-16">
                                <div className="max-w-3xl">
                                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#C62D52]">
                                        Nearby places
                                    </p>

                                    <h2 className="text-3xl font-bold text-slate-900">
                                        Places to
                                        combine with{" "}
                                        {
                                            destination.name
                                        }
                                    </h2>
                                </div>

                                <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                                    {detail.nearbyPlaces.map(
                                        (
                                            place
                                        ) => (
                                            <article
                                                key={
                                                    place.name
                                                }
                                                className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                                            >
                                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#008D86]/10 text-[#008D86]">
                                                    <MapPinned className="h-5 w-5" />
                                                </div>

                                                <h3 className="mt-5 text-xl font-bold text-slate-900">
                                                    {
                                                        place.name
                                                    }
                                                </h3>

                                                <div className="mt-3 flex items-start gap-2 text-sm font-semibold text-[#C62D52]">
                                                    <Clock3 className="mt-0.5 h-4 w-4 shrink-0" />

                                                    {
                                                        place.travelTime
                                                    }
                                                </div>

                                                {place.distance ? (
                                                    <p className="mt-1 text-xs font-medium text-slate-500">
                                                        {
                                                            place.distance
                                                        }
                                                    </p>
                                                ) : null}

                                                <p className="mt-4 flex-1 leading-7 text-slate-600">
                                                    {
                                                        place.description
                                                    }
                                                </p>

                                                <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
                                                    {place.destinationSlug ? (
                                                        <Link
                                                            href={`/sri-lanka-destinations/${place.destinationSlug}`}
                                                            className="inline-flex items-center gap-2 text-sm font-bold text-[#008D86]"
                                                        >
                                                            View
                                                            destination

                                                            <ArrowRight className="h-4 w-4" />
                                                        </Link>
                                                    ) : null}

                                                    {place.mapUrl ? (
                                                        <a
                                                            href={
                                                                place.mapUrl
                                                            }
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-[#008D86]"
                                                        >
                                                            Map

                                                            <ExternalLink className="h-3.5 w-3.5" />
                                                        </a>
                                                    ) : null}
                                                </div>
                                            </article>
                                        )
                                    )}
                                </div>
                            </div>
                        ) : null}
                    </div>
                </section>
            ) : null}

            {/* Route connections */}
            {detail?.routeConnections
                .length ? (
                <section className="px-6 py-20 sm:py-24">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-10 lg:grid-cols-[360px_1fr]">
                            <div>
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FEC52E]/20 text-[#806000]">
                                    <CarFront className="h-7 w-7" />
                                </div>

                                <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-[#C62D52]">
                                    Route planning
                                </p>

                                <h2 className="mt-3 text-3xl font-bold text-slate-900">
                                    Getting to and
                                    from{" "}
                                    {
                                        destination.name
                                    }
                                </h2>

                                <p className="mt-5 leading-8 text-slate-600">
                                    Travel-time
                                    ranges can change
                                    according to
                                    traffic, weather,
                                    road conditions,
                                    comfort stops and
                                    sightseeing along
                                    the route.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {detail.routeConnections.map(
                                    (
                                        routeItem,
                                        index
                                    ) => (
                                        <article
                                            key={
                                                routeItem.route
                                            }
                                            className="grid gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-[70px_1fr]"
                                        >
                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#008D86] font-bold text-white">
                                                {String(
                                                    index +
                                                    1
                                                ).padStart(
                                                    2,
                                                    "0"
                                                )}
                                            </div>

                                            <div>
                                                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                                                    <h3 className="text-xl font-bold text-slate-900">
                                                        {
                                                            routeItem.route
                                                        }
                                                    </h3>

                                                    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#C62D52]/10 px-3 py-1.5 text-xs font-bold text-[#C62D52]">
                                                        <Clock3 className="h-3.5 w-3.5" />

                                                        {
                                                            routeItem.travelTime
                                                        }
                                                    </span>
                                                </div>

                                                <p className="mt-3 leading-7 text-slate-600">
                                                    {
                                                        routeItem.description
                                                    }
                                                </p>

                                                {routeItem.note ? (
                                                    <p className="mt-3 flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-sm leading-6 text-amber-900">
                                                        <Info className="mt-0.5 h-4 w-4 shrink-0" />

                                                        {
                                                            routeItem.note
                                                        }
                                                    </p>
                                                ) : null}
                                            </div>
                                        </article>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            ) : null}

            {/* Practical tips and FAQ */}
            {detail ? (
                <section className="bg-[#F7FAF9] px-6 py-20 sm:py-24">
                    <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
                        <div>
                            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#C62D52]">
                                Visitor guidance
                            </p>

                            <h2 className="text-3xl font-bold text-slate-900">
                                Practical tips
                                for{" "}
                                {
                                    destination.name
                                }
                            </h2>

                            <div className="mt-8 space-y-4">
                                {detail.practicalTips.map(
                                    (
                                        tip
                                    ) => (
                                        <div
                                            key={
                                                tip
                                            }
                                            className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5"
                                        >
                                            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#008D86]" />

                                            <p className="leading-7 text-slate-600">
                                                {
                                                    tip
                                                }
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        <div>
                            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#C62D52]">
                                Questions answered
                            </p>

                            <h2 className="text-3xl font-bold text-slate-900">
                                Frequently asked
                                questions
                            </h2>

                            <div className="mt-8 space-y-4">
                                {detail.faqs.map(
                                    (
                                        faq
                                    ) => (
                                        <details
                                            key={
                                                faq.question
                                            }
                                            className="group rounded-2xl border border-slate-200 bg-white"
                                        >
                                            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-5 font-bold text-slate-900">
                                                <span>
                                                    {
                                                        faq.question
                                                    }
                                                </span>

                                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#008D86]/10 text-[#008D86] transition group-open:rotate-45">
                                                    +
                                                </span>
                                            </summary>

                                            <div className="border-t border-slate-100 px-5 py-5">
                                                <p className="leading-7 text-slate-600">
                                                    {
                                                        faq.answer
                                                    }
                                                </p>
                                            </div>
                                        </details>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            ) : null}

            {/* Source information */}
            {detail?.sources.length ? (
                <section className="px-6 py-12">
                    <div className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-7">
                        <div className="flex items-start gap-4">
                            <BookOpen className="mt-1 h-6 w-6 shrink-0 text-[#008D86]" />

                            <div>
                                <h2 className="font-bold text-slate-900">
                                    Planning
                                    information and
                                    sources
                                </h2>

                                <p className="mt-2 text-sm leading-7 text-slate-600">
                                    {
                                        detail.planningDisclaimer
                                    }
                                </p>

                                <div className="mt-4 flex flex-wrap gap-3">
                                    {detail.sources.map(
                                        (
                                            source
                                        ) => (
                                            <a
                                                key={
                                                    source.url
                                                }
                                                href={
                                                    source.url
                                                }
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-[#008D86] hover:text-white"
                                            >
                                                {
                                                    source.label
                                                }

                                                <ExternalLink className="h-3 w-3" />
                                            </a>
                                        )
                                    )}
                                </div>

                                <p className="mt-4 text-xs font-semibold text-slate-500">
                                    Last verified:{" "}
                                    {
                                        detail.lastVerified
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            ) : null}

            {/* Related destinations */}
            {relatedDestinations.length >
            0 ? (
                <section className="px-6 py-20 sm:py-24">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                            <div>
                                <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#C62D52]">
                                    Continue
                                    exploring
                                </p>

                                <h2 className="text-3xl font-bold text-slate-900">
                                    Other Sri Lanka
                                    destinations
                                </h2>
                            </div>

                            <Link
                                href="/sri-lanka-destinations"
                                className="inline-flex items-center gap-2 font-bold text-[#008D86]"
                            >
                                View all
                                destinations

                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="grid gap-7 md:grid-cols-3">
                            {relatedDestinations.map(
                                (
                                    related
                                ) => (
                                    <Link
                                        key={
                                            related.id
                                        }
                                        href={`/sri-lanka-destinations/${related.slug}`}
                                        className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                                    >
                                        <div className="relative h-60 overflow-hidden bg-[#063E3A]">
                                            {related.imageUrl ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={
                                                        related.imageUrl
                                                    }
                                                    alt={`${related.name}, Sri Lanka`}
                                                    loading="lazy"
                                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-white">
                                                    <MapPin className="h-10 w-10" />
                                                </div>
                                            )}

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />

                                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                                <span className="text-xs font-bold uppercase tracking-wider text-[#FEC52E]">
                                                    {
                                                        related.category
                                                    }
                                                </span>

                                                <h3 className="mt-2 text-2xl font-bold">
                                                    {
                                                        related.name
                                                    }
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <p className="line-clamp-3 leading-6 text-slate-600">
                                                {related.shortDescription ||
                                                    related.description ||
                                                    `Explore ${related.name} with Dream Ceylon Journeys.`}
                                            </p>

                                            <span className="mt-5 inline-flex items-center gap-2 font-bold text-[#008D86]">
                                                Explore
                                                destination

                                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                            </span>
                                        </div>
                                    </Link>
                                )
                            )}
                        </div>
                    </div>
                </section>
            ) : null}

            {/* Final CTA */}
            <section className="px-6 pb-20 sm:pb-24">
                <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#C62D52] px-8 py-14 text-white sm:px-12">
                    <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#FEC52E]/20 blur-3xl" />

                    <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FEC52E]">
                                Start planning
                            </p>

                            <h2 className="mt-3 max-w-3xl text-3xl font-bold sm:text-4xl">
                                Build your private
                                Sri Lanka journey
                                around{" "}
                                {
                                    destination.name
                                }
                            </h2>

                            <p className="mt-5 max-w-3xl leading-7 text-white/80">
                                Share your dates,
                                group size,
                                interests and
                                preferred travel
                                pace. Our team will
                                prepare a realistic,
                                personalized route.
                            </p>
                        </div>

                        <Link
                            href="/plan-your-tour"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FEC52E] px-7 py-4 font-bold text-[#173F3B] transition hover:-translate-y-0.5 hover:bg-white"
                        >
                            Create My Tour

                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            <div className="mx-auto max-w-7xl px-6 pb-12">
                <Link
                    href="/sri-lanka-destinations"
                    className="inline-flex items-center gap-2 font-semibold text-slate-600 transition hover:text-[#008D86]"
                >
                    <ArrowLeft className="h-4 w-4" />

                    Back to all Sri Lanka
                    destinations
                </Link>
            </div>
        </main>
    );
}