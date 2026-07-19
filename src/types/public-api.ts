export type PublicDestination = {
    _id: string;
    name: string;
    province?: string;
    category?: string;
    shortDescription?: string;
    imageUrl?: string;
    bestFor?: string;
    isPopular?: boolean;
};

export type PublicItineraryDay = {
    day: number;
    title: string;
    description: string;
};

export type PublicPackage = {
    _id: string;
    title: string;
    durationDays: number;
    category: string;
    overview: string;
    destinations: PublicDestination[];
    priceFrom: number;
    currency: string;
    inclusions?: string[];
    exclusions?: string[];
    itinerary?: PublicItineraryDay[];
    imageUrl?: string;
    isFeatured: boolean;
};

export type PublicVehicle = {
    _id: string;
    name: string;
    type: string;
    capacity: number;
    pricePerDay: number;
    currency: string;
    imageUrl?: string;
    description: string;
    features: string[];
    isFeatured: boolean;
};

export type PublicPackagesResponse = {
    packages: PublicPackage[];
    currentPage: number;
    totalPages: number;
    totalPackages: number;
};

export type PublicHomeResponse = {
    popularDestinations: PublicDestination[];
    featuredPackages: PublicPackage[];
    featuredVehicles: PublicVehicle[];
};

export type PublicTripadvisorReview = {
    id: string;
    reviewerName: string;
    reviewerLocation: string | null;
    avatarUrl: string | null;
    rating: number;
    title: string | null;
    text: string;
    publishedDate: string | null;
    travelDate: string | null;
    tripType: string | null;
    reviewUrl: string;
    source: "Tripadvisor";
};

export type PublicTripadvisorReviewsResponse = {
    success: boolean;
    source: "Tripadvisor";
    locationId: string;
    listingUrl: string;
    language: string;
    count: number;
    reviews: PublicTripadvisorReview[];
    fetchedAt: string;
};