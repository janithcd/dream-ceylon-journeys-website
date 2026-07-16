import type { LucideIcon } from "lucide-react";

import Link from "next/link";

import {
    ArrowRight,
    BadgeCheck,
    CarFront,
    ClipboardList,
    MapPinned,
    Route,
    UsersRound,
} from "lucide-react";

import { Container } from "@/components/ui/Container";

type Reason = {
    number: string;
    icon: LucideIcon;
    title: string;
    description: string;
};

const reasons: Reason[] = [
    {
        number: "01",
        icon: ClipboardList,
        title: "Transparent Planning",
        description:
            "Review your route, inclusions, exclusions, hotel suggestions, optional experiences, and estimated costs before confirmation.",
    },
    {
        number: "02",
        icon: MapPinned,
        title: "Local Destination Expertise",
        description:
            "Receive practical advice on travel times, seasonal beaches, safari schedules, scenic train journeys, and cultural etiquette.",
    },
    {
        number: "03",
        icon: CarFront,
        title: "Comfortable Private Vehicles",
        description:
            "Travel in clean, air-conditioned vehicles selected according to your group size, luggage, route, and preferred comfort level.",
    },
    {
        number: "04",
        icon: Route,
        title: "Flexible Private Itineraries",
        description:
            "Choose slower travel, more adventure, upgraded hotels, additional wildlife experiences, or extra beach time.",
    },
    {
        number: "05",
        icon: UsersRound,
        title: "Experienced Local Guides",
        description:
            "Explore Sri Lanka with knowledgeable local professionals who understand the island’s history, culture, roads, and communities.",
    },
    {
        number: "06",
        icon: BadgeCheck,
        title: "Licensed & Certified",
        description:
            "Travel with a professionally operated local tour company committed to responsible planning, reliable service, and traveller care.",
    },
];

function ReasonCard({
                        reason,
                    }: {
    reason: Reason;
}) {
    const Icon = reason.icon;

    return (
        <article
            className="
                group
                relative
                min-h-[270px]
                overflow-hidden
                rounded-[1.5rem]
                border border-slate-200/90
                bg-white
                p-6
                shadow-[0_12px_35px_rgba(22,40,38,0.05)]
                transition-all duration-300
                hover:-translate-y-1
                hover:border-brand-500/25
                hover:shadow-[0_18px_45px_rgba(22,40,38,0.09)]
                sm:p-7
                lg:p-8
            "
        >
            <div className="flex items-start justify-between gap-4">
                <div
                    className="
                        inline-flex size-12
                        items-center justify-center
                        rounded-xl
                        bg-brand-500
                        text-white
                        shadow-[0_8px_20px_rgba(0,141,134,0.18)]
                        transition-all duration-300
                        group-hover:bg-brand-600
                        sm:size-13
                    "
                >
                    <Icon
                        size={23}
                        strokeWidth={1.8}
                        aria-hidden="true"
                    />
                </div>

                <span
                    className="
                        font-display
                        text-sm font-semibold
                        tracking-[0.08em]
                        text-slate-300
                        transition-colors duration-300
                        group-hover:text-brand-500
                    "
                >
                    {reason.number}
                </span>
            </div>

            <h3
                className="
                    mt-7
                    font-display
                    text-2xl font-semibold
                    leading-tight
                    tracking-[-0.025em]
                    text-slate-900
                "
            >
                {reason.title}
            </h3>

            <p
                className="
                    mt-4
                    text-sm leading-7
                    text-slate-600
                    sm:text-[15px]
                "
            >
                {reason.description}
            </p>

            <div
                aria-hidden="true"
                className="
                    absolute inset-x-7 bottom-0
                    h-[3px]
                    origin-left
                    scale-x-0
                    rounded-full
                    bg-brand-gold
                    transition-transform duration-300
                    group-hover:scale-x-100
                "
            />
        </article>
    );
}

export function WhyChooseUs() {
    return (
        <section
            id="why-choose-us"
            className="
                relative
                overflow-hidden
                bg-[#f7f6f3]
                py-20
                sm:py-24
                lg:py-28
            "
        >
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute -right-48 top-0
                    size-[420px]
                    rounded-full
                    bg-brand-100/40
                    blur-3xl
                "
            />

            <Container className="relative max-w-[1380px]">
                <div
                    className="
                        grid gap-7
                        lg:grid-cols-[minmax(0,720px)_minmax(280px,430px)]
                        lg:items-end
                        lg:justify-between
                    "
                >
                    <div>
                        <div
                            className="
                                flex items-center gap-3
                                text-[11px] font-bold
                                uppercase tracking-[0.2em]
                                text-brand-600
                            "
                        >
                            <span className="h-px w-10 bg-brand-gold" />

                            Why choose Dream Ceylon
                        </div>

                        <h2
                            className="
                                mt-5
                                max-w-3xl
                                font-display
                                text-4xl font-semibold
                                leading-[1.05]
                                tracking-[-0.04em]
                                text-slate-900
                                sm:text-5xl
                                lg:text-[58px]
                            "
                        >
                            Thoughtful planning with genuine
                            local knowledge.
                        </h2>
                    </div>

                    <p
                        className="
                            max-w-md
                            text-sm leading-7
                            text-slate-600
                            sm:text-base
                            sm:leading-8
                        "
                    >
                        We create private Sri Lanka journeys
                        for couples, families, and small
                        groups, with every route designed
                        around your interests, schedule,
                        comfort, and budget.
                    </p>
                </div>

                <div
                    className="
                        mt-12
                        grid gap-5
                        md:grid-cols-2
                        xl:grid-cols-3
                    "
                >
                    {reasons.map((reason) => (
                        <ReasonCard
                            key={reason.title}
                            reason={reason}
                        />
                    ))}
                </div>

                <div
                    className="
                        mt-10
                        flex flex-col
                        gap-5
                        border-t border-slate-200
                        pt-8
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >
                    <div>
                        <h3
                            className="
                                font-display
                                text-2xl font-semibold
                                text-slate-900
                            "
                        >
                            Your journey, planned your way.
                        </h3>

                        <p className="mt-2 text-sm leading-7 text-slate-600">
                            Share your travel dates,
                            interests, group size, and
                            preferred travel style with our
                            local team.
                        </p>
                    </div>

                    <Link
                        href="/plan-your-tour"
                        className="
                            group
                            inline-flex min-h-12
                            w-fit shrink-0
                            items-center justify-center
                            gap-2
                            rounded-full
                            bg-brand-500
                            px-6
                            text-sm font-bold
                            text-white
                            shadow-[0_10px_25px_rgba(0,141,134,0.18)]
                            transition-all duration-300
                            hover:-translate-y-0.5
                            hover:bg-brand-600
                        "
                    >
                        Plan My Journey

                        <ArrowRight
                            size={18}
                            aria-hidden="true"
                            className="
                                transition-transform duration-300
                                group-hover:translate-x-1
                            "
                        />
                    </Link>
                </div>
            </Container>
        </section>
    );
}