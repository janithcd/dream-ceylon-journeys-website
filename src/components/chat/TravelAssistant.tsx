"use client";

import {
    FormEvent,
    KeyboardEvent,
    useEffect,
    useRef,
    useState,
} from "react";

import {
    Bot,
    LoaderCircle,
    MessageCircle,
    RotateCcw,
    Send,
    Sparkles,
    X,
} from "lucide-react";

import {
    ChatInquiryForm,
} from "@/components/chat/ChatInquiryForm";

import {
    ChatMessage,
} from "@/components/chat/ChatMessage";

import {
    QuickActions,
} from "@/components/chat/QuickActions";

import type {
    StoredTravelConversationResponse,
    TravelAssistantApiResponse,
    TravelChatAction,
    TravelChatMessage,
} from "@/types/travel-assistant";

const STORAGE_KEY =
    "dream-ceylon-travel-assistant";

const CONVERSATION_ID_STORAGE_KEY =
    "dream-ceylon-travel-assistant-id";

const INITIAL_MESSAGE: TravelChatMessage =
    {
        id: "welcome-message",

        role: "assistant",

        content:
            "Ayubowan! I’m the Dream Ceylon Travel Assistant. I can help with Sri Lanka destinations, private tours, vehicles, travel routes and planning questions. What would you like to know?",
    };

const STARTER_ACTIONS = [
    {
        id: "starter-tour",

        label:
            "Plan a 7-day tour",

        message:
            "Can you suggest a 7-day Sri Lanka itinerary with culture, scenic train journeys and wildlife?",
    },
    {
        id:
            "starter-destinations",

        label:
            "Best places to visit",

        message:
            "What are the best destinations to include in a first Sri Lanka holiday?",
    },
    {
        id:
            "starter-vehicles",

        label:
            "Vehicle prices",

        message:
            "What private vehicles do you offer and what are the starting prices?",
    },
    {
        id:
            "starter-b2b",

        label:
            "B2B support",

        message:
            "How can Dream Ceylon Journeys support travel agents and B2B partners?",
    },
];

function createMessage(
    role:
        | "user"
        | "assistant",

    content: string
): TravelChatMessage {
    return {
        id:
            `${role}-${Date.now()}-${Math.random()
                .toString(36)
                .slice(2)}`,

        role,
        content,
    };
}

