import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
    CalendarDays,
    Check,
    MapPinned,
    Sparkles,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

import {
    getFeaturedTours,
    type FeaturedTour,
} from "@/data/featured-tours";

function TourRow({
                     tour,
                     index,
                 }: {
    tour: FeaturedTour;
    index: number;
}) {
    const reverse = index % 2 !== 0;

    return (
        <article
            className="
                group
                grid
                overflow-hidden
                rounded-[2rem]
                border
                border-slate-200/80
                bg-white
                shadow-[0_18px_55px_rgba(22,45,42,0.08)]
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-brand-500/20
                hover:shadow-[0_28px_80px_rgba(22,45,42,0.14)]
                lg:grid-cols-2
            "
        >
            <div
                className={[
                    "relative min-h-[330px] overflow-hidden",
                    "sm:min-h-[410px]",
                    "lg:min-h-[520px]",
                    reverse
                        ? "lg:order-2"
                        : "lg:order-1",
                ].join(" ")}
            >
                <Image
                    src={tour.image}
                    alt={tour.imageAlt}
                    fill
                    sizes="
                        (max-width: 1023px) 100vw,
                        50vw
                    "
                    className="
                        object-cover
                        transition-transform
                        duration-[1200ms]
                        ease-out
                        group-hover:scale-[1.06]
                    "
                />

                <div
                    aria-hidden="true"
                    className="
                        absolute inset-0
                        bg-gradient-to-t
                        from-black/65
                        via-black/10
                        to-transparent
                    "
                />

                <div
                    className="
                        absolute
                        left-5
                        top-5
                        flex
                        items-center
                        gap-3
                        sm:left-7
                        sm:top-7
                    "
                >
                    <span
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-white/20
                            bg-black/20
                            px-4
                            py-2
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.17em]
                            text-white
                            backdrop-blur-xl
                        "
                    >
                        <Sparkles
                            size={14}
                            className="text-brand-gold"
                            aria-hidden="true"
                        />

                        {tour.category}
                    </span>

                    <span
                        className="
                            font-display
                            text-sm
                            font-semibold
                            text-white/75
                        "
                    >
                        {String(index + 1).padStart(
                            2,
                            "0"
                        )}
                    </span>
                </div>

                <div
                    className="
                        absolute
                        inset-x-0
                        bottom-0
                        p-6
                        sm:p-8
                    "
                >
                    <div
                        className="
                            flex
                            flex-wrap
                            gap-3
                            text-xs
                            font-semibold
                            text-white
                        "
                    >
                        <span
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-white/20
                                bg-black/20
                                px-3.5
                                py-2
                                backdrop-blur-xl
                            "
                        >
                            <CalendarDays
                                size={15}
                                className="text-brand-gold"
                                aria-hidden="true"
                            />

                            {tour.duration}
                        </span>

                        <span
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-white/20
                                bg-black/20
                                px-3.5
                                py-2
                                backdrop-blur-xl
                            "
                        >
                            <MapPinned
                                size={15}
                                className="text-brand-gold"
                                aria-hidden="true"
                            />

                            {tour.destinationsCount} destinations
                        </span>
                    </div>
                </div>
            </div>

            <div
                className={[
                    "flex flex-col justify-center",
                    "p-7 sm:p-10 lg:p-12 xl:p-14",
                    reverse
                        ? "lg:order-1"
                        : "lg:order-2",
                ].join(" ")}
            >
                <div
                    className="
                        flex
                        items-center
                        gap-3
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.18em]
                        text-brand-600
                    "
                >
                    <span
                        className="
                            block
                            h-px
                            w-10
                            bg-brand-gold
                        "
                    />

                    Featured Journey
                </div>

                <h3
                    className="
                        mt-5
                        max-w-xl
                        font-display
                        text-4xl
                        font-semibold
                        leading-[1.03]
                        tracking-[-0.04em]
                        text-slate-900
                        sm:text-5xl
                        lg:text-[52px]
                    "
                >
                    {tour.title}
                </h3>

                <p
                    className="
                        mt-5
                        max-w-xl
                        text-base
                        leading-8
                        text-slate-600
                    "
                >
                    {tour.description}
                </p>

                <div
                    className="
                        mt-6
                        flex
                        flex-wrap
                        gap-2
                    "
                >
                    {tour.highlights.map(
                        (highlight) => (
                            <span
                                key={highlight}
                                className="
                                    inline-flex
                                    items-center
                                    gap-1.5
                                    rounded-full
                                    border
                                    border-brand-500/10
                                    bg-brand-50
                                    px-3.5
                                    py-2
                                    text-[11px]
                                    font-semibold
                                    text-brand-800
                                "
                            >
                                <Check
                                    size={13}
                                    aria-hidden="true"
                                />

                                {highlight}
                            </span>
                        )
                    )}
                </div>

                <div className="mt-7">
                    <p
                        className="
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.17em]
                            text-slate-400
                        "
                    >
                        Tour Route
                    </p>

                    <div
                        className="
                            mt-3
                            flex
                            flex-wrap
                            items-center
                            gap-x-2
                            gap-y-2
                            text-sm
                            font-semibold
                            text-slate-600
                        "
                    >
                        {tour.route.map(
                            (
                                destination,
                                routeIndex
                            ) => (
                                <span
                                    key={destination}
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                    "
                                >
                                    {destination}

                                    {routeIndex <
                                    tour.route.length -
                                    1 ? (
                                        <span
                                            aria-hidden="true"
                                            className="
                                                size-1
                                                rounded-full
                                                bg-brand-gold
                                            "
                                        />
                                    ) : null}
                                </span>
                            )
                        )}
                    </div>
                </div>

                <div
                    className="
                        mt-8
                        border-t
                        border-slate-200
                        pt-7
                    "
                >
                    <div
                        className="
                            flex
                            flex-col
                            gap-5
                            sm:flex-row
                            sm:items-end
                            sm:justify-between
                        "
                    >
                        <div>
                            <p
                                className="
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-[0.17em]
                                    text-slate-400
                                "
                            >
                                Starting Price
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-2xl
                                    font-bold
                                    text-brand-800
                                "
                            >
                                {tour.priceLabel}
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-[11px]
                                    text-slate-400
                                "
                            >
                                Per person • Customisable
                            </p>
                        </div>

                        <div
                            className="
                                flex
                                flex-wrap
                                gap-2
                            "
                        >
                            <Link
                                href={`/plan-your-tour?tour=${tour.slug}`}
                                className="
                                    inline-flex
                                    min-h-12
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-brand-500/15
                                    bg-brand-50
                                    px-5
                                    text-sm
                                    font-bold
                                    text-brand-800
                                    transition
                                    duration-300
                                    hover:border-brand-500/30
                                    hover:bg-brand-100
                                "
                            >
                                Customise
                            </Link>

                            <Link
                                href={`/tours/${tour.slug}`}
                                className="
                                    group/button
                                    inline-flex
                                    min-h-12
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-full
                                    bg-brand-500
                                    px-6
                                    text-sm
                                    font-bold
                                    text-white
                                    shadow-[0_12px_28px_rgba(0,141,134,0.20)]
                                    transition
                                    duration-300
                                    hover:-translate-y-0.5
                                    hover:bg-brand-600
                                "
                            >
                                View Tour

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
            </div>
        </article>
    );
}

