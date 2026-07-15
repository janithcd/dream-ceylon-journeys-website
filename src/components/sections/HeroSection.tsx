"use client";

import Image from "next/image";
import {
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    MapPin,
    MessageCircle,
    Mouse,
    Sparkles,
} from "lucide-react";
import {
    useCallback,
    useEffect,
    useState,
} from "react";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { heroSlides } from "@/data/hero-slides";
import { whatsappUrl } from "@/lib/site";

import styles from "./HeroSection.module.css";

const SLIDE_DURATION = 7000;

export function HeroSection() {
    const [activeIndex, setActiveIndex] =
        useState(0);
    const [paused, setPaused] =
        useState(false);
    const [reducedMotion, setReducedMotion] =
        useState(false);

    const activeSlide = heroSlides[activeIndex];

    const showSlide = useCallback((index: number) => {
        const total = heroSlides.length;
        setActiveIndex((index + total) % total);
    }, []);

    const showNext = useCallback(() => {
        setActiveIndex(
            (current) =>
                (current + 1) % heroSlides.length
        );
    }, []);

    const showPrevious = useCallback(() => {
        setActiveIndex(
            (current) =>
                (current - 1 + heroSlides.length) %
                heroSlides.length
        );
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        const updatePreference = () => {
            setReducedMotion(mediaQuery.matches);
        };

        updatePreference();
        mediaQuery.addEventListener(
            "change",
            updatePreference
        );

        return () =>
            mediaQuery.removeEventListener(
                "change",
                updatePreference
            );
    }, []);

    useEffect(() => {
        if (paused || reducedMotion) {
            return;
        }

        const timer = window.setTimeout(
            showNext,
            SLIDE_DURATION
        );

        return () => window.clearTimeout(timer);
    }, [
        activeIndex,
        paused,
        reducedMotion,
        showNext,
    ]);

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLElement>
    ) => {
        if (event.key === "ArrowRight") {
            showNext();
        }

        if (event.key === "ArrowLeft") {
            showPrevious();
        }
    };

    return (
        <section
            className={[
                "relative isolate overflow-hidden bg-[#151718] text-white",
                "min-h-[100svh] lg:min-h-[calc(100svh-34px)]",
                "[@media(max-height:760px)]:min-h-[720px]",
            ].join(" ")}
            aria-roledescription="carousel"
            aria-label="Featured Sri Lanka journeys"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
        >
            <div className="absolute inset-0">
                {heroSlides.map((slide, index) => {
                    const active =
                        index === activeIndex;

                    return (
                        <div
                            key={slide.id}
                            className={[
                                styles.slide,
                                active
                                    ? styles.activeSlide
                                    : "",
                            ]
                                .filter(Boolean)
                                .join(" ")}
                            aria-hidden={!active}
                        >
                            <Image
                                src={slide.image}
                                alt={slide.imageAlt}
                                fill
                                preload={index === 0}
                                sizes="100vw"
                                className={[
                                    styles.heroImage,
                                    active &&
                                    !reducedMotion
                                        ? styles.kenBurns
                                        : "",
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
                            />
                        </div>
                    );
                })}

                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,11,12,0.88)_0%,rgba(10,11,12,0.64)_38%,rgba(10,11,12,0.18)_70%,rgba(10,11,12,0.27)_100%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,9,10,0.74)_0%,transparent_43%,rgba(8,9,10,0.12)_100%)]" />
                <div className="absolute inset-0 soft-noise" />
            </div>

            <div className="pointer-events-none absolute inset-0 surface-grid opacity-[0.05]" />

            <Container
                className={[
                    "relative flex items-center",
                    "min-h-[100svh] lg:min-h-[calc(100svh-34px)]",
                    "pt-28 pb-28 sm:pt-32 sm:pb-28 lg:pt-28 lg:pb-24",
                    "[@media(max-height:800px)]:pt-20",
                    "[@media(max-height:800px)]:pb-20",
                    "[@media(max-height:760px)]:min-h-[720px]",
                ].join(" ")}
            >
                <div
                    key={activeSlide.id}
                    className={[
                        "w-full max-w-4xl",
                        styles.content,
                    ].join(" ")}
                    aria-live="polite"
                    aria-atomic="true"
                >
                    <div
                        className={[
                            "inline-flex items-center gap-2 rounded-full border border-white/18 bg-black/20 px-4 py-2",
                            "text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold backdrop-blur-md sm:text-xs",
                            styles.eyebrow,
                        ].join(" ")}
                    >
                        <Sparkles
                            size={15}
                            aria-hidden="true"
                        />
                        {activeSlide.eyebrow}
                    </div>

                    <h1
                        className={[
                            "mt-7 max-w-4xl text-balance font-display font-semibold leading-[0.98] tracking-[-0.045em]",
                            "text-[clamp(3.25rem,6.1vw,5.5rem)]",
                            "[@media(max-height:800px)]:text-[clamp(3rem,5.2vw,4.4rem)]",
                            styles.title,
                        ].join(" ")}
                    >
                        {activeSlide.title}

                        <span className="mt-1 block text-brand-gold">
                            {activeSlide.accent}
                        </span>
                    </h1>

                    <p
                        className={[
                            "mt-7 max-w-2xl text-base leading-8 text-white/76 sm:text-lg lg:text-xl lg:leading-9",
                            "[@media(max-height:800px)]:mt-5",
                            "[@media(max-height:800px)]:text-base",
                            "[@media(max-height:800px)]:leading-7",
                            styles.description,
                        ].join(" ")}
                    >
                        {activeSlide.description}
                    </p>

                    <div
                        className={[
                            "mt-9 flex flex-col gap-3 sm:flex-row",
                            "[@media(max-height:800px)]:mt-6",
                            styles.actions,
                        ].join(" ")}
                    >
                        <ButtonLink
                            href={
                                activeSlide.primaryCta
                                    .href
                            }
                            size="lg"
                        >
                            {
                                activeSlide.primaryCta
                                    .label
                            }
                            <ArrowRight
                                size={19}
                                aria-hidden="true"
                            />
                        </ButtonLink>

                        <ButtonLink
                            href={whatsappUrl}
                            external
                            variant="light"
                            size="lg"
                        >
                            <MessageCircle
                                size={19}
                                aria-hidden="true"
                            />
                            Speak to a Local Expert
                        </ButtonLink>
                    </div>

                    <div
                        className={[
                            "mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-white/64",
                            "[@media(max-height:800px)]:mt-6",
                            styles.meta,
                        ].join(" ")}
                    >
                        <span className="inline-flex items-center gap-2">
                            <MapPin
                                size={17}
                                className="text-brand-500"
                                aria-hidden="true"
                            />
                            {activeSlide.location}
                        </span>

                        <span className="hidden h-1 w-1 rounded-full bg-white/35 sm:block" />

                        <span>
                            Private journeys • Local
                            expertise • 24/7 support
                        </span>
                    </div>
                </div>
            </Container>

            <div className="absolute inset-x-0 bottom-0 z-10">
                <Container className="pb-6 sm:pb-8">
                    <div className="flex items-end justify-between gap-5">
                        <div className="flex min-w-0 flex-1 items-center gap-4">
                            <span className="hidden min-w-12 font-display text-lg text-white sm:block">
                                {String(
                                    activeIndex + 1
                                ).padStart(2, "0")}
                            </span>

                            <div className="flex max-w-md flex-1 items-center gap-2">
                                {heroSlides.map(
                                    (slide, index) => {
                                        const active =
                                            index ===
                                            activeIndex;

                                        return (
                                            <button
                                                key={
                                                    slide.id
                                                }
                                                type="button"
                                                onClick={() =>
                                                    showSlide(
                                                        index
                                                    )
                                                }
                                                className={[
                                                    "group relative h-8 flex-1",
                                                    active
                                                        ? "max-w-28"
                                                        : "max-w-12",
                                                ].join(
                                                    " "
                                                )}
                                                aria-label={`Show slide ${
                                                    index + 1
                                                }: ${
                                                    slide.location
                                                }`}
                                                aria-current={
                                                    active
                                                        ? "true"
                                                        : undefined
                                                }
                                            >
                                                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 overflow-hidden bg-white/30">
                                                    {active ? (
                                                        <span
                                                            key={`${activeIndex}-${paused}`}
                                                            className={[
                                                                "block h-full bg-brand-gold",
                                                                reducedMotion
                                                                    ? "w-full"
                                                                    : styles.progress,
                                                            ].join(
                                                                " "
                                                            )}
                                                            style={
                                                                reducedMotion
                                                                    ? undefined
                                                                    : {
                                                                        animationDuration: `${SLIDE_DURATION}ms`,
                                                                        animationPlayState:
                                                                            paused
                                                                                ? "paused"
                                                                                : "running",
                                                                    }
                                                            }
                                                        />
                                                    ) : null}
                                                </span>
                                            </button>
                                        );
                                    }
                                )}
                            </div>

                            <span className="hidden font-display text-sm text-white/45 sm:block">
                                {String(
                                    heroSlides.length
                                ).padStart(2, "0")}
                            </span>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                            <button
                                type="button"
                                onClick={showPrevious}
                                className="inline-flex size-11 items-center justify-center rounded-full border border-white/22 bg-black/20 text-white backdrop-blur-md transition hover:border-brand-gold hover:bg-brand-gold hover:text-[#202526] sm:size-12"
                                aria-label="Show previous slide"
                            >
                                <ChevronLeft
                                    size={21}
                                    aria-hidden="true"
                                />
                            </button>

                            <button
                                type="button"
                                onClick={showNext}
                                className="inline-flex size-11 items-center justify-center rounded-full border border-white/22 bg-black/20 text-white backdrop-blur-md transition hover:border-brand-gold hover:bg-brand-gold hover:text-[#202526] sm:size-12"
                                aria-label="Show next slide"
                            >
                                <ChevronRight
                                    size={21}
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    </div>
                </Container>
            </div>

            <a
                href="#dream-ceylon-promise"
                className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 transition hover:text-brand-gold xl:flex"
                aria-label="Scroll to the next section"
            >
                <Mouse
                    size={19}
                    aria-hidden="true"
                />
                Scroll
            </a>
        </section>
    );
}
