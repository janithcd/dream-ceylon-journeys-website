export const siteConfig = {
    name:
        process.env.NEXT_PUBLIC_SITE_NAME ||
        "Dream Ceylon Journeys",
    description:
        "Private, tailor-made Sri Lanka journeys designed by local travel experts.",
    url:
        process.env.NEXT_PUBLIC_SITE_URL ||
        "http://localhost:3000",
    apiUrl:
        process.env.NEXT_PUBLIC_API_URL ||
        "http://localhost:5000/api",
    email:
        process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
        "info@dreamceylonjourneys.com",
    phone:
        process.env.NEXT_PUBLIC_CONTACT_PHONE ||
        "+94775124645",
    whatsapp:
        process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
        "94775124645",
    address:
        "89/2 Malwatta Road, Hokandara South, Hokandara, Sri Lanka",
    social: {
        facebook: "#",
        instagram: "#",
        youtube: "#",
        linkedin: "#",
    },
} as const;

export const whatsappUrl =
    `https://wa.me/${siteConfig.whatsapp}` +
    "?text=Hello%20Dream%20Ceylon%20Journeys%2C%20I%20would%20like%20to%20plan%20a%20Sri%20Lanka%20tour.";
