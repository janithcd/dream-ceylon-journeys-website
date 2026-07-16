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