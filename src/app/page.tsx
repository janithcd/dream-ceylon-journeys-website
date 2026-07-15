import {
  Compass,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";
import { TrustBar } from "@/components/sections/TrustBar";
import { HeroSection } from "@/components/sections/HeroSection";
import { PopularDestinations } from "@/components/sections/PopularDestinations";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const promises = [
  {
    icon: Compass,
    title: "Locally Designed",
    description:
        "Journeys created by Sri Lankan experts who understand the island in depth.",
  },
  {
    icon: HeartHandshake,
    title: "Personally Hosted",
    description:
        "Warm and responsive assistance from planning through the final airport transfer.",
  },
  {
    icon: ShieldCheck,
    title: "Travel With Confidence",
    description:
        "Professional guides, comfortable vehicles, and dependable local support.",
  },
];

export default function Home() {
  return (
      <>
        <HeroSection />

        <TrustBar />


        <PopularDestinations />

        <section
            id="dream-ceylon-promise"
            className="bg-white py-20 sm:py-24"
        >
          <Container>
            <SectionHeading
                eyebrow="The Dream Ceylon promise"
                title="Travel designed with care, knowledge, and local heart."
                description="Every private journey is thoughtfully planned around your interests, travel style, pace, and expectations."
                align="center"
            />

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {promises.map((item) => {
                const Icon = item.icon;

                return (
                    <article
                        key={item.title}
                        className="
                                        rounded-[1.75rem]
                                        border border-brand-500/10
                                        bg-white p-7
                                        shadow-[0_18px_55px_rgba(18,57,42,0.06)]
                                        transition duration-300
                                        hover:-translate-y-1
                                        hover:shadow-[0_24px_65px_rgba(18,57,42,0.11)]
                                    "
                    >
                      <div
                          className="
                                            inline-flex size-13
                                            items-center justify-center
                                            rounded-2xl
                                            bg-brand-50
                                            text-brand-700
                                        "
                      >
                        <Icon
                            size={24}
                            aria-hidden="true"
                        />
                      </div>

                      <h2 className="mt-6 font-display text-2xl font-semibold text-slate-900">
                        {item.title}
                      </h2>

                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {item.description}
                      </p>
                    </article>
                );
              })}
            </div>
          </Container>
        </section>
      </>
  );
}