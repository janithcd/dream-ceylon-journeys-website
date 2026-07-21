import type { Metadata } from "next";

import Link from "next/link";
import { notFound } from "next/navigation";

import {
    ArrowLeft,
    ArrowRight,
    Car,
    Check,
    CircleDollarSign,
    Clock3,
    Compass,
    MapPin,
    Route,
    ShieldCheck,
    Sparkles,
    Users,
    X,
} from "lucide-react";

import {
    TourInquiryButton,
} from "@/components/tours/TourInquiryButton";

import {
    getDayTourBySlug,
    getDayTours,
    type WebsiteTourPackage,
} from "@/lib/tours";

const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

type DayTourPageProps = {
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
                maximumFractionDigits: 0,
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
        `Explore ${tour.title} on a private Sri Lanka day tour with Dream Ceylon Journeys.`
    );
}

function getTravellerLabel(
    tour: WebsiteTourPackage
): string {
    if (
        tour.maxTravelers !== null &&
        tour.maxTravelers >
        tour.minTravelers
    ) {
        return `${tour.minTravelers}–${tour.maxTravelers} travellers`;
    }

    if (
        tour.maxTravelers !== null &&
        tour.maxTravelers ===
        tour.minTravelers
    ) {
        return `${tour.maxTravelers} ${tour.maxTravelers === 1 ? "traveller" : "travellers"}`;
    }

    return `From ${tour.minTravelers} ${tour.minTravelers === 1 ? "traveller" : "travellers"}`;
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
            return `${tour.startLocation} return trip`;
        }

        return `${tour.startLocation} to ${tour.endLocation}`;
    }

    return (
        tour.startLocation ||
        tour.endLocation ||
        "Route confirmed after inquiry"
    );
}

function getTimeLabel(
    tour: WebsiteTourPackage
): string {
    if (
        tour.startTime &&
        tour.returnTime
    ) {
        return `${tour.startTime} – ${tour.returnTime}`;
    }

    if (tour.startTime) {
        return `Starts ${tour.startTime}`;
    }

    if (tour.returnTime) {
        return `Returns ${tour.returnTime}`;
    }

    return "Timing confirmed with you";
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
        // The image URL is supplied dynamically by the CRM.
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={tour.imageUrl}
            alt={`${tour.title} day tour in Sri Lanka`}
            className="absolute inset-0 -z-30 h-full w-full object-cover"
        />
    );
}

export async function generateStaticParams() {
    try {
        const tours =
            await getDayTours();

        return tours.map(
            (tour) => ({
                slug: tour.slug,
            })
        );
    } catch (error) {
        console.error(
            "[Day Tour Static Params]",
            error
        );

        return [];
    }
}

export async function generateMetadata({
                                           params,
                                       }: DayTourPageProps): Promise<Metadata> {
    const { slug } = await params;

    try {
        const tour =
            await getDayTourBySlug(
                slug
            );

        if (!tour) {
            return {
                title:
                    "Day Tour Not Found",
                robots: {
                    index: false,
                    follow: false,
                },
            };
        }

        const description =
            getTourDescription(tour);

        const canonicalUrl =
            `${siteUrl}/day-tours/${tour.slug}`;

        return {
            title:
                `${tour.title} | Private Sri Lanka Day Tour`,

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
                        ? [tour.imageUrl]
                        : undefined,
            },
        };
    } catch (error) {
        console.error(
            "[Day Tour Metadata]",
            error
        );

        return {
            title:
                "Sri Lanka Day Tour",

            description:
                "Explore a private Sri Lanka day tour with Dream Ceylon Journeys.",
        };
    }
}

