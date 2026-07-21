import type {
    Metadata,
} from "next";

import Link from "next/link";

import {
    notFound,
    redirect,
} from "next/navigation";

import {
    hasLocale,
} from "next-intl";

import {
    getTranslations,
    setRequestLocale,
} from "next-intl/server";

import {
    ArrowLeft,
    CheckCircle2,
    Globe2,
} from "lucide-react";

import {
    Container,
} from "@/components/ui/Container";

import {
    routing,
} from "@/i18n/routing";

type LocalizedHomePageProps = {
    params: Promise<{
        locale: string;
    }>;
};

export function generateStaticParams() {
    return [
        {
            locale:
                "de",
        },
    ];
}

export async function generateMetadata({
                                           params,
                                       }: LocalizedHomePageProps): Promise<Metadata> {
    const {
        locale,
    } =
        await params;

    if (
        locale !==
        "de"
    ) {
        return {};
    }

    const t =
        await getTranslations({
            locale,

            namespace:
                "LocaleTest",
        });

    return {
        title:
            t(
                "metadata.title"
            ),

        description:
            t(
                "metadata.description"
            ),

        alternates: {
            canonical:
                "/de",
        },

        openGraph: {
            title:
                t(
                    "metadata.title"
                ),

            description:
                t(
                    "metadata.description"
                ),

            url:
                "/de",

            locale:
                "de_DE",

            type:
                "website",
        },

        /*
         * Keep the test page out of search
         * engines until the complete German
         * website has been translated.
         */
        robots: {
            index:
                false,

            follow:
                false,
        },
    };
}

export default async function LocalizedHomePage({
                                                    params,
                                                }: LocalizedHomePageProps) {
    const {
        locale,
    } =
        await params;

    /*
     * English must remain available at /
     * rather than /en.
     */
    if (
        locale ===
        routing.defaultLocale
    ) {
        redirect(
            "/"
        );
    }

    if (
        !hasLocale(
            routing.locales,
            locale
        )
    ) {
        notFound();
    }

    setRequestLocale(
        locale
    );

    const t =
        await getTranslations({
            locale,

            namespace:
                "LocaleTest",
        });

    return (
        <main
            className="
                min-h-[720px]
                bg-sand-50
                pb-24
                pt-36
                sm:pt-44
            "
        >
            <Container>
                <div
                    className="
                        relative
                        overflow-hidden
                        rounded-[2.5rem]
                        bg-brand-950
                        px-7
                        py-14
                        text-white
                        shadow-[0_30px_90px_rgba(7,45,44,0.18)]
                        sm:px-12
                        sm:py-16
                        lg:px-16
                    "
                >
                    <div
                        aria-hidden="true"
                        className="
                            absolute
                            -right-28
                            -top-28
                            size-80
                            rounded-full
                            bg-brand-gold/20
                            blur-3xl
                        "
                    />

                    <div
                        aria-hidden="true"
                        className="
                            absolute
                            -bottom-28
                            -left-28
                            size-80
                            rounded-full
                            bg-brand-500/25
                            blur-3xl
                        "
                    />

                    <div className="relative max-w-4xl">
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
                            <Globe2
                                className="
                                    h-4
                                    w-4
                                    text-brand-gold
                                "
                                aria-hidden="true"
                            />

                            {t(
                                "badge"
                            )}
                        </div>

                        <h1
                            className="
                                mt-7
                                max-w-4xl
                                font-display
                                text-4xl
                                font-semibold
                                leading-tight
                                tracking-[-0.03em]
                                sm:text-5xl
                                lg:text-6xl
                            "
                        >
                            {t(
                                "title"
                            )}
                        </h1>

                        <p
                            className="
                                mt-6
                                max-w-3xl
                                text-lg
                                leading-8
                                text-white/70
                            "
                        >
                            {t(
                                "description"
                            )}
                        </p>

                        <div
                            className="
                                mt-9
                                flex
                                max-w-2xl
                                items-start
                                gap-4
                                rounded-[1.5rem]
                                border
                                border-white/15
                                bg-white/10
                                p-5
                                backdrop-blur-md
                            "
                        >
                            <CheckCircle2
                                className="
                                    mt-0.5
                                    h-6
                                    w-6
                                    shrink-0
                                    text-brand-gold
                                "
                                aria-hidden="true"
                            />

                            <div>
                                <h2
                                    className="
                                        font-display
                                        text-xl
                                        font-semibold
                                    "
                                >
                                    {t(
                                        "statusTitle"
                                    )}
                                </h2>

                                <p
                                    className="
                                        mt-2
                                        text-sm
                                        leading-7
                                        text-white/65
                                    "
                                >
                                    {t(
                                        "statusDescription"
                                    )}
                                </p>
                            </div>
                        </div>

                        <Link
                            href="/"
                            className="
                                mt-9
                                inline-flex
                                min-h-13
                                items-center
                                justify-center
                                gap-2
                                rounded-full
                                bg-brand-gold
                                px-7
                                font-bold
                                text-brand-950
                                transition
                                hover:-translate-y-0.5
                                hover:bg-white
                            "
                        >
                            <ArrowLeft
                                className="
                                    h-4
                                    w-4
                                "
                                aria-hidden="true"
                            />

                            {t(
                                "englishButton"
                            )}
                        </Link>
                    </div>
                </div>
            </Container>
        </main>
    );
}