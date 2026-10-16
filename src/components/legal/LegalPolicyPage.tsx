import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Mail, ShieldCheck } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";

export type PolicySection = {
    heading: string;
    paragraphs?: string[];
    points?: string[];
};

type LegalPolicyPageProps = {
    eyebrow: string;
    title: string;
    description: string;
    updated: string;
    sections: PolicySection[];
};

const otherPolicies = [
    { label: "Refund & Cancellation Policy", href: "/refund-policy" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
];

export function LegalPolicyPage({
    eyebrow,
    title,
    description,
    updated,
    sections,
}: LegalPolicyPageProps) {
    return (
        <main className="min-h-screen bg-sand-50">
            <header className="relative overflow-hidden bg-brand-950 pt-36 pb-20 text-white sm:pt-44 sm:pb-24">
                <div aria-hidden="true" className="absolute -right-20 -top-20 size-96 rounded-full bg-brand-700/30 blur-3xl" />
                <Container className="relative">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-brand-gold-light">
                        <ArrowLeft aria-hidden="true" className="size-4" />
                        Back to home
                    </Link>
                    <div className="mt-9 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-gold-light">
                        <ShieldCheck aria-hidden="true" className="size-4" />
                        {eyebrow}
                    </div>
                    <h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                        {title}
                    </h1>
                    <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">{description}</p>
                    <p className="mt-5 text-sm text-white/55">Last updated: {updated}</p>
                </Container>
            </header>

            <Container className="py-12 sm:py-16">
                <div className="mx-auto max-w-4xl rounded-[1.75rem] border border-brand-100 bg-white p-6 shadow-sm sm:p-10 lg:p-12">
                    {sections.map((section, index) => (
                        <section key={section.heading} className={index === 0 ? "" : "mt-10 border-t border-slate-100 pt-9"}>
                            <h2 className="font-display text-2xl font-semibold text-brand-950 sm:text-3xl">
                                {section.heading}
                            </h2>
                            {section.paragraphs?.map((paragraph) => (
                                <p key={paragraph} className="mt-4 leading-8 text-slate-700">{paragraph}</p>
                            ))}
                            {section.points && (
                                <ul className="mt-4 list-disc space-y-3 pl-6 leading-7 text-slate-700">
                                    {section.points.map((point) => <li key={point}>{point}</li>)}
                                </ul>
                            )}
                        </section>
                    ))}

                    <section className="mt-10 rounded-2xl bg-brand-50 p-6 sm:p-8">
                        <h2 className="font-display text-2xl font-semibold text-brand-950">Questions about this policy?</h2>
                        <p className="mt-3 leading-7 text-slate-700">
                            Contact Dream Ceylon Journeys about a reservation, a payment, or a policy clarification before booking.
                        </p>
                        <a href={`mailto:${siteConfig.email}`} className="mt-4 inline-flex items-center gap-2 break-all font-semibold text-brand-700 hover:underline">
                            <Mail aria-hidden="true" className="size-5 shrink-0" />
                            {siteConfig.email}
                        </a>
                    </section>
                </div>

                <nav aria-label="Other company policies" className="mx-auto mt-10 max-w-4xl">
                    <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-brand-800">Other policies</h2>
                    <div className="mt-4 flex flex-wrap gap-3">
                        {otherPolicies.map((policy) => (
                            <Link key={policy.href} href={policy.href} className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-5 py-3 text-sm font-semibold text-brand-900 transition hover:border-brand-600 hover:text-brand-700">
                                {policy.label}
                                <ArrowUpRight aria-hidden="true" className="size-4" />
                            </Link>
                        ))}
                    </div>
                </nav>
            </Container>
        </main>
    );
}
