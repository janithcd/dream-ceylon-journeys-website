import Link from "next/link";

import {
    ArrowRight,
    HelpCircle,
    Plus,
} from "lucide-react";

import { Container } from "@/components/ui/Container";

type FaqItem = {
    question: string;
    answer: string;
};

const faqItems: FaqItem[] = [
    {
        question:
            "Can I customise my Sri Lanka tour itinerary?",
        answer:
            "Yes. Every private journey can be adjusted according to your travel dates, interests, preferred pace, accommodation style, group size, and budget. You can add more wildlife, cultural sites, beaches, scenic train journeys, or relaxing days.",
    },
    {
        question:
            "What is normally included in your tour packages?",
        answer:
            "Package inclusions depend on the selected itinerary. They may include a private air-conditioned vehicle, an experienced chauffeur guide, airport pickup and drop-off, route planning, daily transport, and bottled water. Your quotation will clearly list every inclusion and exclusion.",
    },
    {
        question:
            "Are hotels, entrance fees, and activities included?",
        answer:
            "Hotels, attraction entrance fees, safari tickets, train tickets, activities, and meals can be included or excluded according to your requirements. All costs and optional upgrades will be shown clearly before you confirm the tour.",
    },
    {
        question:
            "How do you select the right vehicle for my journey?",
        answer:
            "We recommend a car, SUV, or tour van based on the number of travellers, luggage requirements, route conditions, tour duration, and preferred comfort level. All selected vehicles are private and air-conditioned.",
    },
    {
        question:
            "Can you arrange a local guide or chauffeur guide?",
        answer:
            "Yes. We can arrange knowledgeable local professionals according to your route and travel style. They can assist with transport, cultural information, practical travel advice, local experiences, and communication throughout the journey.",
    },
    {
        question:
            "What is the best time to visit Sri Lanka?",
        answer:
            "Sri Lanka can be visited throughout the year, but weather conditions differ between the south-west and east coasts. We will recommend the most suitable beaches, wildlife parks, hill-country routes, and activities based on your travel month.",
    },
    {
        question:
            "How early should I book my private tour?",
        answer:
            "Booking early is recommended, especially during popular travel periods and when your itinerary includes limited train seats, wildlife safaris, or specific accommodation preferences. However, we can also assist with shorter-notice travel when availability permits.",
    },
    {
        question:
            "What happens after I submit a tour inquiry?",
        answer:
            "Our local team will review your travel dates, group size, interests, budget, and special requirements. We will then contact you to clarify any details and prepare a personalised route and quotation for your approval.",
    },
    {
        question:
            "Can you support travel agents or B2B partners?",
        answer:
            "Yes. We support travel agents, overseas tour operators, and B2B partners with ground handling, private transport, chauffeur-guides, itinerary planning, airport transfers, and client movement throughout Sri Lanka.",
    },
];

function FaqAccordionItem({
                              faq,
                              index,
                          }: {
    faq: FaqItem;
    index: number;
}) {
    return (
        <details
            open={index === 0}
            className="
                group
                border-b border-slate-200
                last:border-b-0
            "
        >
            <summary
                className="
                    flex cursor-pointer
                    list-none
                    items-start justify-between
                    gap-5
                    py-6
                    text-left
                    [&::-webkit-details-marker]:hidden
                "
            >
                <div className="flex items-start gap-4">
                    <span
                        className="
                            mt-0.5
                            hidden
                            text-xs font-bold
                            tracking-[0.12em]
                            text-slate-300
                            sm:block
                        "
                        aria-hidden="true"
                    >
                        {String(index + 1).padStart(
                            2,
                            "0"
                        )}
                    </span>

                    <h3
                        className="
                            font-display
                            text-lg font-semibold
                            leading-7
                            tracking-[-0.02em]
                            text-slate-900
                            transition-colors
                            group-hover:text-brand-700
                            sm:text-xl
                        "
                    >
                        {faq.question}
                    </h3>
                </div>

                <span
                    className="
                        flex size-9 shrink-0
                        items-center justify-center
                        rounded-full
                        border border-slate-200
                        bg-white
                        text-brand-700
                        transition-all duration-300
                        group-hover:border-brand-300
                        group-open:border-brand-500
                        group-open:bg-brand-500
                        group-open:text-white
                    "
                >
                    <Plus
                        size={18}
                        strokeWidth={1.8}
                        aria-hidden="true"
                        className="
                            transition-transform
                            duration-300
                            group-open:rotate-45
                        "
                    />
                </span>
            </summary>

            <div
                className="
                    pb-6
                    pr-12
                    sm:pl-10
                    sm:pr-16
                "
            >
                <p
                    className="
                        text-sm leading-7
                        text-slate-600
                        sm:text-[15px]
                        sm:leading-8
                    "
                >
                    {faq.answer}
                </p>
            </div>
        </details>
    );
}

