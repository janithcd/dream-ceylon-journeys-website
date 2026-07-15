import type { LucideIcon } from "lucide-react";

import {
    BadgeDollarSign,
    CalendarCheck2,
    Headphones,
    MapPinned,
} from "lucide-react";

import { Container } from "@/components/ui/Container";

type TrustItem = {
    icon: LucideIcon;
    title: string;
    description: string;
};

const trustItems: TrustItem[] = [
    {
        icon: MapPinned,
        title: "100+ Experiences",
        description:
            "Carefully selected places across Sri Lanka",
    },
    {
        icon: BadgeDollarSign,
        title: "Best Price Guarantee",
        description:
            "Transparent rates with no hidden charges",
    },
    {
        icon: Headphones,
        title: "24/7 Local Support",
        description:
            "Friendly assistance throughout your journey",
    },
    {
        icon: CalendarCheck2,
        title: "Fast Tour Planning",
        description:
            "Quick and personalised itinerary support",
    },
];

export function TrustBar() {
    return (
        <section
            aria-label="Why travel with Dream Ceylon Journeys"
            className="
                relative z-20
                overflow-hidden
                bg-brand-500
                text-white
            "
        >
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute inset-0
                    bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(254,197,46,0.13),transparent_30%)]
                "
            />

            <Container className="relative">
                <div
                    className="
                        grid grid-cols-2
                        divide-x divide-y divide-white/15
                        lg:grid-cols-4
                        lg:divide-y-0
                    "
                >
                    {trustItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <article
                                key={item.title}
                                className="
                                    group
                                    flex min-h-[170px]
                                    flex-col items-center
                                    justify-center
                                    px-4 py-8
                                    text-center
                                    transition duration-300
                                    hover:bg-white/[0.07]
                                    sm:min-h-[185px]
                                    sm:px-6
                                    lg:min-h-[190px]
                                    lg:px-8
                                "
                            >
                                <div
                                    className="
                                        inline-flex size-14
                                        items-center justify-center
                                        rounded-2xl
                                        border border-white/20
                                        bg-white/[0.10]
                                        text-brand-gold
                                        shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]
                                        backdrop-blur-md
                                        transition duration-300
                                        group-hover:-translate-y-1
                                        group-hover:scale-105
                                        group-hover:border-brand-gold/45
                                        group-hover:bg-white/[0.16]
                                        sm:size-16
                                    "
                                >
                                    <Icon
                                        size={27}
                                        strokeWidth={1.8}
                                        aria-hidden="true"
                                    />
                                </div>

                                <h2
                                    className="
                                        mt-5
                                        text-sm font-semibold
                                        leading-5
                                        tracking-[-0.01em]
                                        text-white
                                        sm:text-base
                                        lg:text-lg
                                    "
                                >
                                    {item.title}
                                </h2>

                                <p
                                    className="
                                        mt-2
                                        max-w-[240px]
                                        text-[11px]
                                        font-medium
                                        leading-5
                                        text-white/70
                                        sm:text-xs
                                        lg:text-[13px]
                                    "
                                >
                                    {item.description}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </Container>

            <div
                aria-hidden="true"
                className="
                    absolute inset-x-0 bottom-0
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-brand-gold/70
                    to-transparent
                "
            />
        </section>
    );
}