export default async function DayTourDetailsPage({
                                                     params,
                                                 }: DayTourPageProps) {
    const { slug } = await params;

    let tour:
        WebsiteTourPackage | null =
        null;

    try {
        tour =
            await getDayTourBySlug(
                slug
            );
    } catch (error) {
        console.error(
            "[Day Tour Details]",
            error
        );
    }

    if (!tour) {
        notFound();
    }

    const canonicalUrl =
        `${siteUrl}/day-tours/${tour.slug}`;

    const tourJsonLd = {
        "@context":
            "https://schema.org",

        "@type":
            "TouristTrip",

        name:
        tour.title,

        description:
            getTourDescription(tour),

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
                    "Small groups",
                ],

        duration:
            tour.durationHours !== null
                ? `PT${tour.durationHours}H`
                : undefined,

        itinerary:
            tour.itinerary.length > 0
                ? {
                    "@type":
                        "ItemList",

                    itemListElement:
                        tour.itinerary.map(
                            (item, index) => ({
                                "@type":
                                    "ListItem",

                                position:
                                    index + 1,

                                name:
                                item.title,

                                description:
                                item.description,
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
                name: "Home",
                item: siteUrl,
            },
            {
                "@type":
                    "ListItem",
                position: 2,
                name: "Day Tours",
                item:
                    `${siteUrl}/day-tours`,
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

            <section className="relative isolate min-h-[680px] overflow-hidden px-6 py-24 text-white sm:py-32">
                <TourHeroImage tour={tour} />

                <div className="absolute inset-0 -z-20 bg-gradient-to-r from-black/90 via-black/65 to-black/20" />

                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#043F3B]/85 via-transparent to-transparent" />

                <div className="mx-auto flex min-h-[500px] max-w-7xl items-end">
                    <div className="max-w-5xl">
                        <Link
                            href="/day-tours"
                            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-[#FEC52E]"
                        >
                            <ArrowLeft className="h-4 w-4" />

                            Back to Day Tours
                        </Link>

                        <div className="mb-5 flex flex-wrap gap-3">
                            {tour.featured && (
                                <span className="inline-flex items-center gap-2 rounded-full bg-[#FEC52E] px-4 py-2 text-sm font-bold text-[#173F3B]">
                                    <Sparkles className="h-4 w-4" />

                                    Featured Day Tour
                                </span>
                            )}

                            <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
                                {tour.category}
                            </span>

                            <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
                                Private Day Tour
                            </span>
                        </div>

                        <h1 className="text-4xl font-bold leading-tight drop-shadow-lg sm:text-5xl lg:text-7xl">
                            {tour.title}
                        </h1>

                        <p className="mt-6 max-w-4xl text-lg leading-8 text-white/85 sm:text-xl">
                            {getTourDescription(tour)}
                        </p>

                        <div className="mt-9 flex flex-wrap gap-4">
                            <TourInquiryButton
                                packageId={tour.id}
                                packageTitle={tour.title}
                                packageDuration={tour.durationLabel}
                                label="Request This Day Tour"
                                className="inline-flex items-center gap-2 rounded-full bg-[#FEC52E] px-7 py-4 font-bold text-[#173F3B] shadow-lg transition hover:-translate-y-0.5 hover:bg-white"
                            />

                            <Link
                                href="/plan-your-tour"
                                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-[#043F3B]"
                            >
                                Customize This Trip

                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-b border-slate-200 bg-[#F7FAF9] px-6 py-8">
                <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#008D86]/10 text-[#008D86]">
                            <Clock3 className="h-5 w-5" />
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
                            <Route className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                Route
                            </p>

                            <p className="mt-1 font-bold text-slate-900">
                                {getRouteLabel(tour)}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#008D86]/10 text-[#008D86]">
                            <Users className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                Group size
                            </p>

                            <p className="mt-1 font-bold text-slate-900">
                                {getTravellerLabel(tour)}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#C62D52]/10 text-[#C62D52]">
                            <CircleDollarSign className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                {tour.price === null
                                    ? "Pricing"
                                    : tour.priceType}
                            </p>

                            <p className="mt-1 font-bold text-slate-900">
                                {formatPrice(tour)}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 py-20 sm:py-24">
                <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.4fr_0.6fr]">
                    <div>
                        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#C62D52]">
                            Day tour overview
                        </p>

                        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                            A private day trip planned for comfort and realistic timing
                        </h2>

                        <div className="mt-7 space-y-5 text-lg leading-8 text-slate-600">
                            {tour.description ? (
                                tour.description
                                    .split(/\n{2,}/)
                                    .filter(Boolean)
                                    .map(
                                        (paragraph) => (
                                            <p key={paragraph}>
                                                {paragraph}
                                            </p>
                                        )
                                    )
                            ) : (
                                <p>
                                    {getTourDescription(tour)}
                                </p>
                            )}
                        </div>

                        {tour.destinations.length > 0 && (
                            <div className="mt-10">
                                <h3 className="text-xl font-bold text-slate-900">
                                    Places included in this day tour
                                </h3>

                                <div className="mt-5 flex flex-wrap gap-3">
                                    {tour.destinations.map(
                                        (destination) => (
                                            <Link
                                                key={destination.id}
                                                href={`/sri-lanka-destinations/${destination.slug}`}
                                                className="inline-flex items-center gap-2 rounded-full border border-[#008D86]/20 bg-[#008D86]/[0.07] px-4 py-2 font-semibold text-[#006D68] transition hover:border-[#008D86] hover:bg-[#008D86] hover:text-white"
                                            >
                                                <MapPin className="h-4 w-4" />

                                                {destination.name}
                                            </Link>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <aside className="h-fit rounded-[2rem] border border-slate-200 bg-[#F7FAF9] p-7 lg:sticky lg:top-28">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#C62D52]">
                            Book this day tour
                        </p>

                        <h2 className="mt-3 text-2xl font-bold text-slate-900">
                            {formatPrice(tour)}
                        </h2>

                        <p className="mt-2 text-sm font-semibold text-[#008D86]">
                            {tour.priceType}
                        </p>

                        <p className="mt-4 leading-7 text-slate-600">
                            Final pricing depends on the pickup point, passenger count, vehicle, travel date and selected activities or entrance tickets.
                        </p>

                        <div className="mt-6 space-y-3 border-y border-slate-200 py-6 text-sm">
                            <div className="flex items-start justify-between gap-4">
                                <span className="text-slate-500">
                                    Duration
                                </span>

                                <span className="text-right font-bold text-slate-900">
                                    {tour.durationLabel}
                                </span>
                            </div>

                            <div className="flex items-start justify-between gap-4">
                                <span className="text-slate-500">
                                    Suggested time
                                </span>

                                <span className="max-w-[65%] text-right font-bold text-slate-900">
                                    {getTimeLabel(tour)}
                                </span>
                            </div>

                            <div className="flex items-start justify-between gap-4">
                                <span className="text-slate-500">
                                    Hotel pickup
                                </span>

                                <span className="text-right font-bold text-slate-900">
                                    {tour.pickupAvailable
                                        ? "Available"
                                        : "Ask for availability"}
                                </span>
                            </div>

                            <div className="flex items-start justify-between gap-4">
                                <span className="text-slate-500">
                                    Tour style
                                </span>

                                <span className="text-right font-bold text-slate-900">
                                    Private tour
                                </span>
                            </div>
                        </div>

                        <TourInquiryButton
                            packageId={tour.id}
                            packageTitle={tour.title}
                            packageDuration={tour.durationLabel}
                            label="Request a Quotation"
                            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#C62D52] px-6 py-4 font-bold text-white transition hover:bg-[#A92343]"
                        />

                        <Link
                            href="/plan-your-tour"
                            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-4 font-bold text-slate-800 transition hover:border-[#008D86] hover:text-[#008D86]"
                        >
                            Change the Route
                        </Link>

                        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-white p-4 text-sm leading-6 text-slate-600">
                            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#008D86]" />

                            <span>
                                Pickup, availability, entrance fees and final timing are confirmed before booking.
                            </span>
                        </div>
                    </aside>
                </div>
            </section>

            {tour.highlights.length > 0 && (
                <section className="bg-[#F7FAF9] px-6 py-20 sm:py-24">
                    <div className="mx-auto max-w-7xl">
                        <div className="max-w-3xl">
                            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#C62D52]">
                                Tour highlights
                            </p>

                            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                                What makes this day trip special
                            </h2>
                        </div>

                        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {tour.highlights.map(
                                (highlight) => (
                                    <div
                                        key={highlight}
                                        className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#008D86]/10 text-[#008D86]">
                                            <Check className="h-5 w-5" />
                                        </div>

                                        <p className="pt-1 font-semibold leading-7 text-slate-800">
                                            {highlight}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </section>
            )}

            {tour.itinerary.length > 0 && (
                <section className="px-6 py-20 sm:py-24">
                    <div className="mx-auto max-w-5xl">
                        <div className="text-center">
                            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#C62D52]">
                                Suggested programme
                            </p>

                            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                                Your day tour, step by step
                            </h2>

                            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
                                The order and timing may be adjusted according to traffic, weather, opening hours and your pickup location.
                            </p>
                        </div>

                        <div className="relative mt-12 space-y-6 before:absolute before:bottom-8 before:left-6 before:top-8 before:w-px before:bg-[#008D86]/25 sm:before:left-8">
                            {tour.itinerary.map(
                                (item, index) => (
                                    <article
                                        key={`${item.day}-${item.title}`}
                                        className="relative pl-16 sm:pl-20"
                                    >
                                        <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#008D86] font-bold text-white shadow-lg sm:h-16 sm:w-16">
                                            {index + 1}
                                        </div>

                                        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C62D52]">
                                                Stop {index + 1}
                                            </p>

                                            <h3 className="mt-2 text-2xl font-bold text-slate-900">
                                                {item.title}
                                            </h3>

                                            {item.description && (
                                                <p className="mt-4 whitespace-pre-line leading-7 text-slate-600">
                                                    {item.description}
                                                </p>
                                            )}

                                            {item.activities.length > 0 && (
                                                <div className="mt-5 flex flex-wrap gap-2">
                                                    {item.activities.map(
                                                        (activity) => (
                                                            <span
                                                                key={activity}
                                                                className="rounded-full bg-[#008D86]/10 px-3 py-1.5 text-xs font-semibold text-[#006D68]"
                                                            >
                                                                {activity}
                                                            </span>
                                                        )
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

            <section className="bg-[#043F3B] px-6 py-20 text-white sm:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-8 lg:grid-cols-3">
                        <div className="rounded-[2rem] border border-white/15 bg-white/10 p-7 backdrop-blur">
                            <Car className="h-8 w-8 text-[#FEC52E]" />

                            <h2 className="mt-5 text-xl font-bold">
                                Pickup and transport
                            </h2>

                            <p className="mt-3 leading-7 text-white/75">
                                {tour.pickupDetails ||
                                    (tour.pickupAvailable
                                        ? "Hotel pickup can be arranged according to the confirmed starting area and vehicle requirements."
                                        : "Send your hotel or starting location so we can confirm pickup availability and any route adjustment.")}
                            </p>
                        </div>

                        <div className="rounded-[2rem] border border-white/15 bg-white/10 p-7 backdrop-blur">
                            <Clock3 className="h-8 w-8 text-[#FEC52E]" />

                            <h2 className="mt-5 text-xl font-bold">
                                Suggested timing
                            </h2>

                            <p className="mt-3 leading-7 text-white/75">
                                {getTimeLabel(tour)}. Final departure and return times depend on your pickup location, traffic and attraction schedules.
                            </p>
                        </div>

                        <div className="rounded-[2rem] border border-white/15 bg-white/10 p-7 backdrop-blur">
                            <MapPin className="h-8 w-8 text-[#FEC52E]" />

                            <h2 className="mt-5 text-xl font-bold">
                                Starting and ending points
                            </h2>

                            <p className="mt-3 leading-7 text-white/75">
                                {getRouteLabel(tour)}. Alternative pickup or drop-off points can be reviewed before confirmation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {(tour.inclusions.length > 0 ||
                tour.exclusions.length > 0) && (
                <section className="px-6 py-20 sm:py-24">
                    <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
                        <div className="rounded-[2rem] border border-[#008D86]/20 bg-[#008D86]/[0.05] p-7 sm:p-9">
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#008D86]">
                                Included
                            </p>

                            <h2 className="mt-3 text-3xl font-bold text-slate-900">
                                Included in this day tour
                            </h2>

                            {tour.inclusions.length > 0 ? (
                                <div className="mt-7 space-y-4">
                                    {tour.inclusions.map(
                                        (item) => (
                                            <div
                                                key={item}
                                                className="flex items-start gap-3"
                                            >
                                                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#008D86]" />

                                                <span className="leading-7 text-slate-700">
                                                    {item}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            ) : (
                                <p className="mt-6 leading-7 text-slate-600">
                                    Inclusions will be confirmed in your quotation.
                                </p>
                            )}
                        </div>

                        <div className="rounded-[2rem] border border-[#C62D52]/20 bg-[#C62D52]/[0.04] p-7 sm:p-9">
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#C62D52]">
                                Not included
                            </p>

                            <h2 className="mt-3 text-3xl font-bold text-slate-900">
                                Costs to plan separately
                            </h2>

                            {tour.exclusions.length > 0 ? (
                                <div className="mt-7 space-y-4">
                                    {tour.exclusions.map(
                                        (item) => (
                                            <div
                                                key={item}
                                                className="flex items-start gap-3"
                                            >
                                                <X className="mt-0.5 h-5 w-5 shrink-0 text-[#C62D52]" />

                                                <span className="leading-7 text-slate-700">
                                                    {item}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            ) : (
                                <p className="mt-6 leading-7 text-slate-600">
                                    Exclusions will be clearly stated in your quotation.
                                </p>
                            )}
                        </div>
                    </div>
                </section>
            )}

            <section className="bg-[#F7FAF9] px-6 py-20">
                <div className="mx-auto grid max-w-7xl gap-10 overflow-hidden rounded-[2rem] bg-[#043F3B] p-8 text-white shadow-lg lg:grid-cols-[1fr_auto] lg:items-center lg:p-12">
                    <div>
                        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FEC52E]">
                            Ready to explore?
                        </p>

                        <h2 className="text-3xl font-bold sm:text-4xl">
                            Request availability for {tour.title}
                        </h2>

                        <p className="mt-4 max-w-3xl leading-7 text-white/80">
                            Send your date, hotel, passenger count and preferred pickup time. We will confirm the practical route and prepare your quotation.
                        </p>
                    </div>

                    <TourInquiryButton
                        packageId={tour.id}
                        packageTitle={tour.title}
                        packageDuration={tour.durationLabel}
                        label="Request This Day Tour"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FEC52E] px-7 py-4 font-bold text-[#173F3B] transition hover:-translate-y-0.5 hover:bg-white"
                    />
                </div>
            </section>
        </main>
    );
}
