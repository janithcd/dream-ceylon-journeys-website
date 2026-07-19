"use client";

import {
    ChangeEvent,
    FormEvent,
    useMemo,
    useState,
} from "react";

import {
    CalendarDays,
    Check,
    LoaderCircle,
    Send,
    UsersRound,
    X,
} from "lucide-react";

import type {
    TravelChatMessage,
} from "@/types/travel-assistant";

type ChatInquiryFormProps = {
    messages: TravelChatMessage[];

    conversationId:
        string | null;

    onCancelAction: () => void;

    onSuccessAction: (
        successMessage: string
    ) => void;
};

type InquiryFormData = {
    fullName: string;
    email: string;
    whatsappNumber: string;
    country: string;
    travelDate: string;
    numberOfTravelers: string;
    additionalNotes: string;
    website: string;
};

const initialFormData: InquiryFormData =
    {
        fullName: "",
        email: "",
        whatsappNumber: "",
        country: "",
        travelDate: "",
        numberOfTravelers: "2",
        additionalNotes: "",
        website: "",
    };

const inputClassName = `
    min-h-11
    w-full
    rounded-xl
    border border-slate-200
    bg-white
    px-3
    text-sm
    text-slate-900
    outline-none
    transition
    placeholder:text-slate-400
    focus:border-brand-500
    focus:ring-4
    focus:ring-brand-500/10
`;

function buildConversationSummary(
    messages: TravelChatMessage[]
): string {
    const relevantMessages =
        messages
            .filter(
                (message) =>
                    message.id !==
                    "welcome-message"
            )
            .slice(-8);

    if (
        relevantMessages.length ===
        0
    ) {
        return "";
    }

    const summary =
        relevantMessages
            .map((message) => {
                const speaker =
                    message.role ===
                    "user"
                        ? "Traveller"
                        : "AI Assistant";

                return `${speaker}: ${message.content}`;
            })
            .join("\n\n");

    return summary.slice(
        0,
        1800
    );
}

