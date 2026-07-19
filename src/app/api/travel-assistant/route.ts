import {
    NextRequest,
    NextResponse,
} from "next/server";

import type {
    TravelAssistantApiResponse,
    TravelChatHistoryItem,
} from "@/types/travel-assistant";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CRM_API_BASE_URL =
    (
        process.env.CRM_API_URL ??
        process.env.NEXT_PUBLIC_API_URL ??
        "http://127.0.0.1:5000/api"
    ).replace(/\/+$/, "");

type IncomingChatRequest = {
    message?: unknown;
    history?: unknown;
    website?: unknown;
    conversationId?: unknown;
};

function cleanText(
    value: unknown,
    maximumLength: number
): string {
    return String(value ?? "")
        .replace(/\u0000/g, "")
        .trim()
        .slice(0, maximumLength);
}

function normalizeHistory(
    value: unknown
): TravelChatHistoryItem[] {
    if (!Array.isArray(value)) {
        return [];
    }

    return value
        .filter(
            (
                item
            ): item is Record<
                string,
                unknown
            > =>
                Boolean(
                    item &&
                    typeof item ===
                    "object"
                )
        )
        .map((item) => {
            const role =
                item.role === "assistant"
                    ? "assistant"
                    : item.role === "user"
                        ? "user"
                        : null;

            const content =
                cleanText(
                    item.content,
                    1200
                );

            if (!role || !content) {
                return null;
            }

            return {
                role,
                content,
            } satisfies TravelChatHistoryItem;
        })
        .filter(
            (
                item
            ): item is TravelChatHistoryItem =>
                item !== null
        )
        .slice(-8);
}

export async function POST(
    request: NextRequest
) {
    let body: IncomingChatRequest;

    try {
        body =
            (await request.json()) as
                IncomingChatRequest;
    } catch {
        return NextResponse.json(
            {
                success: false,
                message:
                    "Invalid chat request.",
            },
            {
                status: 400,
            }
        );
    }

    /*
     * Honeypot protection.
     * Normal website visitors never
     * complete this hidden field.
     */
    if (
        cleanText(
            body.website,
            200
        )
    ) {
        return NextResponse.json(
            {
                success: true,
                reply:
                    "Thank you for your message.",
                suggestedActions: [],
            },
            {
                status: 200,
            }
        );
    }

    const message =
        cleanText(
            body.message,
            1500
        );

    const history =
        normalizeHistory(
            body.history
        );

    const conversationId =
        cleanText(
            body.conversationId,
            50
        );

    if (!message) {
        return NextResponse.json(
            {
                success: false,
                message:
                    "Please enter a message.",
            },
            {
                status: 400,
            }
        );
    }

    if (message.length < 2) {
        return NextResponse.json(
            {
                success: false,
                message:
                    "Please enter a complete question.",
            },
            {
                status: 400,
            }
        );
    }

    const controller =
        new AbortController();

    const timeoutId =
        setTimeout(
            () =>
                controller.abort(),
            45_000
        );

    try {
        const crmResponse =
            await fetch(
                `${CRM_API_BASE_URL}/public/travel-assistant/chat`,
                {
                    method: "POST",

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

                            conversationId:
                                conversationId ||
                                undefined,
                        }),

                    cache: "no-store",

                    signal:
                    controller.signal,
                }
            );

        const responseText =
            await crmResponse.text();

        let responseData:
            TravelAssistantApiResponse =
            {
                success: false,
            };

        if (responseText) {
            try {
                responseData =
                    JSON.parse(
                        responseText
                    ) as TravelAssistantApiResponse;
            } catch {
                responseData = {
                    success: false,
                    message:
                    responseText,
                };
            }
        }

        if (!crmResponse.ok) {
            console.error(
                "[Travel Assistant Proxy]",
                crmResponse.status,
                responseData
            );

            return NextResponse.json(
                {
                    success: false,

                    message:
                        responseData.message ||
                        "The travel assistant is temporarily unavailable.",
                },
                {
                    status:
                    crmResponse.status,
                }
            );
        }

        if (
            !responseData.success ||
            !responseData.reply?.trim()
        ) {
            console.error(
                "[Travel Assistant Proxy] Invalid CRM response",
                responseData
            );

            return NextResponse.json(
                {
                    success: false,

                    message:
                        responseData.message ||
                        "The travel assistant returned an invalid response.",
                },
                {
                    status: 502,
                }
            );
        }

        return NextResponse.json(
            {
                success: true,

                conversationId:
                responseData.conversationId,

                reply:
                responseData.reply,

                blocked:
                    Boolean(
                        responseData.blocked
                    ),

                suggestedActions:
                    Array.isArray(
                        responseData.suggestedActions
                    )
                        ? responseData.suggestedActions
                        : [],
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        if (
            error instanceof Error &&
            error.name === "AbortError"
        ) {
            return NextResponse.json(
                {
                    success: false,

                    message:
                        "The travel assistant took too long to respond. Please try again.",
                },
                {
                    status: 504,
                }
            );
        }

        console.error(
            "[Travel Assistant Proxy] CRM connection failed",
            error
        );

        return NextResponse.json(
            {
                success: false,

                message:
                    "We could not connect to the travel assistant. Please try again or contact us on WhatsApp.",
            },
            {
                status: 503,
            }
        );
    } finally {
        clearTimeout(timeoutId);
    }
}