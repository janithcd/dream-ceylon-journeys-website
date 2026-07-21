import type {
    Metadata,
} from "next";

import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
    Car,
    CheckCircle2,
    Compass,
    HeartHandshake,
    MapPin,
    MessageCircle,
    Route,
    ShieldCheck,
    Sparkles,
    Users,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

import {
    whatsappUrl,
} from "@/lib/site";

export const metadata: Metadata = {
    title:
        "About Dream Ceylon Journeys",

    description:
        "Learn about Dream Ceylon Journeys, a locally based Sri Lankan destination management and private tour company creating tailor-made journeys across Sri Lanka.",

    alternates: {
        canonical:
            "/about",
    },

    openGraph: {
        title:
            "About Dream Ceylon Journeys",

        description:
            "Meet the local Sri Lankan travel company behind personalised private tours, chauffeur-guided journeys and dependable island-wide support.",

        url:
            "/about",

        type:
            "website",
    },
};

const values = [
    {
        icon: MapPin,
        title: "Local Understanding",
        description:
            "Our recommendations are shaped by real local knowledge of Sri Lanka’s destinations, roads, seasons, culture, and travel experiences.",
    },
    {
        icon: Compass,
        title: "Personalised Planning",
        description:
            "We design private journeys around your interests, available dates, preferred pace, accommodation style, and expectations.",
    },
    {
        icon: HeartHandshake,
        title: "Genuine Hospitality",
        description:
            "We believe memorable travel begins with honest communication, thoughtful assistance, and warm Sri Lankan hospitality.",
    },
];

const reasons = [
    {
        icon: Route,
        title: "Flexible private itineraries",
        description:
            "Your journey can be adjusted around the places, activities, and experiences that matter most to you.",
    },
    {
        icon: Car,
        title: "Comfortable private transport",
        description:
            "Suitable cars, SUVs, and vans can be arranged according to your group size, luggage, and travel route.",
    },
    {
        icon: ShieldCheck,
        title: "Dependable local support",
        description:
            "Receive responsive assistance before arrival and throughout your journey around Sri Lanka.",
    },
    {
        icon: Users,
        title: "Guides and chauffeur-guides",
        description:
            "Travel with friendly professionals who help you understand the island beyond the usual tourist highlights.",
    },
];

const planningSteps = [
    {
        number: "01",
        title: "Tell us about your journey",
        description:
            "Share your dates, group size, interests, preferred destinations, and approximate budget.",
    },
    {
        number: "02",
        title: "Receive a tailored proposal",
        description:
            "We prepare an itinerary and travel plan shaped around your requirements.",
    },
    {
        number: "03",
        title: "Refine every detail",
        description:
            "We adjust the route, pace, activities, and transport until the journey suits you.",
    },
    {
        number: "04",
        title: "Travel with local support",
        description:
            "Arrive in Sri Lanka knowing your transport, route, and local assistance have been carefully arranged.",
    },
];

