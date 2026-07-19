import type {
    Metadata,
} from "next";

import Link from "next/link";
import {
    notFound,
} from "next/navigation";

import {
    ArrowLeft,
    ArrowRight,
    BedDouble,
    CalendarDays,
    Check,
    CircleDollarSign,
    Clock3,
    Compass,
    MapPin,
    MessageCircle,
    Route,
    ShieldCheck,
    Sparkles,
    Utensils,
    X,
} from "lucide-react";

import {
    getTourBySlug,
    getTours,
    type WebsiteTourPackage,
} from "@/lib/tours";

const siteUrl =
    process.env
        .NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

const whatsappNumber =
    process.env
        .NEXT_PUBLIC_WHATSAPP_NUMBER ||
    "94775124645";

type TourPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

function formatPrice(
    tour: WebsiteTourPackage
): string {
    if (tour.price === null) {
        return "Request a quotation";
    }

    try {
        return new Intl.NumberFormat(
            "en-US",
            {
                style: "currency",
                currency:
                    tour.currency ||
                    "USD",

                maximumFractionDigits:
                    0,
            }
        ).format(tour.price);
    } catch {
        return `${tour.currency} ${tour.price.toLocaleString()}`;
    }
}

function getTourDescription(
    tour: WebsiteTourPackage
): string {
    return (
        tour.shortDescription ||
        tour.description ||
        `Discover ${tour.title} with a private Dream Ceylon Journeys chauffeur-guide.`
    );
}

function buildWhatsAppUrl(
    tour: WebsiteTourPackage
): string {
    const message = [
        "Hello Dream Ceylon Journeys,",
        "",
        `I am interested in the "${tour.title}" tour package.`,
        `Duration: ${tour.durationLabel}`,
        "",
        "Please send me more information and a quotation.",
    ].join("\n");

    return `https://wa.me/${whatsappNumber.replace(
        /\D/g,
        ""
    )}?text=${encodeURIComponent(
        message
    )}`;
}

function TourHeroImage({
                           tour,
                       }: {
    tour: WebsiteTourPackage;
}) {
    if (!tour.imageUrl) {
        return (
            <div className="absolute inset-0 -z-30 bg-gradient-to-br from-[#043F3B] via-[#08736E] to-[#008D86]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(254,197,46,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(198,45,82,0.28),transparent_40%)]" />
            </div>
        );
    }

    return (
        // Image URL is supplied dynamically by the CRM.
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={tour.imageUrl}
            alt={`${tour.title} in Sri Lanka`}
            className="absolute inset-0 -z-30 h-full w-full object-cover"
        />
    );
}

export async function generateStaticParams() {
    try {
        const tours =
            await getTours();

        return tours.map(
            (tour) => ({
                slug: tour.slug,
            })
        );
    } catch (error) {
        console.error(
            "[Tour Static Params]",
            error
        );

        return [];
    }
}

export async function generateMetadata({
                                           params,
                                       }: TourPageProps): Promise<Metadata> {
    const {
        slug,
    } = await params;

    try {
        const tour =
            await getTourBySlug(
                slug
            );

        if (!tour) {
            return {
                title:
                    "Tour Package Not Found",
                robots: {
                    index: false,
                    follow: false,
                },
            };
        }

        const description =
            getTourDescription(
                tour
            );

        const canonicalUrl =
            `${siteUrl}/sri-lanka-tours/${tour.slug}`;

        return {
            title:
                `${tour.title} | Private Sri Lanka Tour`,

            description,

            alternates: {
                canonical:
                canonicalUrl,
            },

            openGraph: {
                title:
                    `${tour.title} | Dream Ceylon Journeys`,

                description,

                url:
                canonicalUrl,

                siteName:
                    "Dream Ceylon Journeys",

                type:
                    "website",

                images:
                    tour.imageUrl
                        ? [
                            {
                                url:
                                tour.imageUrl,

                                alt:
                                tour.title,
                            },
                        ]
                        : undefined,
            },

            twitter: {
                card:
                    "summary_large_image",

                title:
                tour.title,

                description,

                images:
                    tour.imageUrl
                        ? [
                            tour.imageUrl,
                        ]
                        : undefined,
            },
        };
    } catch (error) {
        console.error(
            "[Tour Metadata]",
            error
        );

        return {
            title:
                "Sri Lanka Tour Package",
            description:
                "Explore a private Sri Lanka tour with Dream Ceylon Journeys.",
        };
    }
}

