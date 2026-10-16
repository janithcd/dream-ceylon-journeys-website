import type { Metadata } from "next";
import { LegalPolicyPage, type PolicySection } from "@/components/legal/LegalPolicyPage";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Learn how Dream Ceylon Journeys handles customer enquiries, personal information, tour booking details and payments.",
    alternates: { canonical: "/privacy" },
    openGraph: { title: "Privacy Policy | Dream Ceylon Journeys", url: "/privacy", type: "website" },
};

const sections: PolicySection[] = [
    {
        heading: "1. Who we are",
        paragraphs: [
            "Dream Ceylon Journeys is a Sri Lanka-based travel service business offering private tours, transport, airport transfers and customised itineraries. This policy describes how we handle personal information when you use our website or contact us about our services."
        ],
    },
    {
        heading: "2. Information we collect",
        paragraphs: [
            "We may collect information you provide in website forms, emails, messages, phone calls and booking conversations, including:",
        ],
        points: [
            "Your name, email address, telephone number, country of residence and preferred contact method.",
            "Travel dates, arrival and departure information, group size, accommodation choices, itinerary preferences and special requests you choose to share.",
            "Booking and transaction information, including amounts, payment status and payment references.",
            "Identity or passport details only where reasonably necessary to arrange a confirmed service such as transport tickets or accommodation.",
            "Technical data such as IP address, browser information and server logs that may be collected when the website is used."
        ],
    },
    {
        heading: "3. Why we use information",
        points: [
            "To respond to enquiries, prepare quotations and plan or deliver travel arrangements.",
            "To communicate about reservations, changes, payments, safety and customer support.",
            "To coordinate with relevant accommodation providers, guides, transport operators or ticketing partners.",
            "To maintain our website, protect against fraud or misuse, and comply with applicable legal and accounting duties."
        ],
    },
    {
        heading: "4. Payment information",
        paragraphs: [
            "When you use an available third-party payment service, payment card details are processed by the payment provider through its own secure systems. We receive the transaction information needed to identify and manage your booking and payment. Please do not send sensitive payment card details through email or messaging apps."
        ],
    },
    {
        heading: "5. Sharing and international transfers",
        paragraphs: [
            "We share only the information reasonably required to deliver your requested travel service with relevant hotels, guides, transport operators, ticketing providers, payment processors and technical service providers. Your details may also be disclosed if required by law or lawful government request.",
            "Because guests and service partners may be located in different countries, some information may be processed or accessed across borders as needed to arrange your journey. We do not sell customer personal information."
        ],
    },
    {
        heading: "6. Security and retention",
        paragraphs: [
            "We take reasonable organisational and technical steps to protect information against unauthorised access, loss and misuse. No website or electronic communication method can guarantee absolute security.",
            "We keep personal information only as long as reasonably necessary for the purpose for which it was collected, handling disputes, or meeting legal, tax and record-keeping obligations, after which it is deleted or securely disposed of when feasible."
        ],
    },
    {
        heading: "7. Cookies and website functionality",
        paragraphs: [
            "Our website and hosting providers may use essential cookies or similar technologies to operate the website, maintain sessions, improve reliability and help protect against misuse. Your browser settings may allow you to manage or block cookies; doing so may affect some website features."
        ],
    },
    {
        heading: "8. Your privacy requests",
        paragraphs: [
            "You may contact us to request access to, correction of or deletion of personal information we hold about you, subject to applicable laws and any information we must retain for legitimate business or legal reasons.",
            "If you provide another traveler's personal information to us, please ensure you have permission to share it for the requested travel arrangements."
        ],
    },
    {
        heading: "9. Updates and contact",
        paragraphs: [
            "We may update this privacy policy as our services and legal obligations change. The current version and its date will be shown on this page. For privacy questions, email info@dreamceylonjourneys.com."
        ],
    },
];

export default function PrivacyPage() {
    return (
        <LegalPolicyPage
            eyebrow="Your information"
            title="Privacy Policy"
            description="How we use and safeguard the information you share while planning your Sri Lanka holiday."
            updated="16 October 2026"
            sections={sections}
        />
    );
}
