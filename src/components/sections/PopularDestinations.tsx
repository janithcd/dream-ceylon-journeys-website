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
    destinations,
    type Destination,
} from "@/data/destinations";

function getCardLayout(
    layout: Destination["layout"]
) {
    switch (layout) {
        case "featured":
            return `
                md:col-span-2
                md:row-span-2
                xl:col-span-2
                xl:row-span-2
            `;

        case "wide":
            return `
                md:col-span-2
                xl:col-span-2
            `;

        default:
            return "";
    }
}

function DestinationCard({
                             destination,
                         }: {
    destination: Destination;
}) {
    const featured =
        destination.layout === "featured";

    return (
        <Link
            href={`/destinations/${destination.slug}`}
            className={[
                "group relative isolate min-h-[300px] overflow-hidden rounded-[2rem]",
                "bg-slate-900 shadow-[0_18px_50px_rgba(20,35,35,0.10)]",
                "transition duration-500",
                "hover:-translate-y-1",
                "hover:shadow-[0_26px_70px_rgba(20,35,35,0.18)]",
                getCardLayout(destination.layout),
            ].join(" ")}
        >
            <Image
                src={destination.image}
                alt={destination.imageAlt}
                fill
                sizes={
                    featured
                        ? "(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 50vw"
                        : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                }
                className="
                    object-cover
                    transition duration-1000
                    group-hover:scale-[1.07]
                "
            />

            <div
                className="
                    absolute inset-0
                    bg-gradient-to-t
                    from-black/90
                    via-black/20
                    to-black/5
                "
            />

            <div
                className="
                    absolute inset-0
                    bg-gradient-to-r
                    from-black/30
                    via-transparent
                    to-transparent
                    opacity-60
                "
            />

            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 sm:p-6">
                <span
                    className="
                        inline-flex items-center
                        rounded-full
                        border border-white/20
                        bg-white/12
                        px-3 py-1.5
                        text-[10px] font-bold
                        uppercase tracking-[0.18em]
                        text-white
                        shadow-sm
                        backdrop-blur-xl
                    "
                >
                    {destination.tag}
                </span>

                <span
                    className="
                        inline-flex size-11
                        items-center justify-center
                        rounded-full
                        border border-white/20
                        bg-white/12
                        text-white
                        backdrop-blur-xl
                        transition duration-300
                        group-hover:border-brand-gold
                        group-hover:bg-brand-gold
                        group-hover:text-slate-900
                    "
                >
                    <ArrowUpRight
                        size={19}
                        aria-hidden="true"
                        className="
                            transition duration-300
                            group-hover:rotate-12
                        "
                    />
                </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/65">
                    <MapPin
                        size={15}
                        className="text-brand-gold"
                        aria-hidden="true"
                    />

                    {destination.region}
                </div>

                <h3
                    className={[
                        "mt-3 font-display font-semibold leading-none tracking-[-0.03em] text-white",
                        featured
                            ? "text-4xl sm:text-5xl lg:text-6xl"
                            : "text-3xl sm:text-4xl",
                    ].join(" ")}
                >
                    {destination.name}
                </h3>

                <p
                    className={[
                        "mt-4 max-w-xl leading-7 text-white/72",
                        featured
                            ? "text-base sm:text-lg"
                            : "text-sm",
                    ].join(" ")}
                >
                    {destination.description}
                </p>

                <div
                    className="
                        mt-5 flex items-center gap-2
                        text-sm font-bold text-brand-gold
                        opacity-0
                        transition duration-300
                        group-hover:translate-x-1
                        group-hover:opacity-100
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
                className="
                    pointer-events-none
                    absolute inset-0
                    rounded-[2rem]
                    ring-1 ring-inset ring-white/10
                    transition
                    group-hover:ring-white/25
                "
            />
        </Link>
    );
}

export function PopularDestinations() {
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
                className="
                    pointer-events-none
                    absolute -right-40 top-10
                    size-[420px]
                    rounded-full
                    bg-brand-100/55
                    blur-3xl
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute -left-40 bottom-0
                    size-[360px]
                    rounded-full
                    bg-brand-gold/10
                    blur-3xl
                "
            />

            <Container className="relative">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <SectionHeading
                        eyebrow="Explore Sri Lanka"
                        title="Iconic places. Remarkable experiences."
                        description="From ancient kingdoms and misty mountain landscapes to wildlife-rich national parks and tropical beaches, discover the destinations that make Sri Lanka unforgettable."
                    />

                    <Link
                        href="/destinations"
                        className="
                            group inline-flex
                            w-fit items-center gap-2
                            rounded-full
                            border border-brand-500/15
                            bg-white
                            px-5 py-3
                            text-sm font-bold
                            text-brand-800
                            shadow-[0_10px_30px_rgba(0,141,134,0.08)]
                            transition duration-300
                            hover:-translate-y-0.5
                            hover:border-brand-500/30
                            hover:bg-brand-50
                        "
                    >
                        View all destinations

                        <ArrowRight
                            size={18}
                            aria-hidden="true"
                            className="
                                transition duration-300
                                group-hover:translate-x-1
                            "
                        />
                    </Link>
                </div>

                <div
                    className="
                        mt-12 grid
                        auto-rows-[300px]
                        gap-5
                        md:grid-cols-2
                        md:auto-rows-[260px]
                        xl:grid-cols-4
                    "
                >
                    {destinations.map(
                        (destination) => (
                            <DestinationCard
                                key={destination.slug}
                                destination={
                                    destination
                                }
                            />
                        )
                    )}
                </div>
            </Container>
        </section>
    );
}