export default async function TourDetailsPage({
                                                  params,
                                              }: TourPageProps) {
    const {
        slug,
    } = await params;

    let tour:
        WebsiteTourPackage | null =
        null;

    try {
        tour =
            await getTourBySlug(
                slug
            );
    } catch (error) {
        console.error(
            "[Tour Details]",
            error
        );
    }

    if (!tour) {
        notFound();
    }

    const canonicalUrl =
        `${siteUrl}/sri-lanka-tours/${tour.slug}`;

    const whatsappUrl =
        buildWhatsAppUrl(
            tour
        );

    const tourJsonLd = {
        "@context":
            "https://schema.org",

        "@type":
            "TouristTrip",

        name:
        tour.title,

        description:
            getTourDescription(
                tour
            ),

        url:
        canonicalUrl,

        image:
            tour.imageUrl ||
            undefined,

        touristType:
            tour.bestFor.length > 0
                ? tour.bestFor
                : [
                    "Private travellers",
                    "Couples",
                    "Families",
                ],

        itinerary:
            tour.itinerary.length > 0
                ? {
                    "@type":
                        "ItemList",

                    itemListElement:
                        tour.itinerary.map(
                            (
                                day,
                                index
                            ) => ({
                                "@type":
                                    "ListItem",

                                position:
                                    index +
                                    1,

                                name:
                                day.title,

                                description:
                                day.description,
                            })
                        ),
                }
                : undefined,

        offers:
            tour.price !== null
                ? {
                    "@type":
                        "Offer",

                    price:
                    tour.price,

                    priceCurrency:
                    tour.currency,

                    url:
                    canonicalUrl,

                    availability:
                        "https://schema.org/InStock",
                }
                : undefined,

        provider: {
            "@type":
                "TravelAgency",

            name:
                "Dream Ceylon Journeys",

            url:
            siteUrl,
        },
    };

    const breadcrumbJsonLd = {
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
                    "Sri Lanka Tours",

                item:
                    `${siteUrl}/sri-lanka-tours`,
            },
            {
                "@type":
                    "ListItem",

                position: 3,

                name:
                tour.title,

                item:
                canonicalUrl,
            },
        ],
    };

    return (
        <main className="bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html:
                        JSON.stringify(
                            tourJsonLd
                        ).replace(
                            /</g,
                            "\\u003c"
                        ),
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html:
                        JSON.stringify(
                            breadcrumbJsonLd
                        ).replace(
                            /</g,
                            "\\u003c"
                        ),
                }}
            />

            {/* Hero */}
            <section className="relative isolate min-h-[700px] overflow-hidden px-6 py-24 text-white sm:py-32">
                <TourHeroImage
                    tour={tour}
                />

                <div className="absolute inset-0 -z-20 bg-gradient-to-r from-black/90 via-black/65 to-black/20" />

                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#043F3B]/80 via-transparent to-transparent" />

                <div className="mx-auto flex min-h-[500px] max-w-7xl items-end">
                    <div className="max-w-5xl">
                        <Link
                            href="/sri-lanka-tours"
                            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-[#FEC52E]"
                        >
                            <ArrowLeft className="h-4 w-4" />

                            Back to Tour Packages
                        </Link>

                        <div className="mb-5 flex flex-wrap gap-3">
                            {tour.featured && (
                                <span className="inline-flex items-center gap-2 rounded-full bg-[#FEC52E] px-4 py-2 text-sm font-bold text-[#173F3B]">
                                    <Sparkles className="h-4 w-4" />

                                    Featured Tour
                                </span>
                            )}

                            <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
                                {tour.tourType}
                            </span>

                            <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
                                Private Journey
                            </span>
                        </div>

                        <h1 className="text-4xl font-bold leading-tight drop-shadow-lg sm:text-5xl lg:text-7xl">
                            {tour.title}
                        </h1>

                        <p className="mt-6 max-w-4xl text-lg leading-8 text-white/85 sm:text-xl">
                            {getTourDescription(
                                tour
                            )}
                        </p>

                        <div className="mt-9 flex flex-wrap gap-4">
                            <a
                                href={
                                    whatsappUrl
                                }
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-[#FEC52E] px-7 py-4 font-bold text-[#173F3B] shadow-lg transition hover:-translate-y-0.5 hover:bg-white"
                            >
                                <MessageCircle className="h-5 w-5" />

                                Request This Tour
                            </a>

                            <Link
                                href="/#custom-tour"
                                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-[#043F3B]"
                            >
                                Customize the Route

                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick facts */}
            <section className="border-b border-slate-200 bg-[#F7FAF9] px-6 py-8">
                <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#008D86]/10 text-[#008D86]">
                            <CalendarDays className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                Duration
                            </p>

                            <p className="mt-1 font-bold text-slate-900">
                                {tour.durationLabel}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#008D86]/10 text-[#008D86]">
                            <MapPin className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                Destinations
                            </p>

                            <p className="mt-1 font-bold text-slate-900">
                                {tour
                                    .destinations
                                    .length >
                                0
                                    ? `${tour.destinations.length} places`
                                    : "Custom route"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#008D86]/10 text-[#008D86]">
                            <Compass className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                Tour style
                            </p>

                            <p className="mt-1 font-bold text-slate-900">
                                {tour.tourType}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#C62D52]/10 text-[#C62D52]">
                            <CircleDollarSign className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                {tour.price ===
                                null
                                    ? "Pricing"
                                    : tour.priceType}
                            </p>

                            <p className="mt-1 font-bold text-slate-900">
                                {formatPrice(
                                    tour
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Overview */}
            <section className="px-6 py-20 sm:py-24">
                <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.4fr_0.6fr]">
                    <div>
                        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#C62D52]">
                            Tour overview
                        </p>

                        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                            Discover what makes this journey special
                        </h2>

                        <div className="mt-7 space-y-5 text-lg leading-8 text-slate-600">
                            {tour.description ? (
                                tour.description
                                    .split(
                                        /\n{2,}/
                                    )
                                    .filter(
                                        Boolean
                                    )
                                    .map(
                                        (
                                            paragraph
                                        ) => (
                                            <p
                                                key={
                                                    paragraph
                                                }
                                            >
                                                {
                                                    paragraph
                                                }
                                            </p>
                                        )
                                    )
                            ) : (
                                <p>
                                    {getTourDescription(
                                        tour
                                    )}
                                </p>
                            )}
                        </div>

                        {tour.destinations.length >
                            0 && (
                                <div className="mt-10">
                                    <h3 className="text-xl font-bold text-slate-900">
                                        Destinations on this route
                                    </h3>

                                    <div className="mt-5 flex flex-wrap gap-3">
                                        {tour.destinations.map(
                                            (
                                                destination
                                            ) => (
                                                <Link
                                                    key={
                                                        destination.id
                                                    }
                                                    href={`/sri-lanka-destinations/${destination.slug}`}
                                                    className="inline-flex items-center gap-2 rounded-full border border-[#008D86]/20 bg-[#008D86]/[0.07] px-4 py-2 font-semibold text-[#006D68] transition hover:border-[#008D86] hover:bg-[#008D86] hover:text-white"
                                                >
                                                    <MapPin className="h-4 w-4" />

                                                    {
                                                        destination.name
                                                    }
                                                </Link>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                    </div>

                    <aside className="h-fit rounded-[2rem] border border-slate-200 bg-[#F7FAF9] p-7 lg:sticky lg:top-28">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#C62D52]">
                            Plan this journey
                        </p>

                        <h2 className="mt-3 text-2xl font-bold text-slate-900">
                            {formatPrice(
                                tour
                            )}
                        </h2>

                        <p className="mt-3 leading-7 text-slate-600">
                            Final pricing depends on
                            travel dates, group size,
                            accommodation category,
                            vehicle and requested
                            experiences.
                        </p>

                        <div className="mt-6 space-y-3 border-y border-slate-200 py-6 text-sm">
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-slate-500">
                                    Duration
                                </span>

                                <span className="text-right font-bold text-slate-900">
                                    {tour.durationLabel}
                                </span>
                            </div>

                            <div className="flex items-center justify-between gap-4">
                                <span className="text-slate-500">
                                    Travel style
                                </span>

                                <span className="text-right font-bold text-slate-900">
                                    Private tour
                                </span>
                            </div>

                            <div className="flex items-center justify-between gap-4">
                                <span className="text-slate-500">
                                    Difficulty
                                </span>

                                <span className="max-w-[60%] text-right font-bold text-slate-900">
                                    {tour.difficulty}
                                </span>
                            </div>
                        </div>

                        <a
                            href={
                                whatsappUrl
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#C62D52] px-6 py-4 font-bold text-white transition hover:bg-[#A92343]"
                        >
                            <MessageCircle className="h-5 w-5" />

                            Request a Quotation
                        </a>

                        <Link
                            href="/#custom-tour"
                            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-4 font-bold text-slate-800 transition hover:border-[#008D86] hover:text-[#008D86]"
                        >
                            Customize This Tour
                        </Link>

                        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-white p-4 text-sm leading-6 text-slate-600">
                            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#008D86]" />

                            <span>
                                Routes, accommodations
                                and activities are
                                confirmed before the
                                final itinerary is
                                issued.
                            </span>
                        </div>
                    </aside>
                </div>
            </section>

            {/* Highlights */}
            {tour.highlights.length >
                0 && (
                    <section className="bg-[#F7FAF9] px-6 py-20">
                        <div className="mx-auto max-w-7xl">
                            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#C62D52]">
                                Journey highlights
                            </p>

                            <h2 className="max-w-3xl text-3xl font-bold text-slate-900 sm:text-4xl">
                                Memorable experiences included in the route
                            </h2>

                            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                                {tour.highlights.map(
                                    (
                                        highlight,
                                        index
                                    ) => (
                                        <div
                                            key={`${highlight}-${index}`}
                                            className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                                        >
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FEC52E] font-bold text-[#173F3B]">
                                                {index +
                                                    1}
                                            </div>

                                            <p className="pt-2 font-semibold leading-6 text-slate-800">
                                                {
                                                    highlight
                                                }
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </section>
                )}

            {/* Itinerary */}
            {tour.itinerary.length >
                0 && (
                    <section className="px-6 py-20 sm:py-24">
                        <div className="mx-auto max-w-5xl">
                            <div className="text-center">
                                <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#C62D52]">
                                    Day-by-day itinerary
                                </p>

                                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                                    Your Sri Lanka journey
                                </h2>

                                <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-600">
                                    The schedule can be
                                    adjusted around your
                                    arrival time, preferred
                                    pace, interests and
                                    accommodation choices.
                                </p>
                            </div>

                            <div className="relative mt-14 space-y-8 before:absolute before:bottom-8 before:left-6 before:top-8 before:w-px before:bg-[#008D86]/25 sm:before:left-8">
                                {tour.itinerary.map(
                                    (
                                        day,
                                        index
                                    ) => (
                                        <article
                                            key={`${day.day}-${day.title}-${index}`}
                                            className="relative pl-16 sm:pl-20"
                                        >
                                            <div className="absolute left-0 top-0 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#008D86] font-bold text-white shadow-lg sm:h-16 sm:w-16">
                                            <span className="text-sm sm:text-base">
                                                Day{" "}
                                                {
                                                    day.day
                                                }
                                            </span>
                                            </div>

                                            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                                                <h3 className="text-2xl font-bold text-slate-900">
                                                    {
                                                        day.title
                                                    }
                                                </h3>

                                                {day.destinations.length >
                                                    0 && (
                                                        <div className="mt-3 flex flex-wrap gap-2">
                                                            {day.destinations.map(
                                                                (
                                                                    destination
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            destination
                                                                        }
                                                                        className="inline-flex items-center gap-1.5 rounded-full bg-[#008D86]/10 px-3 py-1.5 text-xs font-semibold text-[#006D68]"
                                                                    >
                                                                <MapPin className="h-3.5 w-3.5" />

                                                                        {
                                                                            destination
                                                                        }
                                                            </span>
                                                                )
                                                            )}
                                                        </div>
                                                    )}

                                                {day.description && (
                                                    <p className="mt-5 leading-7 text-slate-600">
                                                        {
                                                            day.description
                                                        }
                                                    </p>
                                                )}

                                                {day.activities.length >
                                                    0 && (
                                                        <div className="mt-6">
                                                            <h4 className="font-bold text-slate-900">
                                                                Planned
                                                                activities
                                                            </h4>

                                                            <div className="mt-3 grid gap-2 sm:grid-cols-2">
                                                                {day.activities.map(
                                                                    (
                                                                        activity
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                activity
                                                                            }
                                                                            className="flex items-start gap-3 text-sm leading-6 text-slate-700"
                                                                        >
                                                                            <Check className="mt-1 h-4 w-4 shrink-0 text-[#008D86]" />

                                                                            <span>
                                                                        {
                                                                            activity
                                                                        }
                                                                    </span>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}

                                                {(day.accommodation ||
                                                    day.meals.length >
                                                    0) && (
                                                    <div className="mt-6 grid gap-4 border-t border-slate-200 pt-5 sm:grid-cols-2">
                                                        {day.accommodation && (
                                                            <div className="flex items-start gap-3">
                                                                <BedDouble className="mt-0.5 h-5 w-5 shrink-0 text-[#C62D52]" />

                                                                <div>
                                                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                                                        Accommodation
                                                                    </p>

                                                                    <p className="mt-1 text-sm font-semibold text-slate-800">
                                                                        {
                                                                            day.accommodation
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {day.meals.length >
                                                            0 && (
                                                                <div className="flex items-start gap-3">
                                                                    <Utensils className="mt-0.5 h-5 w-5 shrink-0 text-[#C62D52]" />

                                                                    <div>
                                                                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                                                            Meals
                                                                        </p>

                                                                        <p className="mt-1 text-sm font-semibold text-slate-800">
                                                                            {day.meals.join(
                                                                                ", "
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            )}
                                                    </div>
                                                )}
                                            </div>
                                        </article>
                                    )
                                )}
                            </div>
                        </div>
                    </section>
                )}

            {/* Inclusions and exclusions */}
            {(tour.inclusions.length >
                0 ||
                tour.exclusions.length >
                0) && (
                <section className="bg-[#F7FAF9] px-6 py-20 sm:py-24">
                    <div className="mx-auto max-w-7xl">
                        <div className="text-center">
                            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#C62D52]">
                                Package details
                            </p>

                            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                                What is included and excluded
                            </h2>
                        </div>

                        <div className="mt-12 grid gap-8 lg:grid-cols-2">
                            <div className="rounded-[2rem] border border-emerald-200 bg-white p-7 shadow-sm sm:p-9">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                                        <Check className="h-6 w-6" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-slate-900">
                                        Package includes
                                    </h3>
                                </div>

                                {tour.inclusions.length >
                                0 ? (
                                    <div className="mt-7 space-y-4">
                                        {tour.inclusions.map(
                                            (
                                                inclusion
                                            ) => (
                                                <div
                                                    key={
                                                        inclusion
                                                    }
                                                    className="flex items-start gap-3 leading-7 text-slate-700"
                                                >
                                                    <Check className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />

                                                    <span>
                                                        {
                                                            inclusion
                                                        }
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <p className="mt-6 leading-7 text-slate-600">
                                        Final inclusions
                                        will be listed in
                                        your personalized
                                        quotation.
                                    </p>
                                )}
                            </div>

                            <div className="rounded-[2rem] border border-rose-200 bg-white p-7 shadow-sm sm:p-9">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-700">
                                        <X className="h-6 w-6" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-slate-900">
                                        Package excludes
                                    </h3>
                                </div>

                                {tour.exclusions.length >
                                0 ? (
                                    <div className="mt-7 space-y-4">
                                        {tour.exclusions.map(
                                            (
                                                exclusion
                                            ) => (
                                                <div
                                                    key={
                                                        exclusion
                                                    }
                                                    className="flex items-start gap-3 leading-7 text-slate-700"
                                                >
                                                    <X className="mt-1 h-5 w-5 shrink-0 text-rose-600" />

                                                    <span>
                                                        {
                                                            exclusion
                                                        }
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <p className="mt-6 leading-7 text-slate-600">
                                        Final exclusions
                                        will be listed in
                                        your personalized
                                        quotation.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Best for */}
            {tour.bestFor.length >
                0 && (
                    <section className="px-6 py-20">
                        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
                            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
                                <div>
                                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#C62D52]">
                                        Ideal travellers
                                    </p>

                                    <h2 className="text-3xl font-bold text-slate-900">
                                        Who this tour is best for
                                    </h2>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    {tour.bestFor.map(
                                        (
                                            travellerType
                                        ) => (
                                            <span
                                                key={
                                                    travellerType
                                                }
                                                className="rounded-full bg-[#008D86]/10 px-5 py-3 font-semibold text-[#006D68]"
                                            >
                                            {
                                                travellerType
                                            }
                                        </span>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

            {/* Final CTA */}
            <section className="bg-[#F7FAF9] px-6 py-20">
                <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#043F3B] p-8 text-white shadow-xl sm:p-12 lg:p-16">
                    <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#FEC52E]/15 blur-3xl" />

                    <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#C62D52]/20 blur-3xl" />

                    <div className="relative max-w-4xl">
                        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FEC52E]">
                            Begin your Sri Lanka journey
                        </p>

                        <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
                            Customize {tour.title} around your travel plans
                        </h2>

                        <p className="mt-5 max-w-3xl text-lg leading-8 text-white/80">
                            Share your dates,
                            traveller count,
                            accommodation preferences
                            and interests. We will
                            prepare a practical
                            itinerary and quotation.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <a
                                href={
                                    whatsappUrl
                                }
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-[#FEC52E] px-7 py-4 font-bold text-[#173F3B] transition hover:-translate-y-0.5 hover:bg-white"
                            >
                                <MessageCircle className="h-5 w-5" />

                                Discuss This Tour
                            </a>

                            <Link
                                href="/#custom-tour"
                                className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-[#043F3B]"
                            >
                                Request Custom Itinerary

                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}