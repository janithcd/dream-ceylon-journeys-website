import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
    CalendarDays,
    MapPin,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

import {
    signatureExperiences,
    type SignatureExperience,
} from "@/data/signature-experiences";

function ExperienceCard({
                            experience,
                            index,
                        }: {
    experience: SignatureExperience;
    index: number;
}) {
    const Icon = experience.icon;

    const experienceHref =
        `/experiences#${experience.slug}`;

    return (
        <article
            className="
                group
                flex h-full flex-col
                overflow-hidden
                rounded-[1.75rem]
                border border-slate-200/90
                bg-white
                shadow-[0_14px_40px_rgba(24,40,38,0.06)]
                transition-all duration-400
                hover:-translate-y-1
                hover:border-brand-500/20
                hover:shadow-[0_22px_60px_rgba(24,40,38,0.11)]
            "
        >
            <Link
                href={experienceHref}
                className="
                    relative block
                    aspect-[4/3]
                    overflow-hidden
                    bg-slate-200
                "
                aria-label={`Explore ${experience.title}`}
            >
                <Image
                    src={experience.image}
                    alt={experience.imageAlt}
                    fill
                    sizes="
                        (max-width: 767px) 100vw,
                        (max-width: 1279px) 50vw,
                        33vw
                    "
                    className="
                        object-cover
                        transition-transform
                        duration-[900ms]
                        ease-out
                        group-hover:scale-[1.045]
                    "
                />

                <div
                    aria-hidden="true"
                    className="
                        absolute inset-0
                        bg-gradient-to-t
                        from-black/55
                        via-transparent
                        to-black/5
                    "
                />

                <div
                    className="
                        absolute left-5 top-5
                        inline-flex items-center gap-2
                        rounded-full
                        border border-white/20
                        bg-black/20
                        px-3.5 py-2
                        text-[10px] font-bold
                        uppercase tracking-[0.16em]
                        text-white
                        backdrop-blur-md
                    "
                >
                    <Icon
                        size={14}
                        className="text-brand-gold"
                        aria-hidden="true"
                    />

                    {experience.eyebrow}
                </div>

                <span
                    className="
                        absolute right-5 top-5
                        font-display
                        text-sm font-semibold
                        text-white/75
                    "
                >
                    {String(index + 1).padStart(
                        2,
                        "0"
                    )}
                </span>
            </Link>

            <div
                className="
                    flex flex-1 flex-col
                    p-6
                    sm:p-7
                    lg:p-8
                "
            >
                <h3
                    className="
                        font-display
                        text-3xl font-semibold
                        leading-tight
                        tracking-[-0.035em]
                        text-slate-900
                    "
                >
                    {experience.title}
                </h3>

                <p
                    className="
                        mt-4
                        text-sm leading-7
                        text-slate-600
                        sm:text-[15px]
                    "
                >
                    {experience.description}
                </p>

                <div
                    className="
                        mt-6
                        space-y-3
                        border-t border-slate-200
                        pt-5
                    "
                >
                    <div
                        className="
                            flex items-start gap-3
                            text-sm text-slate-600
                        "
                    >
                        <MapPin
                            size={17}
                            className="
                                mt-0.5 shrink-0
                                text-brand-500
                            "
                            aria-hidden="true"
                        />

                        <div>
                            <span
                                className="
                                    block
                                    text-[10px] font-bold
                                    uppercase tracking-[0.14em]
                                    text-slate-400
                                "
                            >
                                Best destinations
                            </span>

                            <span className="mt-1 block font-medium">
                                {
                                    experience.destinations
                                }
                            </span>
                        </div>
                    </div>

                    <div
                        className="
                            flex items-start gap-3
                            text-sm text-slate-600
                        "
                    >
                        <CalendarDays
                            size={17}
                            className="
                                mt-0.5 shrink-0
                                text-brand-500
                            "
                            aria-hidden="true"
                        />

                        <div>
                            <span
                                className="
                                    block
                                    text-[10px] font-bold
                                    uppercase tracking-[0.14em]
                                    text-slate-400
                                "
                            >
                                Recommended period
                            </span>

                            <span className="mt-1 block font-medium">
                                {experience.season}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-auto pt-7">
                    <Link
                        href={experienceHref}
                        className="
                            group/link
                            inline-flex items-center gap-2
                            text-sm font-bold
                            text-brand-700
                            transition-colors
                            hover:text-brand-900
                        "
                    >
                        Explore experience

                        <ArrowRight
                            size={17}
                            aria-hidden="true"
                            className="
                                transition-transform
                                duration-300
                                group-hover/link:translate-x-1
                            "
                        />
                    </Link>
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

export function SignatureExperiences() {
    return (
        <section
            id="signature-experiences"
            className="
                relative overflow-hidden
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
                    absolute -left-52 top-20
                    size-[440px]
                    rounded-full
                    bg-brand-100/40
                    blur-3xl
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute -right-52 bottom-10
                    size-[420px]
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
                        eyebrow="Signature experiences"
                        title="Experience Sri Lanka beyond the ordinary."
                        description="Build your private journey around wildlife, culture, scenic railways, mountain landscapes, marine encounters, and tropical coastal escapes."
                    />

                    <p
                        className="
                            max-w-md
                            text-sm leading-7
                            text-slate-600
                            sm:text-base
                            sm:leading-8
                        "
                    >
                        Experiences can be included in an
                        existing tour package or combined
                        into a completely personalised Sri
                        Lanka itinerary.
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
                    {signatureExperiences.map(
                        (experience, index) => (
                            <ExperienceCard
                                key={experience.slug}
                                experience={
                                    experience
                                }
                                index={index}
                            />
                        )
                    )}
                </div>

                <div
                    className="
                        mt-10
                        flex flex-col
                        gap-5
                        border-t border-slate-200
                        pt-8
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
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
                            Combine the experiences that
                            inspire you.
                        </h3>

                        <p
                            className="
                                mt-2
                                max-w-3xl
                                text-sm leading-7
                                text-slate-600
                            "
                        >
                            Explore every experience in
                            detail or ask our local team to
                            design a route around your
                            favourites.
                        </p>
                    </div>

                    <div
                        className="
                            flex flex-col gap-3
                            sm:flex-row
                        "
                    >
                        <Link
                            href="/experiences"
                            className="
                                group
                                inline-flex min-h-12
                                w-fit shrink-0
                                items-center justify-center
                                gap-2 rounded-full
                                border border-brand-500/25
                                bg-white
                                px-6
                                text-sm font-bold
                                text-brand-700
                                transition-all duration-300
                                hover:-translate-y-0.5
                                hover:border-brand-500
                                hover:bg-brand-50
                            "
                        >
                            View All Experiences

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

                        <Link
                            href="/plan-your-tour"
                            className="
                                group
                                inline-flex min-h-12
                                w-fit shrink-0
                                items-center justify-center
                                gap-2 rounded-full
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
                            Build My Journey
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
                </div>
            </Container>
        </section>
    );
}
