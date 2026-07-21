import type {
    Metadata,
} from "next";

import Link from "next/link";

import {
    ArrowRight,
    CalendarDays,
    Check,
    Compass,
    MapPin,
    Route,
    Sparkles,
    Users,
    WalletCards,
} from "lucide-react";

import {
    getTours,
    type WebsiteTourPackage,
} from "@/lib/tours";

const siteUrl =
    process.env
        .NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

export const metadata: Metadata = {
    title:
        "Sri Lanka Tour Packages | Private Tailor-Made Tours",

    description:
        "Explore private Sri Lanka tour packages covering culture, wildlife, hill country and beaches with a licensed local chauffeur-guide.",

    alternates: {
        canonical:
            `${siteUrl}/sri-lanka-tours`,
    },

    openGraph: {
        title:
            "Sri Lanka Tour Packages | Dream Ceylon Journeys",

        description:
            "Discover private Sri Lanka journeys with carefully planned routes, comfortable transport and local chauffeur-guide service.",

        url:
            `${siteUrl}/sri-lanka-tours`,

        siteName:
            "Dream Ceylon Journeys",

        type:
            "website",
    },
};

function formatPrice(
    tour: WebsiteTourPackage
): string {
    if (
        tour.price === null
    ) {
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

function TourImage({
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
            alt={`${tour.title} in Sri Lanka`}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            loading="lazy"
        />
    );
}

export default async function SriLankaToursPage() {
    let tours: WebsiteTourPackage[] =
        [];

    try {
        tours =
            await getTours();
    } catch (error) {
        console.error(
            "[Sri Lanka Tours]",
            error
        );
    }

    const featuredTours =
        tours.filter(
            (tour) =>
                tour.featured
        );

    const displayedTours =
        featuredTours.length > 0
            ? [
                ...featuredTours,
                ...tours.filter(
                    (tour) =>
                        !tour.featured
                ),
            ]
            : tours;

    return (
        <main className="bg-white">
            <section className="relative isolate overflow-hidden bg-[#043F3B] px-6 py-24 text-white sm:py-32">
                <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_top_right,rgba(254,197,46,0.2),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(198,45,82,0.24),transparent_35%)]" />

                <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#043F3B] via-[#075B56] to-[#008D86]" />

                <div className="absolute left-[8%] top-20 -z-10 h-64 w-64 rounded-full border border-white/10" />

                <div className="absolute right-[8%] top-12 -z-10 h-96 w-96 rounded-full border border-white/10" />

                <div className="mx-auto max-w-7xl">
                    <div className="max-w-4xl">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
                            <Sparkles className="h-4 w-4 text-[#FEC52E]" />

                            Private Sri Lanka journeys
                        </div>

                        <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                            Sri Lanka tour packages designed around real travel
                        </h1>

                        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/85">
                            Explore carefully planned private tours combining
                            ancient cities, hill country, wildlife, beaches and
                            authentic local experiences with comfortable
                            chauffeur-guided transport.
                        </p>

                        <div className="mt-9 flex flex-wrap gap-4">
                            <Link
                                href="#tour-packages"
                                className="inline-flex items-center gap-2 rounded-full bg-[#FEC52E] px-7 py-3.5 font-bold text-[#173F3B] shadow-lg transition hover:-translate-y-0.5 hover:bg-white"
                            >
                                Explore Packages

                                <ArrowRight className="h-4 w-4" />
                            </Link>

                            <Link
                                href="/#custom-tour"
                                className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-[#043F3B]"
                            >
                                Build a Custom Tour

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
                            icon: Route,
                            title:
                                "Flexible routes",
                            text:
                                "Adjust destinations and pace",
                        },
                        {
                            icon: Users,
                            title:
                                "Private journeys",
                            text:
                                "No compulsory group travel",
                        },
                        {
                            icon: MapPin,
                            title:
                                "Local knowledge",
                            text:
                                "Practical Sri Lanka planning",
                        },
                        {
                            icon: WalletCards,
                            title:
                                "Flexible Pricing",
                            text:
                                "Tailored to your style and budget",
                        },
                    ].map(
                        ({
                             icon: Icon,
                             title,
                             text,
                         }) => (
                            <div
                                key={
                                    title
                                }
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
                id="tour-packages"
                className="scroll-mt-24 px-6 py-20 sm:py-24"
            >
                <div className="mx-auto max-w-7xl">
                    <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                        <div>
                            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#C62D52]">
                                Choose your journey
                            </p>

                            <h2 className="max-w-3xl text-3xl font-bold text-slate-900 sm:text-4xl">
                                Find a Sri Lanka itinerary that matches your travel style
                            </h2>
                        </div>

                        <p className="max-w-xl leading-7 text-slate-600">
                            Every published package can be customized around
                            your arrival dates, interests, accommodation
                            preferences, group size and preferred travel pace.
                        </p>
                    </div>

                    {displayedTours.length ===
                    0 ? (
                        <div className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
                            <Compass className="mx-auto mb-5 h-12 w-12 text-[#008D86]" />

                            <h2 className="text-2xl font-bold text-slate-900">
                                Tour packages are being prepared
                            </h2>

                            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
                                No active packages were returned by the CRM.
                                Add or publish a tour package in the Dream
                                Ceylon CRM and refresh this page.
                            </p>

                            <Link
                                href="/#custom-tour"
                                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#C62D52] px-7 py-3.5 font-bold text-white transition hover:bg-[#A92343]"
                            >
                                Request a Custom Tour

                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-8 lg:grid-cols-2">
                            {displayedTours.map(
                                (tour) => (
                                    <article
                                        key={
                                            tour.id
                                        }
                                        className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                                    >
                                        <Link
                                            href={`/sri-lanka-tours/${tour.slug}`}
                                            className="block h-full"
                                        >
                                            <div className="relative h-80 overflow-hidden bg-slate-100">
                                                <TourImage
                                                    tour={
                                                        tour
                                                    }
                                                />

                                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                                                <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                                                    {tour.featured && (
                                                        <span className="rounded-full bg-[#FEC52E] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#173F3B] shadow">
                                                            Featured
                                                        </span>
                                                    )}

                                                    <span className="rounded-full border border-white/25 bg-black/25 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur">
                                                        {tour.tourType}
                                                    </span>
                                                </div>

                                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                                    <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-white/85">
                                                        <span className="inline-flex items-center gap-2">
                                                            <CalendarDays className="h-4 w-4 text-[#FEC52E]" />

                                                            {tour.durationLabel}
                                                        </span>

                                                        {tour.destinations.length >
                                                            0 && (
                                                                <span className="inline-flex items-center gap-2">
                                                                <MapPin className="h-4 w-4 text-[#FEC52E]" />

                                                                    {
                                                                        tour
                                                                            .destinations
                                                                            .length
                                                                    }{" "}
                                                                    destinations
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

                                                {tour.destinations.length >
                                                    0 && (
                                                        <div className="mt-5 flex flex-wrap gap-2">
                                                            {tour.destinations
                                                                .slice(
                                                                    0,
                                                                    5
                                                                )
                                                                .map(
                                                                    (
                                                                        destination
                                                                    ) => (
                                                                        <span
                                                                            key={
                                                                                destination.id
                                                                            }
                                                                            className="rounded-full bg-[#008D86]/10 px-3 py-1.5 text-xs font-semibold text-[#006D68]"
                                                                        >
                                                                        {
                                                                            destination.name
                                                                        }
                                                                    </span>
                                                                    )
                                                                )}

                                                            {tour
                                                                    .destinations
                                                                    .length >
                                                                5 && (
                                                                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                                                                +
                                                                        {tour
                                                                                .destinations
                                                                                .length -
                                                                            5}{" "}
                                                                        more
                                                            </span>
                                                                )}
                                                        </div>
                                                    )}

                                                {tour.highlights.length >
                                                    0 && (
                                                        <div className="mt-6 space-y-2">
                                                            {tour.highlights
                                                                .slice(
                                                                    0,
                                                                    3
                                                                )
                                                                .map(
                                                                    (
                                                                        highlight
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                highlight
                                                                            }
                                                                            className="flex items-start gap-3 text-sm text-slate-700"
                                                                        >
                                                                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#008D86]" />

                                                                            <span>
                                                                            {
                                                                                highlight
                                                                            }
                                                                        </span>
                                                                        </div>
                                                                    )
                                                                )}
                                                        </div>
                                                    )}

                                                <div className="mt-auto flex flex-col gap-5 border-t border-slate-200 pt-6 sm:flex-row sm:items-end sm:justify-between">
                                                    <div>
                                                        <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                                                            {tour.price ===
                                                            null
                                                                ? "Pricing"
                                                                : tour.priceType}
                                                        </span>

                                                        <span className="mt-1 block text-xl font-bold text-slate-900">
                                                            {formatPrice(
                                                                tour
                                                            )}
                                                        </span>
                                                    </div>

                                                    <span className="inline-flex items-center gap-2 font-bold text-[#C62D52]">
                                                        View Tour Details

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
                            Tailor-made travel
                        </p>

                        <h2 className="text-3xl font-bold sm:text-4xl">
                            Need a different route or duration?
                        </h2>

                        <p className="mt-4 max-w-3xl leading-7 text-white/80">
                            Tell us your preferred destinations, dates,
                            interests and budget. We will prepare a practical
                            private itinerary and quotation through our CRM.
                        </p>
                    </div>

                    <Link
                        href="/#custom-tour"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FEC52E] px-7 py-4 font-bold text-[#173F3B] transition hover:-translate-y-0.5 hover:bg-white"
                    >
                        Build My Custom Tour

                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>
        </main>
    );
}