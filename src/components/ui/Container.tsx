import type { HTMLAttributes, ReactNode } from "react";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
};

export function Container({
    children,
    className = "",
    ...props
}: ContainerProps) {
    return (
        <div
            className={[
                "mx-auto w-full max-w-[1440px] px-5 sm:px-7 lg:px-10 xl:px-14",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
            {...props}
        >
            {children}
        </div>
    );
}
