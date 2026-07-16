import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
    Check,
    Luggage,
    Snowflake,
    UsersRound,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

import {
    getFeaturedVehicles,
    type FeaturedVehicle,
} from "@/data/featured-vehicles";

function formatPrice(
    currency: string,
    price: number
): string {
    return new Intl.NumberFormat(
        "en-US",
        {
            style: "currency",
            currency,
            maximumFractionDigits: 0,
        }
    ).format(price);
}

function VehicleCard({
                         vehicle,
                         index,
                     }: {
    vehicle: FeaturedVehicle;
    index: number;
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
                transition-all duration-400
                hover:-translate-y-1
                hover:border-brand-500/20
                hover:shadow-[0_22px_60px_rgba(24,40,38,0.10)]
            "
        >
            {/* Vehicle image area */}
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
                        absolute inset-x-[12%]
                        bottom-[42px]
                        h-8
                        rounded-[50%]
                        bg-black/15
                        blur-xl
                        transition-all duration-500
                        group-hover:scale-90
                        group-hover:bg-black/12
                    "
                />

                <Image
                    src={vehicle.image}
                    alt={vehicle.imageAlt}
                    fill
                    sizes="
                        (max-width: 767px) 100vw,
                        (max-width: 1279px) 50vw,
                        33vw
                    "
                    className="
                        object-contain
                        px-5 pb-8 pt-12
                        transition-all duration-500
                        group-hover:-translate-y-2
                        group-hover:scale-[1.025]
                        sm:px-7
                    "
                />

                <div
                    className="
                        absolute left-5 top-5
                        inline-flex items-center
                        rounded-full
                        border border-slate-200
                        bg-white/90
                        px-3.5 py-2
                        text-[10px] font-bold
                        uppercase tracking-[0.16em]
                        text-brand-700
                        shadow-sm
                        backdrop-blur-md
                    "
                >
                    Private {vehicle.type}
                </div>

                <span
                    className="
                        absolute right-5 top-5
                        font-display
                        text-sm font-semibold
                        tracking-[0.08em]
                        text-slate-400
                    "
                >
                    {String(index + 1).padStart(
                        2,
                        "0"
                    )}
                </span>
            </div>

            {/* Vehicle information */}
            <div
                className="
                    flex flex-1 flex-col
                    p-6
                    sm:p-7
                    lg:p-8
                "
            >
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    <span
                        className="
                            inline-flex items-center
                            gap-2
                            text-xs font-semibold
                            text-slate-500
                        "
                    >
                        <UsersRound
                            size={16}
                            className="text-brand-500"
                            aria-hidden="true"
                        />

                        Up to {vehicle.capacity}{" "}
                        {vehicle.capacity === 1
                            ? "passenger"
                            : "passengers"}
                    </span>

                    <span
                        className="
                            inline-flex items-center
                            gap-2
                            text-xs font-semibold
                            text-slate-500
                        "
                    >
                        <Snowflake
                            size={16}
                            className="text-brand-500"
                            aria-hidden="true"
                        />

                        Air-conditioned
                    </span>
                </div>

                <h3
                    className="
                        mt-5
                        font-display
                        text-3xl font-semibold
                        leading-tight
                        tracking-[-0.035em]
                        text-slate-900
                    "
                >
                    {vehicle.name}
                </h3>

                <p
                    className="
                        mt-4
                        text-sm leading-7
                        text-slate-600
                    "
                >
                    {vehicle.description}
                </p>

                <div
                    className="
                        mt-6
                        space-y-3
                    "
                >
                    {vehicle.features
                        .slice(0, 3)
                        .map((feature) => (
                            <div
                                key={feature}
                                className="
                                    flex items-start
                                    gap-3
                                    text-sm
                                    text-slate-600
                                "
                            >
                                <span
                                    className="
                                        mt-0.5
                                        inline-flex size-5
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-brand-50
                                        text-brand-700
                                    "
                                >
                                    <Check
                                        size={12}
                                        strokeWidth={2.4}
                                        aria-hidden="true"
                                    />
                                </span>

                                <span>
                                    {feature}
                                </span>
                            </div>
                        ))}
                </div>

                <div
                    className="
                        mt-auto
                        pt-7
                    "
                >
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
                                Starting from
                            </p>

                            <div className="mt-1 flex items-end gap-1.5">
                                <p
                                    className="
                                        text-2xl
                                        font-bold
                                        text-brand-800
                                    "
                                >
                                    {formatPrice(
                                        vehicle.currency,
                                        vehicle.pricePerDay
                                    )}
                                </p>

                                <span
                                    className="
                                        pb-1
                                        text-xs
                                        font-medium
                                        text-slate-400
                                    "
                                >
                                    / day
                                </span>
                            </div>
                        </div>

                        <Link
                            href={`/plan-your-tour?vehicle=${vehicle.slug}`}
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
                                transition-all duration-300
                                hover:-translate-y-0.5
                                hover:bg-brand-600
                            "
                        >
                            Request

                            <ArrowRight
                                size={17}
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
                    duration-400
                    group-hover:scale-x-100
                "
            />
        </article>
    );
}

export async function FeaturedVehicles() {
    const vehicles =
        await getFeaturedVehicles();

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
                    absolute -right-48 top-10
                    size-[430px]
                    rounded-full
                    bg-brand-100/45
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
                        eyebrow="Private transport"
                        title="Comfortable vehicles for every Sri Lanka journey."
                        description="Choose a private air-conditioned vehicle according to your group size, luggage requirements, travel route, and preferred level of comfort."
                    />

                    <div
                        className="
                            flex items-start
                            gap-3
                            rounded-[1.25rem]
                            border border-slate-200
                            bg-white
                            p-5
                            text-sm leading-7
                            text-slate-600
                        "
                    >
                        <Luggage
                            size={21}
                            className="mt-1 shrink-0 text-brand-500"
                            aria-hidden="true"
                        />

                        <p>
                            Vehicle recommendations are
                            based on passenger count,
                            luggage space, route conditions,
                            and tour duration.
                        </p>
                    </div>
                </div>

                <div
                    className="
                        mt-12
                        grid gap-5
                        md:grid-cols-2
                        xl:grid-cols-3
                    "
                >
                    {vehicles.map(
                        (vehicle, index) => (
                            <VehicleCard
                                key={vehicle.id}
                                vehicle={vehicle}
                                index={index}
                            />
                        )
                    )}
                </div>

                <div
                    className="
                        mt-8
                        flex flex-col
                        gap-3
                        border-t border-slate-200
                        pt-6
                        text-xs leading-6
                        text-slate-500
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >
                    <p>
                        Daily rates may vary according to
                        route, mileage, tour duration, and
                        seasonal requirements.
                    </p>

                    <Link
                        href="/vehicles"
                        className="
                            group inline-flex
                            w-fit shrink-0
                            items-center gap-2
                            font-bold
                            text-brand-700
                            transition-colors
                            hover:text-brand-900
                        "
                    >
                        View vehicle details

                        <ArrowRight
                            size={16}
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