import type { Metadata } from "next";

import Link from "next/link";

import {
    ArrowRight,
    Car,
    Check,
    Clock3,
    Compass,
    MapPin,
    Route,
    Sparkles,
    Users,
} from "lucide-react";

import {
    getDayTours,
    type WebsiteTourPackage,
} from "@/lib/tours";

const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

export const metadata: Metadata = {
    title:
        "Sri Lanka Day Tours | Private Day Trips with Driver",

    description:
        "Explore private Sri Lanka day tours with a local chauffeur-guide, comfortable transport, flexible pickup and carefully planned cultural, wildlife and scenic day trips.",

    alternates: {
        canonical:
            `${siteUrl}/day-tours`,
    },

    openGraph: {
        title:
            "Sri Lanka Day Tours | Dream Ceylon Journeys",

        description:
            "Discover private Sri Lanka day trips with flexible routes, hotel pickup and local chauffeur-guide service.",

        url:
            `${siteUrl}/day-tours`,

        siteName:
            "Dream Ceylon Journeys",

        type:
            "website",
    },
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
                maximumFractionDigits: 0,
            }
        ).format(tour.price);
    } catch {
        return `${tour.currency} ${tour.price.toLocaleString()}`;
    }
}

function getRouteLabel(
    tour: WebsiteTourPackage
): string {
    if (
        tour.startLocation &&
        tour.endLocation
    ) {
        if (
            tour.startLocation.toLowerCase() ===
            tour.endLocation.toLowerCase()
        ) {
            return `Starts and ends in ${tour.startLocation}`;
        }

        return `${tour.startLocation} to ${tour.endLocation}`;
    }

    if (tour.startLocation) {
        return `Starts in ${tour.startLocation}`;
    }

    if (tour.endLocation) {
        return `Ends in ${tour.endLocation}`;
    }

    return "Pickup route confirmed with you";
}

function DayTourImage({
                          tour,
                      }: {
    tour: WebsiteTourPackage;
}) {
    if (!tour.imageUrl) {
        return (
            <div className="flex h-full min-h-72 items-center justify-center bg-gradient-to-br from-[#008D86] via-[#08736E] to-[#043F3B]">
                <div className="max-w-xs px-6 text-center text-white">
                    <Compass className="mx-auto mb-4 h-12 w-12 text-[#FEC52E]" />

                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/75">
                        Dream Ceylon Journeys
                    </p>

                    <p className="mt-3 text-2xl font-bold">
                        {tour.title}
                    </p>
                </div>
            </div>
        );
    }

    return (
        // Images are supplied dynamically by the CRM.
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={tour.imageUrl}
            alt={`${tour.title} day tour in Sri Lanka`}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            loading="lazy"
        />
    );
}

