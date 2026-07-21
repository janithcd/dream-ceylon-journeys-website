import {
    defineRouting,
} from "next-intl/routing";

export const routing =
    defineRouting({
        locales: [
            "en",
            "de",
        ],

        defaultLocale:
            "en",

        /*
         * English URLs remain unprefixed:
         *
         * /
         * /about
         * /contact
         *
         * German URLs use:
         *
         * /de
         * /de/about
         * /de/contact
         */
        localePrefix:
            "as-needed",


        localeDetection:
            false,
    });

export type AppLocale =
    (typeof routing.locales)[number];