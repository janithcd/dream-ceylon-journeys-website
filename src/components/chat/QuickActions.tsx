import {
    ArrowUpRight,
    Send,
} from "lucide-react";

import type {
    TravelChatAction,
} from "@/types/travel-assistant";

type QuickActionsProps = {
    actions: TravelChatAction[];
    disabled?: boolean;
    onAction: (
        action: TravelChatAction
    ) => void;
};

export function QuickActions({
                                 actions,
                                 disabled = false,
                                 onAction,
                             }: QuickActionsProps) {
    if (actions.length === 0) {
        return null;
    }

    return (
        <div
            className="
                flex flex-wrap
                gap-2
            "
        >
            {actions.map(
                (action) => {
                    const isInquiryAction =
                        action.type ===
                        "internal" &&
                        action.value ===
                        "create-inquiry";

                    return (
                        <button
                            key={
                                action.id
                            }
                            type="button"
                            disabled={
                                disabled
                            }
                            onClick={() =>
                                onAction(
                                    action
                                )
                            }
                            className={[
                                `
                                    inline-flex
                                    min-h-9
                                    items-center
                                    gap-1.5
                                    rounded-full
                                    px-3.5
                                    text-xs
                                    font-semibold
                                    transition
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                `,
                                isInquiryAction
                                    ? `
                                        border border-brand-700
                                        bg-brand-700
                                        text-white
                                        hover:bg-brand-800
                                    `
                                    : `
                                        border border-slate-200
                                        bg-white
                                        text-slate-700
                                        hover:border-brand-400
                                        hover:text-brand-700
                                    `,
                            ].join(
                                " "
                            )}
                        >
                            {isInquiryAction && (
                                <Send
                                    size={13}
                                    aria-hidden="true"
                                />
                            )}

                            {action.label}

                            {action.type ===
                                "external" && (
                                    <ArrowUpRight
                                        size={13}
                                        aria-hidden="true"
                                    />
                                )}
                        </button>
                    );
                }
            )}
        </div>
    );
}