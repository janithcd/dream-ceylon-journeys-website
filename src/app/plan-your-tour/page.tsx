import type {
    Metadata,
} from "next";
import Image from "next/image";
import {
    CalendarDays,
    CarFront,
    CheckCircle2,
    Headphones,
    MapPinned,
    Route,
    ShieldCheck,
    Sparkles,
} from "lucide-react";

import {
    PlanYourTourForm,
    type PlanOption,
} from "@/components/inquiries/PlanYourTourForm";

import {
    getDestinations,
} from "@/lib/destinations";

import {
    getTours,
} from "@/lib/tours";

import {
    getVehicles,
} from "@/lib/vehicles";

const siteUrl =
    process.env
        .NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

export const metadata: Metadata = {
    title:
        "Plan Your Sri Lanka Tour | Custom Private Journey",

    description:
        "Plan a tailor-made private Sri Lanka tour with a local chauffeur-guide, comfortable vehicle, customised route and personal travel support.",

    alternates: {
        canonical:
            `${siteUrl}/plan-your-tour`,
    },

    openGraph: {
        title:
            "Plan Your Sri Lanka Tour | Dream Ceylon Journeys",

        description:
            "Share your travel dates, interests and preferred destinations to receive a customised private Sri Lanka tour plan.",

        url:
            `${siteUrl}/plan-your-tour`,

        siteName:
            "Dream Ceylon Journeys",

        type:
            "website",
    },
};

type PageSearchParams = {
    tour?:
        | string
        | string[];

    vehicle?:
        | string
        | string[];

    destination?:
        | string
        | string[];
};

type PlanYourTourPageProps = {
    searchParams:
        Promise<PageSearchParams>;
};

type DestinationRecord = {
    id?: unknown;
    _id?: unknown;
    slug?: unknown;
    name?: unknown;
    province?: unknown;
    category?: unknown;
};

function getFirstValue(
    value:
        | string
        | string[]
        | undefined
): string {
    if (
        Array.isArray(value)
    ) {
        return (
            value[0] || ""
        );
    }

    return value || "";
}

function getString(
    value: unknown
): string {
    return typeof value ===
    "string"
        ? value.trim()
        : "";
}

