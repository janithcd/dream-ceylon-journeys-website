import {
    NextRequest,
    NextResponse,
} from "next/server";

import type {
    StoredTravelConversationResponse,
} from "@/types/travel-assistant";

export const runtime = "nodejs";
export const dynamic =
    "force-dynamic";

const CRM_API_BASE_URL =
    (
        process.env.CRM_API_URL ??
        process.env
            .NEXT_PUBLIC_API_URL ??
        "http://127.0.0.1:5000/api"
    ).replace(/\/+$/, "");

const CONVERSATION_ID_PATTERN =
    /^dcj_[a-f0-9]{32}$/i;

type RouteContext = {
    params: Promise<{
        conversationId: string;
    }>;
};

export async function GET(
    _request: NextRequest,
    context: RouteContext
) {
    const {
        conversationId,
    } = await context.params;

    if (
        !CONVERSATION_ID_PATTERN.test(
            conversationId
        )
    ) {
        return NextResponse.json(
            {
                success: false,

                message:
                    "Invalid conversation ID.",
            },
            {
                status: 400,
            }
        );
    }

    try {
        const response =
            await fetch(
                `${CRM_API_BASE_URL}/public/travel-assistant/conversation/${encodeURIComponent(
                    conversationId
                )}`,
                {
                    method: "GET",

                    headers: {
                        Accept:
                            "application/json",
                    },

                    cache: "no-store",
                }
            );

        const data =
            (await response.json()) as
                StoredTravelConversationResponse;

        if (!response.ok) {
            return NextResponse.json(
                {
                    success: false,

                    message:
                        data.message ||
                        "Conversation not found.",
                },
                {
                    status:
                    response.status,
                }
            );
        }

        return NextResponse.json(
            data,
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(
            "[Conversation Restore Proxy]",
            error
        );

        return NextResponse.json(
            {
                success: false,

                message:
                    "Unable to restore the conversation.",
            },
            {
                status: 503,
            }
        );
    }
}