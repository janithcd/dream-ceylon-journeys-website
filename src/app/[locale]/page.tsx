import type {
    Metadata,
} from "next";

import {
    notFound,
    redirect,
} from "next/navigation";

import {
    hasLocale,
} from "next-intl";

import {
    getTranslations,
    setRequestLocale,
} from "next-intl/server";

import {
    HomePageContent,
} from "@/components/home/HomePageContent";

import {
    routing,
} from "@/i18n/routing";

type LocalizedHomePageProps = {
    params: Promise<{
        locale: string;
    }>;
};

export function generateStaticParams() {
    return [
        {
            locale:
                "de",
        },
    ];
}

export async function generateMetadata({
                                           params,
                                       }: LocalizedHomePageProps): Promise<Metadata> {
    const {
        locale,
    } =
        await params;

    if (
        locale !==
        "de"
    ) {
        return {};
    }

    const t =
        await getTranslations({
            locale,

            namespace:
                "HomeMetadata",
        });

    return {
        title:
            t(
                "title"
            ),

        description:
            t(
                "description"
            ),

        alternates: {
            canonical:
                "/de",
        },

        openGraph: {
            title:
                t(
                    "title"
                ),

            description:
                t(
                    "description"
                ),

            url:
                "/de",

            locale:
                "de_DE",

            type:
                "website",
        },

        /*
         * The page remains hidden from
         * search engines until every
         * homepage section is translated.
         */
        robots: {
            index:
                false,

            follow:
                false,
        },
    };
}

export default async function LocalizedHomePage({
                                                    params,
                                                }: LocalizedHomePageProps) {
    const {
        locale,
    } =
        await params;

    if (
        locale ===
        routing.defaultLocale
    ) {
        redirect(
            "/"
        );
    }

    if (
        !hasLocale(
            routing.locales,
            locale
        )
    ) {
        notFound();
    }

    setRequestLocale(
        locale
    );

    return (
        <HomePageContent />
    );
}