export default function AboutPage() {
    return (
        <main className="overflow-hidden">
            <section
                className="
                    relative
                    isolate
                    min-h-[680px]
                    overflow-hidden
                    bg-brand-950
                    pt-32
                    text-white
                    sm:pt-40
                "
            >
                <Image
                    fill
                    priority
                    src="/images/hero/sigiriya-sunrise.jpg"
                    alt="Sigiriya Rock Fortress at sunrise in Sri Lanka"
                    sizes="100vw"
                    className="object-cover"
                />

                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-r
                        from-brand-950
                        via-brand-950/82
                        to-brand-950/25
                    "
                />

                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-brand-950
                        via-transparent
                        to-brand-950/20
                    "
                />

                <div
                    aria-hidden="true"
                    className="
                        absolute
                        -right-32
                        top-20
                        h-96
                        w-96
                        rounded-full
                        bg-brand-gold/15
                        blur-3xl
                    "
                />

                <Container className="relative">
                    <div
                        className="
                            max-w-4xl
                            pb-24
                            sm:pb-32
                        "
                    >
                        <div
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-white/20
                                bg-white/10
                                px-4
                                py-2
                                text-sm
                                font-bold
                                backdrop-blur-md
                            "
                        >
                            <Sparkles
                                className="
                                    h-4
                                    w-4
                                    text-brand-gold
                                "
                                aria-hidden="true"
                            />

                            About Dream Ceylon Journeys
                        </div>

                        <h1
                            className="
                                mt-7
                                max-w-4xl
                                font-display
                                text-5xl
                                font-semibold
                                leading-[1.05]
                                tracking-[-0.03em]
                                sm:text-6xl
                                lg:text-7xl
                            "
                        >
                            Sri Lanka journeys created with local
                            heart and personal care.
                        </h1>

                        <p
                            className="
                                mt-7
                                max-w-2xl
                                text-lg
                                leading-8
                                text-white/75
                                sm:text-xl
                            "
                        >
                            We create tailor-made private tours
                            that bring together Sri Lanka’s
                            culture, wildlife, landscapes,
                            beaches, communities, and warm
                            hospitality.
                        </p>

                        <div
                            className="
                                mt-9
                                flex
                                flex-col
                                gap-3
                                sm:flex-row
                            "
                        >
                            <Link
                                href="/plan-your-tour"
                                className="
                                    inline-flex
                                    min-h-14
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-full
                                    bg-brand-gold
                                    px-8
                                    font-bold
                                    text-brand-950
                                    transition
                                    duration-300
                                    hover:-translate-y-0.5
                                    hover:bg-white
                                "
                            >
                                Plan Your Journey

                                <ArrowRight
                                    size={20}
                                    aria-hidden="true"
                                />
                            </Link>

                            <Link
                                href="/contact"
                                className="
                                    inline-flex
                                    min-h-14
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-white/25
                                    bg-white/10
                                    px-8
                                    font-bold
                                    text-white
                                    backdrop-blur-md
                                    transition
                                    duration-300
                                    hover:border-white
                                    hover:bg-white
                                    hover:text-brand-950
                                "
                            >
                                Contact Our Team
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>

            <section
                id="our-story"
                className="
                    bg-white
                    py-20
                    sm:py-24
                "
            >
                <Container>
                    <div
                        className="
                            grid
                            gap-12
                            lg:grid-cols-2
                            lg:items-center
                            lg:gap-16
                        "
                    >
                        <div>
                            <SectionHeading
                                eyebrow="Our story"
                                title="Helping travellers experience the real Sri Lanka."
                                description="Dream Ceylon Journeys was created to make private travel around Sri Lanka more personal, flexible, and dependable."
                            />

                            <div
                                className="
                                    mt-7
                                    space-y-5
                                    text-base
                                    leading-8
                                    text-slate-600
                                    sm:text-lg
                                "
                            >
                                <p>
                                    We are a locally based Sri
                                    Lankan destination management
                                    and private tour company. Our
                                    work combines careful itinerary
                                    planning, private transportation,
                                    local destination knowledge, and
                                    responsive assistance.
                                </p>

                                <p>
                                    Rather than offering the same
                                    fixed journey to every traveller,
                                    we take time to understand what
                                    you would like to experience.
                                    Your route can be shaped around
                                    culture, wildlife, beaches, hill
                                    country, photography, adventure,
                                    relaxation, or a combination of
                                    them all.
                                </p>

                                <p>
                                    From the first conversation to
                                    the final airport transfer, our
                                    purpose is to make your journey
                                    feel organised, comfortable, and
                                    genuinely connected to Sri
                                    Lanka.
                                </p>
                            </div>

                            <div
                                className="
                                    mt-8
                                    grid
                                    gap-4
                                    sm:grid-cols-2
                                "
                            >
                                {[
                                    "Private and tailor-made tours",
                                    "Island-wide travel planning",
                                    "Cars, SUVs, and vans",
                                    "Local guides and support",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                            rounded-xl
                                            bg-brand-50
                                            px-4
                                            py-3
                                            text-sm
                                            font-semibold
                                            text-brand-900
                                        "
                                    >
                                        <CheckCircle2
                                            className="
                                                h-5
                                                w-5
                                                shrink-0
                                                text-brand-500
                                            "
                                            aria-hidden="true"
                                        />

                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div
                                className="
                                    relative
                                    min-h-[520px]
                                    overflow-hidden
                                    rounded-[2.25rem]
                                    bg-slate-200
                                    shadow-[0_30px_90px_rgba(7,45,44,0.16)]
                                    sm:min-h-[660px]
                                "
                            >
                                <Image
                                    fill
                                    src="/images/hero/ella-train.jpg"
                                    alt="Scenic train travelling through Sri Lanka hill country"
                                    sizes="
                                        (max-width: 1024px) 100vw,
                                        50vw
                                    "
                                    className="object-cover"
                                />

                                <div
                                    className="
                                        absolute
                                        inset-0
                                        bg-gradient-to-t
                                        from-brand-950/65
                                        via-transparent
                                        to-transparent
                                    "
                                />
                            </div>

                            <div
                                className="
                                    absolute
                                    -bottom-7
                                    left-5
                                    right-5
                                    rounded-[1.5rem]
                                    border
                                    border-white
                                    bg-white
                                    p-6
                                    shadow-[0_22px_60px_rgba(7,45,44,0.16)]
                                    sm:left-auto
                                    sm:right-[-24px]
                                    sm:max-w-[330px]
                                "
                            >
                                <p
                                    className="
                                        text-xs
                                        font-bold
                                        uppercase
                                        tracking-[0.18em]
                                        text-brand-600
                                    "
                                >
                                    Our purpose
                                </p>

                                <p
                                    className="
                                        mt-3
                                        font-display
                                        text-2xl
                                        font-semibold
                                        leading-tight
                                        text-brand-950
                                    "
                                >
                                    Make every journey feel personal,
                                    not packaged.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <section
                className="
                    bg-sand-50
                    py-20
                    sm:py-24
                "
            >
                <Container>
                    <SectionHeading
                        eyebrow="What guides us"
                        title="Travel built on knowledge, care, and trust."
                        description="These principles shape the way we plan, communicate, and support every Dream Ceylon journey."
                        align="center"
                    />

                    <div
                        className="
                            mt-12
                            grid
                            gap-5
                            md:grid-cols-3
                        "
                    >
                        {values.map((item) => {
                            const Icon = item.icon;

                            return (
                                <article
                                    key={item.title}
                                    className="
                                        rounded-[1.75rem]
                                        border
                                        border-brand-500/10
                                        bg-white
                                        p-7
                                        shadow-[0_18px_55px_rgba(7,45,44,0.06)]
                                        transition
                                        duration-300
                                        hover:-translate-y-1
                                        hover:shadow-[0_24px_70px_rgba(7,45,44,0.11)]
                                    "
                                >
                                    <div
                                        className="
                                            flex
                                            h-14
                                            w-14
                                            items-center
                                            justify-center
                                            rounded-2xl
                                            bg-brand-100
                                            text-brand-700
                                        "
                                    >
                                        <Icon
                                            size={25}
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <h2
                                        className="
                                            mt-6
                                            font-display
                                            text-2xl
                                            font-semibold
                                            text-brand-950
                                        "
                                    >
                                        {item.title}
                                    </h2>

                                    <p
                                        className="
                                            mt-3
                                            text-sm
                                            leading-7
                                            text-slate-600
                                        "
                                    >
                                        {item.description}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                </Container>
            </section>

            <section
                id="why-us"
                className="
                    relative
                    overflow-hidden
                    bg-brand-950
                    py-20
                    text-white
                    sm:py-24
                "
            >
                <div
                    aria-hidden="true"
                    className="
                        absolute
                        -right-32
                        -top-32
                        h-96
                        w-96
                        rounded-full
                        bg-brand-500/20
                        blur-3xl
                    "
                />

                <Container>
                    <div
                        className="
                            relative
                            grid
                            gap-12
                            lg:grid-cols-[0.9fr_1.1fr]
                            lg:items-center
                            lg:gap-16
                        "
                    >
                        <div
                            className="
                                relative
                                min-h-[520px]
                                overflow-hidden
                                rounded-[2rem]
                                bg-brand-900
                                sm:min-h-[650px]
                            "
                        >
                            <Image
                                fill
                                src="/images/destinations/yala-national-park-safari-sri-lanka.jpg"
                                alt="Wildlife safari experience in Yala National Park, Sri Lanka"
                                sizes="
                                    (max-width: 1024px) 100vw,
                                    44vw
                                "
                                className="object-cover"
                            />

                            <div
                                className="
                                    absolute
                                    inset-0
                                    bg-gradient-to-t
                                    from-brand-950/80
                                    via-transparent
                                    to-transparent
                                "
                            />

                            <div
                                className="
                                    absolute
                                    bottom-6
                                    left-6
                                    right-6
                                    rounded-[1.5rem]
                                    border
                                    border-white/15
                                    bg-black/20
                                    p-5
                                    backdrop-blur-xl
                                "
                            >
                                <p
                                    className="
                                        text-xs
                                        font-bold
                                        uppercase
                                        tracking-[0.18em]
                                        text-brand-gold
                                    "
                                >
                                    Beyond the guidebooks
                                </p>

                                <p
                                    className="
                                        mt-2
                                        font-display
                                        text-2xl
                                        font-semibold
                                    "
                                >
                                    Local experiences selected with
                                    care.
                                </p>
                            </div>
                        </div>

                        <div>
                            <SectionHeading
                                eyebrow="Why travel with us"
                                title="A trusted local partner for your Sri Lanka journey."
                                description="We manage the practical details while keeping your journey personal, flexible, and connected to the island."
                                light
                            />

                            <div
                                className="
                                    mt-9
                                    grid
                                    gap-4
                                    sm:grid-cols-2
                                "
                            >
                                {reasons.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <article
                                            key={item.title}
                                            className="
                                                rounded-[1.5rem]
                                                border
                                                border-white/10
                                                bg-white/5
                                                p-5
                                                backdrop-blur-sm
                                                transition
                                                duration-300
                                                hover:border-brand-gold/30
                                                hover:bg-white/10
                                            "
                                        >
                                            <div
                                                className="
                                                    flex
                                                    h-11
                                                    w-11
                                                    items-center
                                                    justify-center
                                                    rounded-xl
                                                    bg-brand-gold
                                                    text-brand-950
                                                "
                                            >
                                                <Icon
                                                    size={21}
                                                    aria-hidden="true"
                                                />
                                            </div>

                                            <h3
                                                className="
                                                    mt-5
                                                    font-display
                                                    text-xl
                                                    font-semibold
                                                "
                                            >
                                                {item.title}
                                            </h3>

                                            <p
                                                className="
                                                    mt-2
                                                    text-sm
                                                    leading-6
                                                    text-white/65
                                                "
                                            >
                                                {item.description}
                                            </p>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <section
                className="
                    bg-white
                    py-20
                    sm:py-24
                "
            >
                <Container>
                    <SectionHeading
                        eyebrow="How we work"
                        title="From your first idea to your arrival in Sri Lanka."
                        description="Our planning process is simple, collaborative, and designed to give you confidence before your journey begins."
                        align="center"
                    />

                    <div
                        className="
                            mt-12
                            grid
                            gap-5
                            md:grid-cols-2
                            xl:grid-cols-4
                        "
                    >
                        {planningSteps.map((step) => (
                            <article
                                key={step.number}
                                className="
                                    relative
                                    overflow-hidden
                                    rounded-[1.75rem]
                                    border
                                    border-brand-500/10
                                    bg-sand-50
                                    p-7
                                "
                            >
                                <span
                                    className="
                                        absolute
                                        -right-2
                                        -top-6
                                        font-display
                                        text-8xl
                                        font-semibold
                                        text-brand-500/7
                                    "
                                    aria-hidden="true"
                                >
                                    {step.number}
                                </span>

                                <span
                                    className="
                                        relative
                                        text-xs
                                        font-bold
                                        uppercase
                                        tracking-[0.18em]
                                        text-brand-600
                                    "
                                >
                                    Step {step.number}
                                </span>

                                <h2
                                    className="
                                        relative
                                        mt-5
                                        font-display
                                        text-2xl
                                        font-semibold
                                        text-brand-950
                                    "
                                >
                                    {step.title}
                                </h2>

                                <p
                                    className="
                                        relative
                                        mt-3
                                        text-sm
                                        leading-7
                                        text-slate-600
                                    "
                                >
                                    {step.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </Container>
            </section>

            <section
                className="
                    bg-sand-50
                    py-20
                    sm:py-24
                "
            >
                <Container>
                    <div
                        className="
                            grid
                            gap-8
                            overflow-hidden
                            rounded-[2.5rem]
                            bg-brand-500
                            p-7
                            text-white
                            shadow-[0_30px_80px_rgba(0,141,134,0.20)]
                            sm:p-10
                            lg:grid-cols-[1fr_auto]
                            lg:items-center
                            lg:p-14
                        "
                    >
                        <div>
                            <p
                                className="
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-[0.2em]
                                    text-brand-gold
                                "
                            >
                                Travel agents and B2B partners
                            </p>

                            <h2
                                className="
                                    mt-4
                                    max-w-3xl
                                    font-display
                                    text-3xl
                                    font-semibold
                                    leading-tight
                                    sm:text-4xl
                                "
                            >
                                Local ground support for your
                                clients travelling in Sri Lanka.
                            </h2>

                            <p
                                className="
                                    mt-4
                                    max-w-3xl
                                    leading-7
                                    text-white/75
                                "
                            >
                                We can assist outbound operators and
                                travel partners with ground handling,
                                private transport, chauffeur-guides,
                                itinerary support, and client
                                movement within Sri Lanka.
                            </p>
                        </div>

                        <Link
                            href="/contact"
                            className="
                                inline-flex
                                min-h-14
                                shrink-0
                                items-center
                                justify-center
                                gap-2
                                rounded-full
                                bg-brand-gold
                                px-8
                                font-bold
                                text-brand-950
                                transition
                                duration-300
                                hover:-translate-y-0.5
                                hover:bg-white
                            "
                        >
                            Partner With Us

                            <ArrowRight
                                size={20}
                                aria-hidden="true"
                            />
                        </Link>
                    </div>
                </Container>
            </section>

            <section
                className="
                    relative
                    overflow-hidden
                    bg-white
                    py-20
                    sm:py-24
                "
            >
                <Container>
                    <div
                        className="
                            relative
                            overflow-hidden
                            rounded-[2.5rem]
                            bg-brand-950
                            px-6
                            py-14
                            text-center
                            text-white
                            shadow-[0_30px_90px_rgba(7,45,44,0.18)]
                            sm:px-12
                            sm:py-16
                        "
                    >
                        <div
                            aria-hidden="true"
                            className="
                                absolute
                                -right-24
                                -top-28
                                h-80
                                w-80
                                rounded-full
                                bg-brand-500/25
                                blur-3xl
                            "
                        />

                        <div
                            className="
                                relative
                                mx-auto
                                max-w-3xl
                            "
                        >
                            <MessageCircle
                                className="
                                    mx-auto
                                    h-10
                                    w-10
                                    text-brand-gold
                                "
                                aria-hidden="true"
                            />

                            <h2
                                className="
                                    mt-5
                                    font-display
                                    text-4xl
                                    font-semibold
                                    leading-tight
                                    sm:text-5xl
                                "
                            >
                                Let us create your Sri Lanka story.
                            </h2>

                            <p
                                className="
                                    mx-auto
                                    mt-5
                                    max-w-2xl
                                    text-base
                                    leading-8
                                    text-white/70
                                    sm:text-lg
                                "
                            >
                                Tell us when you would like to
                                travel and what you hope to
                                experience. We will help you shape a
                                private journey around your ideas.
                            </p>

                            <div
                                className="
                                    mt-8
                                    flex
                                    flex-col
                                    justify-center
                                    gap-3
                                    sm:flex-row
                                "
                            >
                                <Link
                                    href="/plan-your-tour"
                                    className="
                                        inline-flex
                                        min-h-14
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-full
                                        bg-brand-gold
                                        px-8
                                        font-bold
                                        text-brand-950
                                        transition
                                        hover:-translate-y-0.5
                                        hover:bg-white
                                    "
                                >
                                    Plan My Journey

                                    <ArrowRight
                                        size={20}
                                        aria-hidden="true"
                                    />
                                </Link>

                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="
                                        inline-flex
                                        min-h-14
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-full
                                        border
                                        border-white/20
                                        bg-white/10
                                        px-8
                                        font-bold
                                        text-white
                                        transition
                                        hover:border-white
                                        hover:bg-white
                                        hover:text-brand-950
                                    "
                                >
                                    <MessageCircle
                                        size={19}
                                        aria-hidden="true"
                                    />

                                    Chat on WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
}