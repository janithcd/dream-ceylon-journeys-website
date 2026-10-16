import type { Metadata } from "next";
import { LegalPolicyPage, type PolicySection } from "@/components/legal/LegalPolicyPage";

export const metadata: Metadata = {
    title: "Refund & Cancellation Policy",
    description: "Read the cancellation, changes and payment refund policy for Dream Ceylon Journeys private tours and transport services in Sri Lanka.",
    alternates: { canonical: "/refund-policy" },
    openGraph: { title: "Refund & Cancellation Policy | Dream Ceylon Journeys", url: "/refund-policy", type: "website" },
};

const sections: PolicySection[] = [
    {
        heading: "1. Scope of this policy",
        paragraphs: [
            "This policy applies to bookings made directly with Dream Ceylon Journeys for Sri Lanka private tours, chauffeur-guided transportation, airport transfers and tailor-made arrangements. Travel services are supplied on the agreed travel date or dates; no physical goods are shipped.",
            "Because tours are customised, the cancellation deadlines and any special supplier conditions will be explained in your written quotation or booking confirmation before you make a required payment. Please review these conditions carefully."
        ],
    },
    {
        heading: "2. Booking and payment",
        paragraphs: [
            "An enquiry or draft itinerary does not by itself confirm a reservation. We confirm the services, travel dates, agreed price, inclusions and any payment schedule in writing.",
            "Transport-only bookings may be offered without an advance payment where explicitly confirmed by our team. Hotel-inclusive tours, train tickets, entrance tickets, guides and other third-party services may require a deposit or advance payment, depending on the quotation."
        ],
    },
    {
        heading: "3. Customer cancellations",
        paragraphs: [
            "To request cancellation, email us with your booking reference or the name, travel dates and contact details used for the booking. We will acknowledge your request and explain the refund calculation.",
            "Any cancellation fees or non-refundable amounts depend on the specific booking terms disclosed before payment and on costs already committed to external suppliers such as hotels, transport providers, ticketing agents or specialist guides. Where applicable, we will identify those charges and the remaining refundable amount.",
            "If you have not yet paid any amount to Dream Ceylon Journeys, there is no payment for us to refund. Please contact us before paying if any cancellation deadline or charge is unclear."
        ],
    },
    {
        heading: "4. Changes to a confirmed booking",
        paragraphs: [
            "Please contact us as early as possible if you need to change dates, passenger numbers, accommodation, routes or activities. We will advise what is available and disclose any additional cost, price difference or supplier cancellation charge before proceeding.",
            "Requested changes are not guaranteed and become effective only when confirmed in writing."
        ],
    },
    {
        heading: "5. If we cancel or cannot provide a service",
        paragraphs: [
            "If Dream Ceylon Journeys cancels a paid service that we cannot provide, we will offer a suitable alternative for your agreement or refund the amount paid for the cancelled service, subject to your applicable legal rights.",
            "Weather, road conditions, national-park closures, train changes and other events outside our control may require itinerary adjustments. We will discuss reasonable alternatives and any recoverable refunds for unprovided services with you."
        ],
    },
    {
        heading: "6. How approved refunds are paid",
        paragraphs: [
            "Approved refunds will be issued to the same payment method or payment-initiated medium originally used for the transaction. For example, a payment made by card through an online payment gateway will be refunded back through the original payment channel, not as cash or to an unrelated account.",
            "After reviewing a request, we will explain the approved refund amount and arrange processing without unreasonable delay. The time taken for the funds to appear depends on the original payment method, issuing bank and payment provider. Any non-refundable third-party charges will be explained in accordance with the terms disclosed for your booking and applicable law."
        ],
    },
    {
        heading: "7. Contact for cancellation and refund requests",
        paragraphs: [
            "Send your request to info@dreamceylonjourneys.com, including your full name, booking dates, service booked, proof of payment if available, and the reason for the request. Do not send full card numbers, CVV codes or passwords.",
            "This policy does not limit any rights you may have under applicable consumer protection laws."
        ],
    },
];

export default function RefundPolicyPage() {
    return (
        <LegalPolicyPage
            eyebrow="Booking confidence"
            title="Refund & Cancellation Policy"
            description="Clear information about changes, cancellations and refunds for your private Sri Lanka journey."
            updated="16 October 2026"
            sections={sections}
        />
    );
}