export function TravelAssistant() {
    const [
        isOpen,
        setIsOpen,
    ] = useState(false);

    const [
        messages,
        setMessages,
    ] = useState<
        TravelChatMessage[]
    >([INITIAL_MESSAGE]);

    const [
        conversationId,
        setConversationId,
    ] = useState<
        string | null
    >(null);

    const [
        input,
        setInput,
    ] = useState("");

    const [
        isSending,
        setIsSending,
    ] = useState(false);

    const [
        errorMessage,
        setErrorMessage,
    ] = useState("");

    const [
        suggestedActions,
        setSuggestedActions,
    ] = useState<
        TravelChatAction[]
    >([]);

    const [
        showInquiryForm,
        setShowInquiryForm,
    ] = useState(false);

    const [
        storageLoaded,
        setStorageLoaded,
    ] = useState(false);

    const messagesEndRef =
        useRef<HTMLDivElement>(
            null
        );

    const textAreaRef =
        useRef<HTMLTextAreaElement>(
            null
        );

    /*
     * Restore the local conversation and,
     * where possible, restore the authoritative
     * transcript from the CRM.
     */
    useEffect(() => {
        let cancelled = false;

        const restoreConversation =
            async () => {
                try {
                    const storedValue =
                        sessionStorage.getItem(
                            STORAGE_KEY
                        );

                    if (storedValue) {
                        const parsed =
                            JSON.parse(
                                storedValue
                            ) as {
                                messages?:
                                    TravelChatMessage[];
                            };

                        if (
                            Array.isArray(
                                parsed.messages
                            ) &&
                            parsed.messages.length >
                            0
                        ) {
                            setMessages(
                                parsed.messages.slice(
                                    -20
                                )
                            );
                        }
                    }
                } catch {
                    sessionStorage.removeItem(
                        STORAGE_KEY
                    );
                }

                const storedConversationId =
                    sessionStorage.getItem(
                        CONVERSATION_ID_STORAGE_KEY
                    );

                if (
                    storedConversationId
                ) {
                    setConversationId(
                        storedConversationId
                    );

                    try {
                        const response =
                            await fetch(
                                `/api/travel-assistant/conversation/${encodeURIComponent(
                                    storedConversationId
                                )}`,
                                {
                                    method:
                                        "GET",

                                    headers: {
                                        Accept:
                                            "application/json",
                                    },

                                    cache:
                                        "no-store",
                                }
                            );

                        const data =
                            (await response.json()) as
                                StoredTravelConversationResponse;

                        if (
                            cancelled
                        ) {
                            return;
                        }

                        if (
                            response.ok &&
                            data.success &&
                            Array.isArray(
                                data.messages
                            ) &&
                            data.messages
                                .length > 0
                        ) {
                            const restoredMessages =
                                data.messages
                                    .filter(
                                        (
                                            message
                                        ) =>
                                            !message.blocked &&
                                            Boolean(
                                                message.content?.trim()
                                            )
                                    )
                                    .slice(
                                        -20
                                    )
                                    .map(
                                        (
                                            message
                                        ): TravelChatMessage => ({
                                            id:
                                            message.id,

                                            role:
                                            message.role,

                                            content:
                                            message.content,
                                        })
                                    );

                            setMessages([
                                INITIAL_MESSAGE,
                                ...restoredMessages,
                            ]);
                        } else if (
                            response.status ===
                            404
                        ) {
                            setConversationId(
                                null
                            );

                            sessionStorage.removeItem(
                                CONVERSATION_ID_STORAGE_KEY
                            );
                        }
                    } catch {
                        /*
                         * Keep local browser messages
                         * when CRM restoration fails.
                         */
                    }
                }

                if (!cancelled) {
                    setStorageLoaded(
                        true
                    );
                }
            };

        void restoreConversation();

        return () => {
            cancelled = true;
        };
    }, []);

    /*
     * Save recent messages locally so the
     * current browser tab can recover quickly.
     */
    useEffect(() => {
        if (!storageLoaded) {
            return;
        }

        sessionStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                messages:
                    messages.slice(
                        -20
                    ),
            })
        );
    }, [
        messages,
        storageLoaded,
    ]);

    /*
     * Scroll to the newest message,
     * loading state, action or inquiry form.
     */
    useEffect(() => {
        if (!isOpen) {
            return;
        }

        messagesEndRef.current
            ?.scrollIntoView({
                behavior: "smooth",
            });
    }, [
        messages,
        isSending,
        isOpen,
        showInquiryForm,
        suggestedActions,
    ]);

    /*
     * Mobile body scroll lock and
     * Escape-key support.
     */
    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const focusTimer =
            window.setTimeout(
                () =>
                    textAreaRef.current?.focus(),
                250
            );

        const handleEscape = (
            event: globalThis.KeyboardEvent
        ) => {
            if (
                event.key ===
                "Escape"
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener(
            "keydown",
            handleEscape
        );

        const previousOverflow =
            document.body.style
                .overflow;

        if (
            window.innerWidth <
            640
        ) {
            document.body.style.overflow =
                "hidden";
        }

        return () => {
            window.clearTimeout(
                focusTimer
            );

            document.removeEventListener(
                "keydown",
                handleEscape
            );

            document.body.style.overflow =
                previousOverflow;
        };
    }, [isOpen]);

    const sendMessage =
        async (
            selectedMessage?: string
        ) => {
            const message =
                (
                    selectedMessage ??
                    input
                ).trim();

            if (
                !message ||
                isSending ||
                showInquiryForm
            ) {
                return;
            }

            setInput("");
            setErrorMessage("");
            setSuggestedActions([]);

            const userMessage =
                createMessage(
                    "user",
                    message
                );

            const history =
                messages
                    .slice(-8)
                    .map(
                        ({
                             role,
                             content,
                         }) => ({
                            role,
                            content,
                        })
                    );

            setMessages(
                (previous) => [
                    ...previous,
                    userMessage,
                ]
            );

            try {
                setIsSending(true);

                const response =
                    await fetch(
                        "/api/travel-assistant",
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
                                    message,
                                    history,
                                    conversationId,
                                    website:
                                        "",
                                }),
                        }
                    );

                const data =
                    (await response.json()) as
                        TravelAssistantApiResponse;

                if (
                    !response.ok ||
                    !data.success
                ) {
                    throw new Error(
                        data.message ||
                        "The travel assistant could not respond."
                    );
                }

                const reply =
                    data.reply?.trim();

                if (!reply) {
                    throw new Error(
                        "The travel assistant returned an empty response."
                    );
                }

                if (
                    data.conversationId
                ) {
                    setConversationId(
                        data.conversationId
                    );

                    sessionStorage.setItem(
                        CONVERSATION_ID_STORAGE_KEY,
                        data.conversationId
                    );
                }

                setMessages(
                    (previous) => [
                        ...previous,

                        createMessage(
                            "assistant",
                            reply
                        ),
                    ]
                );

                setSuggestedActions(
                    Array.isArray(
                        data.suggestedActions
                    )
                        ? data.suggestedActions
                        : []
                );
            } catch (error) {
                setErrorMessage(
                    error instanceof Error
                        ? error.message
                        : "Something went wrong. Please try again."
                );
            } finally {
                setIsSending(false);
            }
        };

    const handleSubmit = (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        void sendMessage();
    };

    const handleKeyDown = (
        event: KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {
            event.preventDefault();

            void sendMessage();
        }
    };

    const handleAction = (
        action: TravelChatAction
    ) => {
        if (
            action.type ===
            "internal" &&
            action.value ===
            "create-inquiry"
        ) {
            setShowInquiryForm(
                true
            );

            setSuggestedActions(
                []
            );

            setErrorMessage("");

            return;
        }

        if (
            action.type ===
            "external"
        ) {
            window.open(
                action.value,
                "_blank",
                "noopener,noreferrer"
            );

            return;
        }

        if (
            action.type ===
            "anchor"
        ) {
            setIsOpen(false);

            window.setTimeout(
                () => {
                    const target =
                        document.querySelector(
                            action.value
                        );

                    target?.scrollIntoView({
                        behavior:
                            "smooth",

                        block:
                            "start",
                    });
                },
                150
            );
        }
    };

    const handleInquirySuccess = (
        successMessage: string
    ) => {
        setShowInquiryForm(false);

        setSuggestedActions([]);

        setErrorMessage("");

        setMessages(
            (previous) => [
                ...previous,

                createMessage(
                    "assistant",
                    `${successMessage}

Our travel team will review your request and contact you using the details you provided. This inquiry does not yet confirm a booking.`
                ),
            ]
        );
    };

    const clearConversation =
        () => {
            setMessages([
                INITIAL_MESSAGE,
            ]);

            setConversationId(
                null
            );

            setSuggestedActions(
                []
            );

            setShowInquiryForm(
                false
            );

            setErrorMessage("");
            setInput("");

            sessionStorage.removeItem(
                STORAGE_KEY
            );

            sessionStorage.removeItem(
                CONVERSATION_ID_STORAGE_KEY
            );
        };

    return (
        <>
            {/* Chat panel */}
            {isOpen && (
                <section
                    role="dialog"
                    aria-modal="true"
                    aria-label="Dream Ceylon Travel Assistant"
                    className="
                        fixed inset-0
                        z-[100]
                        flex flex-col
                        overflow-hidden
                        bg-[#f8f7f3]

                        sm:inset-auto
                        sm:bottom-5
                        sm:right-5
                        sm:h-[min(680px,calc(100vh-2.5rem))]
                        sm:w-[410px]
                        sm:rounded-[1.75rem]
                        sm:border
                        sm:border-slate-200
                        sm:shadow-[0_24px_70px_rgba(20,40,38,0.22)]
                    "
                >
                    {/* Header */}
                    <header
                        className="
                            flex items-center
                            justify-between
                            gap-4
                            bg-brand-800
                            px-5 py-4
                            text-white
                        "
                    >
                        <div
                            className="
                                flex min-w-0
                                items-center
                                gap-3
                            "
                        >
                            <div
                                className="
                                    flex size-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-white/10
                                    text-brand-gold
                                "
                            >
                                <Bot
                                    size={22}
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />
                            </div>

                            <div className="min-w-0">
                                <h2
                                    className="
                                        truncate
                                        text-sm
                                        font-bold
                                    "
                                >
                                    Dream Ceylon Travel Assistant
                                </h2>

                                <p
                                    className="
                                        mt-1
                                        flex items-center
                                        gap-1.5
                                        text-xs
                                        text-white/65
                                    "
                                >
                                    <span
                                        className="
                                            size-2
                                            rounded-full
                                            bg-emerald-400
                                        "
                                        aria-hidden="true"
                                    />

                                    AI travel planning support
                                </p>
                            </div>
                        </div>

                        <div
                            className="
                                flex items-center
                                gap-1
                            "
                        >
                            <button
                                type="button"
                                onClick={
                                    clearConversation
                                }
                                aria-label="Start a new conversation"
                                title="New conversation"
                                className="
                                    flex size-9
                                    items-center
                                    justify-center
                                    rounded-full
                                    text-white/70
                                    transition
                                    hover:bg-white/10
                                    hover:text-white
                                "
                            >
                                <RotateCcw
                                    size={17}
                                    aria-hidden="true"
                                />
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    setIsOpen(
                                        false
                                    )
                                }
                                aria-label="Close travel assistant"
                                className="
                                    flex size-9
                                    items-center
                                    justify-center
                                    rounded-full
                                    text-white/70
                                    transition
                                    hover:bg-white/10
                                    hover:text-white
                                "
                            >
                                <X
                                    size={20}
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    </header>

                    {/* Messages */}
                    <div
                        className="
                            flex-1
                            overflow-y-auto
                            px-4 py-5
                            sm:px-5
                        "
                    >
                        <div className="space-y-5">
                            {messages.map(
                                (
                                    message
                                ) => (
                                    <ChatMessage
                                        key={
                                            message.id
                                        }
                                        message={
                                            message
                                        }
                                    />
                                )
                            )}

                            {isSending && (
                                <div
                                    className="
                                        flex items-center
                                        gap-3
                                    "
                                    aria-live="polite"
                                >
                                    <div
                                        className="
                                            flex size-8
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-brand-100
                                            text-brand-700
                                        "
                                    >
                                        <Bot
                                            size={17}
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <div
                                        className="
                                            flex items-center
                                            gap-2
                                            rounded-2xl
                                            rounded-tl-md
                                            border
                                            border-slate-200
                                            bg-white
                                            px-4 py-3
                                            text-sm
                                            text-slate-500
                                            shadow-sm
                                        "
                                    >
                                        <LoaderCircle
                                            size={16}
                                            className="animate-spin"
                                            aria-hidden="true"
                                        />

                                        Planning a helpful response
                                    </div>
                                </div>
                            )}

                            {errorMessage && (
                                <div
                                    role="alert"
                                    className="
                                        rounded-xl
                                        border border-red-200
                                        bg-red-50
                                        p-3
                                        text-sm
                                        leading-6
                                        text-red-700
                                    "
                                >
                                    {errorMessage}
                                </div>
                            )}

                            {messages.length ===
                                1 &&
                                !showInquiryForm && (
                                    <div>
                                        <p
                                            className="
                                                mb-3
                                                text-[10px]
                                                font-bold
                                                uppercase
                                                tracking-[0.15em]
                                                text-slate-400
                                            "
                                        >
                                            Try asking
                                        </p>

                                        <div
                                            className="
                                                flex flex-wrap
                                                gap-2
                                            "
                                        >
                                            {STARTER_ACTIONS.map(
                                                (
                                                    action
                                                ) => (
                                                    <button
                                                        key={
                                                            action.id
                                                        }
                                                        type="button"
                                                        disabled={
                                                            isSending
                                                        }
                                                        onClick={() =>
                                                            void sendMessage(
                                                                action.message
                                                            )
                                                        }
                                                        className="
                                                            rounded-full
                                                            border
                                                            border-slate-200
                                                            bg-white
                                                            px-3.5
                                                            py-2
                                                            text-xs
                                                            font-semibold
                                                            text-slate-700
                                                            transition
                                                            hover:border-brand-400
                                                            hover:text-brand-700
                                                            disabled:cursor-not-allowed
                                                            disabled:opacity-50
                                                        "
                                                    >
                                                        {
                                                            action.label
                                                        }
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}

                            {!showInquiryForm && (
                                <QuickActions
                                    actions={
                                        suggestedActions
                                    }
                                    disabled={
                                        isSending
                                    }
                                    onAction={
                                        handleAction
                                    }
                                />
                            )}

                            {showInquiryForm && (
                                <ChatInquiryForm
                                    messages={
                                        messages
                                    }
                                    conversationId={
                                        conversationId
                                    }
                                    onCancelAction={() =>
                                        setShowInquiryForm(
                                            false
                                        )
                                    }
                                    onSuccessAction={
                                        handleInquirySuccess
                                    }
                                />
                            )}

                            <div
                                ref={
                                    messagesEndRef
                                }
                            />
                        </div>
                    </div>

                    {/* Input */}
                    <div
                        className="
                            border-t
                            border-slate-200
                            bg-white
                            px-4 py-3
                            pb-[calc(0.75rem+env(safe-area-inset-bottom))]
                            sm:px-5
                            sm:pb-4
                        "
                    >
                        <form
                            onSubmit={
                                handleSubmit
                            }
                            className="
                                flex items-end
                                gap-2
                                rounded-2xl
                                border
                                border-slate-200
                                bg-slate-50
                                p-2
                                transition
                                focus-within:border-brand-500
                                focus-within:ring-4
                                focus-within:ring-brand-500/10
                            "
                        >
                            <textarea
                                ref={
                                    textAreaRef
                                }
                                value={
                                    input
                                }
                                onChange={(
                                    event
                                ) =>
                                    setInput(
                                        event.target.value
                                    )
                                }
                                onKeyDown={
                                    handleKeyDown
                                }
                                rows={1}
                                maxLength={
                                    1500
                                }
                                disabled={
                                    isSending ||
                                    showInquiryForm
                                }
                                placeholder={
                                    showInquiryForm
                                        ? "Complete or close the inquiry form to continue chatting."
                                        : "Ask about your Sri Lanka journey..."
                                }
                                aria-label="Message the travel assistant"
                                className="
                                    max-h-28
                                    min-h-10
                                    flex-1
                                    resize-none
                                    bg-transparent
                                    px-2 py-2
                                    text-sm
                                    leading-6
                                    text-slate-900
                                    outline-none
                                    placeholder:text-slate-400
                                    disabled:cursor-not-allowed
                                    disabled:opacity-60
                                "
                            />

                            <button
                                type="submit"
                                disabled={
                                    isSending ||
                                    showInquiryForm ||
                                    !input.trim()
                                }
                                aria-label="Send message"
                                className="
                                    flex size-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-brand-700
                                    text-white
                                    transition
                                    hover:bg-brand-800
                                    disabled:cursor-not-allowed
                                    disabled:opacity-45
                                "
                            >
                                {isSending ? (
                                    <LoaderCircle
                                        size={18}
                                        className="animate-spin"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <Send
                                        size={17}
                                        aria-hidden="true"
                                    />
                                )}
                            </button>
                        </form>

                        <p
                            className="
                                mt-2
                                text-center
                                text-[10px]
                                leading-4
                                text-slate-400
                            "
                        >
                            AI suggestions require final confirmation from our travel team.
                        </p>
                    </div>
                </section>
            )}

            {/* Launcher */}
            {!isOpen && (
                <button
                    type="button"
                    onClick={() =>
                        setIsOpen(true)
                    }
                    aria-label="Open Dream Ceylon Travel Assistant"
                    className="
                        group
                        fixed
                        bottom-[calc(5.75rem+env(safe-area-inset-bottom))]
                        right-4
                        z-[90]
                        inline-flex
                        min-h-14
                        items-center
                        gap-3
                        rounded-full
                        border
                        border-white/70
                        bg-brand-800
                        px-3.5
                        text-white
                        shadow-[0_16px_45px_rgba(0,80,75,0.28)]
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:bg-brand-900

                        sm:right-5
                        lg:bottom-5
                        lg:px-5
                    "
                >
                    <span
                        className="
                            relative
                            flex size-9
                            items-center
                            justify-center
                            rounded-full
                            bg-brand-gold
                            text-slate-900
                        "
                    >
                        <MessageCircle
                            size={20}
                            strokeWidth={1.9}
                            aria-hidden="true"
                        />

                        <span
                            className="
                                absolute
                                right-0 top-0
                                size-2.5
                                rounded-full
                                border-2
                                border-brand-800
                                bg-emerald-400
                            "
                            aria-hidden="true"
                        />
                    </span>

                    <span
                        className="
                            hidden
                            text-left
                            sm:block
                        "
                    >
                        <span
                            className="
                                block
                                text-xs
                                font-bold
                            "
                        >
                            Plan with AI
                        </span>

                        <span
                            className="
                                mt-0.5
                                flex items-center
                                gap-1
                                text-[10px]
                                text-white/65
                            "
                        >
                            <Sparkles
                                size={11}
                                aria-hidden="true"
                            />

                            Sri Lanka assistant
                        </span>
                    </span>
                </button>
            )}
        </>
    );
}