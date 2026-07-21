import createMiddleware from "next-intl/middleware";

import type {
    NextRequest,
} from "next/server";

import {
    NextResponse,
} from "next/server";

import {
    routing,
} from "./i18n/routing";

const handleI18nRouting =
    createMiddleware(
        routing
    );

export default function proxy(
    request: NextRequest
) {
    const pathname =
        request.nextUrl.pathname;

    /*
     * During this first controlled stage,
     * only German-prefixed routes are handled
     * by next-intl.
     *
     * Existing English routes continue through
     * Next.js exactly as they currently do.
     */
    if (
        pathname === "/de" ||
        pathname.startsWith(
            "/de/"
        )
    ) {
        return handleI18nRouting(
            request
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Ignore:
         *
         * - API routes
         * - Next.js internal files
         * - images and other files with extensions
         */
        "/((?!api|_next|_vercel|.*\\..*).*)",
    ],
};