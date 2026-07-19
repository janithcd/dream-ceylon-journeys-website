import {
    Bot,
    UserRound,
} from "lucide-react";

import type {
    TravelChatMessage,
} from "@/types/travel-assistant";

type ChatMessageProps = {
    message: TravelChatMessage;
};

export function ChatMessage({
                                message,
                            }: ChatMessageProps) {
    const isAssistant =
        message.role ===
        "assistant";

    return (
        <div
            className={[
                "flex w-full gap-3",
                isAssistant
                    ? "justify-start"
                    : "justify-end",
            ].join(" ")}
        >
            {isAssistant && (
                <div
                    className="
                        mt-1
                        flex size-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-brand-100
                        text-brand-700
                    "
                    aria-hidden="true"
                >
                    <Bot
                        size={17}
                        strokeWidth={1.8}
                    />
                </div>
            )}

            <div
                className={[
                    "max-w-[84%]",
                    "rounded-2xl",
                    "px-4 py-3",
                    "text-sm leading-6",
                    "whitespace-pre-wrap",
                    "break-words",
                    isAssistant
                        ? [
                            "rounded-tl-md",
                            "border border-slate-200",
                            "bg-white",
                            "text-slate-700",
                            "shadow-sm",
                        ].join(" ")
                        : [
                            "rounded-tr-md",
                            "bg-brand-700",
                            "text-white",
                        ].join(" "),
                ].join(" ")}
            >
                {message.content}
            </div>

            {!isAssistant && (
                <div
                    className="
                        mt-1
                        flex size-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-slate-200
                        text-slate-600
                    "
                    aria-hidden="true"
                >
                    <UserRound
                        size={16}
                        strokeWidth={1.8}
                    />
                </div>
            )}
        </div>
    );
}