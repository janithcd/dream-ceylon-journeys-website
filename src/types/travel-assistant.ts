export type TravelChatRole =
    | "user"
    | "assistant";

export type TravelChatMessage = {
    id: string;
    role: TravelChatRole;
    content: string;
};

export type TravelChatHistoryItem = {
    role: TravelChatRole;
    content: string;
};

export type TravelChatAction = {
    id: string;
    label: string;

    type:
        | "anchor"
        | "external"
        | "internal";

    value: string;
};

export type TravelAssistantApiResponse = {
    success: boolean;

    conversationId?: string;

    reply?: string;

    message?: string;

    blocked?: boolean;

    suggestedActions?: TravelChatAction[];
};

export type StoredTravelConversationResponse = {
    success: boolean;

    conversationId?: string;

    status?: string;

    messageCount?: number;

    messages?: Array<{
        id: string;

        role:
            | "user"
            | "assistant";

        content: string;

        blocked?: boolean;

        createdAt?: string;
    }>;

    message?: string;
};