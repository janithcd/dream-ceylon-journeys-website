import Link from "next/link";

import {
    CalendarDays,
    Phone,
} from "lucide-react";

import {
    FaWhatsapp,
} from "react-icons/fa";

const PHONE_NUMBER =
    "+94775124645";

const WHATSAPP_NUMBER =
    "94775124645";

const WHATSAPP_MESSAGE =
    "Hello Dream Ceylon Journeys, I am interested in planning a private Sri Lanka tour. Could you please assist me?";

const WHATSAPP_URL =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        WHATSAPP_MESSAGE
    )}`;

export function FloatingContact() {
    return (
        <>
            {/*
             * Mobile spacing so the fixed contact
             * bar does not cover the bottom of
             * the website footer.
             */}
            <div
                aria-hidden="true"
                className="h-[82px] lg:hidden"
            />

            {/* Desktop WhatsApp button */}
            <div
                className="
        fixed bottom-5 left-5
        z-[80]
        hidden
        lg:block
    "
            >
                <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat with Dream Ceylon Journeys on WhatsApp"
                    className="
                        group
                        inline-flex min-h-14
                        items-center gap-3
                        rounded-full
                        border border-slate-200
                        bg-white
                        px-5
                        text-sm font-semibold
                        text-slate-800
                        shadow-[0_14px_40px_rgba(20,40,38,0.14)]
                        transition-all duration-300
                        hover:-translate-y-1
                        hover:border-[#25D366]/40
                        hover:shadow-[0_18px_48px_rgba(20,40,38,0.18)]
                        focus-visible:outline-none
                        focus-visible:ring-4
                        focus-visible:ring-[#25D366]/20
                    "
                >
                    <span
                        className="
                            flex size-9
                            items-center justify-center
                            rounded-full
                            bg-[#25D366]
                            text-white
                        "
                    >
                        <FaWhatsapp
                            size={20}
                            aria-hidden="true"
                        />
                    </span>

                    <span className="pr-1">
                        Chat with us
                    </span>
                </a>
            </div>

            {/* Mobile contact bar */}
            <div
                className="
                    fixed inset-x-0 bottom-0
                    z-[80]
                    border-t border-slate-200
                    bg-white/95
                    px-3 pt-2
                    pb-[calc(0.5rem+env(safe-area-inset-bottom))]
                    shadow-[0_-10px_35px_rgba(24,40,38,0.10)]
                    backdrop-blur-xl
                    lg:hidden
                "
            >
                <div
                    className="
                        mx-auto
                        grid max-w-lg
                        grid-cols-3 gap-2
                    "
                >
                    <a
                        href={`tel:${PHONE_NUMBER}`}
                        aria-label="Call Dream Ceylon Journeys"
                        className="
                            flex min-h-[54px]
                            flex-col items-center
                            justify-center gap-1
                            rounded-xl
                            text-[11px] font-semibold
                            text-slate-700
                            transition-colors
                            hover:bg-slate-100
                            hover:text-brand-700
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-brand-500/30
                        "
                    >
                        <Phone
                            size={19}
                            strokeWidth={1.8}
                            aria-hidden="true"
                        />

                        Call
                    </a>

                    <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Chat with Dream Ceylon Journeys on WhatsApp"
                        className="
                            flex min-h-[54px]
                            flex-col items-center
                            justify-center gap-1
                            rounded-xl
                            bg-[#25D366]
                            text-[11px] font-semibold
                            text-white
                            shadow-[0_8px_20px_rgba(37,211,102,0.22)]
                            transition-all
                            hover:bg-[#20bd5a]
                            focus-visible:outline-none
                            focus-visible:ring-4
                            focus-visible:ring-[#25D366]/25
                        "
                    >
                        <FaWhatsapp
                            size={20}
                            aria-hidden="true"
                        />

                        WhatsApp
                    </a>

                    <Link
                        href="/#plan-your-tour"
                        aria-label="Plan your private Sri Lanka tour"
                        className="
                            flex min-h-[54px]
                            flex-col items-center
                            justify-center gap-1
                            rounded-xl
                            bg-brand-600
                            text-[11px] font-semibold
                            text-white
                            transition-colors
                            hover:bg-brand-700
                            focus-visible:outline-none
                            focus-visible:ring-4
                            focus-visible:ring-brand-500/25
                        "
                    >
                        <CalendarDays
                            size={19}
                            strokeWidth={1.8}
                            aria-hidden="true"
                        />

                        Plan Tour
                    </Link>
                </div>
            </div>
        </>
    );
}