function slugify(
    value: string
): string {
    return value
        .toLowerCase()
        .trim()
        .replace(/['’]/g, "")
        .replace(
            /[^a-z0-9]+/g,
            "-"
        )
        .replace(
            /^-+|-+$/g,
            ""
        );
}

export default async function PlanYourTourPage({
                                                   searchParams,
                                               }: PlanYourTourPageProps) {
    const query =
        await searchParams;

    const [
        toursResult,
        vehiclesResult,
        destinationsResult,
    ] =
        await Promise.allSettled([
            getTours(),
            getVehicles(),
            getDestinations(),
        ]);

    const tours =
        toursResult.status ===
        "fulfilled"
            ? toursResult.value
            : [];

    const vehicles =
        vehiclesResult.status ===
        "fulfilled"
            ? vehiclesResult.value
            : [];

    const destinations =
        destinationsResult.status ===
        "fulfilled"
            ? destinationsResult.value
            : [];

    if (
        toursResult.status ===
        "rejected"
    ) {
        console.error(
            "[Plan Tour Packages]",
            toursResult.reason
        );
    }

    if (
        vehiclesResult.status ===
        "rejected"
    ) {
        console.error(
            "[Plan Tour Vehicles]",
            vehiclesResult.reason
        );
    }

    if (
        destinationsResult.status ===
        "rejected"
    ) {
        console.error(
            "[Plan Tour Destinations]",
            destinationsResult.reason
        );
    }

    const tourOptions:
        PlanOption[] =
        tours.map(
            (tour) => ({
                id:
                tour.id,

                slug:
                tour.slug,

                label:
                tour.title,

                meta:
                tour.durationLabel,
            })
        );

    const vehicleOptions:
        PlanOption[] =
        vehicles.map(
            (vehicle) => ({
                id:
                vehicle.id,

                slug:
                vehicle.slug,

                label:
                vehicle.name,

                meta:
                    `Private ${vehicle.type} • Up to ${vehicle.capacity} passengers`,
            })
        );

    const destinationOptions:
        PlanOption[] =
        (
            destinations as unknown as DestinationRecord[]
        )
            .map(
                (
                    destination
                ): PlanOption | null => {
                    const name =
                        getString(
                            destination.name
                        );

                    if (!name) {
                        return null;
                    }

                    const id =
                        getString(
                            destination.id ??
                            destination._id
                        ) ||
                        slugify(
                            name
                        );

                    const slug =
                        getString(
                            destination.slug
                        ) ||
                        slugify(
                            name
                        );

                    const meta =
                        [
                            getString(
                                destination.province
                            ),

                            getString(
                                destination.category
                            ),
                        ]
                            .filter(
                                Boolean
                            )
                            .join(
                                " • "
                            );

                    return {
                        id,
                        slug,
                        label:
                        name,

                        meta:
                            meta ||
                            undefined,
                    };
                }
            )
            .filter(
                (
                    destination
                ): destination is PlanOption =>
                    destination !==
                    null
            );

    const tourSlug =
        getFirstValue(
            query.tour
        );

    const vehicleSlug =
        getFirstValue(
            query.vehicle
        );

    const destinationSlug =
        getFirstValue(
            query.destination
        );

    const initialTourId =
        tourOptions.find(
            (option) =>
                option.slug ===
                tourSlug
        )?.id || "";

    const initialVehicleId =
        vehicleOptions.find(
            (option) =>
                option.slug ===
                vehicleSlug
        )?.id || "";

    const initialDestinationIds =
        destinationOptions
            .filter(
                (option) =>
                    option.slug ===
                    destinationSlug
            )
            .map(
                (option) =>
                    option.id
            );

    const pageJsonLd = {
        "@context":
            "https://schema.org",

        "@type":
            "ContactPage",

        name:
            "Plan Your Sri Lanka Tour",

        description:
            "Submit a request for a tailor-made private Sri Lanka tour.",

        url:
            `${siteUrl}/plan-your-tour`,

        mainEntity: {
            "@type":
                "TravelAgency",

            name:
                "Dream Ceylon Journeys",

            areaServed: {
                "@type":
                    "Country",

                name:
                    "Sri Lanka",
            },
        },
    };

    return (
        <main className="bg-[#F7FAF9]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html:
                        JSON.stringify(
                            pageJsonLd
                        ).replace(
                            /</g,
                            "\\u003c"
                        ),
                }}
            />

            {/* Hero */}
            <section
                className="
        relative isolate
        min-h-[680px]
        overflow-hidden
        px-6
        pb-24 pt-32
        text-white
        sm:min-h-[720px]
        sm:pb-28
        sm:pt-40
        lg:min-h-[760px]
    "
            >
                {/* Hero background image */}
                <Image
                    src="/images/plan-your-tour/plan-your-tour-hero.webp"
                    alt="Travellers enjoying a private tailor-made journey through Sri Lanka"
                    fill
                    priority
                    sizes="100vw"
                    className="
            absolute inset-0
            -z-40
            object-cover
            object-center
        "
                />

                {/* Main dark overlay */}
                <div
                    aria-hidden="true"
                    className="
            absolute inset-0
            -z-30
            bg-[#032F2C]/45
        "
                />

                {/* Text readability gradient */}
                <div
                    aria-hidden="true"
                    className="
            absolute inset-0
            -z-20
            bg-gradient-to-r
            from-[#032F2C]/95
            via-[#043F3B]/80
            to-[#043F3B]/35
        "
                />

                {/* Bottom gradient */}
                <div
                    aria-hidden="true"
                    className="
            absolute inset-x-0
            bottom-0
            -z-10
            h-48
            bg-gradient-to-t
            from-[#043F3B]/80
            to-transparent
        "
                />

                {/* Decorative brand lighting */}
                <div
                    aria-hidden="true"
                    className="
            absolute
            -right-36 -top-32
            -z-10
            h-[440px] w-[440px]
            rounded-full
            bg-[#FEC52E]/15
            blur-3xl
        "
                />

                <div
                    aria-hidden="true"
                    className="
            absolute
            -bottom-44 -left-36
            -z-10
            h-[440px] w-[440px]
            rounded-full
            bg-[#C62D52]/20
            blur-3xl
        "
                />

                <div
                    className="
            relative
            mx-auto
            grid min-h-[500px]
            max-w-7xl
            gap-12
            lg:grid-cols-[1.15fr_0.85fr]
            lg:items-end
        "
                >
                    <div>
                        <div
                            className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/25
                    bg-black/15
                    px-4 py-2
                    text-sm
                    font-semibold
                    shadow-sm
                    backdrop-blur-md
                "
                        >
                            <Sparkles
                                className="
                        h-4 w-4
                        text-[#FEC52E]
                    "
                                aria-hidden="true"
                            />

                            Tailor-made private journeys
                        </div>

                        <h1
                            className="
                    mt-7
                    max-w-5xl
                    font-display
                    text-4xl
                    font-semibold
                    leading-tight
                    drop-shadow-[0_4px_18px_rgba(0,0,0,0.3)]
                    sm:text-5xl
                    lg:text-7xl
                "
                        >
                            Plan your perfect Sri Lanka journey
                        </h1>

                        <p
                            className="
                    mt-7
                    max-w-3xl
                    text-lg
                    leading-8
                    text-white/85
                    drop-shadow-md
                "
                        >
                            Share your travel dates, interests,
                            destinations and preferred comfort
                            level. Our local team will design a
                            realistic private route around your
                            journey.
                        </p>
                    </div>

                    <div
                        className="
                grid gap-4
                sm:grid-cols-2
                lg:grid-cols-1
            "
                    >
                        <div
                            className="
                    flex items-start
                    gap-4
                    rounded-3xl
                    border
                    border-white/20
                    bg-[#043F3B]/55
                    p-5
                    shadow-lg
                    backdrop-blur-md
                "
                        >
                            <Route
                                className="
                        mt-1 h-6 w-6
                        shrink-0
                        text-[#FEC52E]
                    "
                                aria-hidden="true"
                            />

                            <div>
                                <p className="font-bold">
                                    Custom route planning
                                </p>

                                <p
                                    className="
                            mt-1
                            text-sm
                            leading-6
                            text-white/75
                        "
                                >
                                    Realistic travel times,
                                    destinations and daily pacing.
                                </p>
                            </div>
                        </div>

                        <div
                            className="
                    flex items-start
                    gap-4
                    rounded-3xl
                    border
                    border-white/20
                    bg-[#043F3B]/55
                    p-5
                    shadow-lg
                    backdrop-blur-md
                "
                        >
                            <CarFront
                                className="
                        mt-1 h-6 w-6
                        shrink-0
                        text-[#FEC52E]
                    "
                                aria-hidden="true"
                            />

                            <div>
                                <p className="font-bold">
                                    Private transportation
                                </p>

                                <p
                                    className="
                            mt-1
                            text-sm
                            leading-6
                            text-white/75
                        "
                                >
                                    Vehicle selected for your
                                    travellers, route and luggage.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust strip */}
            <section
                className="
                    border-b
                    border-slate-200
                    bg-white
                    px-6 py-8
                "
            >
                <div
                    className="
                        mx-auto
                        grid max-w-7xl
                        gap-6
                        sm:grid-cols-2
                        lg:grid-cols-4
                    "
                >
                    <div className="flex items-center gap-4">
                        <ShieldCheck className="h-7 w-7 text-[#008D86]" />

                        <div>
                            <p className="font-bold text-slate-900">
                                Local expertise
                            </p>

                            <p className="text-sm text-slate-500">
                                Sri Lanka-based planning
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <MapPinned className="h-7 w-7 text-[#008D86]" />

                        <div>
                            <p className="font-bold text-slate-900">
                                Flexible itineraries
                            </p>

                            <p className="text-sm text-slate-500">
                                Planned around your interests
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <CalendarDays className="h-7 w-7 text-[#008D86]" />

                        <div>
                            <p className="font-bold text-slate-900">
                                Date-based planning
                            </p>

                            <p className="text-sm text-slate-500">
                                Season and route considered
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Headphones className="h-7 w-7 text-[#C62D52]" />

                        <div>
                            <p className="font-bold text-slate-900">
                                Personal support
                            </p>

                            <p className="text-sm text-slate-500">
                                Direct communication
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Form */}
            <section
                className="
                    px-6
                    py-20
                    sm:py-24
                "
            >
                <div
                    className="
                        mx-auto
                        grid max-w-7xl
                        gap-12
                        lg:grid-cols-[0.72fr_1.28fr]
                        lg:items-start
                    "
                >
                    <aside
                        className="
                            h-fit
                            lg:sticky
                            lg:top-28
                        "
                    >
                        <p
                            className="
                                text-sm
                                font-bold
                                uppercase
                                tracking-[0.22em]
                                text-[#C62D52]
                            "
                        >
                            Your private journey
                        </p>

                        <h2
                            className="
                                mt-4
                                font-display
                                text-3xl
                                font-semibold
                                text-slate-900
                                sm:text-5xl
                            "
                        >
                            Tell us what your ideal
                            Sri Lanka holiday looks like
                        </h2>

                        <p
                            className="
                                mt-6
                                text-lg
                                leading-8
                                text-slate-600
                            "
                        >
                            You do not need to have
                            every detail confirmed.
                            Estimated dates and a basic
                            idea of your interests are
                            enough to begin planning.
                        </p>

                        <div
                            className="
                                mt-8
                                space-y-4
                            "
                        >
                            {[
                                "Choose your destinations and travel style",
                                "Select a suitable tour package or request a custom route",
                                "Tell us your group size and vehicle preference",
                                "Receive a personalised itinerary and quotation",
                            ].map(
                                (
                                    item,
                                    index
                                ) => (
                                    <div
                                        key={
                                            item
                                        }
                                        className="
                                            flex
                                            items-start
                                            gap-4
                                            rounded-2xl
                                            border
                                            border-slate-200
                                            bg-white
                                            p-4
                                        "
                                    >
                                        <span
                                            className="
                                                flex h-8 w-8
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-[#008D86]
                                                text-sm
                                                font-bold
                                                text-white
                                            "
                                        >
                                            {index +
                                                1}
                                        </span>

                                        <span className="pt-1 text-sm font-semibold leading-6 text-slate-700">
                                            {
                                                item
                                            }
                                        </span>
                                    </div>
                                )
                            )}
                        </div>

                        <div
                            className="
                                mt-6
                                flex items-start
                                gap-3
                                rounded-2xl
                                bg-[#043F3B]
                                p-5
                                text-white
                            "
                        >
                            <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#FEC52E]" />

                            <p className="text-sm leading-6 text-white/75">
                                Submitting this form does
                                not confirm a booking. Our
                                team will first review your
                                requirements and prepare
                                the appropriate proposal.
                            </p>
                        </div>
                    </aside>

                    <PlanYourTourForm
                        tourOptions={
                            tourOptions
                        }
                        vehicleOptions={
                            vehicleOptions
                        }
                        destinationOptions={
                            destinationOptions
                        }
                        initialTourId={
                            initialTourId
                        }
                        initialVehicleId={
                            initialVehicleId
                        }
                        initialDestinationIds={
                            initialDestinationIds
                        }
                    />
                </div>
            </section>
        </main>
    );
}