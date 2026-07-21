"use client";

import styles from "./Header.module.css";

import Image from "next/image";
import Link from "next/link";

import {
    ChevronDown,
    ChevronRight,
    Mail,
    MapPin,
    Menu,
    MessageCircle,
    Phone,
    X,
} from "lucide-react";

import {
    usePathname,
} from "next/navigation";

import {
    useEffect,
    useState,
} from "react";

import {
    useLocale,
    useTranslations,
} from "next-intl";

import {
    LanguageSwitcher,
} from "@/components/layout/LanguageSwitcher";

import {
    ButtonLink,
} from "@/components/ui/ButtonLink";

import {
    Container,
} from "@/components/ui/Container";

import {
    mainNavigation,
    type NavigationItem,
} from "@/data/navigation";

import {
    siteConfig,
    whatsappUrl,
} from "@/lib/site";

/*
 * Add paths here only after their
 * German versions have been created.
 *
 * At the moment only the homepage
 * exists in German.
 */
const germanPublishedPaths =
    new Set<string>([
        "/",
    ]);

function normalizePath(
    value: string
): string {
    if (
        value === "/"
    ) {
        return "/";
    }

    return value.replace(
        /\/+$/,
        ""
    );
}

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
            pathname.slice(
                3
            ) || "/"
        );
    }

    return pathname;
}

