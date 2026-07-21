import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
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

import {
    getPopularDestinations,
    type Destination,
} from "@/data/destinations";

type TranslationValues =
    Record<
        string,
        string | number
    >;

type Translate = (
    key: string,
    values?: TranslationValues
) => string;

function DestinationCard({
                             destination,
                             priority,
                             t,
                         }: {
    destination: Destination;
    priority: boolean;
    t: Translate;
}) {
    return (
        <article
            className="
                group
                overflow-hidden
                rounded-[1.5rem]
                border border-slate-200
                bg-white
                shadow-[0_12px_35px_rgba(25,45,42,0.06)]
                transition-all duration-500
                hover:-translate-y-1.5
                hover:border-brand-500/25
                hover:shadow-[0_22px_55px_rgba(25,45,42,0.13)]
            "
        >
            <Link
                href={`/sri-lanka-destinations/${destination.slug}`}
                className="block h-full"
                aria-label={t(
                    "card.exploreAria",
                    {
                        name:
                        destination.name,
                    }
                )}
            >
                <div
                    className="
                        relative
                        aspect-[4/3]
                        overflow-hidden
                        bg-slate-100
                    "
                >
                    <Image
                        src={
                            destination.image
                        }
                        alt={
                            destination.imageAlt
                        }
                        fill
                        priority={
                            priority
                        }
                        sizes="
                            (max-width: 767px) 100vw,
                            (max-width: 1279px) 50vw,
                            33vw
                        "
                        className="
                            object-cover
                            transition-transform
                            duration-[1000ms]
                            ease-out
                            group-hover:scale-[1.06]
                        "
                    />

                    <div
                        aria-hidden="true"
                        className="
                            absolute inset-0
                            bg-gradient-to-t
                            from-black/75
                            via-black/10
                            to-transparent
                        "
                    />

                    <div className="absolute left-5 top-5">
                        <span
                            className="
                                inline-flex
                                rounded-full
                                border border-white/25
                                bg-black/20
                                px-3 py-1.5
                                text-[10px]
                                font-bold uppercase
                                tracking-[0.14em]
                                text-white
                                backdrop-blur-md
                            "
                        >
                            {
                                destination.tag
                            }
                        </span>
                    </div>

                    <div
                        className="
                            absolute inset-x-0
                            bottom-0 p-5
                            text-white
                        "
                    >
                        <div
                            className="
                                flex items-center
                                gap-1.5
                                text-xs font-medium
                                text-white/80
                            "
                        >
                            <MapPin
                                size={
                                    14
                                }
                                className="text-brand-gold"
                                aria-hidden="true"
                            />

                            {
                                destination.region
                            }
                        </div>

                        <h3
                            className="
                                mt-2
                                font-display
                                text-3xl
                                font-semibold
                                leading-tight
                                tracking-[-0.03em]
                                text-white
                            "
                        >
                            {
                                destination.name
                            }
                        </h3>
                    </div>
                </div>

                <div className="p-5 sm:p-6">
                    <p
                        className="
                            min-h-[84px]
                            text-sm leading-7
                            text-slate-600
                        "
                    >
                        {
                            destination.description
                        }
                    </p>

                    <div
                        className="
                            mt-5
                            rounded-xl
                            bg-brand-50
                            px-4 py-3
                        "
                    >
                        <span
                            className="
                                block
                                text-[10px]
                                font-bold uppercase
                                tracking-[0.13em]
                                text-brand-700
                            "
                        >
                            {t(
                                "card.bestFor"
                            )}
                        </span>

                        <p
                            className="
                                mt-1
                                text-sm
                                font-medium
                                leading-6
                                text-slate-700
                            "
                        >
                            {
                                destination.bestFor
                            }
                        </p>
                    </div>

                    <div
                        className="
                            mt-5
                            flex items-center
                            justify-between
                            border-t
                            border-slate-100
                            pt-5
                        "
                    >
                        <span
                            className="
                                text-sm
                                font-bold
                                text-brand-700
                            "
                        >
                            {t(
                                "card.explore"
                            )}
                        </span>

                        <span
                            className="
                                inline-flex
                                size-9
                                items-center
                                justify-center
                                rounded-full
                                bg-brand-500
                                text-white
                                transition-all
                                duration-300
                                group-hover:translate-x-1
                                group-hover:bg-brand-600
                            "
                        >
                            <ArrowRight
                                size={
                                    16
                                }
                                aria-hidden="true"
                            />
                        </span>
                    </div>
                </div>
            </Link>
        </article>
    );
}

export async function PopularDestinations() {
    const t =
        (
            await getTranslations(
                "PopularDestinations"
            )
        ) as Translate;

    const destinations =
        await getPopularDestinations(
            6
        );

    return (
        <section
            id="popular-destinations"
            className="
                relative
                overflow-hidden
                bg-[#fdfbf8]
                py-20
                sm:py-24
                lg:py-28
            "
        >
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute -right-48
                    top-12
                    size-[460px]
                    rounded-full
                    bg-brand-100/40
                    blur-3xl
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute -left-48
                    bottom-0
                    size-[420px]
                    rounded-full
                    bg-brand-gold/10
                    blur-3xl
                "
            />

            <Container className="relative max-w-[1400px]">
                <div
                    className="
                        grid gap-7
                        lg:grid-cols-[minmax(0,780px)_auto]
                        lg:items-end
                        lg:justify-between
                    "
                >
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

                    <Link
                        href="/sri-lanka-destinations"
                        className="
                            group
                            inline-flex w-fit
                            items-center gap-2
                            rounded-full
                            border border-brand-500/20
                            bg-white
                            px-5 py-3
                            text-sm font-bold
                            text-brand-800
                            shadow-sm
                            transition-all duration-300
                            hover:-translate-y-0.5
                            hover:border-brand-500/40
                            hover:bg-brand-50
                        "
                    >
                        {t(
                            "viewAll"
                        )}

                        <ArrowRight
                            size={
                                17
                            }
                            aria-hidden="true"
                            className="
                                transition-transform
                                duration-300
                                group-hover:translate-x-1
                            "
                        />
                    </Link>
                </div>

                {destinations.length >
                0 ? (
                    <div
                        className="
                            mt-12
                            grid gap-6
                            md:grid-cols-2
                            xl:grid-cols-3
                        "
                    >
                        {destinations.map(
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
                                    priority={
                                        index <
                                        3
                                    }
                                    t={
                                        t
                                    }
                                />
                            )
                        )}
                    </div>
                ) : (
                    <div
                        className="
                            mt-12
                            rounded-[1.5rem]
                            border
                            border-dashed
                            border-slate-300
                            bg-white
                            px-6 py-16
                            text-center
                        "
                    >
                        <h3
                            className="
                                text-xl
                                font-bold
                                text-slate-900
                            "
                        >
                            {t(
                                "empty.title"
                            )}
                        </h3>

                        <p
                            className="
                                mx-auto mt-3
                                max-w-lg
                                text-sm
                                leading-7
                                text-slate-600
                            "
                        >
                            {t(
                                "empty.description"
                            )}
                        </p>
                    </div>
                )}
            </Container>
        </section>
    );
}
