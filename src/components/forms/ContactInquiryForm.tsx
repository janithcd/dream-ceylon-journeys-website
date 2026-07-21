"use client";

import Link from "next/link";

import {
    Building2,
    CalendarDays,
    CheckCircle2,
    Globe2,
    LoaderCircle,
    Mail,
    MessageSquareText,
    Phone,
    Send,
    UsersRound,
} from "lucide-react";

import {
    type ChangeEvent,
    type FormEvent,
    useMemo,
    useState,
} from "react";

type ContactFormData = {
    fullName: string;
    email: string;
    whatsappNumber: string;
    country: string;
    inquiryType: string;
    companyName: string;
    preferredContactMethod: string;
    travelDate: string;
    numberOfTravelers: string;
    message: string;
    website: string;
};

const initialFormData: ContactFormData = {
    fullName: "",
    email: "",
    whatsappNumber: "",
    country: "",
    inquiryType: "",
    companyName: "",
    preferredContactMethod: "WhatsApp",
    travelDate: "",
    numberOfTravelers: "1",
    message: "",
    website: "",
};

const inquiryTypes = [
    "Private tailor-made tour",
    "Multi-day tour package",
    "Day tour",
    "Vehicle or airport transfer",
    "Travel agent / B2B partnership",
    "Existing booking support",
    "General question",
];

const contactMethods = [
    "WhatsApp",
    "Email",
    "Phone call",
];

