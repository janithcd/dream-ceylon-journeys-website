"use client";

import {
    ChangeEvent,
    FormEvent,
    useMemo,
    useState,
} from "react";

import {
    CalendarDays,
    CheckCircle2,
    LoaderCircle,
    Mail,
    MapPin,
    MessageSquareText,
    Phone,
    Send,
    ShieldCheck,
    UsersRound,
} from "lucide-react";

export type InquiryPackageOption = {
    id: string;
    title: string;
    durationDays?: number;
};

type CustomTourInquiryFormProps = {
    packages: InquiryPackageOption[];
};

type FormData = {
    fullName: string;
    email: string;
    whatsappNumber: string;
    country: string;
    travelDate: string;
    numberOfTravelers: string;
    interestedPackage: string;
    message: string;
    website: string;
};

const initialFormData: FormData = {
    fullName: "",
    email: "",
    whatsappNumber: "",
    country: "",
    travelDate: "",
    numberOfTravelers: "2",
    interestedPackage: "",
    message: "",
    website: "",
};

const inputClassName = `
    min-h-12
    w-full
    rounded-xl
    border border-slate-200
    bg-white
    px-4
    text-sm
    text-slate-900
    outline-none
    transition
    placeholder:text-slate-400
    focus:border-brand-500
    focus:ring-4
    focus:ring-brand-500/10
`;

