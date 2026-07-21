import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
    CheckCircle2,
    Compass,
    HeartHandshake,
    MapPin,
} from "lucide-react";

import {
    getTranslations,
} from "next-intl/server";

import {
    Container,
} from "@/components/ui/Container";

import {
    SectionHeading,
} from "@/components/ui/SectionHeading";

const highlightDefinitions = [
    {
        key:
            "localKnowledge",

        icon:
        MapPin,
    },
    {
        key:
            "tailorMade",

        icon:
        Compass,
    },
    {
        key:
            "personalSupport",

        icon:
        HeartHandshake,
    },
] as const;

export async function AboutPreview() {
    const t =
        await getTranslations(
            "AboutPreview"
        );

    return (
        <section
            id="about-dream-ceylon"
            className="
                relative
                overflow-hidden
                bg-white
                py-20
                sm:py-24
            "
        >
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -left-32
                    top-24
                    h-80
                    w-80
                    rounded-full
                    bg-brand-500/8
                    blur-3xl
                "
            />

            <Container>
                <div
                    className="
                        relative
                        grid
                        gap-12
                        lg:grid-cols-[0.95fr_1.05fr]
                        lg:items-center
                        lg:gap-16
                    "
                >
                    <div className="relative">
                        <div
                            className="
                                relative
                                min-h-[480px]
                                overflow-hidden
                                rounded-[2.25rem]
                                bg-slate-200
                                shadow-[0_30px_90px_rgba(7,45,44,0.16)]
                                sm:min-h-[600px]
                            "
                        >
                            <Image
                                fill
                                src="/images/destinations/sigiriya-rock-fortress-sri-lanka.jpg"
                                alt={t(
                                    "imageAlt"
                                )}
                                sizes="
                                    (max-width: 1024px) 100vw,
                                    46vw
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
                                        max-w-sm
                                        rounded-[1.5rem]
                                        border
                                        border-white/20
                                        bg-white/12
                                        p-5
                                        text-white
                                        backdrop-blur-xl
                                    "
                                >
                                    <p
                                        className="
                                            text-xs
                                            font-bold
                                            uppercase
                                            tracking-[0.2em]
                                            text-brand-gold
                                        "
                                    >
                                        {t(
                                            "imageCard.eyebrow"
                                        )}
                                    </p>

                                    <p
                                        className="
                                            mt-3
                                            font-display
                                            text-2xl
                                            font-semibold
                                            leading-tight
                                        "
                                    >
                                        {t(
                                            "imageCard.title"
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            className="
                                absolute
                                -bottom-7
                                -right-3
                                hidden
                                max-w-[260px]
                                rounded-[1.5rem]
                                border
                                border-brand-500/10
                                bg-white
                                p-5
                                shadow-[0_20px_55px_rgba(7,45,44,0.15)]
                                sm:block
                                lg:-right-8
                            "
                        >
                            <div
                                className="
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-brand-gold
                                    text-brand-950
                                "
                            >
                                <CheckCircle2
                                    size={
                                        22
                                    }
                                    aria-hidden="true"
                                />
                            </div>

                            <p
                                className="
                                    mt-4
                                    font-display
                                    text-xl
                                    font-semibold
                                    text-brand-950
                                "
                            >
                                {t(
                                    "floatingCard.title"
                                )}
                            </p>

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    leading-6
                                    text-slate-600
                                "
                            >
                                {t(
                                    "floatingCard.description"
                                )}
                            </p>
                        </div>
                    </div>

                    <div>
                        <SectionHeading
                            eyebrow={t(
                                "heading.eyebrow"
                            )}
                            title={t(
                                "heading.title"
                            )}
                            description={t(
                                "heading.description"
                            )}
                        />

                        <p
                            className="
                                mt-6
                                text-base
                                leading-8
                                text-slate-600
                                sm:text-lg
                            "
                        >
                            {t(
                                "body"
                            )}
                        </p>

                        <div className="mt-8 space-y-5">
                            {highlightDefinitions.map(
                                (
                                    item
                                ) => {
                                    const Icon =
                                        item.icon;

                                    return (
                                        <article
                                            key={
                                                item.key
                                            }
                                            className="
                                                flex
                                                items-start
                                                gap-4
                                                rounded-[1.35rem]
                                                border
                                                border-brand-500/10
                                                bg-sand-50
                                                p-5
                                                transition
                                                duration-300
                                                hover:-translate-y-0.5
                                                hover:bg-white
                                                hover:shadow-[0_16px_45px_rgba(7,45,44,0.08)]
                                            "
                                        >
                                            <div
                                                className="
                                                    flex
                                                    h-11
                                                    w-11
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-xl
                                                    bg-brand-100
                                                    text-brand-700
                                                "
                                            >
                                                <Icon
                                                    size={
                                                        21
                                                    }
                                                    aria-hidden="true"
                                                />
                                            </div>

                                            <div>
                                                <h3
                                                    className="
                                                        font-display
                                                        text-xl
                                                        font-semibold
                                                        text-brand-950
                                                    "
                                                >
                                                    {t(
                                                        `highlights.${item.key}.title`
                                                    )}
                                                </h3>

                                                <p
                                                    className="
                                                        mt-1.5
                                                        text-sm
                                                        leading-6
                                                        text-slate-600
                                                    "
                                                >
                                                    {t(
                                                        `highlights.${item.key}.description`
                                                    )}
                                                </p>
                                            </div>
                                        </article>
                                    );
                                }
                            )}
                        </div>

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
                                href="/about"
                                className="
                                    inline-flex
                                    min-h-13
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-full
                                    bg-brand-500
                                    px-7
                                    font-bold
                                    text-white
                                    shadow-[0_14px_35px_rgba(0,141,134,0.22)]
                                    transition
                                    duration-300
                                    hover:-translate-y-0.5
                                    hover:bg-brand-600
                                "
                            >
                                {t(
                                    "buttons.learnMore"
                                )}

                                <ArrowRight
                                    size={
                                        19
                                    }
                                    aria-hidden="true"
                                />
                            </Link>

                            <Link
                                href="/contact"
                                className="
                                    inline-flex
                                    min-h-13
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-brand-500/20
                                    bg-white
                                    px-7
                                    font-bold
                                    text-brand-800
                                    transition
                                    duration-300
                                    hover:border-brand-500
                                    hover:bg-brand-50
                                "
                            >
                                {t(
                                    "buttons.contact"
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}