import type {
    LucideIcon,
} from "lucide-react";

import {
    Compass,
    HeartHandshake,
    ShieldCheck,
} from "lucide-react";

import {
    getTranslations,
} from "next-intl/server";

import {
    HeroSection,
} from "@/components/sections/HeroSection";

import {
    TrustBar,
} from "@/components/sections/TrustBar";

import {
    AboutPreview,
} from "@/components/sections/AboutPreview";

import {
    PopularDestinations,
} from "@/components/sections/PopularDestinations";

import {
    FeaturedTours,
} from "@/components/sections/FeaturedTours";

import {
    WhyChooseUs,
} from "@/components/sections/WhyChooseUs";

import {
    FeaturedVehicles,
} from "@/components/sections/FeaturedVehicles";

import {
    SignatureExperiences,
} from "@/components/sections/SignatureExperiences";

import {
    HomeGallery,
} from "@/components/sections/HomeGallery";

import {
    Testimonials,
} from "@/components/sections/Testimonials";

import {
    TripadvisorReviews,
} from "@/components/sections/TripadvisorReviews";

import {
    FaqSection,
} from "@/components/sections/FaqSection";

import {
    CustomTourInquiry,
} from "@/components/sections/CustomTourInquiry";

import {
    Container,
} from "@/components/ui/Container";

import {
    SectionHeading,
} from "@/components/ui/SectionHeading";

type PromiseDefinition = {
    key:
        | "locallyDesigned"
        | "personallyHosted"
        | "travelConfidence";

    icon:
        LucideIcon;
};

const promiseDefinitions:
    PromiseDefinition[] = [
    {
        key:
            "locallyDesigned",

        icon:
        Compass,
    },
    {
        key:
            "personallyHosted",

        icon:
        HeartHandshake,
    },
    {
        key:
            "travelConfidence",

        icon:
        ShieldCheck,
    },
];

export async function HomePageContent() {
    const t =
        await getTranslations(
            "HomePromise"
        );

    return (
        <>
            <HeroSection />

            <TrustBar />

            <PopularDestinations />

            <FeaturedTours />

            <WhyChooseUs />

            <FeaturedVehicles />

            <SignatureExperiences />

            <HomeGallery />

            <Testimonials />

            <TripadvisorReviews />

            <FaqSection />

            <CustomTourInquiry />

            <AboutPreview />

            <section
                id="dream-ceylon-promise"
                className="bg-white py-20 sm:py-24"
            >
                <Container>
                    <SectionHeading
                        eyebrow={t(
                            "heading.eyebrow"
                        )}
                        title={t(
                            "heading.title"
                        )}
                        description={t(
                            "heading.description"
                        )}
                        align="center"
                    />

                    <div className="mt-12 grid gap-5 md:grid-cols-3">
                        {promiseDefinitions.map(
                            (
                                item
                            ) => {
                                const Icon =
                                    item.icon;

                                return (
                                    <article
                                        key={
                                            item.key
                                        }
                                        className="
                                            rounded-[1.75rem]
                                            border
                                            border-brand-500/10
                                            bg-white
                                            p-7
                                            shadow-[0_18px_55px_rgba(18,57,42,0.06)]
                                            transition
                                            duration-300
                                            hover:-translate-y-1
                                            hover:shadow-[0_24px_65px_rgba(18,57,42,0.11)]
                                        "
                                    >
                                        <div
                                            className="
                                                inline-flex
                                                size-13
                                                items-center
                                                justify-center
                                                rounded-2xl
                                                bg-brand-50
                                                text-brand-700
                                            "
                                        >
                                            <Icon
                                                size={
                                                    24
                                                }
                                                aria-hidden="true"
                                            />
                                        </div>

                                        <h2
                                            className="
                                                mt-6
                                                font-display
                                                text-2xl
                                                font-semibold
                                                text-slate-900
                                            "
                                        >
                                            {t(
                                                `items.${item.key}.title`
                                            )}
                                        </h2>

                                        <p
                                            className="
                                                mt-3
                                                text-sm
                                                leading-7
                                                text-slate-600
                                            "
                                        >
                                            {t(
                                                `items.${item.key}.description`
                                            )}
                                        </p>
                                    </article>
                                );
                            }
                        )}
                    </div>
                </Container>
            </section>
        </>
    );
}