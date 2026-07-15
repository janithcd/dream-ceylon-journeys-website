"use client";
import styles from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
import {
    ChevronRight,
    Mail,
    MapPin,
    Menu,
    MessageCircle,
    Phone,
    X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { mainNavigation } from "@/data/navigation";
import {
    siteConfig,
    whatsappUrl,
} from "@/lib/site";

export function Header() {
    const pathname = usePathname();

    const [mobileOpen, setMobileOpen] =
        useState(false);
    const [scrolled, setScrolled] =
        useState(false);

    const isHome = pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 28);
        };

        handleScroll();

        window.addEventListener(
            "scroll",
            handleScroll,
            {
                passive: true,
            }
        );

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll
            );
        };
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = mobileOpen
            ? "hidden"
            : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    return (
        <>
            {/* Non-sticky contact row */}
            <div className="relative z-[60] hidden min-h-[34px] bg-brand-500 text-white lg:block">
                <Container className="flex min-h-[34px] items-center justify-between gap-6 text-[11px]">
                    <div className="flex items-center gap-6 text-white/92">
                        <a
                            href={`mailto:${siteConfig.email}`}
                            className="inline-flex items-center gap-2 transition duration-300 hover:text-brand-gold"
                        >
                            <Mail
                                size={13}
                                aria-hidden="true"
                            />
                            {siteConfig.email}
                        </a>

                        <a
                            href={`tel:${siteConfig.phone}`}
                            className="inline-flex items-center gap-2 transition duration-300 hover:text-brand-gold"
                        >
                            <Phone
                                size={13}
                                aria-hidden="true"
                            />
                            {siteConfig.phone}
                        </a>

                        <span className="inline-flex items-center gap-2">
                            <MapPin
                                size={13}
                                aria-hidden="true"
                            />
                            Local Sri Lanka DMC
                        </span>
                    </div>

                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-2 font-semibold transition duration-300 hover:text-brand-gold"
                    >
                        <MessageCircle
                            size={13}
                            aria-hidden="true"
                            className="transition duration-300 group-hover:scale-110"
                        />
                        Chat with a local travel expert
                    </a>
                </Container>
            </div>

            {/* White glass navigation overlays the hero and stays sticky */}
            <header
                className={[
                    "sticky top-0 z-50 transition-all duration-500",
                    isHome ? "-mb-[76px]" : "",
                    scrolled
                        ? "border-b border-white/90 bg-white/[0.50] shadow-[0_16px_48px_rgba(25,35,35,0.12)] backdrop-blur-xl"
                        : "border-b border-white/55 bg-white/[0.68] shadow-[0_12px_36px_rgba(25,35,35,0.09)] backdrop-blur-xl",
                ].join(" ")}
            >
                <Container
                    className={[
                        "flex items-center justify-between gap-4 transition-all duration-500",
                        scrolled
                            ? "min-h-[64px]"
                            : "min-h-[76px]",
                    ].join(" ")}
                >
                    <Link
                        href="/"
                        className="
        relative z-10
        flex h-[68px] w-[200px]
        shrink-0 items-center
        overflow-visible
        max-sm:w-[150px]
    "
                        aria-label={`${siteConfig.name} home`}
                    >
                        <Image
                            src="/images/brand/logo-dark.png"
                            alt={siteConfig.name}
                            width={1800}
                            height={1216}
                            loading="eager"
                            className={[
                                "absolute left-0 top-1/2",
                                "w-auto -translate-y-1/2",
                                styles.logo,
                                scrolled ? styles.logoScrolled : "",
                            ]
                                .filter(Boolean)
                                .join(" ")}
                        />
                    </Link>

                    {/* Full navigation appears only when there is enough horizontal room. */}
                    <nav
                        className="hidden items-center gap-0.5 min-[1360px]:flex min-[1600px]:gap-1"
                        aria-label="Primary navigation"
                    >
                        {mainNavigation.map((item) => {
                            const active =
                                item.href === "/"
                                    ? pathname === "/"
                                    : pathname.startsWith(
                                        item.href
                                    );

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={[
                                        "group relative isolate overflow-hidden rounded-full",
                                        "px-2.5 py-2.5 text-[12px] font-semibold tracking-[0.01em]",
                                        "min-[1500px]:px-3.5 min-[1500px]:text-[13px]",
                                        "text-slate-700 transition-all duration-300",
                                        "hover:-translate-y-0.5 hover:text-brand-800",
                                    ].join(" ")}
                                >
                                    {/* Premium white glass hover capsule */}
                                    <span
                                        aria-hidden="true"
                                        className={[
                                            "absolute inset-0 -z-10 rounded-full border border-white/95",
                                            "bg-white/[0.72] opacity-0 backdrop-blur-xl",
                                            "scale-[0.94] shadow-[inset_0_1px_0_rgba(255,255,255,1),0_12px_30px_rgba(0,141,134,0.13)]",
                                            "transition-all duration-300",
                                            "group-hover:scale-100 group-hover:opacity-100",
                                        ].join(" ")}
                                    />

                                    {active ? (
                                        <span
                                            aria-hidden="true"
                                            className="absolute inset-0 -z-20 rounded-full border border-brand-500/12 bg-brand-50/85"
                                        />
                                    ) : null}

                                    <span className="relative z-10">
                                        {item.label}
                                    </span>

                                    <span
                                        aria-hidden="true"
                                        className={[
                                            "absolute bottom-1 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-brand-gold",
                                            "transition-all duration-300",
                                            active
                                                ? "w-6"
                                                : "w-0 group-hover:w-6",
                                        ].join(" ")}
                                    />
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="hidden items-center gap-2 min-[1360px]:flex">
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Chat with Dream Ceylon Journeys on WhatsApp"
                            className={[
                                "group inline-flex min-h-10 items-center justify-center gap-2 rounded-full",
                                "border border-white/90 bg-white/[0.68] px-3 text-[12px] font-semibold text-brand-800",
                                "shadow-[inset_0_1px_0_rgba(255,255,255,1),0_8px_22px_rgba(0,141,134,0.08)] backdrop-blur-xl",
                                "transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/25 hover:bg-white",
                                "min-[1500px]:px-4 min-[1500px]:text-sm",
                            ].join(" ")}
                        >
                            <MessageCircle
                                size={17}
                                aria-hidden="true"
                                className="transition duration-300 group-hover:scale-110"
                            />
                            WhatsApp
                        </a>

                        <Link
                            href="/plan-your-tour"
                            className={[
                                "group inline-flex min-h-10 items-center justify-center gap-2 rounded-full",
                                "bg-brand-500 px-4 text-[12px] font-bold text-white",
                                "shadow-[0_12px_28px_rgba(0,141,134,0.24)] transition duration-300",
                                "hover:-translate-y-0.5 hover:bg-brand-600",
                                "min-[1500px]:px-5 min-[1500px]:text-sm",
                            ].join(" ")}
                        >
                            Plan My Journey
                            <ChevronRight
                                size={17}
                                aria-hidden="true"
                                className="transition duration-300 group-hover:translate-x-0.5"
                            />
                        </Link>
                    </div>

                    {/* Laptop and mobile menu button */}
                    <button
                        type="button"
                        onClick={() =>
                            setMobileOpen(true)
                        }
                        className={[
                            "inline-flex size-11 items-center justify-center rounded-full",
                            "border border-white/95 bg-white/[0.72] text-brand-800",
                            "shadow-[inset_0_1px_0_rgba(255,255,255,1),0_8px_22px_rgba(0,141,134,0.08)] backdrop-blur-xl",
                            "transition-all duration-300 hover:bg-white",
                            "min-[1360px]:hidden",
                        ].join(" ")}
                        aria-label="Open navigation menu"
                        aria-expanded={mobileOpen}
                    >
                        <Menu
                            size={23}
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
                    ].join(" ")}
                />
            </header>

            <div
                className={[
                    "fixed inset-0 z-[70] bg-[#17191a]/60 backdrop-blur-sm transition duration-300 min-[1360px]:hidden",
                    mobileOpen
                        ? "visible opacity-100"
                        : "invisible opacity-0",
                ].join(" ")}
                onClick={() =>
                    setMobileOpen(false)
                }
                aria-hidden="true"
            />

            <aside
                className={[
                    "fixed inset-y-0 right-0 z-[80] flex w-[min(90vw,410px)] flex-col bg-white shadow-2xl transition duration-300 min-[1360px]:hidden",
                    mobileOpen
                        ? "translate-x-0"
                        : "translate-x-full",
                ].join(" ")}
                aria-label="Mobile navigation"
                aria-hidden={!mobileOpen}
            >
                <div className="flex min-h-[88px] items-center justify-between border-b border-slate-200 px-5">
                    <div className="relative h-[64px] w-[155px] overflow-visible">
                        <Image
                            src="/images/brand/logo-dark.png"
                            alt={siteConfig.name}
                            width={1800}
                            height={1216}
                            loading="eager"
                            className="
            absolute left-0 top-1/2
            h-[100px] w-auto
            -translate-y-1/2
            object-contain
        "
                        />
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            setMobileOpen(false)
                        }
                        className="inline-flex size-11 items-center justify-center rounded-full bg-brand-50 text-brand-800 transition hover:bg-brand-100"
                        aria-label="Close navigation menu"
                    >
                        <X
                            size={23}
                            aria-hidden="true"
                        />
                    </button>
                </div>

                <nav
                    className="flex-1 overflow-y-auto px-5 py-6"
                    aria-label="Mobile primary navigation"
                >
                    <div className="space-y-1.5">
                        {mainNavigation.map((item) => {
                            const active =
                                item.href === "/"
                                    ? pathname === "/"
                                    : pathname.startsWith(
                                        item.href
                                    );

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={[
                                        "group flex min-h-13 items-center justify-between rounded-2xl border px-4 text-base font-semibold transition-all duration-300",
                                        active
                                            ? "border-brand-500/15 bg-brand-500 text-white shadow-[0_10px_30px_rgba(0,141,134,0.20)]"
                                            : "border-transparent text-slate-800 hover:translate-x-1 hover:border-brand-500/12 hover:bg-brand-50 hover:text-brand-800",
                                    ].join(" ")}
                                >
                                    {item.label}

                                    <ChevronRight
                                        size={18}
                                        aria-hidden="true"
                                        className="transition duration-300 group-hover:translate-x-1"
                                    />
                                </Link>
                            );
                        })}
                    </div>

                    <div className="mt-8 overflow-hidden rounded-[1.75rem] bg-[#202526] p-5 text-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
                        <div className="h-1 w-12 rounded-full bg-brand-gold" />

                        <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
                            Start planning
                        </p>

                        <p className="mt-3 font-display text-2xl font-semibold">
                            Your Sri Lanka story begins
                            here.
                        </p>

                        <p className="mt-3 text-sm leading-6 text-white/65">
                            Speak directly with a local
                            tour expert and create a
                            journey around your interests.
                        </p>

                        <ButtonLink
                            href="/plan-your-tour"
                            className="mt-5 w-full"
                        >
                            Plan My Journey
                        </ButtonLink>
                    </div>
                </nav>

                <div className="border-t border-slate-200 px-5 py-5">
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-brand-500/18 bg-brand-50 font-semibold text-brand-800 transition hover:bg-brand-100"
                    >
                        <MessageCircle
                            size={18}
                            aria-hidden="true"
                        />
                        WhatsApp Our Team
                    </a>
                </div>
            </aside>
        </>
    );
}