export function FaqSection() {
    return (
        <section
            id="frequently-asked-questions"
            className="
                relative overflow-hidden
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
                    absolute -left-52 bottom-0
                    size-[430px]
                    rounded-full
                    bg-brand-100/35
                    blur-3xl
                "
            />

            <Container className="relative max-w-[1380px]">
                <div
                    className="
                        grid gap-12
                        lg:grid-cols-[minmax(300px,0.72fr)_minmax(0,1.28fr)]
                        lg:gap-20
                    "
                >
                    {/* Introduction */}
                    <div className="lg:sticky lg:top-32 lg:self-start">
                        <div
                            className="
                                inline-flex items-center gap-3
                                text-[11px] font-bold
                                uppercase tracking-[0.2em]
                                text-brand-700
                            "
                        >
                            <span className="h-px w-10 bg-brand-gold" />

                            Before you travel
                        </div>

                        <h2
                            className="
                                mt-5
                                max-w-xl
                                font-display
                                text-4xl font-semibold
                                leading-[1.06]
                                tracking-[-0.04em]
                                text-slate-900
                                sm:text-5xl
                                lg:text-[56px]
                            "
                        >
                            Frequently asked questions.
                        </h2>

                        <p
                            className="
                                mt-6
                                max-w-lg
                                text-sm leading-7
                                text-slate-600
                                sm:text-base
                                sm:leading-8
                            "
                        >
                            Find answers about private tours,
                            vehicles, accommodation, pricing,
                            planning, and what happens after
                            you contact Dream Ceylon Journeys.
                        </p>

                        <div
                            className="
                                mt-8
                                rounded-[1.5rem]
                                border border-slate-200
                                bg-white
                                p-6
                                shadow-[0_12px_35px_rgba(24,40,38,0.05)]
                            "
                        >
                            <div
                                className="
                                    flex size-11
                                    items-center justify-center
                                    rounded-xl
                                    bg-brand-50
                                    text-brand-700
                                "
                            >
                                <HelpCircle
                                    size={22}
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />
                            </div>

                            <h3
                                className="
                                    mt-5
                                    font-display
                                    text-xl font-semibold
                                    text-slate-900
                                "
                            >
                                Still have a question?
                            </h3>

                            <p
                                className="
                                    mt-3
                                    text-sm leading-7
                                    text-slate-600
                                "
                            >
                                Tell us what you are unsure
                                about and our local team will
                                help you plan with confidence.
                            </p>

                            <Link
                                href="/contact"
                                className="
                                    group mt-5
                                    inline-flex items-center
                                    gap-2
                                    text-sm font-bold
                                    text-brand-700
                                    transition-colors
                                    hover:text-brand-900
                                "
                            >
                                Contact our team

                                <ArrowRight
                                    size={17}
                                    aria-hidden="true"
                                    className="
                                        transition-transform
                                        duration-300
                                        group-hover:translate-x-1
                                    "
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Accordion */}
                    <div
                        className="
                            overflow-hidden
                            rounded-[1.75rem]
                            border border-slate-200
                            bg-white
                            px-6
                            shadow-[0_16px_45px_rgba(24,40,38,0.06)]
                            sm:px-8
                            lg:px-10
                        "
                    >
                        {faqItems.map(
                            (faq, index) => (
                                <FaqAccordionItem
                                    key={faq.question}
                                    faq={faq}
                                    index={index}
                                />
                            )
                        )}
                    </div>
                </div>
            </Container>
        </section>
    );
}