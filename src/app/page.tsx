import {
  ArrowRight,
  Award,
  Compass,
  HeartHandshake,
  Map,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whatsappUrl } from "@/lib/site";

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
        "Warm, responsive assistance from planning through the final airport transfer.",
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
        <section className="relative overflow-hidden bg-brand-950 text-white">
          <div className="absolute inset-0 soft-noise" />
          <div className="absolute inset-0 surface-grid opacity-20" />

          <Container className="relative grid min-h-[680px] items-center gap-14 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:py-24">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold-light backdrop-blur">
                <Sparkles size={15} aria-hidden="true" />
                Private journeys across Sri Lanka
              </div>

              <h1 className="mt-7 text-balance font-display text-5xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl xl:text-[82px]">
                Discover Sri Lanka,
                <span className="block text-brand-gold-light">
                                your way.
                            </span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
                Tailor-made holidays, trusted local guides,
                and meaningful island experiences designed
                around the way you love to travel.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                    href="/plan-your-tour"
                    size="lg"
                >
                  Design My Journey
                  <ArrowRight size={19} aria-hidden="true" />
                </ButtonLink>

                <ButtonLink
                    href={whatsappUrl}
                    external
                    variant="light"
                    size="lg"
                >
                  Speak to a Local Expert
                </ButtonLink>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-7 text-sm text-white/60">
                            <span className="inline-flex items-center gap-2">
                                <Award
                                    size={18}
                                    className="text-brand-gold"
                                    aria-hidden="true"
                                />
                                Licensed local expertise
                            </span>
                <span className="inline-flex items-center gap-2">
                                <Map
                                    size={18}
                                    className="text-brand-gold"
                                    aria-hidden="true"
                                />
                                Fully customized itineraries
                            </span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -inset-8 rounded-full bg-brand-gold/10 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2.2rem] border border-white/12 bg-white/8 p-3 shadow-2xl backdrop-blur-xl">
                <div className="flex min-h-[430px] items-end rounded-[1.7rem] bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 p-7 sm:min-h-[520px] sm:p-9">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-gold-light">
                      Homepage imagery
                    </p>
                    <h2 className="mt-4 max-w-sm font-display text-4xl font-semibold leading-tight">
                      The cinematic hero image arrives
                      in Part 3.
                    </h2>
                    <p className="mt-4 max-w-md text-sm leading-7 text-white/60">
                      This placeholder confirms that the
                      brand system, typography,
                      navigation, buttons, and responsive
                      layout are working.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-sand-50 py-20 sm:py-24">
          <Container>
            <SectionHeading
                eyebrow="The Dream Ceylon promise"
                title="Travel designed with care, knowledge, and local heart."
                description="This section previews the reusable visual system that will power the full homepage and every dynamic destination and tour page."
                align="center"
            />

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {promises.map((item) => {
                const Icon = item.icon;

                return (
                    <article
                        key={item.title}
                        className="rounded-[1.75rem] border border-brand-800/8 bg-white p-7 shadow-[0_18px_55px_rgba(18,57,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(18,57,42,0.11)]"
                    >
                      <div className="inline-flex size-13 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                        <Icon size={24} aria-hidden="true" />
                      </div>

                      <h3 className="mt-6 font-display text-2xl font-semibold text-brand-950">
                        {item.title}
                      </h3>

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
