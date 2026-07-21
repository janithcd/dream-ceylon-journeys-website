"use client";

import Link from "next/link";

import {
    Check,
    ChevronDown,
    Globe2,
} from "lucide-react";

import {
    useLocale,
    useTranslations,
} from "next-intl";

import {
    usePathname,
} from "next/navigation";

type LanguageSwitcherProps = {
    variant?:
        | "desktop"
        | "mobile";
};

/*
 * Add paths here only after their
 * German versions have been created.
 *
 * For now, only the homepage exists
 * in both English and German.
 */
const germanLocalizedPaths =
    new Set<string>([
        "/",
    ]);

function removeLocalePrefix(
    pathname: string
): string {
    if (
        pathname === "/de"
    ) {
        return "/";
    }

    if (
        pathname.startsWith(
            "/de/"
        )
    ) {
        return (
            pathname.slice(3) ||
            "/"
        );
    }

    return pathname || "/";
}

function createGermanPath(
    englishPath: string
): string {
    if (
        !germanLocalizedPaths.has(
            englishPath
        )
    ) {
        /*
         * The equivalent German page
         * is not published yet, so use
         * the German homepage.
         */
        return "/de";
    }

    if (
        englishPath === "/"
    ) {
        return "/de";
    }

    return `/de${englishPath}`;
}

export function LanguageSwitcher({
                                     variant = "desktop",
                                 }: LanguageSwitcherProps) {
    const locale =
        useLocale();

    const pathname =
        usePathname() || "/";

    const t =
        useTranslations(
            "LanguageSwitcher"
        );

    const englishPath =
        removeLocalePrefix(
            pathname
        );

    const germanPath =
        createGermanPath(
            englishPath
        );

    const isGerman =
        locale === "de";

    const currentLanguage =
        isGerman
            ? t("german")
            : t("english");

    const currentCode =
        isGerman
            ? "DE"
            : "EN";

    const isMobile =
        variant === "mobile";

    const optionClassName = `
        flex
        min-h-11
        items-center
        justify-between
        gap-4
        rounded-xl
        px-3.5
        text-sm
        font-semibold
        transition
        hover:bg-brand-50
        hover:text-brand-800
    `;

    return (
        <details
            className={`
                group
                relative
                ${
                isMobile
                    ? "w-full"
                    : ""
            }
            `}
        >
            <summary
                aria-label={t(
                    "language"
                )}
                className={`
                    flex
                    cursor-pointer
                    list-none
                    items-center
                    justify-between
                    gap-2
                    transition
                    [&::-webkit-details-marker]:hidden

                    ${
                    isMobile
                        ? `
                                min-h-12
                                w-full
                                rounded-2xl
                                border
                                border-brand-500/15
                                bg-brand-50
                                px-4
                                font-semibold
                                text-brand-800
                                hover:bg-brand-100
                            `
                        : `
                                min-h-10
                                rounded-full
                                border
                                border-white/90
                                bg-white/[0.68]
                                px-3
                                text-[12px]
                                font-semibold
                                text-brand-800
                                shadow-[inset_0_1px_0_rgba(255,255,255,1),0_8px_22px_rgba(0,141,134,0.08)]
                                backdrop-blur-xl
                                hover:-translate-y-0.5
                                hover:bg-white
                                min-[1500px]:px-4
                                min-[1500px]:text-sm
                            `
                }
                `}
            >
                <span className="flex items-center gap-2">
                    <Globe2
                        size={17}
                        aria-hidden="true"
                    />

                    {isMobile ? (
                        <span>
                            {currentLanguage}
                        </span>
                    ) : (
                        <span>
                            {currentCode}
                        </span>
                    )}
                </span>

                <ChevronDown
                    size={15}
                    aria-hidden="true"
                    className="
                        transition-transform
                        duration-200
                        group-open:rotate-180
                    "
                />
            </summary>

            <div
                className={`
                    z-[100]
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-2
                    shadow-[0_22px_65px_rgba(20,38,36,0.20)]

                    ${
                    isMobile
                        ? `
                                mt-2
                                w-full
                            `
                        : `
                                absolute
                                right-0
                                top-full
                                mt-3
                                w-52
                            `
                }
                `}
            >
                {locale === "en" ? (
                    <span
                        aria-current="page"
                        className={`
                            ${optionClassName}
                            bg-brand-50
                            text-brand-800
                        `}
                    >
                        <span>
                            {t(
                                "english"
                            )}
                        </span>

                        <Check
                            size={17}
                            aria-hidden="true"
                            className="text-brand-500"
                        />
                    </span>
                ) : (
                    <Link
                        href={
                            englishPath
                        }
                        hrefLang="en"
                        lang="en"
                        className={
                            optionClassName
                        }
                    >
                        <span>
                            {t(
                                "english"
                            )}
                        </span>
                    </Link>
                )}

                {locale === "de" ? (
                    <span
                        aria-current="page"
                        className={`
                            ${optionClassName}
                            bg-brand-50
                            text-brand-800
                        `}
                    >
                        <span>
                            {t(
                                "german"
                            )}
                        </span>

                        <Check
                            size={17}
                            aria-hidden="true"
                            className="text-brand-500"
                        />
                    </span>
                ) : (
                    <Link
                        href={
                            germanPath
                        }
                        hrefLang="de"
                        lang="de"
                        className={
                            optionClassName
                        }
                    >
                        <span>
                            {t(
                                "german"
                            )}
                        </span>
                    </Link>
                )}
            </div>
        </details>
    );
}