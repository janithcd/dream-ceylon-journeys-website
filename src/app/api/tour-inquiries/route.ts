import {
    NextResponse,
} from "next/server";

const CRM_API_URL = (
    process.env.CRM_API_URL ||
    "http://localhost:5000/api"
).replace(/\/+$/, "");

type TourInquiryRequest = {
    fullName?: unknown;
    email?: unknown;
    whatsappNumber?: unknown;
    country?: unknown;
    travelDate?: unknown;
    numberOfTravelers?: unknown;
    interestedPackage?: unknown;
    message?: unknown;
};

function getRequiredString(
    value: unknown
): string {
    return typeof value === "string"
        ? value.trim()
        : "";
}

function getOptionalString(
    value: unknown
): string {
    return typeof value === "string"
        ? value.trim()
        : "";
}

export async function POST(
    request: Request
) {
    try {
        const body =
            (await request.json()) as TourInquiryRequest;

        const fullName =
            getRequiredString(
                body.fullName
            );

        const email =
            getRequiredString(
                body.email
            );

        const whatsappNumber =
            getRequiredString(
                body.whatsappNumber
            );

        const country =
            getRequiredString(
                body.country
            );

        const interestedPackage =
            getRequiredString(
                body.interestedPackage
            );

        const message =
            getRequiredString(
                body.message
            );

        const travelDate =
            getOptionalString(
                body.travelDate
            );

        const numberOfTravelers =
            Number(
                body.numberOfTravelers
            );

        if (
            !fullName ||
            !email ||
            !whatsappNumber ||
            !country ||
            !interestedPackage ||
            !message
        ) {
            return NextResponse.json(
                {
                    message:
                        "Please complete all required fields.",
                },
                {
                    status: 400,
                }
            );
        }

        if (
            !Number.isFinite(
                numberOfTravelers
            ) ||
            numberOfTravelers < 1
        ) {
            return NextResponse.json(
                {
                    message:
                        "Number of travellers must be at least one.",
                },
                {
                    status: 400,
                }
            );
        }

        const crmPayload = {
            fullName,
            email,
            whatsappNumber,
            country,

            travelDate:
                travelDate || undefined,

            numberOfTravelers,

            interestedPackage,

            message,

            source:
                "Website",

            priority:
                "Medium",
        };

        const crmResponse =
            await fetch(
                `${CRM_API_URL}/public/inquiries`,
                {
                    method:
                        "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body:
                        JSON.stringify(
                            crmPayload
                        ),

                    cache:
                        "no-store",
                }
            );

        const responseData:
            unknown =
            await crmResponse
                .json()
                .catch(() => ({
                    message:
                        "The CRM returned an unreadable response.",
                }));

        if (!crmResponse.ok) {
            const crmMessage =
                typeof responseData ===
                "object" &&
                responseData !==
                null &&
                "message" in
                responseData &&
                typeof responseData.message ===
                "string"
                    ? responseData.message
                    : "The inquiry could not be submitted.";

            return NextResponse.json(
                {
                    message:
                    crmMessage,
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
                    "Your tour inquiry was submitted successfully.",

                inquiry:
                responseData,
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error(
            "[Tour Inquiry Proxy]",
            error
        );

        return NextResponse.json(
            {
                message:
                    "The inquiry service is temporarily unavailable. Please try again.",
            },
            {
                status: 502,
            }
        );
    }
}