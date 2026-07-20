import type {
    Metadata,
} from "next";

import Link from "next/link";

import {
    ArrowRight,
    Camera,
    Images,
    Sparkles,
} from "lucide-react";

import {
    TourGallery,
} from "@/components/gallery/TourGallery";

import {
    getGalleryPhotos,
} from "@/lib/gallery";

export const metadata:
    Metadata = {
    title:
        "Sri Lanka Tour Gallery",

    description:
        "Explore real travel moments, landscapes, wildlife, culture and guest experiences from Dream Ceylon Journeys tours across Sri Lanka.",

    alternates: {
        canonical:
            "/gallery",
    },

    openGraph: {
        title:
            "Sri Lanka Tour Gallery | Dream Ceylon Journeys",

        description:
            "Discover real moments from private tours and tailor-made journeys across Sri Lanka.",

        url:
            "/gallery",

        type:
            "website",
    },
};

export const revalidate =
    3600;

export default async function GalleryPage() {
    const photos =
        await getGalleryPhotos();

    return (
        <main>
            <section
                className="
                    relative
                    overflow-hidden
                    bg-[#043F3B]
                    px-6
                    pb-20
                    pt-32
                    text-white
                    sm:pb-24
                    sm:pt-40
                "
            >
                <div
                    aria-hidden="true"
                    className="
                        absolute
                        -right-32
                        -top-32
                        h-96 w-96
                        rounded-full
                        bg-[#FEC52E]/15
                        blur-3xl
                    "
                />

                <div
                    aria-hidden="true"
                    className="
                        absolute
                        -bottom-40
                        -left-32
                        h-96 w-96
                        rounded-full
                        bg-[#C62D52]/20
                        blur-3xl
                    "
                />

                <div
                    className="
                        relative
                        mx-auto
                        max-w-7xl
                    "
                >
                    <div
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-white/20
                            bg-white/10
                            px-4 py-2
                            text-sm
                            font-bold
                            backdrop-blur-md
                        "
                    >
                        <Sparkles
                            className="
                                h-4 w-4
                                text-[#FEC52E]
                            "
                            aria-hidden="true"
                        />

                        Real journeys. Real memories.
                    </div>

                    <div
                        className="
                            mt-7
                            grid
                            gap-8
                            lg:grid-cols-[1fr_auto]
                            lg:items-end
                        "
                    >
                        <div>
                            <h1
                                className="
                                    max-w-4xl
                                    font-display
                                    text-4xl
                                    font-semibold
                                    leading-tight
                                    sm:text-5xl
                                    lg:text-6xl
                                "
                            >
                                Tour Memories from
                                Sri Lanka
                            </h1>

                            <p
                                className="
                                    mt-5
                                    max-w-2xl
                                    text-lg
                                    leading-8
                                    text-white/75
                                "
                            >
                                Explore authentic
                                moments captured
                                during journeys
                                through Sri Lanka’s
                                culture, wildlife,
                                landscapes, beaches
                                and local communities.
                            </p>
                        </div>

                        <div
                            className="
                                inline-flex
                                items-center
                                gap-3
                                rounded-2xl
                                border
                                border-white/15
                                bg-white/10
                                px-5 py-4
                                backdrop-blur-md
                            "
                        >
                            <Camera
                                className="
                                    h-6 w-6
                                    text-[#FEC52E]
                                "
                                aria-hidden="true"
                            />

                            <div>
                                <span
                                    className="
                                        block
                                        text-2xl
                                        font-bold
                                    "
                                >
                                    {
                                        photos.length
                                    }
                                </span>

                                <span
                                    className="
                                        text-sm
                                        text-white/65
                                    "
                                >
                                    Gallery photos
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                className="
                    bg-white
                    px-4 py-16
                    sm:px-6
                    sm:py-20
                "
            >
                <div
                    className="
                        mx-auto
                        max-w-7xl
                    "
                >
                    <div
                        className="
                            mb-10
                            flex
                            flex-col
                            gap-4
                            sm:flex-row
                            sm:items-end
                            sm:justify-between
                        "
                    >
                        <div>
                            <p
                                className="
                                    text-sm
                                    font-bold
                                    uppercase
                                    tracking-[0.2em]
                                    text-[#C62D52]
                                "
                            >
                                Explore the gallery
                            </p>

                            <h2
                                className="
                                    mt-3
                                    font-display
                                    text-3xl
                                    font-semibold
                                    text-[#043F3B]
                                    sm:text-4xl
                                "
                            >
                                Moments from around
                                the island
                            </h2>
                        </div>

                        <p
                            className="
                                max-w-lg
                                leading-7
                                text-slate-600
                            "
                        >
                            Select a category or
                            tap any photograph to
                            open the full-screen
                            swipe gallery.
                        </p>
                    </div>

                    <TourGallery
                        photos={
                            photos
                        }
                    />
                </div>
            </section>

            <section
                className="
                    bg-[#F5F8F7]
                    px-6 py-16
                    sm:py-20
                "
            >
                <div
                    className="
                        mx-auto
                        flex
                        max-w-5xl
                        flex-col
                        items-center
                        rounded-[2.5rem]
                        bg-[#008D86]
                        px-6 py-12
                        text-center
                        text-white
                        shadow-[0_30px_80px_rgba(0,141,134,0.20)]
                        sm:px-12
                    "
                >
                    <Images
                        className="
                            h-10 w-10
                            text-[#FEC52E]
                        "
                        aria-hidden="true"
                    />

                    <h2
                        className="
                            mt-5
                            font-display
                            text-3xl
                            font-semibold
                            sm:text-4xl
                        "
                    >
                        Create your own Sri Lanka
                        memories
                    </h2>

                    <p
                        className="
                            mt-4
                            max-w-2xl
                            leading-7
                            text-white/80
                        "
                    >
                        Tell us your travel dates,
                        interests and preferred
                        destinations, and we will
                        prepare a tailor-made
                        journey for you.
                    </p>

                    <Link
                        href="/plan-your-tour"
                        className="
                            mt-7
                            inline-flex
                            min-h-14
                            items-center
                            justify-center
                            gap-2
                            rounded-full
                            bg-[#FEC52E]
                            px-8
                            font-bold
                            text-[#043F3B]
                            transition
                            hover:-translate-y-0.5
                            hover:bg-white
                        "
                    >
                        Plan Your Tour

                        <ArrowRight
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                    </Link>
                </div>
            </section>
        </main>
    );
}