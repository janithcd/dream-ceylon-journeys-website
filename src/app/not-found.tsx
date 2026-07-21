import Link from "next/link";

import {
    ArrowLeft,
    Compass,
    Home,
    MapPin,
    Route,
    Search,
    Sparkles,
} from "lucide-react";

export default function NotFound() {
    return (
        <main
            className="
                relative isolate
                flex min-h-screen
                items-center
                overflow-hidden
                bg-[#043F3B]
                px-6
                py-28
                text-white
            "
        >
            {/* Decorative background */}
            <div
                aria-hidden="true"
                className="
                    absolute
                    -right-40 -top-40
                    -z-10
                    h-[520px] w-[520px]
                    rounded-full
                    bg-[#FEC52E]/15
                    blur-3xl
                "
            />

            <div
                aria-hidden="true"
                className="
                    absolute
                    -bottom-48 -left-40
                    -z-10
                    h-[520px] w-[520px]
                    rounded-full
                    bg-[#C62D52]/25
                    blur-3xl
                "
            />

            <div
                aria-hidden="true"
                className="
                    absolute inset-0
                    -z-20
                    opacity-[0.06]
                    [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)]
                    [background-size:48px_48px]
                "
            />

            <div
                className="
                    mx-auto
                    grid w-full
                    max-w-7xl
                    gap-14
                    lg:grid-cols-[1.05fr_0.95fr]
                    lg:items-center
                "
            >
                {/* Main content */}
                <div>
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
                            font-semibold
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

                        Dream Ceylon Journeys
                    </div>

                    <p
                        className="
                            mt-8
                            font-display
                            text-[7rem]
                            font-bold
                            leading-none
                            tracking-[-0.08em]
                            text-[#FEC52E]
                            sm:text-[10rem]
                            lg:text-[12rem]
                        "
                    >
                        404
                    </p>

                    <h1
                        className="
                            mt-4
                            max-w-3xl
                            font-display
                            text-4xl
                            font-semibold
                            leading-tight
                            sm:text-5xl
                            lg:text-6xl
                        "
                    >
                        This journey has taken a
                        wrong turn
                    </h1>

                    <p
                        className="
                            mt-6
                            max-w-2xl
                            text-lg
                            leading-8
                            text-white/75
                        "
                    >
                        The page you are looking for
                        may have moved, changed its
                        address or no longer exists.
                        Let us help you find your way
                        back to Sri Lanka.
                    </p>

                    <div
                        className="
                            mt-9
                            flex flex-col
                            gap-4
                            sm:flex-row
                            sm:flex-wrap
                        "
                    >
                        <Link
                            href="/"
                            className="
                                inline-flex
                                min-h-14
                                items-center
                                justify-center
                                gap-2
                                rounded-full
                                bg-[#FEC52E]
                                px-8
                                font-bold
                                text-[#173F3B]
                                shadow-[0_16px_35px_rgba(254,197,46,0.18)]
                                transition
                                hover:-translate-y-0.5
                                hover:bg-white
                            "
                        >
                            <Home
                                className="h-5 w-5"
                                aria-hidden="true"
                            />

                            Return Home
                        </Link>

                        <Link
                            href="/sri-lanka-tours"
                            className="
                                inline-flex
                                min-h-14
                                items-center
                                justify-center
                                gap-2
                                rounded-full
                                border
                                border-white/30
                                bg-white/10
                                px-8
                                font-bold
                                text-white
                                backdrop-blur-md
                                transition
                                hover:-translate-y-0.5
                                hover:bg-white
                                hover:text-[#043F3B]
                            "
                        >
                            <Route
                                className="h-5 w-5"
                                aria-hidden="true"
                            />

                            View Sri Lanka Tours
                        </Link>
                    </div>
                </div>

                {/* Navigation card */}
                <div
                    className="
                        rounded-[2.5rem]
                        border
                        border-white/15
                        bg-white/10
                        p-6
                        shadow-[0_35px_100px_rgba(0,0,0,0.25)]
                        backdrop-blur-xl
                        sm:p-8
                    "
                >
                    <div
                        className="
                            flex h-16 w-16
                            items-center
                            justify-center
                            rounded-2xl
                            bg-[#FEC52E]
                            text-[#173F3B]
                            shadow-lg
                        "
                    >
                        <Compass
                            className="h-8 w-8"
                            aria-hidden="true"
                        />
                    </div>

                    <p
                        className="
                            mt-6
                            text-xs
                            font-bold
                            uppercase
                            tracking-[0.22em]
                            text-[#FEC52E]
                        "
                    >
                        Continue exploring
                    </p>

                    <h2
                        className="
                            mt-3
                            font-display
                            text-3xl
                            font-semibold
                        "
                    >
                        Find your next destination
                    </h2>

                    <div
                        className="
                            mt-7
                            space-y-3
                        "
                    >
                        <Link
                            href="/sri-lanka-destinations"
                            className="
                                group
                                flex items-center
                                justify-between
                                gap-4
                                rounded-2xl
                                border
                                border-white/15
                                bg-white/10
                                px-5 py-4
                                transition
                                hover:border-[#FEC52E]/50
                                hover:bg-white/15
                            "
                        >
                            <span
                                className="
                                    flex items-center
                                    gap-3
                                "
                            >
                                <MapPin
                                    className="
                                        h-5 w-5
                                        text-[#FEC52E]
                                    "
                                    aria-hidden="true"
                                />

                                <span>
                                    <span
                                        className="
                                            block
                                            font-bold
                                        "
                                    >
                                        Sri Lanka
                                        Destinations
                                    </span>

                                    <span
                                        className="
                                            mt-1
                                            block
                                            text-sm
                                            text-white/60
                                        "
                                    >
                                        Culture, nature,
                                        wildlife and beaches
                                    </span>
                                </span>
                            </span>

                            <ArrowLeft
                                className="
                                    h-5 w-5
                                    rotate-180
                                    transition
                                    group-hover:translate-x-1
                                "
                                aria-hidden="true"
                            />
                        </Link>

                        <Link
                            href="/vehicles"
                            className="
                                group
                                flex items-center
                                justify-between
                                gap-4
                                rounded-2xl
                                border
                                border-white/15
                                bg-white/10
                                px-5 py-4
                                transition
                                hover:border-[#FEC52E]/50
                                hover:bg-white/15
                            "
                        >
                            <span
                                className="
                                    flex items-center
                                    gap-3
                                "
                            >
                                <Search
                                    className="
                                        h-5 w-5
                                        text-[#FEC52E]
                                    "
                                    aria-hidden="true"
                                />

                                <span>
                                    <span
                                        className="
                                            block
                                            font-bold
                                        "
                                    >
                                        Private Vehicles
                                    </span>

                                    <span
                                        className="
                                            mt-1
                                            block
                                            text-sm
                                            text-white/60
                                        "
                                    >
                                        Cars, SUVs and tour
                                        vans
                                    </span>
                                </span>
                            </span>

                            <ArrowLeft
                                className="
                                    h-5 w-5
                                    rotate-180
                                    transition
                                    group-hover:translate-x-1
                                "
                                aria-hidden="true"
                            />
                        </Link>

                        <Link
                            href="/plan-your-tour"
                            className="
                                group
                                flex items-center
                                justify-between
                                gap-4
                                rounded-2xl
                                border
                                border-[#FEC52E]/30
                                bg-[#FEC52E]/10
                                px-5 py-4
                                transition
                                hover:bg-[#FEC52E]/20
                            "
                        >
                            <span
                                className="
                                    flex items-center
                                    gap-3
                                "
                            >
                                <Compass
                                    className="
                                        h-5 w-5
                                        text-[#FEC52E]
                                    "
                                    aria-hidden="true"
                                />

                                <span>
                                    <span
                                        className="
                                            block
                                            font-bold
                                        "
                                    >
                                        Plan Your Tour
                                    </span>

                                    <span
                                        className="
                                            mt-1
                                            block
                                            text-sm
                                            text-white/60
                                        "
                                    >
                                        Create a tailor-made
                                        Sri Lanka journey
                                    </span>
                                </span>
                            </span>

                            <ArrowLeft
                                className="
                                    h-5 w-5
                                    rotate-180
                                    transition
                                    group-hover:translate-x-1
                                "
                                aria-hidden="true"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}