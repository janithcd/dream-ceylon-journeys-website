import type {
    Metadata,
} from "next";
import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
    CalendarDays,
    MapPin,
    Route,
    Sparkles,
} from "lucide-react";

import {
    getDestinations,
} from "@/lib/destinations";

const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

export const metadata: Metadata = {
    title:
        "Sri Lanka Destinations | Private Tours & Chauffeur-Guided Journeys",

    description:
        "Explore Sri Lanka destinations including Sigiriya, Kandy, Ella, Yala, Galle, Mirissa and the Cultural Triangle with a private chauffeur-guide.",

    alternates: {
        canonical:
            `${siteUrl}/sri-lanka-destinations`,
    },

    openGraph: {
        title:
            "Sri Lanka Destinations | Dream Ceylon Journeys",

        description:
            "Discover Sri Lanka's cultural cities, hill country, wildlife parks and beaches with a private local chauffeur-guide.",

        url:
            `${siteUrl}/sri-lanka-destinations`,

        siteName:
            "Dream Ceylon Journeys",

        type:
            "website",
    },
};

const DestinationImage = ({
                              imageUrl,
                              name,
                          }: {
    imageUrl: string;
    name: string;
}) => {
    if (!imageUrl) {
        return (
            <div className="flex h-full min-h-64 items-center justify-center bg-gradient-to-br from-[#008D86] via-[#08736E] to-[#043F3B]">
                <div className="text-center text-white">
                    <MapPin className="mx-auto mb-3 h-10 w-10" />

                    <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                        Sri Lanka
                    </span>
                </div>
            </div>
        );
    }

    return (
        // The images are provided dynamically by the CRM.
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={imageUrl}
            alt={`${name}, Sri Lanka`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
        />
    );
};

export default async function SriLankaDestinationsPage() {
    let destinations: Awaited<
        ReturnType<
            typeof getDestinations
        >
    > = [];

    try {
        destinations =
            await getDestinations();
    } catch (error) {
        console.error(
            "[Sri Lanka Destinations]",
            error
        );
    }

    return (
        <main className="bg-white">
            <section className="relative isolate min-h-[600px] overflow-hidden px-6 py-24 text-white sm:py-32 lg:min-h-[640px]">
                {/* Background image */}
                <Image
                    src="/images/destinations/destinations-hero.webp"
                    alt="Beautiful Sri Lanka destinations including mountains, heritage sites and tropical landscapes"
                    fill
                    priority
                    sizes="100vw"
                    className="absolute inset-0 -z-30 object-cover object-center"
                />

                {/* Main dark overlay */}
                <div className="absolute inset-0 -z-20 bg-[#033F3B]/10" />

                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#033B38]/95 via-[#064E49]/75 to-[#064E49]/30" />

                {/* Decorative brand lighting */}
                <div className="absolute -right-20 -top-24 -z-10 h-80 w-80 rounded-full bg-[#FEC52E]/15 blur-3xl" />

                <div className="absolute -bottom-24 -left-20 -z-10 h-80 w-80 rounded-full bg-[#C62D52]/20 blur-3xl" />

                <div className="relative mx-auto flex min-h-[420px] max-w-7xl items-center">
                    <div className="max-w-4xl">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md">
                            <Sparkles className="h-4 w-4 text-[#FEC52E]" />

                            Explore Sri Lanka
                        </div>

                        <h1 className="max-w-4xl text-4xl font-bold leading-tight drop-shadow-lg sm:text-5xl lg:text-6xl">
                            Discover Sri Lanka’s most unforgettable destinations
                        </h1>

                        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/90 drop-shadow">
                            Explore ancient kingdoms, sacred cities, misty tea country,
                            wildlife parks and tropical beaches with a private local
                            chauffeur-guide.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                href="/#custom-tour"
                                className="inline-flex items-center gap-2 rounded-full bg-[#FEC52E] px-6 py-3 font-bold text-[#173F3B] shadow-lg transition hover:-translate-y-0.5 hover:bg-white"
                            >
                                Plan a Custom Tour

                                <ArrowRight className="h-4 w-4" />
                            </Link>

                            <Link
                                href="/sri-lanka-tours"
                                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#063E3A]"
                            >
                                <Route className="h-4 w-4" />

                                View Tour Packages
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 py-20 sm:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-12 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                        <div>
                            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#C62D52]">
                                Where to go
                            </p>

                            <h2 className="max-w-3xl text-3xl font-bold text-slate-900 sm:text-4xl">
                                Find the right
                                places for your
                                Sri Lanka journey
                            </h2>
                        </div>

                        <p className="max-w-xl leading-7 text-slate-600">
                            Combine culture,
                            scenery, wildlife
                            and beach time into
                            a realistic private
                            route designed
                            around your travel
                            dates and pace.
                        </p>
                    </div>

                    {destinations.length ===
                    0 ? (
                        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
                            <MapPin className="mx-auto mb-4 h-10 w-10 text-[#008D86]" />

                            <h3 className="text-xl font-bold text-slate-900">
                                Destinations are
                                being prepared
                            </h3>

                            <p className="mx-auto mt-3 max-w-xl text-slate-600">
                                No active
                                destinations were
                                returned by the
                                CRM. Add or
                                activate destination
                                records in the CRM
                                and refresh this
                                page.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
                            {destinations.map(
                                (
                                    destination
                                ) => (
                                    <article
                                        key={
                                            destination.id
                                        }
                                        className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                                    >
                                        <Link
                                            href={`/sri-lanka-destinations/${destination.slug}`}
                                            className="block"
                                        >
                                            <div className="relative h-72 overflow-hidden bg-slate-100">
                                                <DestinationImage
                                                    imageUrl={
                                                        destination.imageUrl
                                                    }
                                                    name={
                                                        destination.name
                                                    }
                                                />

                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

                                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                                    <span className="mb-2 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur">
                                                        {
                                                            destination.category
                                                        }
                                                    </span>

                                                    <h2 className="text-2xl font-bold">
                                                        {
                                                            destination.name
                                                        }
                                                    </h2>

                                                    {destination.region && (
                                                        <div className="mt-2 flex items-center gap-2 text-sm text-white/80">
                                                            <MapPin className="h-4 w-4" />

                                                            {
                                                                destination.region
                                                            }
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="p-6">
                                                <p className="line-clamp-3 min-h-[4.5rem] leading-6 text-slate-600">
                                                    {destination.shortDescription ||
                                                        destination.description ||
                                                        `Explore ${destination.name} with a private Dream Ceylon Journeys chauffeur-guide.`}
                                                </p>

                                                {destination.bestTime && (
                                                    <div className="mt-5 flex items-start gap-3 rounded-2xl bg-[#008D86]/[0.07] p-4">
                                                        <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-[#008D86]" />

                                                        <div>
                                                            <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                                                                Best time
                                                            </span>

                                                            <span className="mt-1 block text-sm font-semibold text-slate-800">
                                                                {
                                                                    destination.bestTime
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="mt-6 inline-flex items-center gap-2 font-bold text-[#008D86]">
                                                    Explore destination

                                                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
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
                <div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] bg-white p-8 shadow-sm lg:grid-cols-[1fr_auto] lg:items-center lg:p-12">
                    <div>
                        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#C62D52]">
                            Tailor-made travel
                        </p>

                        <h2 className="text-3xl font-bold text-slate-900">
                            Not sure which
                            destinations fit
                            your trip?
                        </h2>

                        <p className="mt-4 max-w-3xl leading-7 text-slate-600">
                            Tell us your travel
                            dates, interests,
                            preferred pace and
                            number of travellers.
                            We will arrange a
                            practical Sri Lanka
                            route with private
                            transport.
                        </p>
                    </div>

                    <Link
                        href="/#custom-tour"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C62D52] px-7 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#A92343]"
                    >
                        Build My Sri Lanka Tour

                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>
        </main>
    );
}