export function ChatInquiryForm({
                                    messages,
                                    conversationId,
                                    onCancelAction,
                                    onSuccessAction,
                                }: ChatInquiryFormProps) {
    const [
        formData,
        setFormData,
    ] = useState<InquiryFormData>(
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

    const minimumTravelDate =
        useMemo(() => {
            const today =
                new Date();

            const localToday =
                new Date(
                    today.getTime() -
                    today.getTimezoneOffset() *
                    60_000
                );

            return localToday
                .toISOString()
                .split("T")[0];
        }, []);

    const handleChange = (
        event: ChangeEvent<
            HTMLInputElement |
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
    };

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (isSubmitting) {
            return;
        }

        setErrorMessage("");

        if (!consent) {
            setErrorMessage(
                "Please confirm that we may contact you about this inquiry."
            );

            return;
        }

        const conversationSummary =
            buildConversationSummary(
                messages
            );

        const additionalNotes =
            formData.additionalNotes.trim();

        const inquiryMessage = [
            "AI-assisted website inquiry.",

            additionalNotes
                ? `Additional traveller notes:\n${additionalNotes}`
                : "",

            conversationSummary
                ? `Recent chatbot conversation:\n${conversationSummary}`
                : "The traveller requested assistance through the website chatbot.",
        ]
            .filter(Boolean)
            .join("\n\n")
            .slice(0, 3000);

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
                                    "",

                                message:
                                inquiryMessage,

                                chatConversationId:
                                    conversationId ||
                                    "",

                                website:
                                formData.website,
                            }),
                    }
                );

            const data =
                (await response.json()) as {
                    message?: string;

                    chatConversationLinked?: boolean;
                };

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "The inquiry could not be submitted."
                );
            }

            onSuccessAction(
                data.message ||
                "Your inquiry has been sent successfully."
            );
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
        <div
            className="
                rounded-2xl
                border border-brand-200
                bg-white
                p-4
                shadow-sm
            "
        >
            <div
                className="
                    flex items-start
                    justify-between
                    gap-3
                "
            >
                <div>
                    <p
                        className="
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.15em]
                            text-brand-700
                        "
                    >
                        Send to our team
                    </p>

                    <h3
                        className="
                            mt-1
                            text-base
                            font-bold
                            text-slate-900
                        "
                    >
                        Confirm your travel inquiry
                    </h3>

                    <p
                        className="
                            mt-1
                            text-xs
                            leading-5
                            text-slate-500
                        "
                    >
                        Your recent conversation
                        will be attached so our
                        travel team can prepare a
                        suitable response.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onCancelAction}
                    disabled={
                        isSubmitting
                    }
                    aria-label="Close inquiry form"
                    className="
                        flex size-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        text-slate-400
                        transition
                        hover:bg-slate-100
                        hover:text-slate-700
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                >
                    <X
                        size={17}
                        aria-hidden="true"
                    />
                </button>
            </div>

            {errorMessage && (
                <div
                    role="alert"
                    className="
                        mt-4
                        rounded-xl
                        border border-red-200
                        bg-red-50
                        p-3
                        text-xs
                        leading-5
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
                    mt-4
                    space-y-3
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
                    <label htmlFor="chat-website">
                        Website
                    </label>

                    <input
                        id="chat-website"
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
                        htmlFor="chat-full-name"
                        className="
                            mb-1.5
                            block
                            text-xs
                            font-semibold
                            text-slate-700
                        "
                    >
                        Full name
                        <span className="text-red-500">
                            {" "}*
                        </span>
                    </label>

                    <input
                        id="chat-full-name"
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
                        htmlFor="chat-email"
                        className="
                            mb-1.5
                            block
                            text-xs
                            font-semibold
                            text-slate-700
                        "
                    >
                        Email
                        <span className="text-red-500">
                            {" "}*
                        </span>
                    </label>

                    <input
                        id="chat-email"
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
                        htmlFor="chat-whatsapp"
                        className="
                            mb-1.5
                            block
                            text-xs
                            font-semibold
                            text-slate-700
                        "
                    >
                        WhatsApp / phone
                        <span className="text-red-500">
                            {" "}*
                        </span>
                    </label>

                    <input
                        id="chat-whatsapp"
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
                        htmlFor="chat-country"
                        className="
                            mb-1.5
                            block
                            text-xs
                            font-semibold
                            text-slate-700
                        "
                    >
                        Country
                        <span className="text-red-500">
                            {" "}*
                        </span>
                    </label>

                    <input
                        id="chat-country"
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

                <div
                    className="
                        grid
                        grid-cols-1
                        gap-3
                        sm:grid-cols-2
                    "
                >
                    <div>
                        <label
                            htmlFor="chat-travel-date"
                            className="
                                mb-1.5
                                flex
                                items-center
                                gap-1.5
                                text-xs
                                font-semibold
                                text-slate-700
                            "
                        >
                            <CalendarDays
                                size={14}
                                className="text-brand-600"
                                aria-hidden="true"
                            />

                            Arrival date
                        </label>

                        <input
                            id="chat-travel-date"
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
                            htmlFor="chat-travellers"
                            className="
                                mb-1.5
                                flex
                                items-center
                                gap-1.5
                                text-xs
                                font-semibold
                                text-slate-700
                            "
                        >
                            <UsersRound
                                size={14}
                                className="text-brand-600"
                                aria-hidden="true"
                            />

                            Travellers
                        </label>

                        <input
                            id="chat-travellers"
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
                </div>

                <div>
                    <label
                        htmlFor="chat-additional-notes"
                        className="
                            mb-1.5
                            block
                            text-xs
                            font-semibold
                            text-slate-700
                        "
                    >
                        Additional notes
                    </label>

                    <textarea
                        id="chat-additional-notes"
                        name="additionalNotes"
                        value={
                            formData.additionalNotes
                        }
                        onChange={
                            handleChange
                        }
                        rows={3}
                        maxLength={700}
                        placeholder="Budget, hotel preference, special requirements, or anything else..."
                        className={`
                            ${inputClassName}
                            min-h-[88px]
                            resize-y
                            py-2.5
                        `}
                    />
                </div>

                <label
                    className="
                        flex cursor-pointer
                        items-start gap-2.5
                        text-xs
                        leading-5
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
                                event.target.checked
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
                        I agree that Dream Ceylon
                        Journeys may contact me by
                        email, phone or WhatsApp
                        regarding this request.
                    </span>
                </label>

                <div
                    className="
                        flex
                        flex-col-reverse
                        gap-2
                        pt-1
                        sm:flex-row
                    "
                >
                    <button
                        type="button"
                        onClick={
                            onCancelAction
                        }
                        disabled={
                            isSubmitting
                        }
                        className="
                            inline-flex
                            min-h-11
                            flex-1
                            items-center
                            justify-center
                            rounded-xl
                            border border-slate-200
                            bg-white
                            px-4
                            text-xs
                            font-bold
                            text-slate-700
                            transition
                            hover:bg-slate-50
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        Continue chatting
                    </button>

                    <button
                        type="submit"
                        disabled={
                            isSubmitting
                        }
                        className="
                            inline-flex
                            min-h-11
                            flex-[1.35]
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-brand-700
                            px-4
                            text-xs
                            font-bold
                            text-white
                            transition
                            hover:bg-brand-800
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                    >
                        {isSubmitting ? (
                            <>
                                <LoaderCircle
                                    size={16}
                                    className="animate-spin"
                                    aria-hidden="true"
                                />

                                Sending inquiry
                            </>
                        ) : (
                            <>
                                <Check
                                    size={16}
                                    aria-hidden="true"
                                />

                                Confirm & Send
                            </>
                        )}
                    </button>
                </div>

                <p
                    className="
                        flex items-start
                        gap-1.5
                        text-[10px]
                        leading-4
                        text-slate-400
                    "
                >
                    <Send
                        size={12}
                        className="mt-0.5 shrink-0"
                        aria-hidden="true"
                    />

                    This sends a request to the
                    travel team. It does not
                    confirm a booking.
                </p>
            </form>
        </div>
    );
}