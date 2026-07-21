import Image from "next/image";
import Link from "next/link";

import {
    ArrowUpRight,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
} from "lucide-react";

import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
} from "react-icons/fa6";

import {
    getLocale,
    getTranslations,
} from "next-intl/server";

import {
    ButtonLink,
} from "@/components/ui/ButtonLink";

import {
    Container,
} from "@/components/ui/Container";

import {
    footerNavigation,
} from "@/data/navigation";

import {
    siteConfig,
    whatsappUrl,
} from "@/lib/site";

const socialLinks = [
    {
        label: "Facebook",
        href: siteConfig.social.facebook,
        icon: FaFacebookF,
    },
    {
        label: "Instagram",
        href: siteConfig.social.instagram,
        icon: FaInstagram,
    },
    {
        label: "YouTube",
        href: siteConfig.social.youtube,
        icon: FaYoutube,
    },
    {
        label: "LinkedIn",
        href: siteConfig.social.linkedin,
        icon: FaLinkedinIn,
    },
];

/*
 * Add a pathname here only after its
 * complete German page has been created.
 *
 * At present, only the German homepage
 * is available.
 */
const germanPublishedPaths =
    new Set<string>([
        "/",
    ]);

type FooterLinkItem = {
    label: string;
    href: string;
};

function splitInternalHref(
    href: string
): {
    pathname: string;
    suffix: string;
} {
    const match =
        href.match(
            /^([^?#]*)(.*)$/
        );

    return {
        pathname:
            match?.[1] ||
            "/",

        suffix:
            match?.[2] ||
            "",
    };
}

function getLocalizedHref(
    href: string,
    locale: string
): string {
    /*
     * External URLs, email links and
     * telephone links remain unchanged.
     */
    if (
        !href.startsWith("/")
    ) {
        return href;
    }

    /*
     * English continues using its
     * existing unprefixed URLs.
     */
    if (
        locale !== "de"
    ) {
        return href;
    }

    const {
        pathname,
        suffix,
    } =
        splitInternalHref(
            href
        );

    /*
     * Until the equivalent German page
     * is published, retain the existing
     * English destination.
     */
    if (
        !germanPublishedPaths.has(
            pathname
        )
    ) {
        return href;
    }

    if (
        pathname === "/"
    ) {
        return `/de${suffix}`;
    }

    return `/de${pathname}${suffix}`;
}

export async function Footer() {
    const [
        locale,
        t,
    ] =
        await Promise.all([
            getLocale(),

            getTranslations(
                "Footer"
            ),
        ]);

    const currentYear =
        new Date()
            .getFullYear();

    const homeHref =
        getLocalizedHref(
            "/",
            locale
        );

    const exploreItems:
        FooterLinkItem[] =
        footerNavigation
            .explore
            .map(
                (
                    item
                ) => ({
                    label:
                        t(
                            `links.${item.labelKey}`
                        ),

                    href:
                        getLocalizedHref(
                            item.href,
                            locale
                        ),
                })
            );

    const companyItems:
        FooterLinkItem[] =
        footerNavigation
            .company
            .map(
                (
                    item
                ) => ({
                    label:
                        t(
                            `links.${item.labelKey}`
                        ),

                    href:
                        getLocalizedHref(
                            item.href,
                            locale
                        ),
                })
            );

    const legalItems:
        FooterLinkItem[] =
        footerNavigation
            .legal
            .map(
                (
                    item
                ) => ({
                    label:
                        t(
                            `links.${item.labelKey}`
                        ),

                    href:
                        getLocalizedHref(
                            item.href,
                            locale
                        ),
                })
            );

    return (
        <footer className="relative overflow-hidden bg-brand-950 text-white">
            <div className="absolute -right-24 -top-24 size-[420px] rounded-full bg-brand-700/20 blur-3xl" />

            <div className="absolute -bottom-48 -left-36 size-[500px] rounded-full bg-brand-gold/10 blur-3xl" />

            <Container className="relative py-16 sm:py-20">
                <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.25fr_0.8fr_0.8fr_1fr]">
                    <div className="max-w-md">
                        <Link
                            href={
                                homeHref
                            }
                            aria-label={`${siteConfig.name} home`}
                            className="inline-flex rounded-2xl bg-white p-3"
                        >
                            <Image
                                src="/images/brand/logo-dark.png"
                                alt={
                                    siteConfig.name
                                }
                                width={
                                    220
                                }
                                height={
                                    78
                                }
                                className="h-16 w-auto object-contain"
                            />
                        </Link>

                        <p className="mt-6 text-sm leading-7 text-white/62">
                            {t(
                                "description"
                            )}
                        </p>

                        <div className="mt-7 flex flex-wrap gap-2.5">
                            {socialLinks.map(
                                (
                                    item
                                ) => {
                                    const Icon =
                                        item.icon;

                                    return (
                                        <a
                                            key={
                                                item.label
                                            }
                                            href={
                                                item.href
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={
                                                item.label
                                            }
                                            className="inline-flex size-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/75 transition hover:border-brand-gold hover:bg-brand-gold hover:text-brand-950"
                                        >
                                            <Icon
                                                size={
                                                    18
                                                }
                                                aria-hidden="true"
                                            />
                                        </a>
                                    );
                                }
                            )}
                        </div>
                    </div>

                    <FooterColumn
                        title={t(
                            "exploreTitle"
                        )}
                        items={
                            exploreItems
                        }
                    />

                    <FooterColumn
                        title={t(
                            "companyTitle"
                        )}
                        items={
                            companyItems
                        }
                    />

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-brand-gold-light">
                            {t(
                                "contactTitle"
                            )}
                        </h3>

                        <div className="mt-6 space-y-5 text-sm text-white/68">
                            <a
                                href={`tel:${siteConfig.phone}`}
                                className="flex items-start gap-3 transition hover:text-white"
                            >
                                <Phone
                                    className="mt-0.5 shrink-0 text-brand-gold"
                                    size={
                                        18
                                    }
                                    aria-hidden="true"
                                />

                                <span>
                                    {
                                        siteConfig.phone
                                    }
                                </span>
                            </a>

                            <a
                                href={`mailto:${siteConfig.email}`}
                                className="flex items-start gap-3 break-all transition hover:text-white"
                            >
                                <Mail
                                    className="mt-0.5 shrink-0 text-brand-gold"
                                    size={
                                        18
                                    }
                                    aria-hidden="true"
                                />

                                <span>
                                    {
                                        siteConfig.email
                                    }
                                </span>
                            </a>

                            <div className="flex items-start gap-3">
                                <MapPin
                                    className="mt-0.5 shrink-0 text-brand-gold"
                                    size={
                                        18
                                    }
                                    aria-hidden="true"
                                />

                                <span className="leading-6">
                                    {
                                        siteConfig.address
                                    }
                                </span>
                            </div>
                        </div>

                        <ButtonLink
                            href={
                                whatsappUrl
                            }
                            external
                            variant="light"
                            className="mt-7"
                            ariaLabel={t(
                                "chatWhatsapp"
                            )}
                        >
                            <MessageCircle
                                size={
                                    18
                                }
                                aria-hidden="true"
                            />

                            {t(
                                "chatWhatsapp"
                            )}
                        </ButtonLink>
                    </div>
                </div>

                <div className="flex flex-col gap-5 pt-8 text-xs text-white/48 md:flex-row md:items-center md:justify-between">
                    <p>
                        ©{" "}
                        {
                            currentYear
                        }{" "}
                        Dream Ceylon Journeys.{" "}
                        {t(
                            "rights"
                        )}
                    </p>

                    <div className="flex flex-wrap gap-x-5 gap-y-2">
                        {legalItems.map(
                            (
                                item
                            ) => (
                                <Link
                                    key={
                                        item.href
                                    }
                                    href={
                                        item.href
                                    }
                                    className="transition hover:text-white"
                                >
                                    {
                                        item.label
                                    }
                                </Link>
                            )
                        )}
                    </div>

                    <p>
                        {t(
                            "designedBy"
                        )}
                    </p>
                </div>
            </Container>
        </footer>
    );
}

type FooterColumnProps = {
    title: string;

    items:
        ReadonlyArray<FooterLinkItem>;
};

function FooterColumn({
                          title,
                          items,
                      }: FooterColumnProps) {
    return (
        <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-brand-gold-light">
                {
                    title
                }
            </h3>

            <ul className="mt-6 space-y-4">
                {items.map(
                    (
                        item
                    ) => (
                        <li
                            key={
                                item.href
                            }
                        >
                            <Link
                                href={
                                    item.href
                                }
                                className="group inline-flex items-center gap-2 text-sm text-white/65 transition hover:text-white"
                            >
                                {
                                    item.label
                                }

                                <ArrowUpRight
                                    size={
                                        14
                                    }
                                    className="translate-y-0.5 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100"
                                    aria-hidden="true"
                                />
                            </Link>
                        </li>
                    )
                )}
            </ul>
        </div>
    );
}