export function CustomTourInquiryForm({
                                          packages,
                                      }: CustomTourInquiryFormProps) {
    const [
        formData,
        setFormData,
    ] = useState<FormData>(
        initialFormData
    );

    const [
        consent,
        setConsent,
    ] = useState(false);

    const [
        isSubmitting,
        setIsSubmitting,
    ] = useState(false);

    const [
        errorMessage,
        setErrorMessage,
    ] = useState("");

    const [
        successMessage,
        setSuccessMessage,
    ] = useState("");

    const minimumTravelDate =
        useMemo(() => {
            const today =
                new Date();

            const localDate =
                new Date(
                    today.getTime() -
                    today.getTimezoneOffset() *
                    60_000
                );

            return localDate
                .toISOString()
                .split("T")[0];
        }, []);

    const handleChange = (
        event: ChangeEvent<
            HTMLInputElement |
            HTMLSelectElement |
            HTMLTextAreaElement
        >
    ) => {
        const {
            name,
            value,
        } = event.target;

        setFormData(
            (previous) => ({
                ...previous,
                [name]: value,
            })
        );

        if (errorMessage) {
            setErrorMessage("");
        }

        if (successMessage) {
            setSuccessMessage("");
        }
    };

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (isSubmitting) {
            return;
        }

        setErrorMessage("");
        setSuccessMessage("");

        if (!consent) {
            setErrorMessage(
                "Please confirm that we may contact you about this inquiry."
            );

            return;
        }

        try {
            setIsSubmitting(true);

            const response =
                await fetch(
                    "/api/inquiries",
                    {
                        method:
                            "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                            Accept:
                                "application/json",
                        },

                        body:
                            JSON.stringify({
                                ...formData,

                                numberOfTravelers:
                                    Number(
                                        formData.numberOfTravelers
                                    ),
                            }),
                    }
                );

            const data =
                (await response.json()) as {
                    message?: string;
                };

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "The inquiry could not be submitted."
                );
            }

            setSuccessMessage(
                data.message ||
                "Thank you. Your inquiry has been submitted successfully."
            );

            setFormData(
                initialFormData
            );

            setConsent(false);
        } catch (error) {
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "Something went wrong. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            id="plan-your-tour"
            className="
                relative overflow-hidden
                bg-[#f7f6f3]
                py-20
                sm:py-24
                lg:py-28
            "
        >
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute -right-52 top-10
                    size-[430px]
                    rounded-full
                    bg-brand-100/35
                    blur-3xl
                "
            />

            <div
                className="
                    relative mx-auto
                    w-full max-w-[1380px]
                    px-4
                    sm:px-6
                    lg:px-8
                "
            >
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
                            lg:grid-cols-[minmax(300px,0.72fr)_minmax(0,1.28fr)]
                        "
                    >
                        {/* Introduction */}
                        <div
                            className="
                                relative overflow-hidden
                                bg-brand-800
                                px-7 py-10
                                text-white
                                sm:px-10
                                sm:py-12
                                lg:px-12
                                lg:py-16
                            "
                        >
                            <div
                                aria-hidden="true"
                                className="
                                    absolute -right-28
                                    -top-28
                                    size-72
                                    rounded-full
                                    bg-white/[0.06]
                                "
                            />

                            <div className="relative">
                                <div
                                    className="
                                        flex items-center
                                        gap-3
                                        text-[11px]
                                        font-bold
                                        uppercase
                                        tracking-[0.2em]
                                        text-brand-gold
                                    "
                                >
                                    <span className="h-px w-10 bg-brand-gold" />

                                    Plan your journey
                                </div>

                                <h2
                                    className="
                                        mt-5
                                        font-display
                                        text-4xl
                                        font-semibold
                                        leading-[1.06]
                                        tracking-[-0.04em]
                                        sm:text-5xl
                                    "
                                >
                                    Tell us about
                                    your Sri Lanka
                                    travel plans.
                                </h2>

                                <p
                                    className="
                                        mt-6
                                        text-sm
                                        leading-7
                                        text-white/70
                                        sm:text-base
                                        sm:leading-8
                                    "
                                >
                                    Share your travel
                                    dates, group size,
                                    interests and preferred
                                    journey style. Our local
                                    team will review your
                                    request and contact you
                                    with suitable options.
                                </p>

                                <div className="mt-9 space-y-5">
                                    <div className="flex gap-4">
                                        <Mail
                                            size={20}
                                            className="mt-0.5 shrink-0 text-brand-gold"
                                            aria-hidden="true"
                                        />

                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/50">
                                                Email
                                            </p>

                                            <a
                                                href="mailto:info@dreamceylonjourneys.com"
                                                className="mt-1 block text-sm font-medium text-white hover:text-brand-gold"
                                            >
                                                info@dreamceylonjourneys.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <Phone
                                            size={20}
                                            className="mt-0.5 shrink-0 text-brand-gold"
                                            aria-hidden="true"
                                        />

                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/50">
                                                WhatsApp
                                            </p>

                                            <a
                                                href="https://wa.me/94775124645"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-1 block text-sm font-medium text-white hover:text-brand-gold"
                                            >
                                                +94 77 512 4645
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <MapPin
                                            size={20}
                                            className="mt-0.5 shrink-0 text-brand-gold"
                                            aria-hidden="true"
                                        />

                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/50">
                                                Local team
                                            </p>

                                            <p className="mt-1 text-sm font-medium text-white">
                                                Sri Lanka-based travel planning
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="
                                        mt-10
                                        flex items-start
                                        gap-3
                                        border-t
                                        border-white/15
                                        pt-6
                                        text-xs
                                        leading-6
                                        text-white/60
                                    "
                                >
                                    <ShieldCheck
                                        size={19}
                                        className="mt-0.5 shrink-0 text-brand-gold"
                                        aria-hidden="true"
                                    />

                                    Your information is used
                                    only to respond to your
                                    travel inquiry.
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div
                            className="
                                px-6 py-9
                                sm:px-9
                                sm:py-11
                                lg:px-12
                                lg:py-14
                            "
                        >
                            <div>
                                <p
                                    className="
                                        text-xs
                                        font-bold
                                        uppercase
                                        tracking-[0.16em]
                                        text-brand-700
                                    "
                                >
                                    Custom tour inquiry
                                </p>

                                <h3
                                    className="
                                        mt-3
                                        font-display
                                        text-3xl
                                        font-semibold
                                        tracking-[-0.03em]
                                        text-slate-900
                                    "
                                >
                                    Start planning your
                                    private journey
                                </h3>
                            </div>

                            {successMessage && (
                                <div
                                    role="status"
                                    className="
                                        mt-7 flex
                                        items-start gap-3
                                        rounded-xl
                                        border
                                        border-emerald-200
                                        bg-emerald-50
                                        p-4
                                        text-sm
                                        leading-6
                                        text-emerald-800
                                    "
                                >
                                    <CheckCircle2
                                        size={20}
                                        className="mt-0.5 shrink-0"
                                        aria-hidden="true"
                                    />

                                    {successMessage}
                                </div>
                            )}

                            {errorMessage && (
                                <div
                                    role="alert"
                                    className="
                                        mt-7
                                        rounded-xl
                                        border border-red-200
                                        bg-red-50
                                        p-4
                                        text-sm
                                        leading-6
                                        text-red-700
                                    "
                                >
                                    {errorMessage}
                                </div>
                            )}

                            <form
                                onSubmit={
                                    handleSubmit
                                }
                                className="
                                    mt-8
                                    grid gap-5
                                    md:grid-cols-2
                                "
                            >
                                {/* Honeypot */}
                                <div
                                    className="
                                        absolute
                                        -left-[10000px]
                                        top-auto
                                        h-px
                                        w-px
                                        overflow-hidden
                                    "
                                    aria-hidden="true"
                                >
                                    <label htmlFor="website">
                                        Website
                                    </label>

                                    <input
                                        id="website"
                                        name="website"
                                        value={
                                            formData.website
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        tabIndex={-1}
                                        autoComplete="off"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="fullName"
                                        className="mb-2 block text-sm font-semibold text-slate-800"
                                    >
                                        Full name
                                        <span className="text-red-500">
                                            {" "}*
                                        </span>
                                    </label>

                                    <input
                                        id="fullName"
                                        name="fullName"
                                        value={
                                            formData.fullName
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className={
                                            inputClassName
                                        }
                                        placeholder="Your full name"
                                        autoComplete="name"
                                        maxLength={120}
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-semibold text-slate-800"
                                    >
                                        Email address
                                        <span className="text-red-500">
                                            {" "}*
                                        </span>
                                    </label>

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={
                                            formData.email
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className={
                                            inputClassName
                                        }
                                        placeholder="name@example.com"
                                        autoComplete="email"
                                        maxLength={160}
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="whatsappNumber"
                                        className="mb-2 block text-sm font-semibold text-slate-800"
                                    >
                                        WhatsApp / phone
                                        <span className="text-red-500">
                                            {" "}*
                                        </span>
                                    </label>

                                    <input
                                        id="whatsappNumber"
                                        name="whatsappNumber"
                                        type="tel"
                                        value={
                                            formData.whatsappNumber
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className={
                                            inputClassName
                                        }
                                        placeholder="+44 7700 900000"
                                        autoComplete="tel"
                                        maxLength={40}
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="country"
                                        className="mb-2 block text-sm font-semibold text-slate-800"
                                    >
                                        Country
                                        <span className="text-red-500">
                                            {" "}*
                                        </span>
                                    </label>

                                    <input
                                        id="country"
                                        name="country"
                                        value={
                                            formData.country
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className={
                                            inputClassName
                                        }
                                        placeholder="United Kingdom"
                                        autoComplete="country-name"
                                        maxLength={100}
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="travelDate"
                                        className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800"
                                    >
                                        <CalendarDays
                                            size={16}
                                            className="text-brand-600"
                                            aria-hidden="true"
                                        />

                                        Expected arrival date
                                    </label>

                                    <input
                                        id="travelDate"
                                        name="travelDate"
                                        type="date"
                                        value={
                                            formData.travelDate
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        min={
                                            minimumTravelDate
                                        }
                                        className={
                                            inputClassName
                                        }
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="numberOfTravelers"
                                        className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800"
                                    >
                                        <UsersRound
                                            size={16}
                                            className="text-brand-600"
                                            aria-hidden="true"
                                        />

                                        Number of travellers
                                    </label>

                                    <input
                                        id="numberOfTravelers"
                                        name="numberOfTravelers"
                                        type="number"
                                        value={
                                            formData.numberOfTravelers
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        min={1}
                                        max={50}
                                        className={
                                            inputClassName
                                        }
                                        required
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label
                                        htmlFor="interestedPackage"
                                        className="mb-2 block text-sm font-semibold text-slate-800"
                                    >
                                        Interested tour package
                                    </label>

                                    <select
                                        id="interestedPackage"
                                        name="interestedPackage"
                                        value={
                                            formData.interestedPackage
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className={
                                            inputClassName
                                        }
                                    >
                                        <option value="">
                                            Custom itinerary / Not sure yet
                                        </option>

                                        {packages.map(
                                            (
                                                tourPackage
                                            ) => (
                                                <option
                                                    key={
                                                        tourPackage.id
                                                    }
                                                    value={
                                                        tourPackage.id
                                                    }
                                                >
                                                    {
                                                        tourPackage.title
                                                    }
                                                    {tourPackage.durationDays
                                                        ? ` — ${tourPackage.durationDays} days`
                                                        : ""}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>

                                <div className="md:col-span-2">
                                    <label
                                        htmlFor="message"
                                        className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800"
                                    >
                                        <MessageSquareText
                                            size={16}
                                            className="text-brand-600"
                                            aria-hidden="true"
                                        />

                                        Tell us about your journey
                                        <span className="text-red-500">
                                            *
                                        </span>
                                    </label>

                                    <textarea
                                        id="message"
                                        name="message"
                                        value={
                                            formData.message
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        rows={6}
                                        maxLength={3000}
                                        className={`
                                            ${inputClassName}
                                            min-h-[150px]
                                            resize-y
                                            py-3
                                        `}
                                        placeholder="Tell us your preferred destinations, interests, accommodation style, budget range, special requirements, or B2B ground-handling needs."
                                        required
                                    />

                                    <p className="mt-2 text-right text-xs text-slate-400">
                                        {
                                            formData.message
                                                .length
                                        }
                                        /3000
                                    </p>
                                </div>

                                <div className="md:col-span-2">
                                    <label
                                        className="
                                            flex cursor-pointer
                                            items-start gap-3
                                            text-sm
                                            leading-6
                                            text-slate-600
                                        "
                                    >
                                        <input
                                            type="checkbox"
                                            checked={
                                                consent
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                setConsent(
                                                    event
                                                        .target
                                                        .checked
                                                )
                                            }
                                            className="
                                                mt-1
                                                size-4
                                                rounded
                                                border-slate-300
                                                accent-brand-600
                                            "
                                            required
                                        />

                                        <span>
                                            I agree that Dream
                                            Ceylon Journeys may
                                            contact me by email,
                                            phone or WhatsApp
                                            regarding this
                                            inquiry.
                                        </span>
                                    </label>
                                </div>

                                <div className="md:col-span-2">
                                    <button
                                        type="submit"
                                        disabled={
                                            isSubmitting
                                        }
                                        className="
                                            group
                                            inline-flex
                                            min-h-12
                                            w-full
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-full
                                            bg-brand-600
                                            px-7
                                            text-sm
                                            font-bold
                                            text-white
                                            shadow-[0_12px_28px_rgba(0,141,134,0.20)]
                                            transition
                                            hover:-translate-y-0.5
                                            hover:bg-brand-700
                                            disabled:cursor-not-allowed
                                            disabled:opacity-65
                                            sm:w-auto
                                        "
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <LoaderCircle
                                                    size={18}
                                                    className="animate-spin"
                                                    aria-hidden="true"
                                                />

                                                Submitting inquiry
                                            </>
                                        ) : (
                                            <>
                                                Send My Inquiry

                                                <Send
                                                    size={17}
                                                    aria-hidden="true"
                                                    className="
                                                        transition-transform
                                                        group-hover:translate-x-0.5
                                                    "
                                                />
                                            </>
                                        )}
                                    </button>
                                </div>

                                <p
                                    className="
                                        text-xs
                                        leading-6
                                        text-slate-400
                                        md:col-span-2
                                    "
                                    aria-live="polite"
                                >
                                    Submitting this form does
                                    not confirm a booking. Our
                                    team will review the request
                                    and contact you with the next
                                    steps.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}