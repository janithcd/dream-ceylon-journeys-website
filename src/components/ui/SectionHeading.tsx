type SectionHeadingProps = {
    eyebrow?: string;
    title: string;
    description?: string;
    align?: "left" | "center";
    light?: boolean;
    className?: string;
};

export function SectionHeading({
    eyebrow,
    title,
    description,
    align = "left",
    light = false,
    className = "",
}: SectionHeadingProps) {
    const centered = align === "center";

    return (
        <div
            className={[
                centered
                    ? "mx-auto max-w-3xl text-center"
                    : "max-w-3xl",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {eyebrow ? (
                <div
                    className={[
                        "mb-4 flex items-center gap-3",
                        centered ? "justify-center" : "",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                >
                    <span className="h-px w-9 bg-brand-gold" />
                    <span
                        className={[
                            "text-xs font-bold uppercase tracking-[0.24em]",
                            light
                                ? "text-brand-gold-light"
                                : "text-brand-700",
                        ].join(" ")}
                    >
                        {eyebrow}
                    </span>
                </div>
            ) : null}

            <h2
                className={[
                    "font-display text-4xl font-semibold leading-[1.08] tracking-[-0.025em] sm:text-5xl lg:text-6xl",
                    light ? "text-white" : "text-brand-950",
                ].join(" ")}
            >
                {title}
            </h2>

            {description ? (
                <p
                    className={[
                        "mt-5 text-base leading-8 sm:text-lg",
                        light
                            ? "text-white/70"
                            : "text-slate-600",
                    ].join(" ")}
                >
                    {description}
                </p>
            ) : null}
        </div>
    );
}
