"use client";

import {
    type FormEvent,
    useEffect,
    useId,
    useState,
} from "react";

import {
    createPortal,
} from "react-dom";

import {
    CalendarDays,
    CarFront,
    CheckCircle2,
    LoaderCircle,
    Send,
    Users,
    X,
} from "lucide-react";

type VehicleInquiryButtonProps = {
    vehicleId: string;
    vehicleName: string;
    vehicleType: string;
    capacity: number;
    priceLabel: string;

    label?: string;
    className?: string;
};

type ApiResponse = {
    message?: string;
};

export function VehicleInquiryButton({
                                         vehicleId,
                                         vehicleName,
                                         vehicleType,
                                         capacity,
                                         priceLabel,
                                         label = "Request This Vehicle",
                                         className = "",
                                     }: VehicleInquiryButtonProps) {
    const dialogTitleId =
        useId();

    const [
        isMounted,
        setIsMounted,
    ] = useState(false);

    const [
        isOpen,
        setIsOpen,
    ] = useState(false);

    const [
        isSubmitting,
        setIsSubmitting,
    ] = useState(false);

    const [
        isSubmitted,
        setIsSubmitted,
    ] = useState(false);

    const [
        errorMessage,
        setErrorMessage,
    ] = useState("");

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const previousOverflow =
            document.body.style.overflow;

        document.body.style.overflow =
            "hidden";

        function handleKeyDown(
            event: KeyboardEvent
        ) {
            if (
                event.key ===
                "Escape" &&
                !isSubmitting
            ) {
                setIsOpen(false);
                setErrorMessage("");
                setIsSubmitted(false);
            }
        }

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            document.body.style.overflow =
                previousOverflow;

            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [
        isOpen,
        isSubmitting,
    ]);

    function openModal() {
        setErrorMessage("");
        setIsSubmitted(false);
        setIsOpen(true);
    }

    function closeModal() {
        if (isSubmitting) {
            return;
        }

        setIsOpen(false);
        setErrorMessage("");
        setIsSubmitted(false);
    }

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setIsSubmitting(true);
        setErrorMessage("");

        const form =
            event.currentTarget;

        const formData =
            new FormData(form);

        const payload = {
            fullName:
                String(
                    formData.get(
                        "fullName"
                    ) || ""
                ).trim(),

            email:
                String(
                    formData.get(
                        "email"
                    ) || ""
                ).trim(),

            whatsappNumber:
                String(
                    formData.get(
                        "whatsappNumber"
                    ) || ""
                ).trim(),

            country:
                String(
                    formData.get(
                        "country"
                    ) || ""
                ).trim(),

            travelDate:
                String(
                    formData.get(
                        "travelDate"
                    ) || ""
                ).trim(),

            numberOfTravelers:
                Number(
                    formData.get(
                        "numberOfTravelers"
                    )
                ),

            vehicleId,
            vehicleName,
            vehicleType,

            message:
                String(
                    formData.get(
                        "message"
                    ) || ""
                ).trim(),
        };

        try {
            const response =
                await fetch(
                    "/api/vehicle-inquiries",
                    {
                        method:
                            "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body:
                            JSON.stringify(
                                payload
                            ),
                    }
                );

            const result =
                (await response
                    .json()
                    .catch(
                        () => ({})
                    )) as ApiResponse;

            if (!response.ok) {
                throw new Error(
                    result.message ||
                    "The vehicle inquiry could not be submitted."
                );
            }

            form.reset();
            setIsSubmitted(true);
        } catch (error) {
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "The vehicle inquiry could not be submitted."
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    const modal =
        isMounted &&
        isOpen ? (
            <div
                className="
                    fixed inset-0
                    z-[9999]
                    overflow-y-auto
                    bg-slate-950/75
                    p-4
                    backdrop-blur-md
                    sm:p-6
                    lg:p-8
                "
            >
                <div
                    className="
                        flex min-h-full
                        items-start
                        justify-center
                        sm:items-center
                    "
                    onMouseDown={(
                        event
                    ) => {
                        if (
                            event.target ===
                            event.currentTarget
                        ) {
                            closeModal();
                        }
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={
                            dialogTitleId
                        }
                        className="
                            relative
                            my-auto
                            flex
                            max-h-[calc(100dvh-2rem)]
                            w-full
                            max-w-3xl
                            flex-col
                            overflow-hidden
                            rounded-[1.75rem]
                            bg-white
                            shadow-[0_35px_120px_rgba(0,0,0,0.45)]
                            sm:max-h-[calc(100dvh-3rem)]
                            sm:rounded-[2rem]
                        "
                        onMouseDown={(
                            event
                        ) => {
                            event.stopPropagation();
                        }}
                    >
                        {/* Header */}
                        <div
                            className="
                                relative
                                shrink-0
                                overflow-hidden
                                bg-gradient-to-r
                                from-[#043F3B]
                                via-[#07534D]
                                to-[#14624C]
                                px-6 py-6
                                text-white
                                sm:px-9
                                sm:py-7
                            "
                        >
                            <div
                                aria-hidden="true"
                                className="
                                    absolute
                                    -right-16 -top-20
                                    h-52 w-52
                                    rounded-full
                                    bg-[#FEC52E]/20
                                    blur-3xl
                                "
                            />

                            <div
                                aria-hidden="true"
                                className="
                                    absolute
                                    -bottom-20 -left-16
                                    h-48 w-48
                                    rounded-full
                                    bg-[#C62D52]/25
                                    blur-3xl
                                "
                            />

                            <div className="relative pr-12">
                                <p
                                    className="
                                        text-[10px]
                                        font-bold
                                        uppercase
                                        tracking-[0.2em]
                                        text-[#FEC52E]
                                        sm:text-xs
                                    "
                                >
                                    Private vehicle inquiry
                                </p>

                                <h2
                                    id={
                                        dialogTitleId
                                    }
                                    className="
                                        mt-2
                                        font-display
                                        text-2xl
                                        font-semibold
                                        leading-tight
                                        sm:mt-3
                                        sm:text-4xl
                                    "
                                >
                                    Request{" "}
                                    {vehicleName}
                                </h2>

                                <p
                                    className="
                                        mt-2
                                        max-w-2xl
                                        text-sm
                                        leading-6
                                        text-white/75
                                        sm:mt-3
                                        sm:text-base
                                        sm:leading-7
                                    "
                                >
                                    Share your dates,
                                    traveller count and
                                    route requirements.
                                    Our team will prepare
                                    the appropriate vehicle
                                    quotation.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={
                                    closeModal
                                }
                                disabled={
                                    isSubmitting
                                }
                                aria-label="Close vehicle inquiry form"
                                className="
                                    absolute
                                    right-4 top-4
                                    flex h-10 w-10
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-white/25
                                    bg-white/10
                                    text-white
                                    transition
                                    hover:bg-white
                                    hover:text-[#043F3B]
                                    disabled:opacity-50
                                    sm:right-5
                                    sm:top-5
                                "
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="min-h-0 flex-1 overflow-y-auto">
                            {isSubmitted ? (
                                <div
                                    className="
                                        px-6 py-12
                                        text-center
                                        sm:px-10
                                        sm:py-14
                                    "
                                >
                                    <div
                                        className="
                                            mx-auto
                                            flex h-20 w-20
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-emerald-100
                                            text-emerald-700
                                        "
                                    >
                                        <CheckCircle2 className="h-10 w-10" />
                                    </div>

                                    <h3
                                        className="
                                            mt-6
                                            font-display
                                            text-3xl
                                            font-semibold
                                            text-slate-900
                                        "
                                    >
                                        Vehicle inquiry
                                        submitted
                                    </h3>

                                    <p
                                        className="
                                            mx-auto mt-4
                                            max-w-xl
                                            leading-7
                                            text-slate-600
                                        "
                                    >
                                        Thank you. Our team
                                        will review your
                                        route, traveller
                                        count and vehicle
                                        requirements before
                                        contacting you.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={
                                            closeModal
                                        }
                                        className="
                                            mt-8
                                            inline-flex
                                            min-h-12
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-[#008D86]
                                            px-7
                                            font-bold
                                            text-white
                                            transition
                                            hover:bg-[#006D68]
                                        "
                                    >
                                        Close
                                    </button>
                                </div>
                            ) : (
                                <form
                                    onSubmit={
                                        handleSubmit
                                    }
                                    className="
                                        px-5 py-6
                                        sm:px-9
                                        sm:py-8
                                    "
                                >
                                    {/* Vehicle summary */}
                                    <div
                                        className="
                                            mb-7
                                            grid gap-4
                                            rounded-3xl
                                            border
                                            border-[#008D86]/20
                                            bg-[#008D86]/[0.06]
                                            p-5
                                            sm:grid-cols-2
                                        "
                                    >
                                        <div className="flex items-start gap-3">
                                            <CarFront className="mt-0.5 h-5 w-5 shrink-0 text-[#008D86]" />

                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                    Selected vehicle
                                                </p>

                                                <p className="mt-1 font-bold text-slate-900">
                                                    {
                                                        vehicleName
                                                    }
                                                </p>

                                                <p className="mt-1 text-sm text-slate-500">
                                                    Private{" "}
                                                    {
                                                        vehicleType
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <Users className="mt-0.5 h-5 w-5 shrink-0 text-[#C62D52]" />

                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                    Vehicle details
                                                </p>

                                                <p className="mt-1 font-bold text-slate-900">
                                                    Up to{" "}
                                                    {
                                                        capacity
                                                    }{" "}
                                                    passengers
                                                </p>

                                                <p className="mt-1 text-sm text-slate-500">
                                                    {
                                                        priceLabel
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <label className="block">
                                            <span className="text-sm font-bold text-slate-800">
                                                Full name
                                                <span className="text-[#C62D52]">
                                                    {" "}
                                                    *
                                                </span>
                                            </span>

                                            <input
                                                type="text"
                                                name="fullName"
                                                required
                                                autoComplete="name"
                                                placeholder="Your full name"
                                                className="
                                                    mt-2 min-h-12 w-full
                                                    rounded-2xl
                                                    border border-slate-300
                                                    bg-white px-4
                                                    text-slate-900
                                                    outline-none
                                                    transition
                                                    placeholder:text-slate-400
                                                    focus:border-[#008D86]
                                                    focus:ring-4
                                                    focus:ring-[#008D86]/10
                                                "
                                            />
                                        </label>

                                        <label className="block">
                                            <span className="text-sm font-bold text-slate-800">
                                                Email address
                                                <span className="text-[#C62D52]">
                                                    {" "}
                                                    *
                                                </span>
                                            </span>

                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                autoComplete="email"
                                                placeholder="you@example.com"
                                                className="
                                                    mt-2 min-h-12 w-full
                                                    rounded-2xl
                                                    border border-slate-300
                                                    bg-white px-4
                                                    text-slate-900
                                                    outline-none
                                                    transition
                                                    placeholder:text-slate-400
                                                    focus:border-[#008D86]
                                                    focus:ring-4
                                                    focus:ring-[#008D86]/10
                                                "
                                            />
                                        </label>

                                        <label className="block">
                                            <span className="text-sm font-bold text-slate-800">
                                                WhatsApp number
                                                <span className="text-[#C62D52]">
                                                    {" "}
                                                    *
                                                </span>
                                            </span>

                                            <input
                                                type="tel"
                                                name="whatsappNumber"
                                                required
                                                autoComplete="tel"
                                                placeholder="+44 123 456 7890"
                                                className="
                                                    mt-2 min-h-12 w-full
                                                    rounded-2xl
                                                    border border-slate-300
                                                    bg-white px-4
                                                    text-slate-900
                                                    outline-none
                                                    transition
                                                    placeholder:text-slate-400
                                                    focus:border-[#008D86]
                                                    focus:ring-4
                                                    focus:ring-[#008D86]/10
                                                "
                                            />
                                        </label>

                                        <label className="block">
                                            <span className="text-sm font-bold text-slate-800">
                                                Country
                                                <span className="text-[#C62D52]">
                                                    {" "}
                                                    *
                                                </span>
                                            </span>

                                            <input
                                                type="text"
                                                name="country"
                                                required
                                                autoComplete="country-name"
                                                placeholder="United Kingdom"
                                                className="
                                                    mt-2 min-h-12 w-full
                                                    rounded-2xl
                                                    border border-slate-300
                                                    bg-white px-4
                                                    text-slate-900
                                                    outline-none
                                                    transition
                                                    placeholder:text-slate-400
                                                    focus:border-[#008D86]
                                                    focus:ring-4
                                                    focus:ring-[#008D86]/10
                                                "
                                            />
                                        </label>

                                        <label className="block">
                                            <span className="text-sm font-bold text-slate-800">
                                                Preferred travel date
                                            </span>

                                            <input
                                                type="date"
                                                name="travelDate"
                                                className="
                                                    mt-2 min-h-12 w-full
                                                    rounded-2xl
                                                    border border-slate-300
                                                    bg-white px-4
                                                    text-slate-900
                                                    outline-none
                                                    transition
                                                    focus:border-[#008D86]
                                                    focus:ring-4
                                                    focus:ring-[#008D86]/10
                                                "
                                            />
                                        </label>

                                        <label className="block">
                                            <span className="text-sm font-bold text-slate-800">
                                                Number of travellers
                                                <span className="text-[#C62D52]">
                                                    {" "}
                                                    *
                                                </span>
                                            </span>

                                            <div className="relative mt-2">
                                                <Users
                                                    className="
                                                        pointer-events-none
                                                        absolute
                                                        left-4 top-1/2
                                                        h-5 w-5
                                                        -translate-y-1/2
                                                        text-slate-400
                                                    "
                                                />

                                                <input
                                                    type="number"
                                                    name="numberOfTravelers"
                                                    required
                                                    min={1}
                                                    max={100}
                                                    defaultValue={2}
                                                    className="
                                                        min-h-12 w-full
                                                        rounded-2xl
                                                        border border-slate-300
                                                        bg-white
                                                        pl-12 pr-4
                                                        text-slate-900
                                                        outline-none
                                                        transition
                                                        focus:border-[#008D86]
                                                        focus:ring-4
                                                        focus:ring-[#008D86]/10
                                                    "
                                                />
                                            </div>
                                        </label>
                                    </div>

                                    <label className="mt-5 block">
                                        <span className="text-sm font-bold text-slate-800">
                                            Route and requirements
                                            <span className="text-[#C62D52]">
                                                {" "}
                                                *
                                            </span>
                                        </span>

                                        <textarea
                                            name="message"
                                            required
                                            rows={4}
                                            defaultValue={`I am interested in the "${vehicleName}". Please send me a quotation for my Sri Lanka journey.`}
                                            className="
                                                mt-2 w-full
                                                resize-y
                                                rounded-2xl
                                                border border-slate-300
                                                bg-white
                                                px-4 py-3
                                                leading-7
                                                text-slate-900
                                                outline-none
                                                transition
                                                focus:border-[#008D86]
                                                focus:ring-4
                                                focus:ring-[#008D86]/10
                                            "
                                        />
                                    </label>

                                    {errorMessage && (
                                        <div
                                            role="alert"
                                            className="
                                                mt-5
                                                rounded-2xl
                                                border
                                                border-rose-200
                                                bg-rose-50
                                                px-4 py-3
                                                text-sm
                                                leading-6
                                                text-rose-700
                                            "
                                        >
                                            {
                                                errorMessage
                                            }
                                        </div>
                                    )}

                                    <div
                                        className="
                                            mt-7
                                            flex flex-col-reverse
                                            gap-3
                                            sm:flex-row
                                            sm:items-center
                                            sm:justify-end
                                        "
                                    >
                                        <button
                                            type="button"
                                            onClick={
                                                closeModal
                                            }
                                            disabled={
                                                isSubmitting
                                            }
                                            className="
                                                inline-flex min-h-12
                                                items-center
                                                justify-center
                                                rounded-full
                                                border border-slate-300
                                                bg-white px-6
                                                font-bold
                                                text-slate-700
                                                transition
                                                hover:bg-slate-50
                                                disabled:opacity-50
                                            "
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="submit"
                                            disabled={
                                                isSubmitting
                                            }
                                            className="
                                                inline-flex min-h-12
                                                items-center
                                                justify-center
                                                gap-2
                                                rounded-full
                                                bg-[#C62D52]
                                                px-7
                                                font-bold
                                                text-white
                                                shadow-lg
                                                transition
                                                hover:-translate-y-0.5
                                                hover:bg-[#A92343]
                                                disabled:translate-y-0
                                                disabled:opacity-60
                                            "
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <LoaderCircle className="h-5 w-5 animate-spin" />

                                                    Submitting…
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="h-5 w-5" />

                                                    Submit Inquiry
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        ) : null;

    return (
        <>
            <button
                type="button"
                onClick={
                    openModal
                }
                className={
                    className
                }
            >
                <CarFront
                    className="h-5 w-5"
                    aria-hidden="true"
                />

                {label}
            </button>

            {modal
                ? createPortal(
                    modal,
                    document.body
                )
                : null}
        </>
    );
}