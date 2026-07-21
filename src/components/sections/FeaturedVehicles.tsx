import Link from "next/link";

import {
    ArrowRight,
    CarFront,
    Check,
    Luggage,
    Snowflake,
    UsersRound,
} from "lucide-react";

import {
    getLocale,
    getTranslations,
} from "next-intl/server";

import {
    Container,
} from "@/components/ui/Container";

import {
    SectionHeading,
} from "@/components/ui/SectionHeading";

import {
    getFeaturedVehicles,
    type WebsiteVehicle,
} from "@/lib/vehicles";

type TranslationValues =
    Record<
        string,
        string | number
    >;

type Translate = (
    key: string,
    values?: TranslationValues
) => string;

function formatPrice(
    vehicle: WebsiteVehicle,
    locale: string,
    t: Translate
): string {
    if (
        vehicle.pricePerDay ===
        null
    ) {
        return t(
            "requestQuotation"
        );
    }

    try {
        return new Intl.NumberFormat(
            locale === "de"
                ? "de-DE"
                : "en-US",
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
        return `${vehicle.currency || "USD"} ${vehicle.pricePerDay.toLocaleString(
            locale === "de"
                ? "de-DE"
                : "en-US"
        )}`;
    }
}

function VehicleImage({
                          vehicle,
                          t,
                      }: {
    vehicle: WebsiteVehicle;
    t: Translate;
}) {
    if (
        !vehicle.imageUrl
    ) {
        return (
            <div
                className="
                    absolute inset-0 z-10
                    flex items-center
                    justify-center
                    bg-gradient-to-br
                    from-[#eef5f2]
                    via-[#f7faf9]
                    to-[#e4efeb]
                    px-6
                    text-center
                "
            >
                <div>
                    <div
                        className="
                            mx-auto
                            flex size-20
                            items-center
                            justify-center
                            rounded-[1.75rem]
                            bg-white
                            text-brand-700
                            shadow-[0_18px_45px_rgba(0,141,134,0.12)]
                        "
                    >
                        <CarFront
                            size={
                                40
                            }
                            strokeWidth={
                                1.7
                            }
                            aria-hidden="true"
                        />
                    </div>

                    <p
                        className="
                            mt-5
                            text-xs
                            font-bold
                            uppercase
                            tracking-[0.18em]
                            text-brand-700
                        "
                    >
                        Dream Ceylon Journeys
                    </p>

                    <p
                        className="
                            mt-2
                            font-display
                            text-2xl
                            font-semibold
                            text-slate-900
                        "
                    >
                        {
                            vehicle.name
                        }
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="
                absolute inset-0 z-10
                flex items-center
                justify-center
                px-5 pb-8 pt-12
                sm:px-7
            "
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={
                    vehicle.imageUrl
                }
                alt={t(
                    "imageAlt",
                    {
                        name:
                        vehicle.name,
                    }
                )}
                loading="lazy"
                decoding="async"
                className="
                    block
                    max-h-full
                    max-w-full
                    object-contain
                    transition-all
                    duration-500
                    group-hover:-translate-y-2
                    group-hover:scale-[1.025]
                "
            />
        </div>
    );
}

function VehicleCard({
                         vehicle,
                         index,
                         locale,
                         t,
                     }: {
    vehicle: WebsiteVehicle;
    index: number;
    locale: string;
    t: Translate;
}) {
    return (
        <article
            className="
                group
                flex h-full flex-col
                overflow-hidden
                rounded-[1.75rem]
                border border-slate-200/90
                bg-white
                shadow-[0_16px_45px_rgba(24,40,38,0.06)]
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-brand-500/20
                hover:shadow-[0_22px_60px_rgba(24,40,38,0.10)]
            "
        >
            <div
                className="
                    relative
                    min-h-[260px]
                    overflow-hidden
                    bg-[#f1f4f2]
                    sm:min-h-[290px]
                    lg:min-h-[310px]
                "
            >
                <div
                    aria-hidden="true"
                    className="
                        absolute
                        inset-x-[12%]
                        bottom-[42px]
                        h-8
                        rounded-[50%]
                        bg-black/15
                        blur-xl
                        transition-all
                        duration-500
                        group-hover:scale-90
                        group-hover:bg-black/10
                    "
                />

                <VehicleImage
                    vehicle={
                        vehicle
                    }
                    t={
                        t
                    }
                />

                <div
                    className="
                        absolute
                        left-5 top-5
                        inline-flex
                        items-center
                        rounded-full
                        border
                        border-slate-200
                        bg-white/90
                        px-3.5 py-2
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.16em]
                        text-brand-700
                        shadow-sm
                        backdrop-blur-md
                    "
                >
                    {t(
                        "privateType",
                        {
                            type:
                            vehicle.type,
                        }
                    )}
                </div>

                <span
                    className="
                        absolute
                        right-5 top-5
                        font-display
                        text-sm
                        font-semibold
                        tracking-[0.08em]
                        text-slate-400
                    "
                >
                    {String(
                        index +
                        1
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
                    sm:p-7
                    lg:p-8
                "
            >
                <div
                    className="
                        flex flex-wrap
                        items-center
                        gap-x-5 gap-y-2
                    "
                >
                    <span
                        className="
                            inline-flex
                            items-center
                            gap-2
                            text-xs
                            font-semibold
                            text-slate-500
                        "
                    >
                        <UsersRound
                            size={
                                16
                            }
                            className="text-brand-500"
                            aria-hidden="true"
                        />

                        {t(
                            "passengerCount",
                            {
                                count:
                                vehicle.capacity,
                            }
                        )}
                    </span>

                    <span
                        className="
                            inline-flex
                            items-center
                            gap-2
                            text-xs
                            font-semibold
                            text-slate-500
                        "
                    >
                        <Snowflake
                            size={
                                16
                            }
                            className="text-brand-500"
                            aria-hidden="true"
                        />

                        {t(
                            "airConditioned"
                        )}
                    </span>
                </div>

                <h3
                    className="
                        mt-5
                        font-display
                        text-3xl
                        font-semibold
                        leading-tight
                        tracking-[-0.035em]
                        text-slate-900
                    "
                >
                    {
                        vehicle.name
                    }
                </h3>

                <p
                    className="
                        mt-4
                        text-sm
                        leading-7
                        text-slate-600
                    "
                >
                    {vehicle.shortDescription ||
                        vehicle.description}
                </p>

                {vehicle.features.length >
                0 ? (
                    <div className="mt-6 space-y-3">
                        {vehicle.features
                            .slice(
                                0,
                                3
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
                                            text-slate-600
                                        "
                                    >
                                        <span
                                            className="
                                                mt-0.5
                                                inline-flex
                                                size-5
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-brand-50
                                                text-brand-700
                                            "
                                        >
                                            <Check
                                                size={
                                                    12
                                                }
                                                strokeWidth={
                                                    2.4
                                                }
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
                ) : null}

                <div className="mt-auto pt-7">
                    <div
                        className="
                            flex
                            items-end
                            justify-between
                            gap-4
                            border-t
                            border-slate-200
                            pt-6
                        "
                    >
                        <div>
                            <p
                                className="
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-[0.16em]
                                    text-slate-400
                                "
                            >
                                {vehicle.pricePerDay ===
                                null
                                    ? t(
                                        "pricing"
                                    )
                                    : t(
                                        "startingFrom"
                                    )}
                            </p>

                            <div
                                className="
                                    mt-1
                                    flex
                                    items-end
                                    gap-1.5
                                "
                            >
                                <p
                                    className="
                                        text-2xl
                                        font-bold
                                        text-brand-800
                                    "
                                >
                                    {formatPrice(
                                        vehicle,
                                        locale,
                                        t
                                    )}
                                </p>

                                {vehicle.pricePerDay !==
                                null ? (
                                    <span
                                        className="
                                            pb-1
                                            text-xs
                                            font-medium
                                            text-slate-400
                                        "
                                    >
                                        {t(
                                            "perDay"
                                        )}
                                    </span>
                                ) : null}
                            </div>
                        </div>

                        <Link
                            href={`/vehicles/${vehicle.slug}`}
                            className="
                                group/button
                                inline-flex
                                min-h-11
                                shrink-0
                                items-center
                                justify-center
                                gap-2
                                rounded-full
                                bg-brand-500
                                px-5
                                text-sm
                                font-bold
                                text-white
                                shadow-[0_10px_25px_rgba(0,141,134,0.18)]
                                transition-all
                                duration-300
                                hover:-translate-y-0.5
                                hover:bg-brand-600
                            "
                        >
                            {t(
                                "viewDetails"
                            )}

                            <ArrowRight
                                size={
                                    17
                                }
                                aria-hidden="true"
                                className="
                                    transition-transform
                                    duration-300
                                    group-hover/button:translate-x-1
                                "
                            />
                        </Link>
                    </div>
                </div>
            </div>

            <div
                aria-hidden="true"
                className="
                    h-[3px]
                    w-full
                    origin-left
                    scale-x-0
                    bg-brand-gold
                    transition-transform
                    duration-500
                    group-hover:scale-x-100
                "
            />
        </article>
    );
}

export async function FeaturedVehicles() {
    const [
        locale,
        translations,
    ] =
        await Promise.all([
            getLocale(),

            getTranslations(
                "FeaturedVehicles"
            ),
        ]);

    const t =
        translations as Translate;

    let vehicles:
        WebsiteVehicle[] =
        [];

    try {
        vehicles =
            await getFeaturedVehicles();
    } catch (error) {
        console.error(
            "[Homepage Featured Vehicles]",
            error
        );
    }

    return (
        <section
            id="featured-vehicles"
            className="
                relative
                overflow-hidden
                bg-[#faf9f6]
                py-20
                sm:py-24
                lg:py-28
            "
        >
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -right-48
                    top-10
                    size-[430px]
                    rounded-full
                    bg-brand-100/45
                    blur-3xl
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -left-52
                    bottom-0
                    size-[400px]
                    rounded-full
                    bg-brand-gold/10
                    blur-3xl
                "
            />

            <Container className="relative max-w-[1380px]">
                <div
                    className="
                        grid gap-7
                        lg:grid-cols-[minmax(0,740px)_minmax(280px,420px)]
                        lg:items-end
                        lg:justify-between
                    "
                >
                    <SectionHeading
                        eyebrow={t(
                            "heading.eyebrow"
                        )}
                        title={t(
                            "heading.title"
                        )}
                        description={t(
                            "heading.description"
                        )}
                    />

                    <div
                        className="
                            flex
                            items-start
                            gap-3
                            rounded-[1.25rem]
                            border
                            border-slate-200
                            bg-white
                            p-5
                            text-sm
                            leading-7
                            text-slate-600
                        "
                    >
                        <Luggage
                            size={
                                21
                            }
                            className="
                                mt-1
                                shrink-0
                                text-brand-500
                            "
                            aria-hidden="true"
                        />

                        <p>
                            {t(
                                "recommendation"
                            )}
                        </p>
                    </div>
                </div>

                {vehicles.length >
                0 ? (
                    <div
                        className="
                            mt-12
                            grid gap-5
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
                                    locale={
                                        locale
                                    }
                                    t={
                                        t
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
                            bg-white
                            px-6 py-16
                            text-center
                        "
                    >
                        <div
                            className="
                                mx-auto
                                flex size-20
                                items-center
                                justify-center
                                rounded-[1.75rem]
                                bg-brand-50
                                text-brand-700
                            "
                        >
                            <CarFront
                                size={
                                    40
                                }
                                strokeWidth={
                                    1.7
                                }
                                aria-hidden="true"
                            />
                        </div>

                        <h3
                            className="
                                mt-6
                                font-display
                                text-3xl
                                font-semibold
                                text-slate-900
                            "
                        >
                            {t(
                                "empty.title"
                            )}
                        </h3>

                        <p
                            className="
                                mx-auto
                                mt-3
                                max-w-2xl
                                leading-7
                                text-slate-600
                            "
                        >
                            {t(
                                "empty.description"
                            )}
                        </p>
                    </div>
                )}

                <div
                    className="
                        mt-8
                        flex flex-col
                        gap-3
                        border-t
                        border-slate-200
                        pt-6
                        text-xs
                        leading-6
                        text-slate-500
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >
                    <p>
                        {t(
                            "rateNote"
                        )}
                    </p>

                    <Link
                        href="/vehicles"
                        className="
                            group
                            inline-flex
                            w-fit
                            shrink-0
                            items-center
                            gap-2
                            font-bold
                            text-brand-700
                            transition-colors
                            hover:text-brand-900
                        "
                    >
                        {t(
                            "viewAll"
                        )}

                        <ArrowRight
                            size={
                                16
                            }
                            aria-hidden="true"
                            className="
                                transition-transform
                                duration-300
                                group-hover:translate-x-1
                            "
                        />
                    </Link>
                </div>
            </Container>
        </section>
    );
}
