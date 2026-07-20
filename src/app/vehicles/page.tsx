import type {
    Metadata,
} from "next";

import Link from "next/link";

import {
    ArrowRight,
    CarFront,
    Check,
    CircleDollarSign,
    Luggage,
    ShieldCheck,
    Snowflake,
    UsersRound,
} from "lucide-react";

import {
    getVehicles,
    type WebsiteVehicle,
} from "@/lib/vehicles";

const siteUrl =
    process.env
        .NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

export const metadata: Metadata = {
    title:
        "Private Vehicles in Sri Lanka | Cars, SUVs & Tour Vans",

    description:
        "Choose private air-conditioned cars, SUVs, vans and group vehicles for airport transfers, day tours and private Sri Lanka round tours.",

    alternates: {
        canonical:
            `${siteUrl}/vehicles`,
    },

    openGraph: {
        title:
            "Private Sri Lanka Tour Vehicles | Dream Ceylon Journeys",

        description:
            "Explore private cars, SUVs and tour vans suitable for couples, families and groups travelling around Sri Lanka.",

        url:
            `${siteUrl}/vehicles`,

        siteName:
            "Dream Ceylon Journeys",

        type:
            "website",
    },
};

function formatPrice(
    vehicle: WebsiteVehicle
): string {
    if (
        vehicle.pricePerDay ===
        null
    ) {
        return "Request a quotation";
    }

    try {
        return new Intl.NumberFormat(
            "en-US",
            {
                style:
                    "currency",

                currency:
                    vehicle.currency ||
                    "USD",

                maximumFractionDigits:
                    0,
            }
        ).format(
            vehicle.pricePerDay
        );
    } catch {
        return `${vehicle.currency} ${vehicle.pricePerDay.toLocaleString()}`;
    }
}