export async function FeaturedTours() {
    const featuredTours =
        await getFeaturedTours();
    return (
        <section
            id="featured-tours"
            className="
                relative
                overflow-hidden
                bg-white
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
                    -left-48
                    top-20
                    size-[420px]
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
                    -right-52
                    bottom-10
                    size-[450px]
                    rounded-full
                    bg-brand-gold/10
                    blur-3xl
                "
            />

            <Container className="relative max-w-[1440px]">
                <div
                    className="
                        grid
                        gap-8
                        lg:grid-cols-[minmax(0,760px)_auto]
                        lg:items-end
                        lg:justify-between
                    "
                >
                    <SectionHeading
                        eyebrow="Featured journeys"
                        title="Thoughtfully designed tours across Sri Lanka."
                        description="Choose a carefully planned private journey or customise every detail with our local travel specialists."
                    />

                    <Link
                        href="/tours"
                        className="
                            group
                            inline-flex
                            w-fit
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-brand-500/15
                            bg-white
                            px-5
                            py-3
                            text-sm
                            font-bold
                            text-brand-800
                            shadow-[0_10px_30px_rgba(0,141,134,0.08)]
                            transition-all
                            duration-300
                            hover:-translate-y-0.5
                            hover:border-brand-500/35
                            hover:bg-brand-50
                        "
                    >
                        Explore all tours

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

                <div
                    className="
                        mt-12
                        space-y-7
                    "
                >
                    {featuredTours.map(
                        (tour, index) => (
                            <TourRow
                                key={tour.slug}
                                tour={tour}
                                index={index}
                            />
                        )
                    )}
                </div>

                <div
                    className="
                        mt-10
                        flex
                        flex-col
                        items-center
                        justify-between
                        gap-5
                        rounded-[1.75rem]
                        border
                        border-brand-500/10
                        bg-brand-50/70
                        px-6
                        py-7
                        text-center
                        sm:flex-row
                        sm:text-left
                        lg:px-8
                    "
                >
                    <div>
                        <h3
                            className="
                                font-display
                                text-2xl
                                font-semibold
                                text-slate-900
                            "
                        >
                            Looking for something different?
                        </h3>

                        <p
                            className="
                                mt-2
                                max-w-3xl
                                text-sm
                                leading-7
                                text-slate-600
                            "
                        >
                            Tell us your travel dates, interests, and preferred pace. We will create a private Sri Lanka itinerary around you.
                        </p>
                    </div>

                    <Link
                        href="/plan-your-tour"
                        className="
                            group
                            inline-flex
                            min-h-12
                            shrink-0
                            items-center
                            justify-center
                            gap-2
                            rounded-full
                            bg-brand-gold
                            px-6
                            text-sm
                            font-bold
                            text-slate-900
                            shadow-[0_12px_28px_rgba(254,197,46,0.22)]
                            transition
                            duration-300
                            hover:-translate-y-0.5
                            hover:bg-brand-gold-light
                        "
                    >
                        Create My Tour

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
            </Container>
        </section>
    );
}