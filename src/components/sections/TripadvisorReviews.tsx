import Link from "next/link";

import {
    ArrowUpRight,
    MessageSquareText,
    Star,
} from "lucide-react";

import {
    TripadvisorWriteReviewWidget,
} from "@/components/tripadvisor/TripadvisorWriteReviewWidget";

import { Container } from "@/components/ui/Container";

const TRIPADVISOR_LISTING_URL =
    "https://www.tripadvisor.com/Attraction_Review-g665217-d34303718-Reviews-Dream_Ceylon_Journeys-Sri_Jayawardenepura_Western_Province.html";

export function TripadvisorReviews() {
    return (
        <section
            id="traveller-reviews"
            className="
                relative overflow-hidden
                bg-[#f7f6f3]
                py-20
                sm:py-24
                lg:py-28
            "
        >
            {/* Subtle background decoration */}
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute -left-52 top-10
                    size-[430px]
                    rounded-full
                    bg-brand-100/35
                    blur-3xl
                "
            />

            <Container className="relative max-w-[1380px]">
                <div
                    className="
                        overflow-hidden
                        rounded-[2rem]
                        border border-slate-200
                        bg-white
                        shadow-[0_20px_60px_rgba(24,40,38,0.07)]
                    "
                >
                    <div
                        className="
                            grid
                            lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)]
                        "
                    >
                        {/* Left content */}
                        <div
                            className="
                                flex flex-col
                                justify-center
                                px-7 py-10
                                sm:px-10
                                sm:py-12
                                lg:px-14
                                lg:py-16
                            "
                        >
                            <div
                                className="
                                    inline-flex w-fit
                                    items-center gap-3
                                    text-[11px] font-bold
                                    uppercase tracking-[0.2em]
                                    text-brand-700
                                "
                            >
                                <span className="h-px w-10 bg-brand-gold" />

                                Traveller feedback
                            </div>

                            <h2
                                className="
                                    mt-5
                                    max-w-3xl
                                    font-display
                                    text-4xl font-semibold
                                    leading-[1.08]
                                    tracking-[-0.04em]
                                    text-slate-900
                                    sm:text-5xl
                                    lg:text-[56px]
                                "
                            >
                                Travelled with us?
                                Share your experience.
                            </h2>

                            <p
                                className="
                                    mt-6
                                    max-w-2xl
                                    text-sm leading-7
                                    text-slate-600
                                    sm:text-base
                                    sm:leading-8
                                "
                            >
                                Your feedback helps future
                                travellers plan their Sri Lanka
                                journey with confidence and
                                helps our local team continue
                                improving every experience.
                            </p>

                            <div
                                className="
                                    mt-8
                                    flex flex-wrap
                                    items-center gap-5
                                "
                            >
                                <div
                                    className="
                                        flex items-center gap-1
                                        text-brand-gold
                                    "
                                    aria-label="Five-star traveller experiences"
                                >
                                    {Array.from({
                                        length: 5,
                                    }).map((_, index) => (
                                        <Star
                                            key={index}
                                            size={19}
                                            strokeWidth={1.7}
                                            className="
                                                fill-brand-gold
                                                text-brand-gold
                                            "
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>

                                <span
                                    className="
                                        text-sm font-medium
                                        text-slate-500
                                    "
                                >
                                    Reviews published on Tripadvisor
                                </span>
                            </div>

                            <Link
                                href={TRIPADVISOR_LISTING_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    group mt-8
                                    inline-flex min-h-12
                                    w-fit items-center
                                    justify-center gap-2
                                    rounded-full
                                    border border-slate-300
                                    bg-white
                                    px-6
                                    text-sm font-bold
                                    text-slate-800
                                    transition-all duration-300
                                    hover:-translate-y-0.5
                                    hover:border-brand-500
                                    hover:text-brand-700
                                "
                            >
                                Visit our Tripadvisor page

                                <ArrowUpRight
                                    size={17}
                                    aria-hidden="true"
                                    className="
                                        transition-transform
                                        duration-300
                                        group-hover:translate-x-0.5
                                        group-hover:-translate-y-0.5
                                    "
                                />
                            </Link>
                        </div>

                        {/* Right widget area */}
                        <div
                            className="
                                relative
                                flex min-h-[390px]
                                items-center justify-center
                                border-t border-slate-200
                                bg-[#eef4f2]
                                px-6 py-12
                                lg:border-l
                                lg:border-t-0
                            "
                        >
                            <div
                                aria-hidden="true"
                                className="
                                    absolute
                                    left-1/2 top-1/2
                                    size-64
                                    -translate-x-1/2
                                    -translate-y-1/2
                                    rounded-full
                                    bg-white/70
                                    blur-3xl
                                "
                            />

                            <div
                                className="
                                    relative w-full
                                    max-w-[380px]
                                    rounded-[1.5rem]
                                    border border-white
                                    bg-white
                                    p-7
                                    text-center
                                    shadow-[0_16px_45px_rgba(24,40,38,0.09)]
                                    sm:p-9
                                "
                            >
                                <div
                                    className="
                                        mx-auto
                                        flex size-14
                                        items-center justify-center
                                        rounded-2xl
                                        bg-brand-50
                                        text-brand-700
                                    "
                                >
                                    <MessageSquareText
                                        size={26}
                                        strokeWidth={1.7}
                                        aria-hidden="true"
                                    />
                                </div>

                                <h3
                                    className="
                                        mt-5
                                        font-display
                                        text-2xl font-semibold
                                        text-slate-900
                                    "
                                >
                                    Write a review
                                </h3>

                                <p
                                    className="
                                        mt-3
                                        text-sm leading-7
                                        text-slate-600
                                    "
                                >
                                    Share your Dream Ceylon
                                    Journeys experience through
                                    our official Tripadvisor
                                    listing.
                                </p>

                                <div
                                    className="
                                        mt-6
                                        flex min-h-[90px]
                                        items-center justify-center
                                    "
                                >
                                    <TripadvisorWriteReviewWidget />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <p
                    className="
                        mt-5 text-center
                        text-xs leading-6
                        text-slate-500
                    "
                >
                    Tripadvisor is an independent third-party
                    review platform. Submitted reviews are
                    published according to Tripadvisor&apos;s
                    review policies.
                </p>
            </Container>
        </section>
    );
}