import type {
    MetadataRoute,
} from "next";

import {
    siteConfig,
} from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name:
            "Dream Ceylon Journeys",

        short_name:
            "Dream Ceylon",

        description:
        siteConfig.description,


        id:
            "/",


        start_url:
            "/",

        scope:
            "/",

        display:
            "standalone",

        background_color:
            "#FFFFFF",

        theme_color:
            "#008D86",

        lang:
            "en",

        categories: [
            "travel",
            "tourism",
        ],

        icons: [
            {
                src:
                    "/icons/icon-192.png",

                sizes:
                    "192x192",

                type:
                    "image/png",

                purpose:
                    "any",
            },
            {
                src:
                    "/icons/icon-512.png",

                sizes:
                    "512x512",

                type:
                    "image/png",

                purpose:
                    "any",
            },
            {
                src:
                    "/icons/maskable-icon-512.png",

                sizes:
                    "512x512",

                type:
                    "image/png",

                purpose:
                    "maskable",
            },
        ],
    };
}