const inputClassName = `
    min-h-12
    w-full
    rounded-xl
    border
    border-slate-200
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

export function ContactInquiryForm() {
    const [
        formData,
        setFormData,
    ] = useState<ContactFormData>(
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
        successMessage,
        setSuccessMessage,
    ] = useState("");

    const [
        errorMessage,
        setErrorMessage,
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

    const isB2BInquiry =
        formData.inquiryType ===
        "Travel agent / B2B partnership";

    function handleChange(
        event: ChangeEvent<
            | HTMLInputElement
            | HTMLSelectElement
            | HTMLTextAreaElement
        >
    ) {
        const {
            name,
            value,
        } = event.target;

        setFormData(
            (
                previous
            ) => ({
                ...previous,
                [name]:
                value,
            })
        );

        if (successMessage) {
            setSuccessMessage("");
        }

        if (errorMessage) {
            setErrorMessage("");
        }
    }

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (isSubmitting) {
            return;
        }

        setSuccessMessage("");
        setErrorMessage("");

        if (!formData.inquiryType) {
            setErrorMessage(
                "Please select the type of inquiry."
            );

            return;
        }

        if (
            isB2BInquiry &&
            !formData.companyName.trim()
        ) {
            setErrorMessage(
                "Please enter your company or travel agency name."
            );

            return;
        }

        if (!consent) {
            setErrorMessage(
                "Please confirm that we may contact you about this inquiry."
            );

            return;
        }

        const inquiryContext = [
            `Inquiry type: ${formData.inquiryType}`,

            formData.companyName.trim()
                ? `Company / agency: ${formData.companyName.trim()}`
                : "",

            `Preferred contact method: ${formData.preferredContactMethod}`,
        ]
            .filter(Boolean)
            .join("\n");

        const formattedMessage =
            `${inquiryContext}\n\n${formData.message}`.trim();

        try {
            setIsSubmitting(
                true
            );

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
                                fullName:
                                formData.fullName,

                                email:
                                formData.email,

                                whatsappNumber:
                                formData.whatsappNumber,

                                country:
                                formData.country,

                                travelDate:
                                formData.travelDate,

                                numberOfTravelers:
                                    Number(
                                        formData.numberOfTravelers
                                    ),

                                interestedPackage:
                                formData.inquiryType,

                                message:
                                formattedMessage,

                                website:
                                formData.website,
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
                "Thank you. Your message has been sent successfully."
            );

            setFormData(
                initialFormData
            );

            setConsent(
                false
            );
        } catch (error) {
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "Something went wrong. Please try again."
            );
        } finally {
            setIsSubmitting(
                false
            );
        }
    }

    return (
        <div
            className="
                overflow-hidden
                rounded-[2rem]
                border
                border-slate-200
                bg-white
                shadow-[0_24px_70px_rgba(7,45,44,0.08)]
            "
        >
            <div
                className="
                    border-b
                    border-slate-100
                    px-6
                    py-7
                    sm:px-9
                "
            >
                <p
                    className="
                        text-xs
                        font-bold
                        uppercase
                        tracking-[0.18em]
                        text-brand-600
                    "
                >
                    Send us a message
                </p>

                <h2
                    className="
                        mt-3
                        font-display
                        text-3xl
                        font-semibold
                        tracking-[-0.03em]
                        text-brand-950
                        sm:text-4xl
                    "
                >
                    How can we help with your Sri Lanka journey?
                </h2>

                <p
                    className="
                        mt-4
                        max-w-2xl
                        text-sm
                        leading-7
                        text-slate-600
                        sm:text-base
                    "
                >
                    Complete the form with as much information
                    as possible. Our local team will review your
                    request and contact you directly.
                </p>
            </div>

            <div
                className="
                    px-6
                    py-8
                    sm:px-9
                    sm:py-10
                "
            >
                {successMessage ? (
                    <div
                        role="status"
                        className="
                            mb-7
                            flex
                            items-start
                            gap-3
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
                            className="
                                mt-0.5
                                h-5
                                w-5
                                shrink-0
                            "
                            aria-hidden="true"
                        />

                        <span>
                            {successMessage}
                        </span>
                    </div>
                ) : null}

                {errorMessage ? (
                    <div
                        role="alert"
                        className="
                            mb-7
                            rounded-xl
                            border
                            border-red-200
                            bg-red-50
                            p-4
                            text-sm
                            leading-6
                            text-red-700
                        "
                    >
                        {errorMessage}
                    </div>
                ) : null}

                <form
                    onSubmit={
                        handleSubmit
                    }
                    className="
                        grid
                        gap-5
                        md:grid-cols-2
                    "
                >
                    <div
                        aria-hidden="true"
                        className="
                            absolute
                            -left-[10000px]
                            top-auto
                            h-px
                            w-px
                            overflow-hidden
                        "
                    >
                        <label htmlFor="contactWebsite">
                            Website
                        </label>

                        <input
                            id="contactWebsite"
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
                            htmlFor="contactFullName"
                            className="
                                mb-2
                                block
                                text-sm
                                font-semibold
                                text-slate-800
                            "
                        >
                            Full name{" "}
                            <span className="text-red-500">
                                *
                            </span>
                        </label>

                        <div className="relative">
                            <input
                                id="contactFullName"
                                name="fullName"
                                value={
                                    formData.fullName
                                }
                                onChange={
                                    handleChange
                                }
                                className={`
                                    ${inputClassName}
                                    pl-11
                                `}
                                placeholder="Your full name"
                                autoComplete="name"
                                maxLength={120}
                                required
                            />

                            <UsersRound
                                className="
                                    pointer-events-none
                                    absolute
                                    left-4
                                    top-1/2
                                    h-4
                                    w-4
                                    -translate-y-1/2
                                    text-slate-400
                                "
                                aria-hidden="true"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="contactEmail"
                            className="
                                mb-2
                                block
                                text-sm
                                font-semibold
                                text-slate-800
                            "
                        >
                            Email address{" "}
                            <span className="text-red-500">
                                *
                            </span>
                        </label>

                        <div className="relative">
                            <input
                                id="contactEmail"
                                name="email"
                                type="email"
                                value={
                                    formData.email
                                }
                                onChange={
                                    handleChange
                                }
                                className={`
                                    ${inputClassName}
                                    pl-11
                                `}
                                placeholder="name@example.com"
                                autoComplete="email"
                                maxLength={160}
                                required
                            />

                            <Mail
                                className="
                                    pointer-events-none
                                    absolute
                                    left-4
                                    top-1/2
                                    h-4
                                    w-4
                                    -translate-y-1/2
                                    text-slate-400
                                "
                                aria-hidden="true"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="contactPhone"
                            className="
                                mb-2
                                block
                                text-sm
                                font-semibold
                                text-slate-800
                            "
                        >
                            WhatsApp or phone{" "}
                            <span className="text-red-500">
                                *
                            </span>
                        </label>

                        <div className="relative">
                            <input
                                id="contactPhone"
                                name="whatsappNumber"
                                type="tel"
                                value={
                                    formData.whatsappNumber
                                }
                                onChange={
                                    handleChange
                                }
                                className={`
                                    ${inputClassName}
                                    pl-11
                                `}
                                placeholder="+44 7700 900000"
                                autoComplete="tel"
                                maxLength={40}
                                required
                            />

                            <Phone
                                className="
                                    pointer-events-none
                                    absolute
                                    left-4
                                    top-1/2
                                    h-4
                                    w-4
                                    -translate-y-1/2
                                    text-slate-400
                                "
                                aria-hidden="true"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="contactCountry"
                            className="
                                mb-2
                                block
                                text-sm
                                font-semibold
                                text-slate-800
                            "
                        >
                            Country{" "}
                            <span className="text-red-500">
                                *
                            </span>
                        </label>

                        <div className="relative">
                            <input
                                id="contactCountry"
                                name="country"
                                value={
                                    formData.country
                                }
                                onChange={
                                    handleChange
                                }
                                className={`
                                    ${inputClassName}
                                    pl-11
                                `}
                                placeholder="United Kingdom"
                                autoComplete="country-name"
                                maxLength={100}
                                required
                            />

                            <Globe2
                                className="
                                    pointer-events-none
                                    absolute
                                    left-4
                                    top-1/2
                                    h-4
                                    w-4
                                    -translate-y-1/2
                                    text-slate-400
                                "
                                aria-hidden="true"
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <label
                            htmlFor="inquiryType"
                            className="
                                mb-2
                                block
                                text-sm
                                font-semibold
                                text-slate-800
                            "
                        >
                            What can we help you with?{" "}
                            <span className="text-red-500">
                                *
                            </span>
                        </label>

                        <select
                            id="inquiryType"
                            name="inquiryType"
                            value={
                                formData.inquiryType
                            }
                            onChange={
                                handleChange
                            }
                            className={
                                inputClassName
                            }
                            required
                        >
                            <option value="">
                                Select an inquiry type
                            </option>

                            {inquiryTypes.map(
                                (
                                    inquiryType
                                ) => (
                                    <option
                                        key={
                                            inquiryType
                                        }
                                        value={
                                            inquiryType
                                        }
                                    >
                                        {inquiryType}
                                    </option>
                                )
                            )}
                        </select>
                    </div>

                    {isB2BInquiry ? (
                        <div className="md:col-span-2">
                            <label
                                htmlFor="companyName"
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-semibold
                                    text-slate-800
                                "
                            >
                                Company or travel agency name{" "}
                                <span className="text-red-500">
                                    *
                                </span>
                            </label>

                            <div className="relative">
                                <input
                                    id="companyName"
                                    name="companyName"
                                    value={
                                        formData.companyName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className={`
                                        ${inputClassName}
                                        pl-11
                                    `}
                                    placeholder="Your company or agency"
                                    autoComplete="organization"
                                    maxLength={150}
                                    required
                                />

                                <Building2
                                    className="
                                        pointer-events-none
                                        absolute
                                        left-4
                                        top-1/2
                                        h-4
                                        w-4
                                        -translate-y-1/2
                                        text-slate-400
                                    "
                                    aria-hidden="true"
                                />
                            </div>
                        </div>
                    ) : null}

                    <div>
                        <label
                            htmlFor="travelDate"
                            className="
                                mb-2
                                block
                                text-sm
                                font-semibold
                                text-slate-800
                            "
                        >
                            Expected arrival date
                        </label>

                        <div className="relative">
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
                                className={`
                                    ${inputClassName}
                                    pl-11
                                `}
                            />

                            <CalendarDays
                                className="
                                    pointer-events-none
                                    absolute
                                    left-4
                                    top-1/2
                                    h-4
                                    w-4
                                    -translate-y-1/2
                                    text-slate-400
                                "
                                aria-hidden="true"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="contactTravelers"
                            className="
                                mb-2
                                block
                                text-sm
                                font-semibold
                                text-slate-800
                            "
                        >
                            Number of travellers
                        </label>

                        <input
                            id="contactTravelers"
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
                        />
                    </div>

                    <div className="md:col-span-2">
                        <fieldset>
                            <legend
                                className="
                                    mb-3
                                    text-sm
                                    font-semibold
                                    text-slate-800
                                "
                            >
                                Preferred contact method
                            </legend>

                            <div
                                className="
                                    grid
                                    gap-3
                                    sm:grid-cols-3
                                "
                            >
                                {contactMethods.map(
                                    (
                                        method
                                    ) => {
                                        const isSelected =
                                            formData
                                                .preferredContactMethod ===
                                            method;

                                        return (
                                            <label
                                                key={
                                                    method
                                                }
                                                className={[
                                                    `
                                                        flex
                                                        cursor-pointer
                                                        items-center
                                                        justify-center
                                                        gap-2
                                                        rounded-xl
                                                        border
                                                        px-4
                                                        py-3
                                                        text-sm
                                                        font-semibold
                                                        transition
                                                    `,
                                                    isSelected
                                                        ? "border-brand-500 bg-brand-50 text-brand-800"
                                                        : "border-slate-200 bg-white text-slate-600 hover:border-brand-500/40",
                                                ].join(
                                                    " "
                                                )}
                                            >
                                                <input
                                                    type="radio"
                                                    name="preferredContactMethod"
                                                    value={
                                                        method
                                                    }
                                                    checked={
                                                        isSelected
                                                    }
                                                    onChange={
                                                        handleChange
                                                    }
                                                    className="
                                                        accent-brand-600
                                                    "
                                                />

                                                {method}
                                            </label>
                                        );
                                    }
                                )}
                            </div>
                        </fieldset>
                    </div>

                    <div className="md:col-span-2">
                        <label
                            htmlFor="contactMessage"
                            className="
                                mb-2
                                flex
                                items-center
                                gap-2
                                text-sm
                                font-semibold
                                text-slate-800
                            "
                        >
                            <MessageSquareText
                                className="
                                    h-4
                                    w-4
                                    text-brand-600
                                "
                                aria-hidden="true"
                            />

                            Your message{" "}
                            <span className="text-red-500">
                                *
                            </span>
                        </label>

                        <textarea
                            id="contactMessage"
                            name="message"
                            value={
                                formData.message
                            }
                            onChange={
                                handleChange
                            }
                            rows={7}
                            maxLength={3000}
                            className={`
                                ${inputClassName}
                                min-h-[180px]
                                resize-y
                                py-3
                            `}
                            placeholder="Tell us about your travel plans, preferred destinations, transport needs, budget range, special requirements, existing booking, or B2B ground-handling request."
                            required
                        />

                        <p
                            className="
                                mt-2
                                text-right
                                text-xs
                                text-slate-400
                            "
                        >
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
                                flex
                                cursor-pointer
                                items-start
                                gap-3
                                rounded-xl
                                bg-slate-50
                                p-4
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
                                        event.target
                                            .checked
                                    )
                                }
                                className="
                                    mt-1
                                    h-4
                                    w-4
                                    shrink-0
                                    accent-brand-600
                                "
                                required
                            />

                            <span>
                                I agree that Dream Ceylon
                                Journeys may contact me by email,
                                phone, or WhatsApp regarding this
                                inquiry. View our{" "}
                                <Link
                                    href="/privacy"
                                    className="
                                        font-semibold
                                        text-brand-700
                                        underline
                                        underline-offset-2
                                    "
                                >
                                    Privacy Policy
                                </Link>
                                .
                            </span>
                        </label>
                    </div>

                    <div
                        className="
                            flex
                            flex-col
                            gap-4
                            md:col-span-2
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        "
                    >
                        <p
                            className="
                                max-w-md
                                text-xs
                                leading-6
                                text-slate-400
                            "
                        >
                            Sending this form does not confirm a
                            booking. Our team will review your
                            request and contact you with the next
                            steps.
                        </p>

                        <button
                            type="submit"
                            disabled={
                                isSubmitting
                            }
                            className="
                                group
                                inline-flex
                                min-h-13
                                shrink-0
                                items-center
                                justify-center
                                gap-2
                                rounded-full
                                bg-brand-600
                                px-8
                                font-bold
                                text-white
                                shadow-[0_14px_35px_rgba(0,141,134,0.22)]
                                transition
                                hover:-translate-y-0.5
                                hover:bg-brand-700
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                        >
                            {isSubmitting ? (
                                <>
                                    <LoaderCircle
                                        className="
                                            h-5
                                            w-5
                                            animate-spin
                                        "
                                        aria-hidden="true"
                                    />

                                    Sending message
                                </>
                            ) : (
                                <>
                                    Send Message

                                    <Send
                                        className="
                                            h-4
                                            w-4
                                            transition
                                            group-hover:translate-x-0.5
                                        "
                                        aria-hidden="true"
                                    />
                                </>
                            )}
                        </button>
                    </div>

                    <div
                        className="
                            sr-only
                        "
                        aria-live="polite"
                    >
                        {successMessage ||
                            errorMessage}
                    </div>
                </form>
            </div>
        </div>
    );
}