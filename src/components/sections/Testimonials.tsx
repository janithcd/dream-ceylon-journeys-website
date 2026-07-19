import Link from "next/link";

type TripadvisorReview = {
    id: string;
    reviewerName: string;
    reviewerLocation?: string | null;
    avatarUrl?: string | null;
    rating?: number;
    title?: string | null;
    text: string;
    publishedDate?: string | null;
    travelDate?: string | null;
    tripType?: string | null;
    reviewUrl?: string | null;
    source?: string;
};

type TripadvisorResponse = {
    success?: boolean;
    source?: string;
    locationId?: string;
    listingUrl?: string;
    language?: string;
    count?: number;
    reviews?: TripadvisorReview[];
    fetchedAt?: string;
};

const getApiBaseUrl = (): string => {
    return (
        process.env.CRM_API_URL ||
        process.env.NEXT_PUBLIC_API_URL ||
        "http://localhost:5000/api"
    ).replace(/\/+$/, "");
};

const getInitials = (name: string) => {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("");
};

const formatTravelMeta = (review: TripadvisorReview) => {
    const parts: string[] = [];

    if (review.tripType) {
        parts.push(review.tripType);
    }

    if (review.travelDate) {
        const date = new Date(review.travelDate);
        if (!Number.isNaN(date.getTime())) {
            parts.push(
                date.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                })
            );
        } else {
            parts.push(review.travelDate);
        }
    }

    return parts.join(" • ");
};

const truncateText = (text: string, maxLength = 220) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength).trim()}...`;
};

const fetchTripadvisorReviews =
    async (): Promise<TripadvisorResponse> => {
        const requestUrl =
            `${getApiBaseUrl()}/public/tripadvisor-reviews?language=en`;

        try {
            const response = await fetch(
                requestUrl,
                {
                    headers: {
                        Accept: "application/json",
                    },
                    cache: "no-store",
                }
            );

            if (!response.ok) {
                const errorBody =
                    await response.text();

                console.error(
                    `[Testimonials] CRM returned ${response.status} from ${requestUrl}`,
                    errorBody
                );

                return {
                    reviews: [],
                    listingUrl:
                        "https://www.tripadvisor.com/Attraction_Review-g665217-d34303718-Reviews-Dream_Ceylon_Journeys-Sri_Jayawardenepura_Western_Province.html",
                };
            }

            return (
                await response.json()
            ) as TripadvisorResponse;
        } catch (error) {
            console.error(
                `[Testimonials] Failed to connect to ${requestUrl}`,
                error
            );

            return {
                reviews: [],
                listingUrl:
                    "https://www.tripadvisor.com/Attraction_Review-g665217-d34303718-Reviews-Dream_Ceylon_Journeys-Sri_Jayawardenepura_Western_Province.html",
            };
        }
    };

export async function Testimonials() {
    const data = await fetchTripadvisorReviews();

    const reviews = (data.reviews || []).slice(0, 3);
    const listingUrl =
        data.listingUrl ||
        "https://www.tripadvisor.com/Attraction_Review-g665217-d34303718-Reviews-Dream_Ceylon_Journeys-Sri_Jayawardenepura_Western_Province.html";

    if (!reviews.length) {
        return (
            <section className="bg-white py-16 sm:py-20 lg:py-24">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-600">
                            Tripadvisor Reviews
                        </p>
                        <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                            Journeys remembered long after returning home.
                        </h2>
                        <p className="mt-4 text-base leading-8 text-slate-600">
                            Genuine feedback shared by travellers who explored
                            Sri Lanka with Dream Ceylon Journeys.
                        </p>

                        <div className="mt-8">
                            <Link
                                href={listingUrl}
                                target="_blank"
                                className="inline-flex items-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-brand-500 hover:text-brand-700"
                            >
                                View our Tripadvisor page
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-white py-16 sm:py-20 lg:py-24">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-600">
                        Tripadvisor Reviews
                    </p>

                    <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                        Journeys remembered long after returning home.
                    </h2>

                    <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
                        Real feedback from travellers who explored Sri Lanka
                        with Dream Ceylon Journeys.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {reviews.map((review) => {
                        const meta = formatTravelMeta(review);

                        return (
                            <article
                                key={review.id}
                                className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex items-center gap-1 text-amber-400">
                                        {Array.from({
                                            length: review.rating || 5,
                                        }).map((_, index) => (
                                            <span
                                                key={index}
                                                className="text-sm"
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>

                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                                        Tripadvisor
                                    </span>
                                </div>

                                {review.title ? (
                                    <h3 className="text-lg font-semibold leading-snug text-slate-900">
                                        {review.title}
                                    </h3>
                                ) : (
                                    <h3 className="text-lg font-semibold leading-snug text-slate-900">
                                        Memorable Sri Lanka experience
                                    </h3>
                                )}

                                <p className="mt-4 flex-1 text-[15px] leading-7 text-slate-600">
                                    “{truncateText(review.text, 220)}”
                                </p>

                                <div className="mt-6 border-t border-slate-200 pt-5">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
                                            {getInitials(
                                                review.reviewerName ||
                                                "Traveller"
                                            )}
                                        </div>

                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-slate-900">
                                                {review.reviewerName}
                                            </p>

                                            <p className="mt-1 text-xs text-slate-500">
                                                {review.reviewerLocation ||
                                                    "Tripadvisor Traveller"}
                                            </p>

                                            {meta ? (
                                                <p className="mt-1 text-xs text-slate-400">
                                                    {meta}
                                                </p>
                                            ) : null}
                                        </div>
                                    </div>

                                    {review.reviewUrl ? (
                                        <div className="mt-5">
                                            <Link
                                                href={review.reviewUrl}
                                                target="_blank"
                                                className="inline-flex items-center text-sm font-semibold text-brand-700 transition hover:text-brand-800"
                                            >
                                                Read on Tripadvisor
                                                <span className="ml-2 text-base">
                                                    ↗
                                                </span>
                                            </Link>
                                        </div>
                                    ) : null}
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/*<div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-slate-50 px-6 py-6 sm:flex-row">*/}
                {/*    <div className="text-center sm:text-left">*/}
                {/*        <h3 className="text-lg font-semibold text-slate-900">*/}
                {/*            Start planning your own Sri Lanka story.*/}
                {/*        </h3>*/}
                {/*        <p className="mt-1 text-sm text-slate-600">*/}
                {/*            See more traveller reviews or share your own*/}
                {/*            experience with Dream Ceylon Journeys.*/}
                {/*        </p>*/}
                {/*    </div>*/}

                {/*    <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-end">*/}
                {/*        <Link*/}
                {/*            href={listingUrl}*/}
                {/*            target="_blank"*/}
                {/*            className="inline-flex items-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-brand-500 hover:text-brand-700"*/}
                {/*        >*/}
                {/*            View Tripadvisor Page*/}
                {/*        </Link>*/}

                {/*        <Link*/}
                {/*            href={listingUrl}*/}
                {/*            target="_blank"*/}
                {/*            className="inline-flex items-center rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"*/}
                {/*        >*/}
                {/*            Write a Review*/}
                {/*        </Link>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </section>
    );
}