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
    CarFront,
    Check,
    CircleDollarSign,
    Luggage,
    Route,
    ShieldCheck,
    Snowflake,
    Sparkles,
    UsersRound,
} from "lucide-react";

import {
    VehicleInquiryButton,
} from "@/components/vehicles/VehicleInquiryButton";

import {
    getVehicleBySlug,
    getVehicles,
    type WebsiteVehicle,
} from "@/lib/vehicles";

const siteUrl =
    process.env
        .NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

type VehiclePageProps = {
    params: Promise<{
        slug: string;
    }>;
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

function getDescription(
    vehicle: WebsiteVehicle
): string {
    return (
        vehicle.description ||
        vehicle.shortDescription ||
        `Travel around Sri Lanka in a private ${vehicle.type.toLowerCase()} with Dream Ceylon Journeys.`
    );
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
                    flex h-full min-h-[390px]
                    items-center justify-center
                    rounded-[2.5rem]
                    bg-gradient-to-br
                    from-[#eef5f2]
                    via-[#f8faf9]
                    to-[#dbeae5]
                    text-[#008D86]
                "
            >
                <CarFront
                    className="h-28 w-28"
                    strokeWidth={1.3}
                />
            </div>
        );
    }

    return (
        // Vehicle image is supplied dynamically by the CRM.
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={vehicle.imageUrl}
            alt={`${vehicle.name} private vehicle in Sri Lanka`}
            className="
                h-full
                min-h-[390px]
                w-full
                object-contain
                p-8
                sm:p-12
            "
        />
    );
}

export async function generateStaticParams() {
    try {
        const vehicles =
            await getVehicles();

        return vehicles.map(
            (vehicle) => ({
                slug:
                vehicle.slug,
            })
        );
    } catch (error) {
        console.error(
            "[Vehicle Static Params]",
            error
        );

        return [];
    }
}

export async function generateMetadata({
                                           params,
                                       }: VehiclePageProps): Promise<Metadata> {
    const {
        slug,
    } = await params;

    try {
        const vehicle =
            await getVehicleBySlug(
                slug
            );

        if (!vehicle) {
            return {
                title:
                    "Vehicle Not Found",

                robots: {
                    index: false,
                    follow: false,
                },
            };
        }

        const canonicalUrl =
            `${siteUrl}/vehicles/${vehicle.slug}`;

        const description =
            getDescription(
                vehicle
            );

        return {
            title:
                `${vehicle.name} | Private Sri Lanka Vehicle`,

            description,

            alternates: {
                canonical:
                canonicalUrl,
            },

            openGraph: {
                title:
                    `${vehicle.name} | Dream Ceylon Journeys`,

                description,

                url:
                canonicalUrl,

                siteName:
                    "Dream Ceylon Journeys",

                type:
                    "website",

                images:
                    vehicle.imageUrl
                        ? [
                            {
                                url:
                                vehicle.imageUrl,

                                alt:
                                vehicle.name,
                            },
                        ]
                        : undefined,
            },

            twitter: {
                card:
                    "summary_large_image",

                title:
                vehicle.name,

                description,

                images:
                    vehicle.imageUrl
                        ? [
                            vehicle.imageUrl,
                        ]
                        : undefined,
            },
        };
    } catch (error) {
        console.error(
            "[Vehicle Metadata]",
            error
        );

        return {
            title:
                "Private Sri Lanka Vehicle",

            description:
                "Explore private tour vehicles with Dream Ceylon Journeys.",
        };
    }
}

export default async function VehicleDetailsPage({
                                                     params,
                                                 }: VehiclePageProps) {
    const {
        slug,
    } = await params;

    let vehicle:
        WebsiteVehicle | null =
        null;

    try {
        vehicle =
            await getVehicleBySlug(
                slug
            );
    } catch (error) {
        console.error(
            "[Vehicle Details]",
            error
        );
    }

    if (!vehicle) {
        notFound();
    }

    const canonicalUrl =
        `${siteUrl}/vehicles/${vehicle.slug}`;

    const priceLabel =
        vehicle.pricePerDay ===
        null
            ? "Custom quotation"
            : `${formatPrice(vehicle)} per day`;

    const vehicleJsonLd = {
        "@context":
            "https://schema.org",

        "@type":
            "Service",

        name:
        vehicle.name,

        serviceType:
            `Private ${vehicle.type} transport in Sri Lanka`,

        description:
            getDescription(
                vehicle
            ),

        url:
        canonicalUrl,

        image:
            vehicle.imageUrl ||
            undefined,

        areaServed: {
            "@type":
                "Country",

            name:
                "Sri Lanka",
        },

        provider: {
            "@type":
                "TravelAgency",

            name:
                "Dream Ceylon Journeys",

            url:
            siteUrl,
        },

        offers:
            vehicle.pricePerDay !==
            null
                ? {
                    "@type":
                        "Offer",

                    price:
                    vehicle.pricePerDay,

                    priceCurrency:
                    vehicle.currency,

                    url:
                    canonicalUrl,
                }
                : undefined,
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
                    pb-20 pt-32
                    text-white
                    sm:pb-24
                    sm:pt-40
                "
            >
                <div
                    aria-hidden="true"
                    className="
                        absolute
                        -right-24 -top-24
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
                        -bottom-28 -left-24
                        -z-10
                        h-96 w-96
                        rounded-full
                        bg-[#C62D52]/20
                        blur-3xl
                    "
                />

                <div
                    className="
                        mx-auto
                        grid max-w-7xl
                        gap-12
                        lg:grid-cols-[1fr_0.9fr]
                        lg:items-center
                    "
                >
                    <div>
                        <Link
                            href="/vehicles"
                            className="
                                inline-flex
                                items-center
                                gap-2
                                text-sm
                                font-semibold
                                text-white/75
                                transition
                                hover:text-[#FEC52E]
                            "
                        >
                            <ArrowLeft className="h-4 w-4" />

                            Back to Vehicles
                        </Link>

                        <div className="mt-8 flex flex-wrap gap-3">
                            {vehicle.featured && (
                                <span
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-full
                                        bg-[#FEC52E]
                                        px-4 py-2
                                        text-sm
                                        font-bold
                                        text-[#173F3B]
                                    "
                                >
                                    <Sparkles className="h-4 w-4" />

                                    Featured Vehicle
                                </span>
                            )}

                            <span
                                className="
                                    rounded-full
                                    border
                                    border-white/20
                                    bg-white/10
                                    px-4 py-2
                                    text-sm
                                    font-semibold
                                    backdrop-blur
                                "
                            >
                                Private{" "}
                                {vehicle.type}
                            </span>
                        </div>

                        <h1
                            className="
                                mt-6
                                font-display
                                text-4xl
                                font-semibold
                                leading-tight
                                sm:text-5xl
                                lg:text-7xl
                            "
                        >
                            {vehicle.name}
                        </h1>

                        <p
                            className="
                                mt-6
                                max-w-3xl
                                text-lg
                                leading-8
                                text-white/75
                            "
                        >
                            {getDescription(
                                vehicle
                            )}
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <VehicleInquiryButton
                                vehicleId={
                                    vehicle.id
                                }
                                vehicleName={
                                    vehicle.name
                                }
                                vehicleType={
                                    vehicle.type
                                }
                                capacity={
                                    vehicle.capacity
                                }
                                priceLabel={
                                    priceLabel
                                }
                                label="Request This Vehicle"
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-full
                                    bg-[#FEC52E]
                                    px-7 py-4
                                    font-bold
                                    text-[#173F3B]
                                    shadow-lg
                                    transition
                                    hover:-translate-y-0.5
                                    hover:bg-white
                                "
                            />

                            <Link
                                href="/vehicles"
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-white/35
                                    bg-white/10
                                    px-7 py-4
                                    font-semibold
                                    text-white
                                    backdrop-blur
                                    transition
                                    hover:bg-white
                                    hover:text-[#043F3B]
                                "
                            >
                                Compare Vehicles

                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    <div
                        className="
                            overflow-hidden
                            rounded-[2.5rem]
                            border border-white/15
                            bg-white
                            shadow-[0_35px_100px_rgba(0,0,0,0.3)]
                        "
                    >
                        <VehicleImage
                            vehicle={
                                vehicle
                            }
                        />
                    </div>
                </div>
            </section>

            {/* Quick facts */}
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
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#008D86]/10 text-[#008D86]">
                            <UsersRound className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                Capacity
                            </p>

                            <p className="mt-1 font-bold text-slate-900">
                                Up to{" "}
                                {vehicle.capacity}{" "}
                                passengers
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#008D86]/10 text-[#008D86]">
                            <CarFront className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                Vehicle type
                            </p>

                            <p className="mt-1 font-bold text-slate-900">
                                {vehicle.type}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#008D86]/10 text-[#008D86]">
                            <Snowflake className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                Comfort
                            </p>

                            <p className="mt-1 font-bold text-slate-900">
                                Air-conditioned
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C62D52]/10 text-[#C62D52]">
                            <CircleDollarSign className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                Starting price
                            </p>

                            <p className="mt-1 font-bold text-slate-900">
                                {priceLabel}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Details */}
            <section className="px-6 py-20 sm:py-24">
                <div
                    className="
                        mx-auto
                        grid max-w-7xl
                        gap-12
                        lg:grid-cols-[1.35fr_0.65fr]
                    "
                >
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#C62D52]">
                            Vehicle overview
                        </p>

                        <h2 className="mt-4 font-display text-3xl font-semibold text-slate-900 sm:text-5xl">
                            Comfortable private transport
                            for your Sri Lanka journey
                        </h2>

                        <p className="mt-7 text-lg leading-8 text-slate-600">
                            {getDescription(
                                vehicle
                            )}
                        </p>

                        <div className="mt-10">
                            <h3 className="text-2xl font-bold text-slate-900">
                                Vehicle features
                            </h3>

                            {vehicle.features.length >
                            0 ? (
                                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                    {vehicle.features.map(
                                        (
                                            feature,
                                            index
                                        ) => (
                                            <div
                                                key={`${feature}-${index}`}
                                                className="
                                                    flex
                                                    items-start
                                                    gap-3
                                                    rounded-2xl
                                                    border
                                                    border-slate-200
                                                    bg-[#F7FAF9]
                                                    p-4
                                                    text-slate-700
                                                "
                                            >
                                                <span
                                                    className="
                                                        mt-0.5
                                                        flex h-6 w-6
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-full
                                                        bg-[#008D86]
                                                        text-white
                                                    "
                                                >
                                                    <Check className="h-3.5 w-3.5" />
                                                </span>

                                                <span className="leading-6">
                                                    {
                                                        feature
                                                    }
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            ) : (
                                <p className="mt-5 leading-7 text-slate-600">
                                    Final vehicle facilities
                                    will be confirmed when
                                    preparing your quotation.
                                </p>
                            )}
                        </div>
                    </div>

                    <aside
                        className="
                            h-fit
                            rounded-[2rem]
                            border
                            border-slate-200
                            bg-[#F7FAF9]
                            p-7
                            lg:sticky
                            lg:top-28
                        "
                    >
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#C62D52]">
                            Request this vehicle
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-slate-900">
                            {formatPrice(
                                vehicle
                            )}
                        </h2>

                        {vehicle.pricePerDay !==
                            null && (
                                <p className="mt-1 text-sm font-semibold text-slate-500">
                                    Starting daily rate
                                </p>
                            )}

                        <p className="mt-5 leading-7 text-slate-600">
                            Final pricing depends on
                            the route, mileage,
                            duration, seasonal demand
                            and pickup or drop-off
                            requirements.
                        </p>

                        <div className="mt-6 space-y-3 border-y border-slate-200 py-6 text-sm">
                            <div className="flex justify-between gap-4">
                                <span className="text-slate-500">
                                    Type
                                </span>

                                <span className="font-bold text-slate-900">
                                    {
                                        vehicle.type
                                    }
                                </span>
                            </div>

                            <div className="flex justify-between gap-4">
                                <span className="text-slate-500">
                                    Capacity
                                </span>

                                <span className="font-bold text-slate-900">
                                    {
                                        vehicle.capacity
                                    }{" "}
                                    passengers
                                </span>
                            </div>

                            <div className="flex justify-between gap-4">
                                <span className="text-slate-500">
                                    Service
                                </span>

                                <span className="font-bold text-slate-900">
                                    Private transport
                                </span>
                            </div>
                        </div>

                        <VehicleInquiryButton
                            vehicleId={
                                vehicle.id
                            }
                            vehicleName={
                                vehicle.name
                            }
                            vehicleType={
                                vehicle.type
                            }
                            capacity={
                                vehicle.capacity
                            }
                            priceLabel={
                                priceLabel
                            }
                            label="Request a Quotation"
                            className="
                                mt-6
                                flex w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-full
                                bg-[#C62D52]
                                px-6 py-4
                                font-bold
                                text-white
                                transition
                                hover:bg-[#A92343]
                            "
                        />

                        <div
                            className="
                                mt-6
                                flex items-start
                                gap-3
                                rounded-2xl
                                bg-white
                                p-4
                                text-sm
                                leading-6
                                text-slate-600
                            "
                        >
                            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#008D86]" />

                            Vehicle availability and
                            exact model will be
                            confirmed before final
                            booking.
                        </div>
                    </aside>
                </div>
            </section>

            {/* Service suitability */}
            <section className="bg-[#F7FAF9] px-6 py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="max-w-3xl">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#C62D52]">
                            Suitable services
                        </p>

                        <h2 className="mt-4 font-display text-3xl font-semibold text-slate-900 sm:text-5xl">
                            Travel comfortably throughout
                            Sri Lanka
                        </h2>
                    </div>

                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        <div className="rounded-[2rem] border border-slate-200 bg-white p-7">
                            <Route className="h-8 w-8 text-[#008D86]" />

                            <h3 className="mt-5 text-xl font-bold text-slate-900">
                                Multi-day tours
                            </h3>

                            <p className="mt-3 leading-7 text-slate-600">
                                Suitable for private
                                round tours between
                                Sri Lanka’s cultural,
                                wildlife, hill-country
                                and coastal destinations.
                            </p>
                        </div>

                        <div className="rounded-[2rem] border border-slate-200 bg-white p-7">
                            <Luggage className="h-8 w-8 text-[#008D86]" />

                            <h3 className="mt-5 text-xl font-bold text-slate-900">
                                Airport transfers
                            </h3>

                            <p className="mt-3 leading-7 text-slate-600">
                                Private airport pickup
                                and drop-off arranged
                                according to passenger
                                and luggage requirements.
                            </p>
                        </div>

                        <div className="rounded-[2rem] border border-slate-200 bg-white p-7">
                            <ShieldCheck className="h-8 w-8 text-[#008D86]" />

                            <h3 className="mt-5 text-xl font-bold text-slate-900">
                                Chauffeur service
                            </h3>

                            <p className="mt-3 leading-7 text-slate-600">
                                Experienced local
                                chauffeur support for
                                practical, comfortable
                                and flexible travel.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="px-6 py-20">
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
                    <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#FEC52E]/15 blur-3xl" />

                    <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#C62D52]/20 blur-3xl" />

                    <div className="relative max-w-4xl">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FEC52E]">
                            Start planning
                        </p>

                        <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl lg:text-5xl">
                            Request {vehicle.name} for
                            your Sri Lanka journey
                        </h2>

                        <p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">
                            Share your route, dates,
                            passenger count and luggage
                            requirements. We will prepare
                            the appropriate transport
                            quotation.
                        </p>

                        <VehicleInquiryButton
                            vehicleId={
                                vehicle.id
                            }
                            vehicleName={
                                vehicle.name
                            }
                            vehicleType={
                                vehicle.type
                            }
                            capacity={
                                vehicle.capacity
                            }
                            priceLabel={
                                priceLabel
                            }
                            label="Discuss This Vehicle"
                            className="
                                mt-8
                                inline-flex
                                items-center
                                justify-center
                                gap-2
                                rounded-full
                                bg-[#FEC52E]
                                px-7 py-4
                                font-bold
                                text-[#173F3B]
                                transition
                                hover:-translate-y-0.5
                                hover:bg-white
                            "
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}