export default async function DayToursPage() {
    let dayTours: WebsiteTourPackage[] =
        [];

    try {
        dayTours = await getDayTours();
    } catch (error) {
        console.error(
            "[Sri Lanka Day Tours]",
            error
        );
    }

    const featuredDayTours =
        dayTours.filter(
            (tour) => tour.featured
        );

    const displayedDayTours =
        featuredDayTours.length > 0
            ? [
                ...featuredDayTours,
                ...dayTours.filter(
                    (tour) =>
                        !tour.featured
                ),
            ]
            : dayTours;

    const collectionJsonLd = {
        "@context":
            "https://schema.org",

        "@type":
            "CollectionPage",

        name:
            "Sri Lanka Day Tours",

        description:
            "Private Sri Lanka day tours and day trips with chauffeur-guide service.",

        url:
            `${siteUrl}/day-tours`,

        mainEntity: {
            "@type":
                "ItemList",

            numberOfItems:
            displayedDayTours.length,

            itemListElement:
                displayedDayTours.map(
                    (tour, index) => ({
                        "@type":
                            "ListItem",

                        position:
                            index + 1,

                        name:
                        tour.title,

                        url:
                            `${siteUrl}/day-tours/${tour.slug}`,
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

            <section className="relative isolate overflow-hidden bg-[#043F3B] px-6 py-24 text-white sm:py-32">
                <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_top_right,rgba(254,197,46,0.2),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(198,45,82,0.24),transparent_35%)]" />

                <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#043F3B] via-[#075B56] to-[#008D86]" />

                <div className="absolute left-[8%] top-20 -z-10 h-64 w-64 rounded-full border border-white/10" />

                <div className="absolute right-[8%] top-12 -z-10 h-96 w-96 rounded-full border border-white/10" />

                <div className="mx-auto max-w-7xl">
                    <div className="max-w-4xl">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
                            <Sparkles className="h-4 w-4 text-[#FEC52E]" />

                            Private Sri Lanka day trips
                        </div>

                        <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                            See more of Sri Lanka in one unforgettable day
                        </h1>

                        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/85">
                            Choose a private cultural, wildlife, scenic or coastal day tour with comfortable transport, practical route planning and a friendly local chauffeur-guide.
                        </p>

                        <div className="mt-9 flex flex-wrap gap-4">
                            <Link
                                href="#day-tour-list"
                                className="inline-flex items-center gap-2 rounded-full bg-[#FEC52E] px-7 py-3.5 font-bold text-[#173F3B] shadow-lg transition hover:-translate-y-0.5 hover:bg-white"
                            >
                                Explore Day Tours

                                <ArrowRight className="h-4 w-4" />
                            </Link>

                            <Link
                                href="/plan-your-tour"
                                className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-[#043F3B]"
                            >
                                Request a Custom Day Trip

                                <Route className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-b border-slate-200 bg-[#F7FAF9] px-6 py-8">
                <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        {
                            icon: Car,
                            title:
                                "Private transport",
                            text:
                                "Travel only with your party",
                        },
                        {
                            icon: MapPin,
                            title:
                                "Flexible pickup",
                            text:
                                "Pickup options shown per tour",
                        },
                        {
                            icon: Clock3,
                            title:
                                "Realistic timing",
                            text:
                                "Routes designed for one day",
                        },
                        {
                            icon: Users,
                            title:
                                "Personal service",
                            text:
                                "Suitable for couples and groups",
                        },
                    ].map(
                        ({
                             icon: Icon,
                             title,
                             text,
                         }) => (
                            <div
                                key={title}
                                className="flex items-center gap-4"
                            >
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#008D86]/10 text-[#008D86]">
                                    <Icon className="h-5 w-5" />
                                </div>

                                <div>
                                    <p className="font-bold text-slate-900">
                                        {title}
                                    </p>

                                    <p className="mt-1 text-sm text-slate-600">
                                        {text}
                                    </p>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </section>

            <section
                id="day-tour-list"
                className="scroll-mt-24 px-6 py-20 sm:py-24"
            >
                <div className="mx-auto max-w-7xl">
                    <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                        <div>
                            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#C62D52]">
                                Choose your day trip
                            </p>

                            <h2 className="max-w-3xl text-3xl font-bold text-slate-900 sm:text-4xl">
                                Private day tours planned around your starting point
                            </h2>
                        </div>

                        <p className="max-w-xl leading-7 text-slate-600">
                            Timings, pickup locations and activity availability can be adjusted after checking your hotel, travel date, group size and preferred pace.
                        </p>
                    </div>

                    {displayedDayTours.length ===
                    0 ? (
                        <div className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
                            <Compass className="mx-auto mb-5 h-12 w-12 text-[#008D86]" />

                            <h2 className="text-2xl font-bold text-slate-900">
                                Day tours are being prepared
                            </h2>

                            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
                                No active Day Tour records were returned by the CRM. Add and publish a package with its tour type set to Day Tour, then refresh this page.
                            </p>

                            <Link
                                href="/plan-your-tour"
                                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#C62D52] px-7 py-3.5 font-bold text-white transition hover:bg-[#A92343]"
                            >
                                Request a Custom Day Tour

                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-8 lg:grid-cols-2">
                            {displayedDayTours.map(
                                (tour) => (
                                    <article
                                        key={tour.id}
                                        className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                                    >
                                        <Link
                                            href={`/day-tours/${tour.slug}`}
                                            className="block h-full"
                                        >
                                            <div className="relative h-80 overflow-hidden bg-slate-100">
                                                <DayTourImage tour={tour} />

                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />

                                                <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                                                    {tour.featured && (
                                                        <span className="rounded-full bg-[#FEC52E] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#173F3B] shadow">
                                                            Featured
                                                        </span>
                                                    )}

                                                    <span className="rounded-full border border-white/25 bg-black/25 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur">
                                                        {tour.category}
                                                    </span>
                                                </div>

                                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                                    <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-white/85">
                                                        <span className="inline-flex items-center gap-2">
                                                            <Clock3 className="h-4 w-4 text-[#FEC52E]" />

                                                            {tour.durationLabel}
                                                        </span>

                                                        {tour.startLocation && (
                                                            <span className="inline-flex items-center gap-2">
                                                                <MapPin className="h-4 w-4 text-[#FEC52E]" />

                                                                {tour.startLocation}
                                                            </span>
                                                        )}
                                                    </div>

                                                    <h2 className="text-2xl font-bold sm:text-3xl">
                                                        {tour.title}
                                                    </h2>
                                                </div>
                                            </div>

                                            <div className="flex h-[calc(100%-20rem)] flex-col p-6 sm:p-7">
                                                <p className="line-clamp-3 min-h-[4.75rem] leading-7 text-slate-600">
                                                    {tour.shortDescription ||
                                                        tour.description ||
                                                        `Experience ${tour.title} with a private Dream Ceylon Journeys chauffeur-guide.`}
                                                </p>

                                                <div className="mt-5 flex items-start gap-3 rounded-2xl bg-[#F7FAF9] p-4 text-sm leading-6 text-slate-700">
                                                    <Route className="mt-0.5 h-4 w-4 shrink-0 text-[#008D86]" />

                                                    <span>
                                                        {getRouteLabel(tour)}
                                                    </span>
                                                </div>

                                                {tour.highlights.length > 0 && (
                                                    <div className="mt-6 space-y-2">
                                                        {tour.highlights
                                                            .slice(0, 3)
                                                            .map(
                                                                (highlight) => (
                                                                    <div
                                                                        key={highlight}
                                                                        className="flex items-start gap-3 text-sm text-slate-700"
                                                                    >
                                                                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#008D86]" />

                                                                        <span>
                                                                            {highlight}
                                                                        </span>
                                                                    </div>
                                                                )
                                                            )}
                                                    </div>
                                                )}

                                                <div className="mt-auto flex flex-col gap-5 border-t border-slate-200 pt-6 sm:flex-row sm:items-end sm:justify-between">
                                                    <div>
                                                        <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                                                            {tour.price === null
                                                                ? "Pricing"
                                                                : tour.priceType}
                                                        </span>

                                                        <span className="mt-1 block text-xl font-bold text-slate-900">
                                                            {formatPrice(tour)}
                                                        </span>
                                                    </div>

                                                    <span className="inline-flex items-center gap-2 font-bold text-[#C62D52]">
                                                        View Day Tour

                                                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </article>
                                )
                            )}
                        </div>
                    )}
                </div>
            </section>

            <section className="bg-[#F7FAF9] px-6 py-20">
                <div className="mx-auto grid max-w-7xl gap-10 overflow-hidden rounded-[2rem] bg-[#043F3B] p-8 text-white shadow-lg lg:grid-cols-[1fr_auto] lg:items-center lg:p-12">
                    <div>
                        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FEC52E]">
                            Need more than one day?
                        </p>

                        <h2 className="text-3xl font-bold sm:text-4xl">
                            Combine several destinations in a private round tour
                        </h2>

                        <p className="mt-4 max-w-3xl leading-7 text-white/80">
                            Explore our multi-day Sri Lanka packages or send your dates and interests for a fully customized route.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                        <Link
                            href="/sri-lanka-tours"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-4 font-bold text-white transition hover:bg-white hover:text-[#043F3B]"
                        >
                            Multi-Day Tours
                        </Link>

                        <Link
                            href="/plan-your-tour"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FEC52E] px-7 py-4 font-bold text-[#173F3B] transition hover:-translate-y-0.5 hover:bg-white"
                        >
                            Plan My Journey

                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
