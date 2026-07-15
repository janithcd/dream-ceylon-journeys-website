import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant =
    | "primary"
    | "secondary"
    | "outline"
    | "light";

type ButtonSize = "sm" | "md" | "lg";

type ButtonLinkProps = {
    href: string;
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
    ariaLabel?: string;
    external?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        "bg-brand-gold text-brand-950 shadow-[0_14px_35px_rgba(197,151,55,0.25)] hover:bg-brand-gold-light focus-visible:outline-brand-gold",

    secondary:
        "bg-brand-700 text-white shadow-[0_14px_35px_rgba(13,76,51,0.22)] hover:bg-brand-800 focus-visible:outline-brand-700",

    outline:
        "border border-brand-700/25 bg-white text-brand-800 hover:border-brand-gold hover:bg-brand-50 focus-visible:outline-brand-700",

    light:
        "border border-white/25 bg-white/10 text-white backdrop-blur-md hover:border-white/50 hover:bg-white/20 focus-visible:outline-white",
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: "min-h-10 px-4 text-sm",
    md: "min-h-12 px-5 text-sm",
    lg: "min-h-14 px-7 text-base",
};

export function ButtonLink({
                               href,
                               children,
                               variant = "primary",
                               size = "md",
                               className = "",
                               ariaLabel,
                               external = false,
                           }: ButtonLinkProps) {
    const classes = [
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-300",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
        variantClasses[variant],
        sizeClasses[size],
        className,
    ]
        .filter(Boolean)
        .join(" ");

    if (external) {
        return (
            <a
                href={href}
                className={classes}
                aria-label={ariaLabel}
                target="_blank"
                rel="noreferrer"
            >
                {children}
            </a>
        );
    }

    return (
        <Link
            href={href}
            className={classes}
            aria-label={ariaLabel}
        >
            {children}
        </Link>
    );
}