import "server-only";

import {
    getPublicTripadvisorReviews,
} from "@/lib/public-api";

export type Testimonial = {
    id: string;
    name: string;
    country: string;
    title: string | null;
    quote: string;
    rating: number;
    tripType: string | null;
    publishedDate: string | null;
    travelDate: string | null;
    reviewUrl: string;
    source: "Tripadvisor";
};

export type TestimonialsData = {
    listingUrl: string;
    reviews: Testimonial[];
};

const TRIPADVISOR_LISTING_URL =
    "https://www.tripadvisor.com/Attraction_Review-g665217-d34303718-Reviews-Dream_Ceylon_Journeys-Sri_Jayawardenepura_Western_Province.html";

function normalizeRating(
    value: number
): number {
    if (!Number.isFinite(value)) {
        return 0;
    }

    return Math.min(
        Math.max(Math.round(value), 0),
        5
    );
}

export async function getTestimonials(): Promise<TestimonialsData> {
    const response =
        await getPublicTripadvisorReviews(
            "en"
        );

    if (
        !response?.success ||
        !Array.isArray(response.reviews)
    ) {
        return {
            listingUrl:
            TRIPADVISOR_LISTING_URL,

            reviews: [],
        };
    }

    const reviews =
        response.reviews
            .filter(
                (review) =>
                    review.text?.trim()
                        .length > 0
            )
            .slice(0, 3)
            .map((review): Testimonial => ({
                id: review.id,

                name:
                    review.reviewerName ||
                    "Tripadvisor Traveller",

                country:
                    review.reviewerLocation ||
                    "Tripadvisor Traveller",

                title:
                    review.title?.trim() ||
                    null,

                quote:
                    review.text.trim(),

                rating:
                    normalizeRating(
                        review.rating
                    ),

                tripType:
                review.tripType,

                publishedDate:
                review.publishedDate,

                travelDate:
                review.travelDate,

                reviewUrl:
                    review.reviewUrl ||
                    response.listingUrl ||
                    TRIPADVISOR_LISTING_URL,

                source:
                    "Tripadvisor",
            }));

    return {
        listingUrl:
            response.listingUrl ||
            TRIPADVISOR_LISTING_URL,

        reviews,
    };
}