function VehicleImage({
                          vehicle,
                      }: {
    vehicle: WebsiteVehicle;
}) {
    if (!vehicle.imageUrl) {
        return (
            <div
                className="
                    absolute inset-0
                    flex items-center
                    justify-center
                    bg-gradient-to-br
                    from-[#eaf4f1]
                    via-[#f7faf9]
                    to-[#dcebe6]
                    px-6
                    text-center
                "
            >
                <div>
                    <div
                        className="
                            mx-auto
                            flex h-24 w-24
                            items-center
                            justify-center
                            rounded-[2rem]
                            bg-white
                            text-[#008D86]
                            shadow-lg
                        "
                    >
                        <CarFront
                            className="h-12 w-12"
                            strokeWidth={1.6}
                            aria-hidden="true"
                        />
                    </div>

                    <p
                        className="
                            mt-5
                            font-bold
                            text-slate-800
                        "
                    >
                        {vehicle.name}
                    </p>
                </div>
            </div>
        );
    }

    return (
        // Vehicle images are supplied dynamically by the CRM.
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={
                vehicle.imageUrl
            }
            alt={`${vehicle.name} private vehicle in Sri Lanka`}
            loading="lazy"
            className="
                absolute inset-0
                h-full w-full
                object-contain
                px-7 pb-8 pt-14
                transition
                duration-500
                group-hover:-translate-y-2
                group-hover:scale-[1.03]
            "
        />
    );
}

function VehicleCard({
                         vehicle,
                         index,
                     }: {
    vehicle: WebsiteVehicle;
    index: number;
}) {
    const inquiryUrl =
        `/plan-your-tour?vehicle=${encodeURIComponent(
            vehicle.slug
        )}`;

    return (
        <article
            className="
                group
                flex h-full
                flex-col
                overflow-hidden
                rounded-[2rem]
                border
                border-slate-200
                bg-white
                shadow-[0_18px_55px_rgba(20,40,37,0.07)]
                transition
                duration-500
                hover:-translate-y-1.5
                hover:border-[#008D86]/25
                hover:shadow-[0_28px_75px_rgba(20,40,37,0.13)]
            "
        >
            <div
                className="
                    relative isolate
                    min-h-[290px]
                    overflow-hidden
                    bg-[#f1f5f3]
                    sm:min-h-[320px]
                "
            >
                <div
                    aria-hidden="true"
                    className="
                        absolute
                        inset-x-[15%]
                        bottom-10
                        z-0
                        h-8
                        rounded-[50%]
                        bg-black/10
                        blur-xl
                    "
                />

                <VehicleImage
                    vehicle={
                        vehicle
                    }
                />

                <span
                    className="
                        absolute
                        left-5 top-5
                        z-20
                        rounded-full
                        border
                        border-slate-200
                        bg-white/90
                        px-4 py-2
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.18em]
                        text-[#006D68]
                        shadow-sm
                        backdrop-blur
                    "
                >
                    Private{" "}
                    {vehicle.type}
                </span>

                {vehicle.featured && (
                    <span
                        className="
                            absolute
                            right-5 top-5
                            z-20
                            rounded-full
                            bg-[#FEC52E]
                            px-4 py-2
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.16em]
                            text-[#173F3B]
                            shadow-sm
                        "
                    >
                        Featured
                    </span>
                )}

                <span
                    className="
                        absolute
                        bottom-5 right-5
                        z-20
                        font-display
                        text-sm
                        font-bold
                        tracking-[0.15em]
                        text-slate-400
                    "
                >
                    {String(
                        index + 1
                    ).padStart(
                        2,
                        "0"
                    )}
                </span>
            </div>

            <div
                className="
                    flex flex-1
                    flex-col
                    p-6
                    sm:p-8
                "
            >
                <div
                    className="
                        flex flex-wrap
                        gap-x-5 gap-y-3
                        text-xs
                        font-semibold
                        text-slate-500
                    "
                >
                    <span
                        className="
                            inline-flex
                            items-center
                            gap-2
                        "
                    >
                        <UsersRound
                            className="h-4 w-4 text-[#008D86]"
                            aria-hidden="true"
                        />

                        Up to{" "}
                        {vehicle.capacity}{" "}
                        {vehicle.capacity ===
                        1
                            ? "passenger"
                            : "passengers"}
                    </span>

                    <span
                        className="
                            inline-flex
                            items-center
                            gap-2
                        "
                    >
                        <Snowflake
                            className="h-4 w-4 text-[#008D86]"
                            aria-hidden="true"
                        />

                        Air-conditioned
                    </span>
                </div>

                <h2
                    className="
                        mt-5
                        font-display
                        text-3xl
                        font-semibold
                        leading-tight
                        tracking-[-0.03em]
                        text-slate-900
                    "
                >
                    {vehicle.name}
                </h2>

                <p
                    className="
                        mt-4
                        leading-7
                        text-slate-600
                    "
                >
                    {vehicle.shortDescription ||
                        vehicle.description}
                </p>

                {vehicle.features.length >
                    0 && (
                        <div
                            className="
                            mt-6
                            space-y-3
                        "
                        >
                            {vehicle.features
                                .slice(
                                    0,
                                    4
                                )
                                .map(
                                    (
                                        feature,
                                        featureIndex
                                    ) => (
                                        <div
                                            key={`${feature}-${featureIndex}`}
                                            className="
                                            flex
                                            items-start
                                            gap-3
                                            text-sm
                                            leading-6
                                            text-slate-600
                                        "
                                        >
                                        <span
                                            className="
                                                mt-0.5
                                                flex h-5 w-5
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-[#008D86]/10
                                                text-[#008D86]
                                            "
                                        >
                                            <Check
                                                className="h-3 w-3"
                                                strokeWidth={3}
                                                aria-hidden="true"
                                            />
                                        </span>

                                            <span>
                                            {
                                                feature
                                            }
                                        </span>
                                        </div>
                                    )
                                )}
                        </div>
                    )}

                <div
                    className="
                        mt-auto
                        pt-8
                    "
                >
                    <div
                        className="
                            border-t
                            border-slate-200
                            pt-6
                        "
                    >
                        <p
                            className="
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.18em]
                                text-slate-400
                            "
                        >
                            {vehicle.pricePerDay ===
                            null
                                ? "Price"
                                : "Starting from"}
                        </p>

                        <div
                            className="
                                mt-2
                                flex flex-wrap
                                items-end
                                justify-between
                                gap-4
                            "
                        >
                            <div
                                className="
                                    flex
                                    items-end
                                    gap-2
                                "
                            >
                                <p
                                    className="
                                        text-2xl
                                        font-bold
                                        text-[#006D68]
                                    "
                                >
                                    {formatPrice(
                                        vehicle
                                    )}
                                </p>

                                {vehicle.pricePerDay !==
                                    null && (
                                        <span
                                            className="
                                            pb-1
                                            text-xs
                                            font-semibold
                                            text-slate-400
                                        "
                                        >
                                        / day
                                    </span>
                                    )}
                            </div>

                            <Link
                                href={
                                    inquiryUrl
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
                                    shadow-lg
                                    transition
                                    hover:-translate-y-0.5
                                    hover:bg-[#A92343]
                                "
                            >
                                Request

                                <ArrowRight
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div
                aria-hidden="true"
                className="
                    h-1
                    origin-left
                    scale-x-0
                    bg-[#FEC52E]
                    transition-transform
                    duration-500
                    group-hover:scale-x-100
                "
            />
        </article>
    );
}

export default async function VehiclesPage() {
    let vehicles:
        WebsiteVehicle[] = [];

    try {
        vehicles =
            await getVehicles();
    } catch (error) {
        console.error(
            "[Vehicles Page]",
            error
        );
    }

    const vehicleTypes =
        Array.from(
            new Set(
                vehicles.map(
                    (vehicle) =>
                        vehicle.type
                )
            )
        );

    const vehicleJsonLd = {
        "@context":
            "https://schema.org",

        "@type":
            "ItemList",

        name:
            "Private Sri Lanka Tour Vehicles",

        url:
            `${siteUrl}/vehicles`,

        numberOfItems:
        vehicles.length,

        itemListElement:
            vehicles.map(
                (
                    vehicle,
                    index
                ) => ({
                    "@type":
                        "ListItem",

                    position:
                        index + 1,

                    name:
                    vehicle.name,

                    description:
                        vehicle.shortDescription ||
                        vehicle.description,

                    url:
                        `${siteUrl}/plan-your-tour?vehicle=${encodeURIComponent(
                            vehicle.slug
                        )}`,
                })
            ),
    };

    return (
        <main className="bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html:
                        JSON.stringify(
                            vehicleJsonLd
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
                    overflow-hidden
                    bg-[#043F3B]
                    px-6
                    pb-24 pt-32
                    text-white
                    sm:pb-28
                    sm:pt-40
                "
            >
                <div
                    aria-hidden="true"
                    className="
                        absolute
                        -right-32 -top-32
                        -z-10
                        h-96 w-96
                        rounded-full
                        bg-[#FEC52E]/15
                        blur-3xl
                    "
                />

                <div
                    aria-hidden="true"
                    className="
                        absolute
                        -bottom-40 -left-32
                        -z-10
                        h-[420px] w-[420px]
                        rounded-full
                        bg-[#C62D52]/25
                        blur-3xl
                    "
                />

                <div
                    className="
                        mx-auto
                        max-w-7xl
                    "
                >
                    <p
                        className="
                            text-sm
                            font-bold
                            uppercase
                            tracking-[0.25em]
                            text-[#FEC52E]
                        "
                    >
                        Private transportation
                    </p>

                    <h1
                        className="
                            mt-5
                            max-w-5xl
                            font-display
                            text-4xl
                            font-semibold
                            leading-tight
                            sm:text-5xl
                            lg:text-7xl
                        "
                    >
                        Comfortable vehicles for
                        every Sri Lanka journey
                    </h1>

                    <p
                        className="
                            mt-7
                            max-w-3xl
                            text-lg
                            leading-8
                            text-white/75
                        "
                    >
                        Select a private
                        air-conditioned car, SUV,
                        van or group vehicle based
                        on your party size, luggage,
                        route and preferred travel
                        style.
                    </p>

                    <div
                        className="
                            mt-9
                            flex flex-wrap
                            gap-3
                        "
                    >
                        {vehicleTypes.map(
                            (type) => (
                                <span
                                    key={
                                        type
                                    }
                                    className="
                                        rounded-full
                                        border
                                        border-white/20
                                        bg-white/10
                                        px-5 py-2.5
                                        text-sm
                                        font-semibold
                                        backdrop-blur
                                    "
                                >
                                    {type}
                                </span>
                            )
                        )}
                    </div>
                </div>
            </section>

            {/* Service information */}
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
                        mx-auto
                        grid max-w-7xl
                        gap-6
                        sm:grid-cols-2
                        lg:grid-cols-4
                    "
                >
                    <div className="flex items-center gap-4">
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
                            <Snowflake className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="font-bold text-slate-900">
                                Air-conditioned
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                                Comfortable private
                                transport
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
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
                            <ShieldCheck className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="font-bold text-slate-900">
                                Experienced drivers
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                                Reliable local
                                chauffeur service
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
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
                            <Luggage className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="font-bold text-slate-900">
                                Luggage considered
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                                Vehicle matched to
                                your requirements
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div
                            className="
                                flex h-12 w-12
                                shrink-0
                                items-center
                                justify-center
                                rounded-2xl
                                bg-[#C62D52]/10
                                text-[#C62D52]
                            "
                        >
                            <CircleDollarSign className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="font-bold text-slate-900">
                                Transparent rates
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                                Starting daily prices
                                displayed
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vehicle listing */}
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
                        max-w-7xl
                    "
                >
                    <div
                        className="
                            max-w-3xl
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
                            Available vehicles
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
                            Choose the right vehicle
                            for your journey
                        </h2>

                        <p
                            className="
                                mt-5
                                text-lg
                                leading-8
                                text-slate-600
                            "
                        >
                            The final vehicle
                            recommendation will depend
                            on passenger count,
                            luggage, road conditions
                            and tour duration.
                        </p>
                    </div>

                    {vehicles.length >
                    0 ? (
                        <div
                            className="
                                mt-12
                                grid gap-7
                                md:grid-cols-2
                                xl:grid-cols-3
                            "
                        >
                            {vehicles.map(
                                (
                                    vehicle,
                                    index
                                ) => (
                                    <VehicleCard
                                        key={
                                            vehicle.id
                                        }
                                        vehicle={
                                            vehicle
                                        }
                                        index={
                                            index
                                        }
                                    />
                                )
                            )}
                        </div>
                    ) : (
                        <div
                            className="
                                mt-12
                                rounded-[2rem]
                                border
                                border-dashed
                                border-slate-300
                                bg-[#F7FAF9]
                                px-6 py-20
                                text-center
                            "
                        >
                            <CarFront
                                className="
                                    mx-auto
                                    h-16 w-16
                                    text-[#008D86]
                                "
                                strokeWidth={1.5}
                            />

                            <h2
                                className="
                                    mt-6
                                    text-3xl
                                    font-bold
                                    text-slate-900
                                "
                            >
                                No vehicles are
                                currently available
                            </h2>

                            <p
                                className="
                                    mx-auto
                                    mt-4
                                    max-w-xl
                                    leading-7
                                    text-slate-600
                                "
                            >
                                Add active vehicles
                                through the Dream
                                Ceylon CRM to display
                                them on this page.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Final CTA */}
            <section
                className="
                    bg-[#F7FAF9]
                    px-6 py-20
                "
            >
                <div
                    className="
                        relative
                        mx-auto
                        max-w-7xl
                        overflow-hidden
                        rounded-[2.5rem]
                        bg-[#043F3B]
                        p-8
                        text-white
                        shadow-xl
                        sm:p-12
                        lg:p-16
                    "
                >
                    <div
                        aria-hidden="true"
                        className="
                            absolute
                            -right-24 -top-24
                            h-72 w-72
                            rounded-full
                            bg-[#FEC52E]/15
                            blur-3xl
                        "
                    />

                    <div
                        aria-hidden="true"
                        className="
                            absolute
                            -bottom-28 -left-20
                            h-72 w-72
                            rounded-full
                            bg-[#C62D52]/20
                            blur-3xl
                        "
                    />

                    <div
                        className="
                            relative
                            max-w-4xl
                        "
                    >
                        <p
                            className="
                                text-sm
                                font-bold
                                uppercase
                                tracking-[0.22em]
                                text-[#FEC52E]
                            "
                        >
                            Need help choosing?
                        </p>

                        <h2
                            className="
                                mt-4
                                font-display
                                text-3xl
                                font-semibold
                                sm:text-4xl
                                lg:text-5xl
                            "
                        >
                            Tell us your group size
                            and travel plans
                        </h2>

                        <p
                            className="
                                mt-5
                                max-w-3xl
                                text-lg
                                leading-8
                                text-white/75
                            "
                        >
                            Our team will recommend a
                            suitable vehicle based on
                            your travellers, luggage,
                            destination route and
                            journey duration.
                        </p>

                        <Link
                            href="/plan-your-tour"
                            className="
                                mt-8
                                inline-flex
                                min-h-14
                                items-center
                                justify-center
                                gap-2
                                rounded-full
                                bg-[#FEC52E]
                                px-8
                                font-bold
                                text-[#173F3B]
                                transition
                                hover:-translate-y-0.5
                                hover:bg-white
                            "
                        >
                            Plan Your Journey

                            <ArrowRight
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}