import type { Metadata } from "next";
import { LegalPolicyPage, type PolicySection } from "@/components/legal/LegalPolicyPage";

export const metadata: Metadata = {
    title: "Terms & Conditions",
    description: "Terms for enquiring, booking and paying for private tours, transport and custom Sri Lanka journeys with Dream Ceylon Journeys.",
    alternates: { canonical: "/terms" },
    openGraph: { title: "Terms & Conditions | Dream Ceylon Journeys", url: "/terms", type: "website" },
};

const sections: PolicySection[] = [
    {
        heading: "1. About our travel services",
        paragraphs: [
            "Dream Ceylon Journeys provides private Sri Lanka travel planning, chauffeur-guided transport, airport transfers, day trips and tailor-made multi-day tours. These terms apply to use of our website and bookings made directly with us.",
            "Our travel services are delivered on the travel date or dates agreed in your booking confirmation. We do not ship physical products."
        ],
    },
    {
        heading: "2. Enquiries, quotations and confirmation",
        paragraphs: [
            "Website descriptions, sample routes and indicative starting prices are for planning purposes. A request or enquiry is not a confirmed booking. We will confirm the selected service, travel dates, passengers, inclusions, exclusions, total price, currency, any required deposit, and any special booking conditions in writing.",
            "Availability and quotations may change before confirmation. A booking is confirmed once we explicitly accept it and any agreed prepayment or other confirmation requirement has been completed."
        ],
    },
    {
        heading: "3. Prices, payments and receipts",
        paragraphs: [
            "Final tour prices depend on the route, date, duration, vehicle, group size, accommodation, selected activities and other agreed requirements. Costs such as entrance fees, accommodation, meals, excess mileage and third-party activities are included only if the written quotation expressly says so.",
            "The agreed quotation or invoice will show applicable currency, payment amount and due dates. When online card payment is offered, a third-party payment service handles the transaction. We will provide confirmation or a receipt for accepted payments.",
            "Please check the quotation before paying and contact us if any fee or inclusion is unclear."
        ],
    },
    {
        heading: "4. Changes, cancellations and refunds",
        paragraphs: [
            "Please request itinerary or booking changes as early as possible. Changes are subject to availability and any additional charges that we communicate before you approve them.",
            "Cancellation charges, supplier conditions and eligible refunds depend on the specific booking terms disclosed before payment. Please review our Refund & Cancellation Policy at https://www.dreamceylonjourneys.com/refund-policy for how to submit requests and how approved refunds are processed back to the original payment method."
        ],
    },
    {
        heading: "5. Guests' responsibilities",
        points: [
            "Provide accurate traveler details, arrival information and any information needed to fulfil confirmed services.",
            "Check passport, visa, insurance and other entry or travel requirements relevant to your trip.",
            "Arrive at meeting points on time and follow reasonable safety instructions from service providers.",
            "Tell us promptly about schedule changes, delays, accessibility needs and other requirements that may affect your booking."
        ],
    },
    {
        heading: "6. Itinerary delivery and third-party services",
        paragraphs: [
            "Travel times and routes are estimates and may change due to weather, traffic, safety concerns, site closures, public events or other circumstances beyond our reasonable control. We will communicate material changes and try to arrange suitable alternatives.",
            "Hotels, train operators, activity providers and other independent suppliers may have their own availability rules, schedules and cancellation conditions. Where relevant, we will explain material supplier terms before confirmation."
        ],
    },
    {
        heading: "7. Website content and acceptable use",
        paragraphs: [
            "The text, images, branding and other material on this site belong to Dream Ceylon Journeys or their respective owners and may not be republished without permission. You agree not to misuse the site, submit misleading booking details or interfere with its operation."
        ],
    },
    {
        heading: "8. Problems and support",
        paragraphs: [
            "If any part of your confirmed service does not meet what was agreed, contact us promptly so we have an opportunity to investigate and help. Nothing in these terms excludes any consumer rights or remedies that cannot legally be excluded.",
            "For booking questions, payment concerns or complaints, contact info@dreamceylonjourneys.com. We may update these website terms from time to time; any specific terms already agreed for a confirmed booking remain subject to the agreement made with you."
        ],
    },
];

export default function TermsPage() {
    return (
        <LegalPolicyPage
            eyebrow="Travel with clarity"
            title="Terms & Conditions"
            description="Important information about our private tours, bookings, payments and travel services."
            updated="16 October 2026"
            sections={sections}
        />
    );
}
