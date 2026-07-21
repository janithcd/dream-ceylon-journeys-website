import type {
    Metadata,
} from "next";

import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
    Building2,
    CalendarDays,
    CheckCircle2,
    Clock3,
    Globe2,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Route,
    ShieldCheck,
    Sparkles,
    UsersRound,
} from "lucide-react";

import { ContactInquiryForm } from "@/components/forms/ContactInquiryForm";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

import {
    siteConfig,
    whatsappUrl,
} from "@/lib/site";

export const metadata: Metadata = {
    title:
        "Contact Dream Ceylon Journeys",

    description:
        "Contact Dream Ceylon Journeys for private Sri Lanka tours, chauffeur-guides, vehicles, airport transfers, custom itineraries and B2B travel support.",

    alternates: {
        canonical:
            "/contact",
    },

    openGraph: {
        title:
            "Contact Dream Ceylon Journeys",

        description:
            "Speak directly with a local Sri Lankan travel expert about private tours, transport, tailor-made itineraries and travel partnerships.",

        url:
            "/contact",

        type:
            "website",
    },
};

const encodedAddress =
    encodeURIComponent(
        siteConfig.address
    );

const googleMapsUrl =
    `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

const googleMapsEmbedUrl =
    `https://www.google.com/maps?q=${encodedAddress}&output=embed`;

const contactPageSchema = {
    "@context":
        "https://schema.org",

    "@type":
        "TravelAgency",

    name:
    siteConfig.name,

    description:
    siteConfig.description,

    url:
        `${siteConfig.url.replace(/\/+$/, "")}/contact`,

    email:
    siteConfig.email,

    telephone:
    siteConfig.phone,

    address: {
        "@type":
            "PostalAddress",

        streetAddress:
            "89/2 Malwatta Road",

        addressLocality:
            "Hokandara",

        addressRegion:
            "Western Province",

        addressCountry:
            "LK",
    },

    contactPoint: [
        {
            "@type":
                "ContactPoint",

            telephone:
            siteConfig.phone,

            email:
            siteConfig.email,

            contactType:
                "customer service",

            availableLanguage: [
                "English",
                "Sinhala",
            ],
        },
    ],
};

