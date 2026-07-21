"use client";

import Image from "next/image";
import Link from "next/link";

import {
    ArrowLeft,
    ArrowRight,
    Camera,
    Images,
} from "lucide-react";

import {
    useRef,
    useState,
} from "react";

import type {
    UIEvent,
} from "react";

import type {
    GalleryPhoto,
} from "@/types/gallery";

type HomeGalleryCarouselProps = {
    photos: GalleryPhoto[];
};

export function HomeGalleryCarousel({
                                        photos,
                                    }: HomeGalleryCarouselProps) {
    const sliderRef =
        useRef<HTMLDivElement | null>(
            null
        );

    const [
        activeIndex,
        setActiveIndex,
    ] = useState(0);

    function getScrollAmount() {
        const slider =
            sliderRef.current;

        if (!slider) {
            return 0;
        }

        const firstCard =
            slider.firstElementChild as
                | HTMLElement
                | null;

        if (!firstCard) {
            return 0;
        }

        const computedStyles =
            window.getComputedStyle(
                slider
            );

        const gap =
            Number.parseFloat(
                computedStyles.columnGap ||
                computedStyles.gap ||
                "0"
            ) || 0;

        return (
            firstCard.getBoundingClientRect()
                .width + gap
        );
    }

    function handlePrevious() {
        const slider =
            sliderRef.current;

        if (!slider) {
            return;
        }

        slider.scrollBy({
            left:
                -getScrollAmount(),
            behavior: "smooth",
        });
    }

    function handleNext() {
        const slider =
            sliderRef.current;

        if (!slider) {
            return;
        }

        slider.scrollBy({
            left:
                getScrollAmount(),
            behavior: "smooth",
        });
    }

    function handleScroll(
        event: UIEvent<HTMLDivElement>
    ) {
        const slider =
            event.currentTarget;

        const firstCard =
            slider.firstElementChild as
                | HTMLElement
                | null;

        if (!firstCard) {
            return;
        }

        const computedStyles =
            window.getComputedStyle(
                slider
            );

        const gap =
            Number.parseFloat(
                computedStyles.columnGap ||
                computedStyles.gap ||
                "0"
            ) || 0;

        const cardWidth =
            firstCard.offsetWidth +
            gap;

        if (cardWidth <= 0) {
            return;
        }

        const nextIndex =
            Math.round(
                slider.scrollLeft /
                cardWidth
            );

        setActiveIndex(
            Math.min(
                Math.max(
                    nextIndex,
                    0
                ),
                photos.length - 1
            )
        );
    }

    function scrollToPhoto(
        index: number
    ) {
        const slider =
            sliderRef.current;

        if (!slider) {
            return;
        }

        const cards =
            Array.from(
                slider.children
            ) as HTMLElement[];

        const selectedCard =
            cards[index];

        if (!selectedCard) {
            return;
        }

        slider.scrollTo({
            left:
                selectedCard.offsetLeft -
                slider.offsetLeft,
            behavior: "smooth",
        });

        setActiveIndex(
            index
        );
    }

    if (
        photos.length ===
        0
    ) {
        return null;
    }

    return (
        <div className="relative">
            <div
                className="
                    mb-6
                    flex
                    items-center
                    justify-between
                    gap-5
                "
            >
                <div
                    className="
                        inline-flex
                        items-center
                        gap-2
                        text-sm
                        font-semibold
                        text-slate-500
                    "
                >
                    <Images
                        className="
                            h-4
                            w-4
                            text-[#008D86]
                        "
                        aria-hidden="true"
                    />

                    <span>
                        Swipe or use the
                        arrows to explore
                    </span>
                </div>

                <div
                    className="
                        flex
                        shrink-0
                        items-center
                        gap-2
                    "
                >
                    <button
                        type="button"
                        onClick={
                            handlePrevious
                        }
                        aria-label="View previous gallery photos"
                        className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-[#043F3B]/10
                            bg-white
                            text-[#043F3B]
                            shadow-sm
                            transition
                            duration-300
                            hover:-translate-y-0.5
                            hover:border-[#008D86]
                            hover:bg-[#008D86]
                            hover:text-white
                            focus-visible:outline-none
                            focus-visible:ring-4
                            focus-visible:ring-[#FEC52E]/50
                        "
                    >
                        <ArrowLeft
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                    </button>

                    <button
                        type="button"
                        onClick={
                            handleNext
                        }
                        aria-label="View next gallery photos"
                        className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-full
                            bg-[#043F3B]
                            text-white
                            shadow-sm
                            transition
                            duration-300
                            hover:-translate-y-0.5
                            hover:bg-[#008D86]
                            focus-visible:outline-none
                            focus-visible:ring-4
                            focus-visible:ring-[#FEC52E]/50
                        "
                    >
                        <ArrowRight
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                    </button>
                </div>
            </div>

            <div
                ref={sliderRef}
                onScroll={
                    handleScroll
                }
                className="
                    flex
                    snap-x
                    snap-mandatory
                    gap-5
                    overflow-x-auto
                    scroll-smooth
                    pb-6
                    [scrollbar-width:none]
                    lg:gap-6
                    [&::-webkit-scrollbar]:hidden
                "
                aria-label="Sri Lanka tour photo gallery"
            >
                {photos.map(
                    (
                        photo,
                        index
                    ) => (
                        <Link
                            key={
                                photo.key
                            }
                            href="/gallery"
                            aria-label={
                                `View ${photo.categoryLabel} photos in the full gallery`
                            }
                            className="
                                group
                                relative
                                aspect-[4/5]
                                w-[86%]
                                shrink-0
                                snap-start
                                overflow-hidden
                                rounded-[1.75rem]
                                bg-slate-200
                                shadow-[0_18px_50px_rgba(4,63,59,0.11)]
                                focus-visible:outline-none
                                focus-visible:ring-4
                                focus-visible:ring-[#FEC52E]/60
                                sm:aspect-[4/3]
                                sm:w-[calc((100%_-_1.25rem)/2)]
                                lg:w-[calc((100%_-_3rem)/3)]
                            "
                        >
                            <Image
                                fill
                                src={
                                    photo.src
                                }
                                alt={
                                    photo.alt
                                }
                                sizes="
                                    (max-width: 639px) 86vw,
                                    (max-width: 1023px) 48vw,
                                    33vw
                                "
                                quality={
                                    index <
                                    4
                                        ? 86
                                        : 80
                                }
                                className="
                                    object-cover
                                    transition-transform
                                    duration-700
                                    ease-out
                                    group-hover:scale-[1.055]
                                "
                                draggable={
                                    false
                                }
                            />

                            <div
                                className="
                                    absolute
                                    inset-0
                                    bg-gradient-to-t
                                    from-[#022D2A]/90
                                    via-[#043F3B]/10
                                    to-black/5
                                    transition
                                    duration-300
                                    group-hover:from-[#022D2A]/95
                                "
                            />

                            <div
                                className="
                                    absolute
                                    left-4
                                    top-4
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-white/20
                                    bg-black/20
                                    px-3
                                    py-2
                                    text-[0.65rem]
                                    font-bold
                                    uppercase
                                    tracking-[0.14em]
                                    text-white
                                    backdrop-blur-md
                                    sm:left-5
                                    sm:top-5
                                "
                            >
                                <Camera
                                    className="
                                        h-3.5
                                        w-3.5
                                    "
                                    aria-hidden="true"
                                />

                                {
                                    photo.categoryLabel
                                }
                            </div>

                            <div
                                className="
                                    absolute
                                    inset-x-0
                                    bottom-0
                                    flex
                                    items-end
                                    justify-between
                                    gap-4
                                    p-5
                                    sm:p-6
                                "
                            >
                                <div>
                                    <p
                                        className="
                                            text-[0.65rem]
                                            font-bold
                                            uppercase
                                            tracking-[0.18em]
                                            text-[#FEC52E]
                                        "
                                    >
                                        Dream Ceylon
                                        Journeys
                                    </p>

                                    <h3
                                        className="
                                            mt-2
                                            font-display
                                            text-2xl
                                            font-semibold
                                            leading-tight
                                            text-white
                                        "
                                    >
                                        {
                                            photo.categoryLabel
                                        }{" "}
                                        Tour Moment
                                    </h3>
                                </div>

                                <span
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        shrink-0
                                        translate-y-2
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-[#FEC52E]
                                        text-[#043F3B]
                                        opacity-0
                                        transition
                                        duration-300
                                        group-hover:translate-y-0
                                        group-hover:opacity-100
                                    "
                                >
                                    <ArrowRight
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                    />
                                </span>
                            </div>
                        </Link>
                    )
                )}
            </div>

            <div
                className="
                    mt-1
                    flex
                    items-center
                    justify-center
                    gap-2
                "
                aria-label="Gallery navigation"
            >
                {photos.map(
                    (
                        photo,
                        index
                    ) => (
                        <button
                            key={
                                photo.key
                            }
                            type="button"
                            onClick={() =>
                                scrollToPhoto(
                                    index
                                )
                            }
                            aria-label={
                                `Go to gallery photo ${index + 1}`
                            }
                            aria-current={
                                activeIndex ===
                                index
                                    ? "true"
                                    : undefined
                            }
                            className={[
                                `
                                    h-2
                                    rounded-full
                                    transition-all
                                    duration-300
                                `,
                                activeIndex ===
                                index
                                    ? "w-7 bg-[#008D86]"
                                    : "w-2 bg-[#008D86]/20 hover:bg-[#008D86]/50",
                            ].join(
                                " "
                            )}
                        />
                    )
                )}
            </div>
        </div>
    );
}