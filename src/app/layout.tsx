import type {
  Metadata,
  Viewport,
} from "next";

import {
  Manrope,
  Playfair_Display,
} from "next/font/google";

import {
  TravelAssistant,
} from "@/components/chat/TravelAssistant";

import {
  FloatingContact,
} from "@/components/layout/FloatingContact";

import {
  Footer,
} from "@/components/layout/Footer";

import {
  Header,
} from "@/components/layout/Header";

import {
  siteConfig,
} from "@/lib/site";

import "./globals.css";

const manrope = Manrope({
  subsets: [
    "latin",
  ],

  display:
      "swap",

  variable:
      "--font-manrope",
});

const playfair =
    Playfair_Display({
      subsets: [
        "latin",
      ],

      display:
          "swap",

      variable:
          "--font-playfair",
    });

const siteUrl =
    siteConfig.url.replace(
        /\/+$/,
        ""
    );

const defaultTitle =
    "Dream Ceylon Journeys | Private Sri Lanka Tours";

const defaultDescription =
    siteConfig.description;

const defaultSocialImage =
    "/images/seo/dream-ceylon-journeys-og.webp";

const isPublicProductionSite =
    process.env.NODE_ENV ===
    "production" &&
    !siteUrl.includes(
        "localhost"
    ) &&
    !siteUrl.includes(
        "127.0.0.1"
    );

export const metadata:
    Metadata = {
  metadataBase:
      new URL(siteUrl),

  title: {
    default:
    defaultTitle,

    template:
        "%s | Dream Ceylon Journeys",
  },

  description:
  defaultDescription,

  applicationName:
  siteConfig.name,

  category:
      "travel",

  referrer:
      "origin-when-cross-origin",

  formatDetection: {
    email:
        false,

    address:
        false,

    telephone:
        false,
  },

  keywords: [
    "Sri Lanka private tours",
    "Sri Lanka tour packages",
    "Sri Lanka DMC",
    "Sri Lanka local tour operator",
    "custom Sri Lanka itinerary",
    "Sri Lanka chauffeur guide",
    "private driver Sri Lanka",
    "Sri Lanka tailor-made holidays",
    "Sri Lanka airport transfers",
    "Sri Lanka round tours",
  ],

  authors: [
    {
      name:
          "Dream Ceylon Journeys",

      url:
      siteUrl,
    },
  ],

  creator:
      "Dream Ceylon Journeys",

  publisher:
      "Dream Ceylon Journeys",

  icons: {
    icon: [
      {
        url:
            "/favicon.ico",

        type:
            "image/x-icon",
      },
      {
        url:
            "/icons/icon-192.png",

        sizes:
            "192x192",

        type:
            "image/png",
      },
      {
        url:
            "/icons/icon-512.png",

        sizes:
            "512x512",

        type:
            "image/png",
      },
    ],

    shortcut:
        "/favicon.ico",

    apple: [
      {
        url:
            "/icons/apple-touch-icon.png",

        sizes:
            "180x180",

        type:
            "image/png",
      },
    ],
  },

  openGraph: {
    type:
        "website",

    locale:
        "en_US",

    url:
    siteUrl,

    siteName:
    siteConfig.name,

    title:
    defaultTitle,

    description:
    defaultDescription,

    images: [
      {
        url:
        defaultSocialImage,

        width:
            1200,

        height:
            630,

        alt:
            "Dream Ceylon Journeys private Sri Lanka tours",
      },
    ],
  },

  twitter: {
    card:
        "summary_large_image",

    title:
    defaultTitle,

    description:
    defaultDescription,

    images: [
      defaultSocialImage,
    ],
  },

  robots: {
    index:
    isPublicProductionSite,

    follow:
    isPublicProductionSite,

    googleBot: {
      index:
      isPublicProductionSite,

      follow:
      isPublicProductionSite,

      "max-image-preview":
          "large",

      "max-snippet":
          -1,

      "max-video-preview":
          -1,
    },
  },
};

export const viewport:
    Viewport = {
  width:
      "device-width",

  initialScale:
      1,

  themeColor: [
    {
      media:
          "(prefers-color-scheme: light)",

      color:
          "#008D86",
    },
    {
      media:
          "(prefers-color-scheme: dark)",

      color:
          "#043F3B",
    },
  ],
};

const organizationJsonLd = {
  "@context":
      "https://schema.org",

  "@graph": [
    {
      "@type": [
        "Organization",
        "TravelAgency",
      ],

      "@id":
          `${siteUrl}/#organization`,

      name:
          "Dream Ceylon Journeys",

      alternateName:
          "Dream Ceylon Journeys Sri Lanka",

      url:
      siteUrl,

      logo: {
        "@type":
            "ImageObject",

        url:
            `${siteUrl}/images/brand/logo-dark.png`,
      },

      image:
          `${siteUrl}${defaultSocialImage}`,

      description:
      defaultDescription,

      email:
          "info@dreamceylonjourneys.com",

      telephone:
          "+94775124645",

      address: {
        "@type":
            "PostalAddress",

        streetAddress:
            "89/2 Malwatta Road, Hokandara South",

        addressLocality:
            "Hokandara",

        addressRegion:
            "Western Province",

        addressCountry:
            "LK",
      },

      contactPoint: [
        {
          "@type":
              "ContactPoint",

          telephone:
              "+94775124645",

          contactType:
              "customer service",

          availableLanguage: [
            "English",
          ],
        },
        {
          "@type":
              "ContactPoint",

          telephone:
              "+94766550304",

          contactType:
              "customer service",

          availableLanguage: [
            "English",
          ],
        },
      ],

      areaServed: {
        "@type":
            "Country",

        name:
            "Sri Lanka",
      },

      knowsAbout: [
        "Private Sri Lanka tours",
        "Tailor-made Sri Lanka holidays",
        "Sri Lanka chauffeur-guide services",
        "Sri Lanka airport transfers",
        "Sri Lanka wildlife tours",
        "Sri Lanka cultural tours",
        "Sri Lanka beach holidays",
        "Destination management services",
      ],
    },
    {
      "@type":
          "WebSite",

      "@id":
          `${siteUrl}/#website`,

      url:
      siteUrl,

      name:
      siteConfig.name,

      alternateName:
          "Dream Ceylon Journeys Sri Lanka",

      description:
      defaultDescription,

      inLanguage:
          "en",

      publisher: {
        "@id":
            `${siteUrl}/#organization`,
      },
    },
  ],
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children:
      React.ReactNode;
}>) {
  return (
      <html
          lang="en"
          data-scroll-behavior="smooth"
          className={`${manrope.variable} ${playfair.variable}`}
      >
      <body
          className="
                    min-h-screen
                    bg-white
                    font-sans
                    text-slate-900
                    antialiased
                "
      >
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
                JSON.stringify(
                    organizationJsonLd
                ).replace(
                    /</g,
                    "\\u003c"
                ),
          }}
      />

      <Header />

      {/*
                    Individual pages already use their
                    own <main> element, so the root
                    layout must not add another <main>.
                */}
      <div id="site-content">
        {children}
      </div>

      <Footer />

      <FloatingContact />

      <TravelAssistant />
      </body>
      </html>
  );
}