export default function ContactPage() {
    return (
        <main className="overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html:
                        JSON.stringify(
                            contactPageSchema
                        ),
                }}
            />

            <section
                className="
                    relative
                    isolate
                    min-h-[620px]
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
                    src="/images/hero/mirissa-coast.jpg"
                    alt="Beautiful Sri Lankan coastline"
                    sizes="100vw"
                    className="object-cover"
                />

                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-r
                        from-brand-950
                        via-brand-950/85
                        to-brand-950/35
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
                        -right-28
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
                            pb-28
                            sm:pb-36
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

                            Contact Dream Ceylon Journeys
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
                            Let&apos;s begin planning your Sri
                            Lanka journey.
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
                            Speak directly with our local team
                            about private tours, transport,
                            tailor-made itineraries, existing
                            bookings, or B2B ground support.
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
                            <a
                                href={
                                    whatsappUrl
                                }
                                target="_blank"
                                rel="noreferrer"
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
                                <MessageCircle
                                    className="
                                        h-5
                                        w-5
                                    "
                                    aria-hidden="true"
                                />

                                Chat on WhatsApp
                            </a>

                            <Link
                                href="/plan-your-tour"
                                className="
                                    inline-flex
                                    min-h-14
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-white/25
                                    bg-white/10
                                    px-8
                                    font-bold
                                    text-white
                                    backdrop-blur-md
                                    transition
                                    hover:border-white
                                    hover:bg-white
                                    hover:text-brand-950
                                "
                            >
                                Plan a Custom Tour

                                <ArrowRight
                                    className="
                                        h-5
                                        w-5
                                    "
                                    aria-hidden="true"
                                />
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>

            <section
                className="
                    relative
                    z-10
                    -mt-14
                    pb-20
                    sm:-mt-20
                    sm:pb-24
                "
            >
                <Container>
                    <div
                        className="
                            grid
                            gap-4
                            sm:grid-cols-2
                            xl:grid-cols-4
                        "
                    >
                        <a
                            href={`tel:${siteConfig.phone}`}
                            className="
                                group
                                rounded-[1.5rem]
                                border
                                border-white
                                bg-white
                                p-6
                                shadow-[0_20px_60px_rgba(7,45,44,0.12)]
                                transition
                                hover:-translate-y-1
                            "
                        >
                            <div
                                className="
                                    flex
                                    h-12
                                    w-12
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-brand-100
                                    text-brand-700
                                "
                            >
                                <Phone
                                    className="
                                        h-5
                                        w-5
                                    "
                                    aria-hidden="true"
                                />
                            </div>

                            <p
                                className="
                                    mt-5
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-[0.16em]
                                    text-brand-600
                                "
                            >
                                Call us
                            </p>

                            <p
                                className="
                                    mt-2
                                    font-display
                                    text-xl
                                    font-semibold
                                    text-brand-950
                                "
                            >
                                {siteConfig.phone}
                            </p>

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    leading-6
                                    text-slate-500
                                "
                            >
                                Speak with our Sri Lanka-based
                                travel team.
                            </p>
                        </a>

                        <a
                            href={`mailto:${siteConfig.email}`}
                            className="
                                group
                                rounded-[1.5rem]
                                border
                                border-white
                                bg-white
                                p-6
                                shadow-[0_20px_60px_rgba(7,45,44,0.12)]
                                transition
                                hover:-translate-y-1
                            "
                        >
                            <div
                                className="
                                    flex
                                    h-12
                                    w-12
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-brand-100
                                    text-brand-700
                                "
                            >
                                <Mail
                                    className="
                                        h-5
                                        w-5
                                    "
                                    aria-hidden="true"
                                />
                            </div>

                            <p
                                className="
                                    mt-5
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-[0.16em]
                                    text-brand-600
                                "
                            >
                                Email us
                            </p>

                            <p
                                className="
                                    mt-2
                                    break-all
                                    font-display
                                    text-lg
                                    font-semibold
                                    text-brand-950
                                "
                            >
                                {siteConfig.email}
                            </p>

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    leading-6
                                    text-slate-500
                                "
                            >
                                Send your travel plans and
                                requirements.
                            </p>
                        </a>

                        <a
                            href={
                                whatsappUrl
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="
                                group
                                rounded-[1.5rem]
                                border
                                border-white
                                bg-white
                                p-6
                                shadow-[0_20px_60px_rgba(7,45,44,0.12)]
                                transition
                                hover:-translate-y-1
                            "
                        >
                            <div
                                className="
                                    flex
                                    h-12
                                    w-12
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-brand-gold
                                    text-brand-950
                                "
                            >
                                <MessageCircle
                                    className="
                                        h-5
                                        w-5
                                    "
                                    aria-hidden="true"
                                />
                            </div>

                            <p
                                className="
                                    mt-5
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-[0.16em]
                                    text-brand-600
                                "
                            >
                                WhatsApp
                            </p>

                            <p
                                className="
                                    mt-2
                                    font-display
                                    text-xl
                                    font-semibold
                                    text-brand-950
                                "
                            >
                                Start a conversation
                            </p>

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    leading-6
                                    text-slate-500
                                "
                            >
                                A convenient option for quick
                                travel questions.
                            </p>
                        </a>

                        <a
                            href={
                                googleMapsUrl
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="
                                group
                                rounded-[1.5rem]
                                border
                                border-white
                                bg-white
                                p-6
                                shadow-[0_20px_60px_rgba(7,45,44,0.12)]
                                transition
                                hover:-translate-y-1
                            "
                        >
                            <div
                                className="
                                    flex
                                    h-12
                                    w-12
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-brand-100
                                    text-brand-700
                                "
                            >
                                <MapPin
                                    className="
                                        h-5
                                        w-5
                                    "
                                    aria-hidden="true"
                                />
                            </div>

                            <p
                                className="
                                    mt-5
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-[0.16em]
                                    text-brand-600
                                "
                            >
                                Our location
                            </p>

                            <p
                                className="
                                    mt-2
                                    font-display
                                    text-xl
                                    font-semibold
                                    text-brand-950
                                "
                            >
                                Hokandara, Sri Lanka
                            </p>

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    leading-6
                                    text-slate-500
                                "
                            >
                                Open the address using Google
                                Maps.
                            </p>
                        </a>
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
                            gap-10
                            xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)]
                            xl:items-start
                        "
                    >
                        <ContactInquiryForm />

                        <aside className="space-y-5">
                            <div
                                className="
                                    rounded-[2rem]
                                    bg-brand-950
                                    p-7
                                    text-white
                                    shadow-[0_24px_70px_rgba(7,45,44,0.16)]
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
                                    Before you contact us
                                </p>

                                <h2
                                    className="
                                        mt-4
                                        font-display
                                        text-3xl
                                        font-semibold
                                        leading-tight
                                    "
                                >
                                    The more details you share,
                                    the better we can assist.
                                </h2>

                                <div className="mt-7 space-y-5">
                                    {[
                                        {
                                            icon: CalendarDays,
                                            title:
                                                "Travel dates",
                                            description:
                                                "Exact or approximate arrival and departure dates.",
                                        },
                                        {
                                            icon:
                                            UsersRound,
                                            title:
                                                "Group details",
                                            description:
                                                "Number of adults, children, and luggage requirements.",
                                        },
                                        {
                                            icon:
                                            Route,
                                            title:
                                                "Preferred route",
                                            description:
                                                "Destinations, experiences, and activities you would like to include.",
                                        },
                                        {
                                            icon:
                                            Globe2,
                                            title:
                                                "Travel preferences",
                                            description:
                                                "Budget range, accommodation style, pace, and special requirements.",
                                        },
                                    ].map(
                                        (
                                            item
                                        ) => {
                                            const Icon =
                                                item.icon;

                                            return (
                                                <div
                                                    key={
                                                        item.title
                                                    }
                                                    className="
                                                        flex
                                                        items-start
                                                        gap-4
                                                    "
                                                >
                                                    <div
                                                        className="
                                                            flex
                                                            h-10
                                                            w-10
                                                            shrink-0
                                                            items-center
                                                            justify-center
                                                            rounded-xl
                                                            bg-white/10
                                                            text-brand-gold
                                                        "
                                                    >
                                                        <Icon
                                                            className="
                                                                h-5
                                                                w-5
                                                            "
                                                            aria-hidden="true"
                                                        />
                                                    </div>

                                                    <div>
                                                        <h3
                                                            className="
                                                                font-semibold
                                                            "
                                                        >
                                                            {item.title}
                                                        </h3>

                                                        <p
                                                            className="
                                                                mt-1
                                                                text-sm
                                                                leading-6
                                                                text-white/60
                                                            "
                                                        >
                                                            {
                                                                item.description
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>

                            <div
                                className="
                                    rounded-[2rem]
                                    border
                                    border-brand-500/10
                                    bg-white
                                    p-7
                                    shadow-[0_18px_55px_rgba(7,45,44,0.07)]
                                "
                            >
                                <Clock3
                                    className="
                                        h-8
                                        w-8
                                        text-brand-600
                                    "
                                    aria-hidden="true"
                                />

                                <h2
                                    className="
                                        mt-5
                                        font-display
                                        text-2xl
                                        font-semibold
                                        text-brand-950
                                    "
                                >
                                    Local Sri Lanka support
                                </h2>

                                <p
                                    className="
                                        mt-3
                                        text-sm
                                        leading-7
                                        text-slate-600
                                    "
                                >
                                    Messages are reviewed by our
                                    local team. We aim to respond
                                    as soon as possible based on
                                    Sri Lankan local time.
                                </p>

                                <div
                                    className="
                                        mt-5
                                        flex
                                        items-start
                                        gap-3
                                        rounded-xl
                                        bg-brand-50
                                        p-4
                                        text-sm
                                        leading-6
                                        text-brand-900
                                    "
                                >
                                    <ShieldCheck
                                        className="
                                            mt-0.5
                                            h-5
                                            w-5
                                            shrink-0
                                            text-brand-600
                                        "
                                        aria-hidden="true"
                                    />

                                    Your information is used only
                                    to review and respond to your
                                    inquiry.
                                </div>
                            </div>
                        </aside>
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
                    <div
                        className="
                            grid
                            gap-10
                            lg:grid-cols-[0.75fr_1.25fr]
                            lg:items-center
                        "
                    >
                        <div>
                            <SectionHeading
                                eyebrow="Find us"
                                title="Dream Ceylon Journeys in Hokandara."
                                description="Our Sri Lanka-based team provides tour planning, private transportation, chauffeur-guide support, and ground handling services across the island."
                            />

                            <div
                                className="
                                    mt-8
                                    rounded-[1.5rem]
                                    border
                                    border-brand-500/10
                                    bg-sand-50
                                    p-6
                                "
                            >
                                <div
                                    className="
                                        flex
                                        items-start
                                        gap-4
                                    "
                                >
                                    <MapPin
                                        className="
                                            mt-1
                                            h-6
                                            w-6
                                            shrink-0
                                            text-brand-600
                                        "
                                        aria-hidden="true"
                                    />

                                    <div>
                                        <p
                                            className="
                                                font-display
                                                text-xl
                                                font-semibold
                                                text-brand-950
                                            "
                                        >
                                            Office address
                                        </p>

                                        <p
                                            className="
                                                mt-2
                                                leading-7
                                                text-slate-600
                                            "
                                        >
                                            {siteConfig.address}
                                        </p>
                                    </div>
                                </div>

                                <a
                                    href={
                                        googleMapsUrl
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                    className="
                                        mt-6
                                        inline-flex
                                        min-h-12
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-full
                                        bg-brand-600
                                        px-6
                                        font-bold
                                        text-white
                                        transition
                                        hover:-translate-y-0.5
                                        hover:bg-brand-700
                                    "
                                >
                                    Open in Google Maps

                                    <ArrowRight
                                        className="
                                            h-4
                                            w-4
                                        "
                                        aria-hidden="true"
                                    />
                                </a>
                            </div>
                        </div>

                        <div
                            className="
                                overflow-hidden
                                rounded-[2rem]
                                border
                                border-slate-200
                                bg-slate-100
                                shadow-[0_24px_70px_rgba(7,45,44,0.10)]
                            "
                        >
                            <iframe
                                title="Dream Ceylon Journeys location on Google Maps"
                                src={
                                    googleMapsEmbedUrl
                                }
                                width="100%"
                                height="520"
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                                className="
                                    block
                                    min-h-[420px]
                                    w-full
                                    border-0
                                "
                            />
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
                    <div
                        className="
                            relative
                            overflow-hidden
                            rounded-[2.5rem]
                            bg-brand-500
                            px-7
                            py-12
                            text-white
                            shadow-[0_30px_80px_rgba(0,141,134,0.20)]
                            sm:px-10
                            lg:px-14
                        "
                    >
                        <div
                            aria-hidden="true"
                            className="
                                absolute
                                -right-24
                                -top-24
                                h-72
                                w-72
                                rounded-full
                                bg-brand-gold/20
                                blur-3xl
                            "
                        />

                        <div
                            className="
                                relative
                                grid
                                gap-9
                                lg:grid-cols-[1fr_auto]
                                lg:items-center
                            "
                        >
                            <div>
                                <div
                                    className="
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-white/15
                                        text-brand-gold
                                    "
                                >
                                    <Building2
                                        className="
                                            h-6
                                            w-6
                                        "
                                        aria-hidden="true"
                                    />
                                </div>

                                <p
                                    className="
                                        mt-5
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
                                    Need a dependable ground
                                    partner in Sri Lanka?
                                </h2>

                                <p
                                    className="
                                        mt-4
                                        max-w-3xl
                                        leading-7
                                        text-white/75
                                    "
                                >
                                    We can assist outbound
                                    operators with ground handling,
                                    transport, chauffeur-guides,
                                    itinerary support, and client
                                    movement inside Sri Lanka.
                                </p>
                            </div>

                            <a
                                href={`mailto:${siteConfig.email}?subject=Travel%20Agent%20or%20B2B%20Partnership%20Inquiry`}
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
                                    hover:-translate-y-0.5
                                    hover:bg-white
                                "
                            >
                                Discuss a Partnership

                                <ArrowRight
                                    className="
                                        h-5
                                        w-5
                                    "
                                    aria-hidden="true"
                                />
                            </a>
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
                    <div
                        className="
                            mx-auto
                            max-w-5xl
                            rounded-[2.5rem]
                            bg-brand-950
                            px-7
                            py-14
                            text-center
                            text-white
                            shadow-[0_30px_90px_rgba(7,45,44,0.18)]
                            sm:px-12
                            sm:py-16
                        "
                    >
                        <CheckCircle2
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
                            Ready to create your private Sri Lanka
                            journey?
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
                            Use our detailed planning form to
                            share your dates, route, interests,
                            transport needs, and preferred travel
                            style.
                        </p>

                        <Link
                            href="/plan-your-tour"
                            className="
                                mt-8
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
                                className="
                                    h-5
                                    w-5
                                "
                                aria-hidden="true"
                            />
                        </Link>
                    </div>
                </Container>
            </section>
        </main>
    );
}

