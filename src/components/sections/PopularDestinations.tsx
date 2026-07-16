import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
    ArrowUpRight,
    MapPin,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

import {
    getPopularDestinations,
    type Destination,
} from "@/data/destinations";

type CardVariant =
    | "featured"
    | "compact"
    | "standard";

function DestinationCard({
                             destination,
                             variant,
                             index,
                         }: {
    destination: Destination;
    variant: CardVariant;
    index: number;
}) {
    const featured =
        variant === "featured";

    const compact =
        variant === "compact";

    const cardHeight = featured
        ? `
            min-h-[470px]
            sm:min-h-[540px]
            lg:min-h-[625px]
          `
        : compact
            ? `
            min-h-[310px]
            sm:min-h-[340px]
            lg:min-h-[300px]
          `
            : `
            min-h-[370px]
            lg:min-h-[410px]
          `;

    const titleSize = featured
        ? `
            text-5xl
            sm:text-6xl
            lg:text-7xl
          `
        : compact
            ? `
            text-4xl
            lg:text-[42px]
          `
            : `
            text-4xl
            sm:text-5xl
          `;

    return (
        <Link
            href={`/destinations/${destination.slug}`}
            className={[
                "group relative isolate block overflow-hidden",
                "rounded-[2rem] bg-slate-900",
                "shadow-[0_18px_55px_rgba(18,35,32,0.12)]",
                "transition-all duration-500",
                "hover:-translate-y-1.5",
                "hover:shadow-[0_28px_80px_rgba(18,35,32,0.22)]",
                cardHeight,
            ].join(" ")}
            aria-label={`Explore ${destination.name}, Sri Lanka`}
        >
            <Image
                src={destination.image}
                alt={destination.imageAlt}
                fill
                sizes={
                    featured
                        ? "(max-width: 1023px) 100vw, 58vw"
                        : compact
                            ? "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 42vw"
                            : "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                }
                className="
                    object-cover
                    transition-transform
                    duration-[1200ms]
                    ease-out
                    group-hover:scale-[1.07]
                "
            />

            <div
                aria-hidden="true"
                className="
                    absolute inset-0
                    bg-gradient-to-t
                    from-black/95
                    via-black/40
                    to-black/5
                "
            />

            <div
                aria-hidden="true"
                className="
                    absolute inset-0
                    bg-gradient-to-r
                    from-black/35
                    via-transparent
                    to-transparent
                "
            />

            <div
                aria-hidden="true"
                className="
                    absolute inset-0
                    bg-[radial-gradient(circle_at_top_right,rgba(254,197,46,0.14),transparent_34%)]
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                "
            />

            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 sm:p-6">
                <span
                    className="
                        inline-flex items-center
                        rounded-full
                        border border-white/20
                        bg-black/15
                        px-3.5 py-2
                        text-[10px] font-bold
                        uppercase tracking-[0.17em]
                        text-white
                        backdrop-blur-xl
                    "
                >
                    {destination.tag}
                </span>

                <div className="flex items-center gap-3">
                    <span className="hidden font-display text-sm font-semibold text-white/60 sm:block">
                        {String(index + 1).padStart(
                            2,
                            "0"
                        )}
                    </span>

                    <span
                        className="
                            inline-flex size-11
                            items-center justify-center
                            rounded-full
                            border border-white/20
                            bg-white/10
                            text-white
                            backdrop-blur-xl
                            transition-all duration-300
                            group-hover:rotate-6
                            group-hover:border-brand-gold
                            group-hover:bg-brand-gold
                            group-hover:text-slate-900
                        "
                    >
                        <ArrowUpRight
                            size={19}
                            aria-hidden="true"
                        />
                    </span>
                </div>
            </div>

            <div
                className={[
                    "absolute inset-x-0 bottom-0",
                    featured
                        ? "p-7 sm:p-9 lg:p-10"
                        : "p-6 sm:p-7",
                ].join(" ")}
            >
                <div
                    className="
                        flex items-center gap-2
                        text-[10px] font-bold
                        uppercase tracking-[0.16em]
                        text-white/70
                        sm:text-[11px]
                    "
                >
                    <MapPin
                        size={15}
                        className="text-brand-gold"
                        aria-hidden="true"
                    />

                    {destination.region}
                </div>

                <h3
                    className={[
                        "mt-3 font-display font-semibold",
                        "leading-[0.98] tracking-[-0.04em]",
                        "text-white",
                        titleSize,
                    ].join(" ")}
                >
                    {destination.name}
                </h3>

                <p
                    className={[
                        "mt-4 max-w-xl text-white/82",
                        compact
                            ? "text-sm leading-6"
                            : "text-sm leading-7 sm:text-base",
                    ].join(" ")}
                >
                    {destination.description}
                </p>

                <div
                    className="
                        mt-5
                        inline-flex items-center gap-2
                        text-sm font-bold
                        text-brand-gold
                        transition-all duration-300
                        group-hover:gap-3
                    "
                >
                    Explore destination

                    <ArrowRight
                        size={17}
                        aria-hidden="true"
                    />
                </div>
            </div>

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute inset-0
                    rounded-[2rem]
                    ring-1 ring-inset
                    ring-white/10
                    transition duration-300
                    group-hover:ring-white/30
                "
            />
        </Link>
    );
}

export async function PopularDestinations() {
    const destinations =
        await getPopularDestinations(6);

    const featuredDestination =
        destinations[0];

    const sideDestinations =
        destinations.slice(1, 3);

    const lowerDestinations =
        destinations.slice(3, 6);

    return (
        <section
            id="popular-destinations"
            className="
                relative overflow-hidden
                bg-[#fdfbf8]
                py-20 sm:py-24 lg:py-28
            "
        >
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute -right-52 top-12
                    size-[500px]
                    rounded-full
                    bg-brand-100/55
                    blur-3xl
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute -left-52 bottom-10
                    size-[430px]
                    rounded-full
                    bg-brand-gold/10
                    blur-3xl
                "
            />

            <Container className="relative max-w-[1440px]">
                <div
                    className="
                        grid gap-8
                        lg:grid-cols-[minmax(0,760px)_auto]
                        lg:items-end
                        lg:justify-between
                    "
                >
                    <SectionHeading
                        eyebrow="Explore Sri Lanka"
                        title="Iconic places. Remarkable experiences."
                        description="Explore Sri Lanka’s ancient cities, misty hill country, wildlife-rich national parks, tropical beaches, and culturally significant destinations."
                    />

                    <Link
                        href="/destinations"
                        className="
                            group
                            inline-flex w-fit
                            shrink-0 items-center gap-2
                            rounded-full
                            border border-brand-500/15
                            bg-white
                            px-5 py-3
                            text-sm font-bold
                            text-brand-800
                            shadow-[0_10px_30px_rgba(0,141,134,0.08)]
                            transition-all duration-300
                            hover:-translate-y-0.5
                            hover:border-brand-500/35
                            hover:bg-brand-50
                        "
                    >
                        View all destinations

                        <ArrowRight
                            size={18}
                            aria-hidden="true"
                            className="
                                transition-transform
                                duration-300
                                group-hover:translate-x-1
                            "
                        />
                    </Link>
                </div>

                <div className="mt-12 grid gap-5 lg:grid-cols-12">
                    {featuredDestination ? (
                        <div className="lg:col-span-7">
                            <DestinationCard
                                destination={
                                    featuredDestination
                                }
                                variant="featured"
                                index={0}
                            />
                        </div>
                    ) : null}

                    <div
                        className="
                            grid gap-5
                            sm:grid-cols-2
                            lg:col-span-5
                            lg:grid-cols-1
                        "
                    >
                        {sideDestinations.map(
                            (
                                destination,
                                index
                            ) => (
                                <DestinationCard
                                    key={
                                        destination.slug
                                    }
                                    destination={
                                        destination
                                    }
                                    variant="compact"
                                    index={index + 1}
                                />
                            )
                        )}
                    </div>
                </div>

                <div
                    className="
                        mt-5 grid gap-5
                        md:grid-cols-2
                        xl:grid-cols-3
                    "
                >
                    {lowerDestinations.map(
                        (
                            destination,
                            index
                        ) => (
                            <DestinationCard
                                key={
                                    destination.slug
                                }
                                destination={
                                    destination
                                }
                                variant="standard"
                                index={index + 3}
                            />
                        )
                    )}
                </div>
            </Container>
        </section>
    );
}