function splitInternalHref(
    href: string
): {
    pathname: string;
    suffix: string;
} {
    const match =
        href.match(
            /^([^?#]*)(.*)$/
        );

    return {
        pathname:
            match?.[1] ||
            "/",

        suffix:
            match?.[2] ||
            "",
    };
}

function getLocalizedHref(
    href: string,
    locale: string
): string {
    /*
     * External URLs, telephone links
     * and email links remain unchanged.
     */
    if (
        !href.startsWith(
            "/"
        )
    ) {
        return href;
    }

    if (
        locale !== "de"
    ) {
        return href;
    }

    const {
        pathname,
        suffix,
    } =
        splitInternalHref(
            href
        );

    /*
     * Do not generate a German URL
     * until that translated page exists.
     */
    if (
        !germanPublishedPaths.has(
            pathname
        )
    ) {
        return href;
    }

    if (
        pathname === "/"
    ) {
        return `/de${suffix}`;
    }

    return `/de${pathname}${suffix}`;
}

function isLinkActive(
    pathname: string,
    href: string,
    exact = false
): boolean {
    const normalizedPathname =
        normalizePath(
            pathname
        );

    const normalizedHref =
        normalizePath(
            href
        );

    if (
        exact ||
        normalizedHref === "/"
    ) {
        return (
            normalizedPathname ===
            normalizedHref
        );
    }

    return (
        normalizedPathname ===
        normalizedHref ||
        normalizedPathname.startsWith(
            `${normalizedHref}/`
        )
    );
}

function isNavigationItemActive(
    pathname: string,
    item: NavigationItem
): boolean {
    const activePaths =
        item.activePaths
            ?.length
            ? item.activePaths
            : [
                item.href,
            ];

    return activePaths.some(
        (
            activePath
        ) =>
            isLinkActive(
                pathname,
                activePath,
                item.exact
            )
    );
}

export function Header() {
    const pathname =
        usePathname();

    const locale =
        useLocale();

    const tNavigation =
        useTranslations(
            "Navigation"
        ) as (
            key: string
        ) => string;

    const tHeader =
        useTranslations(
            "Header"
        ) as (
            key: string
        ) => string;

    const localizedPathname =
        removeLocalePrefix(
            pathname
        );

    const localizedHomeHref =
        getLocalizedHref(
            "/",
            locale
        );

    const [
        mobileOpen,
        setMobileOpen,
    ] =
        useState(false);

    const [
        expandedMobileItem,
        setExpandedMobileItem,
    ] =
        useState<
            string | null
        >(null);

    const [
        scrolled,
        setScrolled,
    ] =
        useState(false);

    const isHome =
        localizedPathname ===
        "/";

    useEffect(() => {
        const handleScroll =
            () => {
                setScrolled(
                    window.scrollY >
                    28
                );
            };

        handleScroll();

        window.addEventListener(
            "scroll",
            handleScroll,
            {
                passive:
                    true,
            }
        );

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll
            );
        };
    }, []);

    const closeMobileMenu =
        () => {
            setMobileOpen(
                false
            );

            setExpandedMobileItem(
                null
            );
        };

    useEffect(() => {
        const previousOverflow =
            document.body.style
                .overflow;

        document.body.style.overflow =
            mobileOpen
                ? "hidden"
                : "";

        return () => {
            document.body.style.overflow =
                previousOverflow;
        };
    }, [
        mobileOpen,
    ]);

    return (
        <>
            {/* Top contact bar */}
            <div className="relative z-[60] hidden min-h-[34px] bg-brand-500 text-white lg:block">
                <Container className="flex min-h-[34px] items-center justify-between gap-6 text-[11px]">
                    <div className="flex items-center gap-6 text-white/92">
                        <a
                            href={`mailto:${siteConfig.email}`}
                            className="inline-flex items-center gap-2 transition duration-300 hover:text-brand-gold"
                        >
                            <Mail
                                size={
                                    13
                                }
                                aria-hidden="true"
                            />

                            {
                                siteConfig.email
                            }
                        </a>

                        <a
                            href={`tel:${siteConfig.phone}`}
                            className="inline-flex items-center gap-2 transition duration-300 hover:text-brand-gold"
                        >
                            <Phone
                                size={
                                    13
                                }
                                aria-hidden="true"
                            />

                            {
                                siteConfig.phone
                            }
                        </a>

                        <span className="inline-flex items-center gap-2">
                            <MapPin
                                size={
                                    13
                                }
                                aria-hidden="true"
                            />

                            {tHeader(
                                "localDmc"
                            )}
                        </span>
                    </div>

                    <a
                        href={
                            whatsappUrl
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 font-semibold transition duration-300 hover:text-brand-gold"
                    >
                        <MessageCircle
                            size={
                                13
                            }
                            aria-hidden="true"
                            className="transition duration-300 group-hover:scale-110"
                        />

                        {tHeader(
                            "chatWithExpert"
                        )}
                    </a>
                </Container>
            </div>

            {/* Sticky navigation */}
            <header
                className={[
                    "sticky top-0 z-50 transition-all duration-500",

                    isHome
                        ? "-mb-[76px]"
                        : "",

                    scrolled
                        ? "border-b border-white/90 bg-white/[0.50] shadow-[0_16px_48px_rgba(25,35,35,0.12)] backdrop-blur-xl"
                        : "border-b border-white/55 bg-white/[0.68] shadow-[0_12px_36px_rgba(25,35,35,0.09)] backdrop-blur-xl",
                ].join(
                    " "
                )}
            >
                <Container
                    className={[
                        "flex items-center justify-between gap-4 transition-all duration-500",

                        scrolled
                            ? "min-h-[64px]"
                            : "min-h-[76px]",
                    ].join(
                        " "
                    )}
                >
                    <Link
                        href={
                            localizedHomeHref
                        }
                        className="
                            relative z-10
                            flex h-[68px] w-[200px]
                            shrink-0 items-center
                            overflow-visible
                            max-sm:w-[150px]
                        "
                        aria-label={`${siteConfig.name} ${tNavigation(
                            "home"
                        )}`}
                    >
                        <Image
                            src="/images/brand/logo-dark.png"
                            alt={
                                siteConfig.name
                            }
                            width={
                                1800
                            }
                            height={
                                1216
                            }
                            loading="eager"
                            className={[
                                "absolute left-0 top-1/2",
                                "w-auto -translate-y-1/2",
                                styles.logo,

                                scrolled
                                    ? styles.logoScrolled
                                    : "",
                            ]
                                .filter(
                                    Boolean
                                )
                                .join(
                                    " "
                                )}
                        />
                    </Link>

                    {/* Desktop navigation */}
                    <nav
                        className="hidden items-center gap-0.5 min-[1360px]:flex min-[1600px]:gap-1"
                        aria-label={tHeader(
                            "primaryNavigation"
                        )}
                    >
                        {mainNavigation.map(
                            (
                                item
                            ) => {
                                const active =
                                    isNavigationItemActive(
                                        localizedPathname,
                                        item
                                    );

                                const label =
                                    item.labelKey
                                        ? tNavigation(
                                            item.labelKey
                                        )
                                        : item.label;

                                const itemHref =
                                    getLocalizedHref(
                                        item.href,
                                        locale
                                    );

                                const hasChildren =
                                    Boolean(
                                        item.children
                                            ?.length
                                    );

                                if (
                                    !hasChildren
                                ) {
                                    return (
                                        <DesktopNavigationLink
                                            key={
                                                item.href
                                            }
                                            label={
                                                label
                                            }
                                            href={
                                                itemHref
                                            }
                                            active={
                                                active
                                            }
                                        />
                                    );
                                }

                                return (
                                    <div
                                        key={
                                            item.href
                                        }
                                        className="group relative"
                                    >
                                        <DesktopNavigationLink
                                            label={
                                                label
                                            }
                                            href={
                                                itemHref
                                            }
                                            active={
                                                active
                                            }
                                            dropdown
                                        />

                                        <div
                                            className="
                                                pointer-events-none
                                                invisible
                                                absolute
                                                left-1/2
                                                top-full
                                                z-[70]
                                                w-[340px]
                                                -translate-x-1/2
                                                translate-y-2
                                                pt-3
                                                opacity-0
                                                transition-all
                                                duration-200

                                                group-hover:pointer-events-auto
                                                group-hover:visible
                                                group-hover:translate-y-0
                                                group-hover:opacity-100

                                                group-focus-within:pointer-events-auto
                                                group-focus-within:visible
                                                group-focus-within:translate-y-0
                                                group-focus-within:opacity-100
                                            "
                                        >
                                            <div
                                                aria-hidden="true"
                                                className="
                                                    absolute
                                                    left-1/2
                                                    top-[7px]
                                                    h-4 w-4
                                                    -translate-x-1/2
                                                    rotate-45
                                                    border-l
                                                    border-t
                                                    border-white
                                                    bg-white/95
                                                "
                                            />

                                            <div
                                                className="
                                                    relative
                                                    max-h-[min(72vh,620px)]
                                                    overflow-y-auto
                                                    overscroll-contain
                                                    rounded-[1.5rem]
                                                    border
                                                    border-white/95
                                                    bg-white/95
                                                    p-2
                                                    shadow-[0_24px_70px_rgba(20,38,36,0.18)]
                                                    backdrop-blur-2xl
                                                    [scrollbar-width:thin]
                                                "
                                                role="menu"
                                            >
                                                {item.children?.map(
                                                    (
                                                        child
                                                    ) => {
                                                        const childActive =
                                                            isLinkActive(
                                                                localizedPathname,
                                                                child.href,
                                                                child.exact
                                                            );

                                                        const childLabel =
                                                            child.labelKey
                                                                ? tNavigation(
                                                                    child.labelKey
                                                                )
                                                                : child.label;

                                                        const childDescription =
                                                            child.descriptionKey
                                                                ? tNavigation(
                                                                    child.descriptionKey
                                                                )
                                                                : child.description;

                                                        const childHref =
                                                            getLocalizedHref(
                                                                child.href,
                                                                locale
                                                            );

                                                        return (
                                                            <Link
                                                                key={`${item.href}-${child.href}`}
                                                                href={
                                                                    childHref
                                                                }
                                                                role="menuitem"
                                                                className={[
                                                                    "group/dropdown flex items-start justify-between gap-4 rounded-[1.1rem] px-4 py-3.5 transition-all duration-200",

                                                                    childActive
                                                                        ? "bg-brand-50 text-brand-800"
                                                                        : "text-slate-700 hover:bg-brand-50 hover:text-brand-800",
                                                                ].join(
                                                                    " "
                                                                )}
                                                            >
                                                                <span>
                                                                    <span className="block text-sm font-bold">
                                                                        {
                                                                            childLabel
                                                                        }
                                                                    </span>

                                                                    {childDescription ? (
                                                                        <span className="mt-1 block text-xs leading-5 text-slate-500">
                                                                            {
                                                                                childDescription
                                                                            }
                                                                        </span>
                                                                    ) : null}
                                                                </span>

                                                                <ChevronRight
                                                                    size={
                                                                        17
                                                                    }
                                                                    aria-hidden="true"
                                                                    className="
                                                                        mt-0.5
                                                                        shrink-0
                                                                        text-brand-500
                                                                        transition-transform
                                                                        duration-200
                                                                        group-hover/dropdown:translate-x-1
                                                                    "
                                                                />
                                                            </Link>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </nav>

                    {/* Desktop actions */}
                    <div className="hidden items-center gap-2 min-[1360px]:flex">
                        <LanguageSwitcher
                            variant="desktop"
                        />

                        <a
                            href={
                                whatsappUrl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={tHeader(
                                "chatWithExpert"
                            )}
                            className={[
                                "group inline-flex min-h-10 items-center justify-center gap-2 rounded-full",
                                "border border-white/90 bg-white/[0.68] px-3 text-[12px] font-semibold text-brand-800",
                                "shadow-[inset_0_1px_0_rgba(255,255,255,1),0_8px_22px_rgba(0,141,134,0.08)] backdrop-blur-xl",
                                "transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/25 hover:bg-white",
                                "min-[1500px]:px-4 min-[1500px]:text-sm",
                            ].join(
                                " "
                            )}
                        >
                            <MessageCircle
                                size={
                                    17
                                }
                                aria-hidden="true"
                                className="transition duration-300 group-hover:scale-110"
                            />

                            {tHeader(
                                "whatsapp"
                            )}
                        </a>

                        <Link
                            href={getLocalizedHref(
                                "/plan-your-tour",
                                locale
                            )}
                            className={[
                                "group inline-flex min-h-10 items-center justify-center gap-2 rounded-full whitespace-nowrap",
                                "bg-brand-500 px-4 text-[12px] font-bold text-white",
                                "shadow-[0_12px_28px_rgba(0,141,134,0.24)] transition duration-300",
                                "hover:-translate-y-0.5 hover:bg-brand-600",
                                "min-[1500px]:px-5 min-[1500px]:text-sm",
                            ].join(
                                " "
                            )}
                        >
                            {tHeader(
                                "planJourney"
                            )}

                            <ChevronRight
                                size={
                                    17
                                }
                                aria-hidden="true"
                                className="transition duration-300 group-hover:translate-x-0.5"
                            />
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        onClick={() =>
                            setMobileOpen(
                                true
                            )
                        }
                        className={[
                            "inline-flex size-11 items-center justify-center rounded-full",
                            "border border-white/95 bg-white/[0.72] text-brand-800",
                            "shadow-[inset_0_1px_0_rgba(255,255,255,1),0_8px_22px_rgba(0,141,134,0.08)] backdrop-blur-xl",
                            "transition-all duration-300 hover:bg-white",
                            "min-[1360px]:hidden",
                        ].join(
                            " "
                        )}
                        aria-label={tHeader(
                            "openMenu"
                        )}
                        aria-expanded={
                            mobileOpen
                        }
                    >
                        <Menu
                            size={
                                23
                            }
                            aria-hidden="true"
                        />
                    </button>
                </Container>

                <div
                    className={[
                        "absolute inset-x-0 bottom-0 h-px",
                        "bg-gradient-to-r from-transparent via-brand-gold/75 to-transparent",
                        "transition-opacity duration-500",

                        scrolled
                            ? "opacity-100"
                            : "opacity-35",
                    ].join(
                        " "
                    )}
                />
            </header>

            {/* Mobile overlay */}
            <div
                className={[
                    "fixed inset-0 z-[70] bg-[#17191a]/60 backdrop-blur-sm transition duration-300 min-[1360px]:hidden",

                    mobileOpen
                        ? "visible opacity-100"
                        : "invisible opacity-0",
                ].join(
                    " "
                )}
                onClick={
                    closeMobileMenu
                }
                aria-hidden="true"
            />

            {/* Mobile drawer */}
            <aside
                className={[
                    "fixed inset-y-0 right-0 z-[80] flex w-[min(90vw,410px)] flex-col bg-white shadow-2xl transition duration-300 min-[1360px]:hidden",

                    mobileOpen
                        ? "translate-x-0"
                        : "translate-x-full",
                ].join(
                    " "
                )}
                aria-label={tHeader(
                    "mobileNavigation"
                )}
                aria-hidden={
                    !mobileOpen
                }
            >
                <div className="flex min-h-[88px] items-center justify-between border-b border-slate-200 px-5">
                    <Link
                        href={
                            localizedHomeHref
                        }
                        onClick={
                            closeMobileMenu
                        }
                        aria-label={`${siteConfig.name} ${tNavigation(
                            "home"
                        )}`}
                        className="relative h-[64px] w-[155px] overflow-visible"
                    >
                        <Image
                            src="/images/brand/logo-dark.png"
                            alt={
                                siteConfig.name
                            }
                            width={
                                1800
                            }
                            height={
                                1216
                            }
                            loading="eager"
                            className="
                                absolute left-0 top-1/2
                                h-[100px] w-auto
                                -translate-y-1/2
                                object-contain
                            "
                        />
                    </Link>

                    <button
                        type="button"
                        onClick={
                            closeMobileMenu
                        }
                        className="inline-flex size-11 items-center justify-center rounded-full bg-brand-50 text-brand-800 transition hover:bg-brand-100"
                        aria-label={tHeader(
                            "closeMenu"
                        )}
                    >
                        <X
                            size={
                                23
                            }
                            aria-hidden="true"
                        />
                    </button>
                </div>

                <nav
                    className="flex-1 overflow-y-auto px-5 py-6"
                    aria-label={tHeader(
                        "mobileNavigation"
                    )}
                >
                    <div className="space-y-1.5">
                        {mainNavigation.map(
                            (
                                item
                            ) => {
                                const active =
                                    isNavigationItemActive(
                                        localizedPathname,
                                        item
                                    );

                                const label =
                                    item.labelKey
                                        ? tNavigation(
                                            item.labelKey
                                        )
                                        : item.label;

                                const itemHref =
                                    getLocalizedHref(
                                        item.href,
                                        locale
                                    );

                                const hasChildren =
                                    Boolean(
                                        item.children
                                            ?.length
                                    );

                                const expanded =
                                    expandedMobileItem ===
                                    item.href;

                                if (
                                    !hasChildren
                                ) {
                                    return (
                                        <Link
                                            key={
                                                item.href
                                            }
                                            href={
                                                itemHref
                                            }
                                            onClick={
                                                closeMobileMenu
                                            }
                                            className={[
                                                "group flex min-h-13 items-center justify-between rounded-2xl border px-4 text-base font-semibold transition-all duration-300",

                                                active
                                                    ? "border-brand-500/15 bg-brand-500 text-white shadow-[0_10px_30px_rgba(0,141,134,0.20)]"
                                                    : "border-transparent text-slate-800 hover:translate-x-1 hover:border-brand-500/12 hover:bg-brand-50 hover:text-brand-800",
                                            ].join(
                                                " "
                                            )}
                                        >
                                            {
                                                label
                                            }

                                            <ChevronRight
                                                size={
                                                    18
                                                }
                                                aria-hidden="true"
                                                className="transition duration-300 group-hover:translate-x-1"
                                            />
                                        </Link>
                                    );
                                }

                                return (
                                    <div
                                        key={
                                            item.href
                                        }
                                        className="
                                            overflow-hidden
                                            rounded-2xl
                                            border
                                            border-slate-100
                                        "
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setExpandedMobileItem(
                                                    (
                                                        current
                                                    ) =>
                                                        current ===
                                                        item.href
                                                            ? null
                                                            : item.href
                                                )
                                            }
                                            className={[
                                                "flex min-h-13 w-full items-center justify-between px-4 text-left text-base font-semibold transition-all duration-300",

                                                active
                                                    ? "bg-brand-500 text-white"
                                                    : "bg-white text-slate-800 hover:bg-brand-50 hover:text-brand-800",
                                            ].join(
                                                " "
                                            )}
                                            aria-expanded={
                                                expanded
                                            }
                                        >
                                            {
                                                label
                                            }

                                            <ChevronDown
                                                size={
                                                    18
                                                }
                                                aria-hidden="true"
                                                className={[
                                                    "transition-transform duration-300",

                                                    expanded
                                                        ? "rotate-180"
                                                        : "",
                                                ].join(
                                                    " "
                                                )}
                                            />
                                        </button>

                                        <div
                                            className={[
                                                "grid transition-all duration-300",

                                                expanded
                                                    ? "grid-rows-[1fr]"
                                                    : "grid-rows-[0fr]",
                                            ].join(
                                                " "
                                            )}
                                        >
                                            <div className="overflow-hidden">
                                                <div className="space-y-1 border-t border-slate-100 bg-slate-50/70 p-2">
                                                    {item.children?.map(
                                                        (
                                                            child
                                                        ) => {
                                                            const childActive =
                                                                isLinkActive(
                                                                    localizedPathname,
                                                                    child.href,
                                                                    child.exact
                                                                );

                                                            const childLabel =
                                                                child.labelKey
                                                                    ? tNavigation(
                                                                        child.labelKey
                                                                    )
                                                                    : child.label;

                                                            const childDescription =
                                                                child.descriptionKey
                                                                    ? tNavigation(
                                                                        child.descriptionKey
                                                                    )
                                                                    : child.description;

                                                            const childHref =
                                                                getLocalizedHref(
                                                                    child.href,
                                                                    locale
                                                                );

                                                            return (
                                                                <Link
                                                                    key={`${item.href}-${child.href}`}
                                                                    href={
                                                                        childHref
                                                                    }
                                                                    onClick={
                                                                        closeMobileMenu
                                                                    }
                                                                    className={[
                                                                        "flex items-start justify-between gap-3 rounded-xl px-3 py-3 transition",

                                                                        childActive
                                                                            ? "bg-white text-brand-800 shadow-sm"
                                                                            : "text-slate-700 hover:bg-white hover:text-brand-800",
                                                                    ].join(
                                                                        " "
                                                                    )}
                                                                >
                                                                    <span>
                                                                        <span className="block text-sm font-bold">
                                                                            {
                                                                                childLabel
                                                                            }
                                                                        </span>

                                                                        {childDescription ? (
                                                                            <span className="mt-1 block text-xs leading-5 text-slate-500">
                                                                                {
                                                                                    childDescription
                                                                                }
                                                                            </span>
                                                                        ) : null}
                                                                    </span>

                                                                    <ChevronRight
                                                                        size={
                                                                            16
                                                                        }
                                                                        aria-hidden="true"
                                                                        className="mt-0.5 shrink-0 text-brand-500"
                                                                    />
                                                                </Link>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </div>

                    <div className="mt-6">
                        <LanguageSwitcher
                            variant="mobile"
                        />
                    </div>

                    <div className="mt-8 overflow-hidden rounded-[1.75rem] bg-[#202526] p-5 text-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
                        <div className="h-1 w-12 rounded-full bg-brand-gold" />

                        <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
                            {tHeader(
                                "startPlanning"
                            )}
                        </p>

                        <p className="mt-3 font-display text-2xl font-semibold">
                            {tHeader(
                                "storyBegins"
                            )}
                        </p>

                        <p className="mt-3 text-sm leading-6 text-white/65">
                            {tHeader(
                                "planningDescription"
                            )}
                        </p>

                        <ButtonLink
                            href={getLocalizedHref(
                                "/plan-your-tour",
                                locale
                            )}
                            className="mt-5 w-full"
                        >
                            {tHeader(
                                "planJourney"
                            )}
                        </ButtonLink>
                    </div>
                </nav>

                <div className="border-t border-slate-200 px-5 py-5">
                    <a
                        href={
                            whatsappUrl
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-brand-500/18 bg-brand-50 font-semibold text-brand-800 transition hover:bg-brand-100"
                    >
                        <MessageCircle
                            size={
                                18
                            }
                            aria-hidden="true"
                        />

                        {tHeader(
                            "whatsappTeam"
                        )}
                    </a>
                </div>
            </aside>
        </>
    );
}

function DesktopNavigationLink({
                                   label,
                                   active,
                                   href,
                                   dropdown = false,
                               }: {
    label: string;
    active: boolean;
    href: string;
    dropdown?: boolean;
}) {
    return (
        <Link
            href={
                href
            }
            aria-haspopup={
                dropdown
                    ? "menu"
                    : undefined
            }
            className={[
                "group relative isolate overflow-hidden rounded-full",
                "px-2.5 py-2.5 text-[12px] font-semibold tracking-[0.01em]",
                "min-[1500px]:px-3.5 min-[1500px]:text-[13px]",
                "text-slate-700 transition-all duration-300",
                "hover:-translate-y-0.5 hover:text-brand-800",
            ].join(
                " "
            )}
        >
            <span
                aria-hidden="true"
                className={[
                    "absolute inset-0 -z-10 rounded-full border border-white/95",
                    "bg-white/[0.72] opacity-0 backdrop-blur-xl",
                    "scale-[0.94] shadow-[inset_0_1px_0_rgba(255,255,255,1),0_12px_30px_rgba(0,141,134,0.13)]",
                    "transition-all duration-300",
                    "group-hover:scale-100 group-hover:opacity-100",
                ].join(
                    " "
                )}
            />

            {active ? (
                <span
                    aria-hidden="true"
                    className="absolute inset-0 -z-20 rounded-full border border-brand-500/12 bg-brand-50/85"
                />
            ) : null}

            <span className="relative z-10 inline-flex items-center gap-1">
                {
                    label
                }

                {dropdown ? (
                    <ChevronDown
                        size={
                            14
                        }
                        aria-hidden="true"
                        className="
                            transition-transform
                            duration-300
                            group-hover:rotate-180
                        "
                    />
                ) : null}
            </span>

            <span
                aria-hidden="true"
                className={[
                    "absolute bottom-1 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-brand-gold",
                    "transition-all duration-300",

                    active
                        ? "w-6"
                        : "w-0 group-hover:w-6",
                ].join(
                    " "
                )}
            />
        </Link>
    );
}