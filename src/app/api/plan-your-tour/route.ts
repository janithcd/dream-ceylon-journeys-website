import {
    NextResponse,
} from "next/server";

export const runtime =
    "nodejs";

const CRM_API_URL = (
    process.env.CRM_API_URL ||
    "http://localhost:5000/api"
).replace(/\/+$/, "");

type PlanTourRequest = {
    fullName?: unknown;
    email?: unknown;
    whatsappNumber?: unknown;
    country?: unknown;

    arrivalDate?: unknown;
    departureDate?: unknown;

    adults?: unknown;
    children?: unknown;

    preferredPackageId?: unknown;
    preferredPackageName?: unknown;

    preferredVehicleId?: unknown;
    preferredVehicleName?: unknown;

    destinations?: unknown;

    travelStyle?: unknown;
    budgetLevel?: unknown;
    accommodation?: unknown;
    referralSource?: unknown;

    message?: unknown;
};

function getString(
    value: unknown
): string {
    return typeof value ===
    "string"
        ? value.trim()
        : "";
}

function getStringArray(
    value: unknown
): string[] {
    if (!Array.isArray(value)) {
        return [];
    }

    return value
        .map((item) =>
            getString(item)
        )
        .filter(Boolean);
}

function getNonNegativeInteger(
    value: unknown,
    fallback = 0
): number {
    const number =
        Number(value);

    if (
        !Number.isFinite(number) ||
        number < 0
    ) {
        return fallback;
    }

    return Math.floor(number);
}

function isMongoObjectId(
    value: string
): boolean {
    return /^[a-f\d]{24}$/i.test(
        value
    );
}

function getResponseMessage(
    value: unknown
): string {
    if (
        typeof value ===
        "object" &&
        value !== null &&
        "message" in value &&
        typeof value.message ===
        "string"
    ) {
        return value.message;
    }

    return "";
}

export async function POST(
    request: Request
) {
    try {
        const body =
            (await request.json()) as PlanTourRequest;

        const fullName =
            getString(
                body.fullName
            );

        const email =
            getString(
                body.email
            );

        const whatsappNumber =
            getString(
                body.whatsappNumber
            );

        const country =
            getString(
                body.country
            );

        const arrivalDate =
            getString(
                body.arrivalDate
            );

        const departureDate =
            getString(
                body.departureDate
            );

        const adults =
            Math.max(
                getNonNegativeInteger(
                    body.adults,
                    1
                ),
                1
            );

        const children =
            getNonNegativeInteger(
                body.children
            );

        const numberOfTravelers =
            adults + children;

        const preferredPackageId =
            getString(
                body.preferredPackageId
            );

        const preferredPackageName =
            getString(
                body.preferredPackageName
            );

        const preferredVehicleId =
            getString(
                body.preferredVehicleId
            );

        const preferredVehicleName =
            getString(
                body.preferredVehicleName
            );

        const destinations =
            getStringArray(
                body.destinations
            );

        const travelStyle =
            getString(
                body.travelStyle
            );

        const budgetLevel =
            getString(
                body.budgetLevel
            );

        const accommodation =
            getString(
                body.accommodation
            );

        const referralSource =
            getString(
                body.referralSource
            );

        const customerMessage =
            getString(
                body.message
            );

        if (
            !fullName ||
            !email ||
            !whatsappNumber ||
            !country
        ) {
            return NextResponse.json(
                {
                    message:
                        "Please complete your name, email, WhatsApp number and country.",
                },
                {
                    status: 400,
                }
            );
        }

        if (!arrivalDate) {
            return NextResponse.json(
                {
                    message:
                        "Please select your expected arrival date.",
                },
                {
                    status: 400,
                }
            );
        }

        if (
            departureDate &&
            new Date(
                departureDate
            ).getTime() <
            new Date(
                arrivalDate
            ).getTime()
        ) {
            return NextResponse.json(
                {
                    message:
                        "Departure date cannot be earlier than the arrival date.",
                },
                {
                    status: 400,
                }
            );
        }

        const structuredMessage = [
            "PLAN YOUR TOUR INQUIRY",
            "",
            "TRAVEL DETAILS",
            `Arrival date: ${arrivalDate}`,
            `Departure date: ${
                departureDate ||
                "Not confirmed"
            }`,
            `Travellers: ${numberOfTravelers}`,
            `Adults: ${adults}`,
            `Children: ${children}`,
            "",
            "TOUR PREFERENCES",
            `Preferred package: ${
                preferredPackageName ||
                "Custom private tour"
            }`,
            `Preferred vehicle: ${
                preferredVehicleName ||
                "Please recommend"
            }`,
            `Destinations: ${
                destinations.length > 0
                    ? destinations.join(
                        ", "
                    )
                    : "Open to recommendations"
            }`,
            `Travel style: ${
                travelStyle ||
                "Not specified"
            }`,
            `Budget level: ${
                budgetLevel ||
                "Not specified"
            }`,
            `Accommodation: ${
                accommodation ||
                "Not specified"
            }`,
            "",
            `How they found us: ${
                referralSource ||
                "Not specified"
            }`,
            "",
            "CUSTOMER REQUIREMENTS",
            customerMessage ||
            "No additional requirements provided.",
            preferredVehicleId
                ? ""
                : null,
            preferredVehicleId
                ? `Vehicle reference: ${preferredVehicleId}`
                : null,
        ]
            .filter(
                (
                    line
                ): line is string =>
                    line !== null
            )
            .join("\n");

        const crmPayload = {
            fullName,
            email,
            whatsappNumber,
            country,

            travelDate:
            arrivalDate,

            numberOfTravelers,

            interestedPackage:
                isMongoObjectId(
                    preferredPackageId
                )
                    ? preferredPackageId
                    : undefined,

            message:
            structuredMessage,

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

                        Accept:
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
                .catch(
                    () => ({})
                );

        if (!crmResponse.ok) {
            return NextResponse.json(
                {
                    message:
                        getResponseMessage(
                            responseData
                        ) ||
                        "Your tour request could not be submitted.",
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
                    "Your Sri Lanka tour request was submitted successfully.",

                inquiry:
                responseData,
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error(
            "[Plan Your Tour API]",
            error
        );

        return NextResponse.json(
            {
                message:
                    "The enquiry service is temporarily unavailable. Please try again.",
            },
            {
                status: 502,
            }
        );
    }
}