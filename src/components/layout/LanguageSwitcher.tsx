"use client";

import {
    Check,
    ChevronDown,
    Globe2,
    LoaderCircle,
} from "lucide-react";

import {
    useLocale,
    useTranslations,
} from "next-intl";

import {
    usePathname,
} from "next/navigation";

import {
    useState,
} from "react";

type LanguageSwitcherProps = {
    variant?: "desktop" | "mobile";
    onNavigate?: () => void;
};

/*
 * Add paths here after their complete
 * German versions have been created.
 *
 * Currently, only the homepage exists
 * in both languages.
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
        pathname.startsWith("/de/")
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
    /*
     * When the equivalent German page
     * does not exist yet, direct the
     * visitor to the German homepage.
     */
    if (
        !germanLocalizedPaths.has(
            englishPath
        )
    ) {
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
                                     onNavigate,
                                 }: LanguageSwitcherProps) {
    const locale =
        useLocale();

    const pathname =
        usePathname() || "/";

    const t =
        useTranslations(
            "LanguageSwitcher"
        );

    const [
        open,
        setOpen,
    ] =
        useState(false);

    const [
        isChanging,
        setIsChanging,
    ] =
        useState(false);

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

    const isMobile =
        variant === "mobile";

    const currentLanguage =
        isGerman
            ? t("german")
            : t("english");

    const currentCode =
        isGerman
            ? "DE"
            : "EN";

    function changeLanguage(
        targetPath: string
    ) {
        if (
            isChanging ||
            targetPath === pathname
        ) {
            setOpen(false);
            return;
        }

        setIsChanging(true);
        setOpen(false);

        onNavigate?.();

        /*
         * A full navigation is intentional
         * during the current migration.
         *
         * It causes the root layout,
         * NextIntlClientProvider, messages,
         * metadata and html lang attribute
         * to load using the new locale.
         */
        window.location.replace(
            targetPath
        );
    }

    const optionClassName = `
        flex
        min-h-11
        w-full
        items-center
        justify-between
        gap-4
        rounded-xl
        px-3.5
        text-left
        text-sm
        font-semibold
        transition
        hover:bg-brand-50
        hover:text-brand-800
        disabled:cursor-wait
        disabled:opacity-60
    `;

    return (
        <div
            className={`
                relative
                ${
                isMobile
                    ? "w-full"
                    : ""
            }
            `}
            onBlurCapture={(event) => {
                const nextTarget =
                    event.relatedTarget;

                if (
                    !event.currentTarget.contains(
                        nextTarget
                    )
                ) {
                    setOpen(false);
                }
            }}
            onKeyDown={(event) => {
                if (
                    event.key === "Escape"
                ) {
                    setOpen(false);
                }
            }}
        >
            <button
                type="button"
                onClick={() =>
                    setOpen(
                        (current) =>
                            !current
                    )
                }
                disabled={isChanging}
                aria-label={t(
                    "language"
                )}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-busy={isChanging}
                className={`
                    flex
                    items-center
                    justify-between
                    gap-2
                    transition

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
                                min-w-16
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
                            `
                }
                `}
            >
                <span className="flex items-center gap-2 whitespace-nowrap">
                    <Globe2
                        size={17}
                        aria-hidden="true"
                    />

                    <span>
                        {isMobile
                            ? currentLanguage
                            : currentCode}
                    </span>
                </span>

                {isChanging ? (
                    <LoaderCircle
                        size={15}
                        className="animate-spin"
                        aria-hidden="true"
                    />
                ) : (
                    <ChevronDown
                        size={15}
                        aria-hidden="true"
                        className={`
                            transition-transform
                            duration-200

                            ${
                            open
                                ? "rotate-180"
                                : ""
                        }
                        `}
                    />
                )}
            </button>

            {open ? (
                <div
                    role="menu"
                    aria-label={t(
                        "language"
                    )}
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
                            role="menuitem"
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
                        <button
                            type="button"
                            role="menuitem"
                            disabled={isChanging}
                            onClick={() =>
                                changeLanguage(
                                    englishPath
                                )
                            }
                            className={
                                optionClassName
                            }
                        >
                            <span>
                                {t(
                                    "english"
                                )}
                            </span>
                        </button>
                    )}

                    {locale === "de" ? (
                        <span
                            role="menuitem"
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
                        <button
                            type="button"
                            role="menuitem"
                            disabled={isChanging}
                            onClick={() =>
                                changeLanguage(
                                    germanPath
                                )
                            }
                            className={
                                optionClassName
                            }
                        >
                            <span>
                                {t(
                                    "german"
                                )}
                            </span>
                        </button>
                    )}
                </div>
            ) : null}
        </div>
    );
}