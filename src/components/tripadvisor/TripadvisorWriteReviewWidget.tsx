"use client";

import {
    useEffect,
    useRef,
    useState,
} from "react";

const TRIPADVISOR_LISTING_URL =
    "https://www.tripadvisor.com/Attraction_Review-g665217-d34303718-Reviews-Dream_Ceylon_Journeys-Sri_Jayawardenepura_Western_Province.html";

const TRIPADVISOR_WIDGET_SCRIPT =
    "https://www.jscache.com/wejs?wtype=cdswritereviewlg&uniq=140&locationId=34303718&lang=en_US&display_version=2";

const SCRIPT_ID =
    "tripadvisor-write-review-widget-script";

const WIDGET_HTML = `
    <div
        id="TA_cdswritereviewlg140"
        class="TA_cdswritereviewlg"
    >
        <ul
            id="VtL8vG1CA"
            class="TA_links S7Xcr5zW7"
        >
            <li
                id="w9pLnm0GY"
                class="58WvA4HXSRq"
            >
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="${TRIPADVISOR_LISTING_URL}"
                >
                    <img
                        src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg"
                        alt="Tripadvisor"
                    />
                </a>
            </li>
        </ul>
    </div>
`;

export function TripadvisorWriteReviewWidget() {
    const widgetMountRef =
        useRef<HTMLDivElement>(null);

    const [scriptFailed, setScriptFailed] =
        useState(false);

    useEffect(() => {
        const widgetMount =
            widgetMountRef.current;

        if (!widgetMount) {
            return;
        }

        const initializeTimer =
            window.setTimeout(() => {
                setScriptFailed(false);

                widgetMount.innerHTML =
                    WIDGET_HTML;

                const existingScript =
                    document.getElementById(
                        SCRIPT_ID
                    );

                existingScript?.remove();

                const script =
                    document.createElement(
                        "script"
                    );

                script.id = SCRIPT_ID;

                script.src =
                    TRIPADVISOR_WIDGET_SCRIPT;

                script.async = true;

                script.setAttribute(
                    "data-loadtrk",
                    ""
                );

                script.onload = () => {
                    script.setAttribute(
                        "data-loaded",
                        "true"
                    );
                };

                script.onerror = () => {
                    console.error(
                        "[Tripadvisor Widget] Failed to load the Tripadvisor widget script."
                    );

                    setScriptFailed(true);
                };

                document.body.appendChild(
                    script
                );
            }, 0);

        return () => {
            window.clearTimeout(
                initializeTimer
            );

            document
                .getElementById(
                    SCRIPT_ID
                )
                ?.remove();

            widgetMount.innerHTML = "";
        };
    }, []);

    return (
        <div className="w-full">
            <div
                ref={widgetMountRef}
                suppressHydrationWarning
                className="
                    flex min-h-[80px]
                    w-full items-center
                    justify-center
                    [&_img]:mx-auto
                    [&_img]:h-auto
                    [&_img]:max-w-full
                    [&_li]:m-0
                    [&_ul]:m-0
                    [&_ul]:list-none
                    [&_ul]:p-0
                "
            />

            {scriptFailed && (
                <a
                    href={TRIPADVISOR_LISTING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        mx-auto
                        inline-flex min-h-11
                        items-center justify-center
                        rounded-full
                        bg-[#00aa6c]
                        px-5
                        text-sm font-semibold
                        text-white
                        transition-colors
                        hover:bg-[#008f5b]
                    "
                >
                    Write a review on Tripadvisor
                </a>
            )}
        </div>
    );
}