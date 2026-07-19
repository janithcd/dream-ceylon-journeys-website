import {
    NextRequest,
    NextResponse,
} from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type InquiryRequestBody = {
    fullName?: unknown;
    email?: unknown;
    whatsappNumber?: unknown;
    country?: unknown;
    travelDate?: unknown;
    numberOfTravelers?: unknown;
    interestedPackage?: unknown;
    message?: unknown;
    chatConversationId?: unknown;
    website?: unknown;
};

type CRMInquiryResponse = {
    message?: string;
    error?: string;

    chatConversationLinked?: boolean;

    inquiry?: {
        _id?: string;
        fullName?: string;
        email?: string;
        status?: string;
        source?: string;
    };
};

const CRM_API_BASE_URL =
    (
        process.env.CRM_API_URL ??
        process.env.NEXT_PUBLIC_API_URL ??
        "http://127.0.0.1:5000/api"
    ).replace(/\/+$/, "");

const CHAT_CONVERSATION_ID_PATTERN =
    /^dcj_[a-f0-9]{32}$/i;

function cleanText(
    value: unknown,
    maximumLength: number
): string {
    return String(value ?? "")
        .replace(/\u0000/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, maximumLength);
}

function cleanMultilineText(
    value: unknown,
    maximumLength: number
): string {
    return String(value ?? "")
        .replace(/\u0000/g, "")
        .trim()
        .slice(0, maximumLength);
}

function isValidEmail(
    email: string
): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
    );
}

function normalizeTravelers(
    value: unknown
): number {
    const number =
        Number(value);

    if (!Number.isFinite(number)) {
        return 1;
    }

    return Math.min(
        Math.max(
            Math.trunc(number),
            1
        ),
        50
    );
}

export async function POST(
    request: NextRequest
) {
    let body: InquiryRequestBody;

    try {
        body =
            (await request.json()) as
                InquiryRequestBody;
    } catch {
        return NextResponse.json(
            {
                message:
                    "Invalid request data.",
            },
            {
                status: 400,
            }
        );
    }

    /*
     * Honeypot protection.
     * Accept the request quietly without
     * sending spam to the CRM.
     */
    if (
        cleanText(
            body.website,
            200
        )
    ) {
        return NextResponse.json(
            {
                message:
                    "Your inquiry has been submitted successfully.",
            },
            {
                status: 201,
            }
        );
    }

    const fullName =
        cleanText(
            body.fullName,
            120
        );

    const email =
        cleanText(
            body.email,
            160
        ).toLowerCase();

    const whatsappNumber =
        cleanText(
            body.whatsappNumber,
            40
        );

    const country =
        cleanText(
            body.country,
            100
        );

    const travelDate =
        cleanText(
            body.travelDate,
            20
        );

    const interestedPackage =
        cleanText(
            body.interestedPackage,
            50
        );

    const message =
        cleanMultilineText(
            body.message,
            3000
        );

    const numberOfTravelers =
        normalizeTravelers(
            body.numberOfTravelers
        );

    const chatConversationId =
        cleanText(
            body.chatConversationId,
            50
        );

    if (!fullName) {
        return NextResponse.json(
            {
                message:
                    "Please enter your full name.",
            },
            {
                status: 400,
            }
        );
    }

    if (
        !email ||
        !isValidEmail(email)
    ) {
        return NextResponse.json(
            {
                message:
                    "Please enter a valid email address.",
            },
            {
                status: 400,
            }
        );
    }

    if (!whatsappNumber) {
        return NextResponse.json(
            {
                message:
                    "Please enter your WhatsApp or phone number.",
            },
            {
                status: 400,
            }
        );
    }

    if (!country) {
        return NextResponse.json(
            {
                message:
                    "Please enter your country.",
            },
            {
                status: 400,
            }
        );
    }

    if (message.length < 10) {
        return NextResponse.json(
            {
                message:
                    "Please provide a little more information about your journey.",
            },
            {
                status: 400,
            }
        );
    }

    if (
        chatConversationId &&
        !CHAT_CONVERSATION_ID_PATTERN.test(
            chatConversationId
        )
    ) {
        return NextResponse.json(
            {
                message:
                    "The linked chat conversation is invalid. Please refresh the page and try again.",
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
            30_000
        );

    try {
        const crmResponse =
            await fetch(
                `${CRM_API_BASE_URL}/inquiries`,
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
                            fullName,
                            email,
                            whatsappNumber,
                            country,

                            travelDate:
                                travelDate ||
                                null,

                            numberOfTravelers,

                            interestedPackage:
                                interestedPackage ||
                                null,

                            message,

                            chatConversationId:
                                chatConversationId ||
                                undefined,

                            /*
                             * These values are controlled
                             * by the website server.
                             */
                            status: "New",
                            priority:
                                "Medium",
                            source:
                                "Website",
                            adminNotes: "",
                        }),

                    cache: "no-store",

                    signal:
                    controller.signal,
                }
            );

        const responseText =
            await crmResponse.text();

        let responseData:
            CRMInquiryResponse =
            {};

        if (responseText) {
            try {
                responseData =
                    JSON.parse(
                        responseText
                    ) as CRMInquiryResponse;
            } catch {
                responseData = {
                    message:
                    responseText,
                };
            }
        }

        if (!crmResponse.ok) {
            console.error(
                "[Inquiry Proxy]",
                crmResponse.status,
                responseData
            );

            return NextResponse.json(
                {
                    message:
                        responseData.message ||
                        responseData.error ||
                        "The inquiry could not be submitted.",
                },
                {
                    status:
                    crmResponse.status,
                }
            );
        }

        return NextResponse.json(
            {
                message:
                    responseData.message ||
                    "Thank you. Your inquiry has been submitted successfully.",

                chatConversationLinked:
                    Boolean(
                        responseData.chatConversationLinked
                    ),
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        if (
            error instanceof Error &&
            error.name === "AbortError"
        ) {
            return NextResponse.json(
                {
                    message:
                        "The inquiry request took too long. Please try again.",
                },
                {
                    status: 504,
                }
            );
        }

        console.error(
            "[Inquiry Proxy] CRM connection failed",
            error
        );

        return NextResponse.json(
            {
                message:
                    "We could not connect to our inquiry service. Please try again shortly or contact us on WhatsApp.",
            },
            {
                status: 503,
            }
        );
    } finally {
        clearTimeout(timeoutId);
    }
}