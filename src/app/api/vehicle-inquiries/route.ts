import {
    NextResponse,
} from "next/server";

const CRM_API_URL = (
    process.env.CRM_API_URL ||
    "http://localhost:5000/api"
).replace(/\/+$/, "");

type VehicleInquiryRequest = {
    fullName?: unknown;
    email?: unknown;
    whatsappNumber?: unknown;
    country?: unknown;
    travelDate?: unknown;
    numberOfTravelers?: unknown;

    vehicleId?: unknown;
    vehicleName?: unknown;
    vehicleType?: unknown;

    message?: unknown;
};

function getString(
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
            (await request.json()) as VehicleInquiryRequest;

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

        const travelDate =
            getString(
                body.travelDate
            );

        const vehicleId =
            getString(
                body.vehicleId
            );

        const vehicleName =
            getString(
                body.vehicleName
            );

        const vehicleType =
            getString(
                body.vehicleType
            );

        const customerMessage =
            getString(
                body.message
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
            !vehicleName ||
            !customerMessage
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

        const message = [
            "Vehicle Inquiry",
            "",
            `Selected vehicle: ${vehicleName}`,
            `Vehicle type: ${vehicleType || "Private vehicle"}`,
            vehicleId
                ? `Vehicle reference: ${vehicleId}`
                : "",
            "",
            "Customer message:",
            customerMessage,
        ]
            .filter(Boolean)
            .join("\n");

        const crmPayload = {
            fullName,
            email,
            whatsappNumber,
            country,

            travelDate:
                travelDate ||
                undefined,

            numberOfTravelers,

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
                    : "The vehicle inquiry could not be submitted.";

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
                    "Your vehicle inquiry was submitted successfully.",

                inquiry:
                responseData,
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error(
            "[Vehicle Inquiry Proxy]",
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