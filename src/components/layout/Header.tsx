"use client";

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

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 12);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () =>
            window.removeEventListener(
                "scroll",
                handleScroll
            );
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
            <header
                className={[
                    "sticky top-0 z-50 border-b transition duration-300",
                    scrolled
                        ? "border-slate-200/80 bg-white/95 shadow-[0_14px_40px_rgba(16,45,31,0.08)] backdrop-blur-xl"
                        : "border-white/10 bg-white",
                ].join(" ")}
            >
                <div className="hidden bg-brand-950 text-white lg:block">
                    <Container className="flex min-h-10 items-center justify-between gap-6 text-xs">
                        <div className="flex items-center gap-6 text-white/72">
                            <a
                                href={`mailto:${siteConfig.email}`}
                                className="inline-flex items-center gap-2 transition hover:text-brand-gold-light"
                            >
                                <Mail size={14} aria-hidden="true" />
                                {siteConfig.email}
                            </a>

                            <a
                                href={`tel:${siteConfig.phone}`}
                                className="inline-flex items-center gap-2 transition hover:text-brand-gold-light"
                            >
                                <Phone size={14} aria-hidden="true" />
                                {siteConfig.phone}
                            </a>

                            <span className="inline-flex items-center gap-2">
                                <MapPin size={14} aria-hidden="true" />
                                Sri Lanka
                            </span>
                        </div>

                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 font-semibold text-brand-gold-light transition hover:text-white"
                        >
                            <MessageCircle size={14} aria-hidden="true" />
                            Chat with a local travel expert
                        </a>
                    </Container>
                </div>

                <Container className="flex min-h-[82px] items-center justify-between gap-6">
                    <Link
                        href="/"
                        className="relative z-10 inline-flex items-center"
                        aria-label={`${siteConfig.name} home`}
                    >
                        <Image
                            src="/images/brand/logo-dark.png"
                            alt={siteConfig.name}
                            width={220}
                            height={78}
                            priority
                            className="h-14 w-auto object-contain sm:h-16"
                        />
                    </Link>

                    <nav
                        className="hidden items-center gap-1 xl:flex"
                        aria-label="Primary navigation"
                    >
                        {mainNavigation.map((item) => {
                            const active =
                                item.href === "/"
                                    ? pathname === "/"
                                    : pathname.startsWith(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={[
                                        "relative rounded-full px-3.5 py-2.5 text-sm font-semibold transition",
                                        active
                                            ? "bg-brand-50 text-brand-800"
                                            : "text-slate-700 hover:bg-brand-50 hover:text-brand-800",
                                    ].join(" ")}
                                >
                                    {item.label}

                                    {active ? (
                                        <span className="absolute inset-x-5 -bottom-0.5 h-0.5 rounded-full bg-brand-gold" />
                                    ) : null}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="hidden items-center gap-3 xl:flex">
                        <ButtonLink
                            href={whatsappUrl}
                            external
                            variant="outline"
                            size="sm"
                            ariaLabel="Chat with Dream Ceylon Journeys on WhatsApp"
                        >
                            <MessageCircle size={17} aria-hidden="true" />
                            WhatsApp
                        </ButtonLink>

                        <ButtonLink href="/plan-your-tour" size="md">
                            Plan My Journey
                            <ChevronRight size={17} aria-hidden="true" />
                        </ButtonLink>
                    </div>

                    <button
                        type="button"
                        onClick={() => setMobileOpen(true)}
                        className="inline-flex size-12 items-center justify-center rounded-full border border-brand-800/15 bg-brand-50 text-brand-900 transition hover:bg-brand-100 xl:hidden"
                        aria-label="Open navigation menu"
                        aria-expanded={mobileOpen}
                    >
                        <Menu size={24} aria-hidden="true" />
                    </button>
                </Container>
            </header>

            <div
                className={[
                    "fixed inset-0 z-[70] bg-brand-950/55 backdrop-blur-sm transition duration-300 xl:hidden",
                    mobileOpen
                        ? "visible opacity-100"
                        : "invisible opacity-0",
                ].join(" ")}
                onClick={() => setMobileOpen(false)}
                aria-hidden="true"
            />

            <aside
                className={[
                    "fixed inset-y-0 right-0 z-[80] flex w-[min(90vw,410px)] flex-col bg-white shadow-2xl transition duration-300 xl:hidden",
                    mobileOpen
                        ? "translate-x-0"
                        : "translate-x-full",
                ].join(" ")}
                aria-label="Mobile navigation"
                aria-hidden={!mobileOpen}
            >
                <div className="flex min-h-[88px] items-center justify-between border-b border-slate-200 px-5">
                    <Image
                        src="/images/brand/logo-dark.png"
                        alt={siteConfig.name}
                        width={190}
                        height={68}
                        className="h-14 w-auto object-contain"
                    />

                    <button
                        type="button"
                        onClick={() => setMobileOpen(false)}
                        className="inline-flex size-11 items-center justify-center rounded-full bg-brand-50 text-brand-900 transition hover:bg-brand-100"
                        aria-label="Close navigation menu"
                    >
                        <X size={23} aria-hidden="true" />
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
                                    : pathname.startsWith(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={[
                                        "flex min-h-13 items-center justify-between rounded-2xl px-4 text-base font-semibold transition",
                                        active
                                            ? "bg-brand-700 text-white"
                                            : "text-slate-800 hover:bg-brand-50 hover:text-brand-800",
                                    ].join(" ")}
                                >
                                    {item.label}
                                    <ChevronRight size={18} aria-hidden="true" />
                                </Link>
                            );
                        })}
                    </div>

                    <div className="mt-8 rounded-3xl bg-brand-950 p-5 text-white">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold-light">
                            Start planning
                        </p>
                        <p className="mt-3 font-display text-2xl font-semibold">
                            Your Sri Lanka story begins here.
                        </p>
                        <p className="mt-3 text-sm leading-6 text-white/65">
                            Speak directly with a local tour expert and
                            create a journey around your interests.
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
                        className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-brand-700/20 bg-brand-50 font-semibold text-brand-800"
                    >
                        <MessageCircle size={18} aria-hidden="true" />
                        WhatsApp Our Team
                    </a>
                </div>
            </aside>
        </>
    );
}
