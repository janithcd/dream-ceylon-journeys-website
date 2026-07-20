"use client";

import {
    type FormEvent,
    useEffect,
    useState,
} from "react";

import {
    CalendarDays,
    CarFront,
    Check,
    CheckCircle2,
    Compass,
    Globe2,
    Hotel,
    LoaderCircle,
    Mail,
    MapPin,
    MessageSquareText,
    PackageOpen,
    Phone,
    Send,
    UsersRound,
    WalletCards,
} from "lucide-react";

export type PlanOption = {
    id: string;
    slug: string;
    label: string;
    meta?: string;
};

type PlanYourTourFormProps = {
    tourOptions:
        PlanOption[];

    vehicleOptions:
        PlanOption[];

    destinationOptions:
        PlanOption[];

    initialTourId?: string;
    initialVehicleId?: string;

    initialDestinationIds?:
        string[];
};

type ApiResponse = {
    message?: string;
};

const inputClassName = `
    mt-2 min-h-12 w-full
    rounded-2xl
    border border-slate-300
    bg-white
    px-4
    text-slate-900
    outline-none
    transition
    placeholder:text-slate-400
    focus:border-[#008D86]
    focus:ring-4
    focus:ring-[#008D86]/10
`;

const selectClassName = `
    mt-2 min-h-12 w-full
    rounded-2xl
    border border-slate-300
    bg-white
    px-4
    text-slate-900
    outline-none
    transition
    focus:border-[#008D86]
    focus:ring-4
    focus:ring-[#008D86]/10
`;

function FieldLabel({
                        children,
                        required = false,
                    }: {
    children:
        React.ReactNode;

    required?: boolean;
}) {
    return (
        <span className="text-sm font-bold text-slate-800">
            {children}

            {required && (
                <span className="text-[#C62D52]">
                    {" "}
                    *
                </span>
            )}
        </span>
    );
}

function SectionTitle({
                          icon,
                          eyebrow,
                          title,
                          description,
                      }: {
    icon:
        React.ReactNode;

    eyebrow: string;
    title: string;
    description: string;
}) {
    return (
        <div className="mb-7 flex items-start gap-4">
            <div
                className="
                    flex h-12 w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#008D86]/10
                    text-[#008D86]
                "
            >
                {icon}
            </div>

            <div>
                <p
                    className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.2em]
                        text-[#C62D52]
                    "
                >
                    {eyebrow}
                </p>

                <h2
                    className="
                        mt-1
                        text-2xl
                        font-bold
                        text-slate-900
                    "
                >
                    {title}
                </h2>

                <p
                    className="
                        mt-2
                        max-w-2xl
                        text-sm
                        leading-6
                        text-slate-600
                    "
                >
                    {description}
                </p>
            </div>
        </div>
    );
}

export function PlanYourTourForm({
                                     tourOptions,
                                     vehicleOptions,
                                     destinationOptions,
                                     initialTourId = "",
                                     initialVehicleId = "",
                                     initialDestinationIds = [],
                                 }: PlanYourTourFormProps) {
    const [
        today,
        setToday,
    ] = useState("");

    const [
        isSubmitting,
        setIsSubmitting,
    ] = useState(false);

    const [
        isSubmitted,
        setIsSubmitted,
    ] = useState(false);

    const [
        errorMessage,
        setErrorMessage,
    ] = useState("");

    useEffect(() => {
        setToday(
            new Date()
                .toISOString()
                .split("T")[0]
        );
    }, []);

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setIsSubmitting(true);
        setErrorMessage("");

        const form =
            event.currentTarget;

        const formData =
            new FormData(form);

        const preferredPackageId =
            String(
                formData.get(
                    "preferredPackageId"
                ) || ""
            );

        const preferredVehicleId =
            String(
                formData.get(
                    "preferredVehicleId"
                ) || ""
            );

        const selectedDestinationIds =
            formData
                .getAll(
                    "destinations"
                )
                .map(String);

        const preferredPackage =
            tourOptions.find(
                (option) =>
                    option.id ===
                    preferredPackageId
            );

        const preferredVehicle =
            vehicleOptions.find(
                (option) =>
                    option.id ===
                    preferredVehicleId
            );

        const destinationNames =
            selectedDestinationIds
                .map(
                    (id) =>
                        destinationOptions.find(
                            (
                                option
                            ) =>
                                option.id ===
                                id
                        )?.label
                )
                .filter(
                    (
                        value
                    ): value is string =>
                        Boolean(value)
                );

        const payload = {
            fullName:
                String(
                    formData.get(
                        "fullName"
                    ) || ""
                ).trim(),

            email:
                String(
                    formData.get(
                        "email"
                    ) || ""
                ).trim(),

            whatsappNumber:
                String(
                    formData.get(
                        "whatsappNumber"
                    ) || ""
                ).trim(),

            country:
                String(
                    formData.get(
                        "country"
                    ) || ""
                ).trim(),

            arrivalDate:
                String(
                    formData.get(
                        "arrivalDate"
                    ) || ""
                ),

            departureDate:
                String(
                    formData.get(
                        "departureDate"
                    ) || ""
                ),

            adults:
                Number(
                    formData.get(
                        "adults"
                    )
                ),

            children:
                Number(
                    formData.get(
                        "children"
                    )
                ),

            preferredPackageId,

            preferredPackageName:
                preferredPackage
                    ?.label || "",

            preferredVehicleId,

            preferredVehicleName:
                preferredVehicle
                    ?.label || "",

            destinations:
            destinationNames,

            travelStyle:
                String(
                    formData.get(
                        "travelStyle"
                    ) || ""
                ),

            budgetLevel:
                String(
                    formData.get(
                        "budgetLevel"
                    ) || ""
                ),

            accommodation:
                String(
                    formData.get(
                        "accommodation"
                    ) || ""
                ),

            referralSource:
                String(
                    formData.get(
                        "referralSource"
                    ) || ""
                ),

            message:
                String(
                    formData.get(
                        "message"
                    ) || ""
                ).trim(),
        };

        try {
            const response =
                await fetch(
                    "/api/plan-your-tour",
                    {
                        method:
                            "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body:
                            JSON.stringify(
                                payload
                            ),
                    }
                );

            const result =
                (await response
                    .json()
                    .catch(
                        () => ({})
                    )) as ApiResponse;

            if (!response.ok) {
                throw new Error(
                    result.message ||
                    "Your request could not be submitted."
                );
            }

            setIsSubmitted(true);

            window.scrollTo({
                top: 0,
                behavior:
                    "smooth",
            });
        } catch (error) {
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "Your request could not be submitted."
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isSubmitted) {
        return (
            <div
                className="
                    rounded-[2rem]
                    border border-emerald-200
                    bg-white
                    px-6 py-14
                    text-center
                    shadow-[0_22px_70px_rgba(18,50,45,0.08)]
                    sm:px-12
                    sm:py-16
                "
            >
                <div
                    className="
                        mx-auto
                        flex h-24 w-24
                        items-center
                        justify-center
                        rounded-full
                        bg-emerald-100
                        text-emerald-700
                    "
                >
                    <CheckCircle2 className="h-12 w-12" />
                </div>

                <p
                    className="
                        mt-7
                        text-sm
                        font-bold
                        uppercase
                        tracking-[0.2em]
                        text-[#008D86]
                    "
                >
                    Request received
                </p>

                <h2
                    className="
                        mt-3
                        font-display
                        text-3xl
                        font-semibold
                        text-slate-900
                        sm:text-5xl
                    "
                >
                    Your Sri Lanka journey
                    starts here
                </h2>

                <p
                    className="
                        mx-auto
                        mt-5
                        max-w-2xl
                        text-lg
                        leading-8
                        text-slate-600
                    "
                >
                    Thank you for sharing your
                    travel plans. Our team will
                    review your dates, route,
                    preferred vehicle and tour
                    requirements before contacting
                    you.
                </p>

                <button
                    type="button"
                    onClick={() => {
                        setIsSubmitted(
                            false
                        );

                        setErrorMessage(
                            ""
                        );
                    }}
                    className="
                        mt-8
                        inline-flex
                        min-h-13
                        items-center
                        justify-center
                        rounded-full
                        bg-[#008D86]
                        px-8
                        font-bold
                        text-white
                        transition
                        hover:-translate-y-0.5
                        hover:bg-[#006D68]
                    "
                >
                    Submit Another Request
                </button>
            </div>
        );
    }

    return (
        <form
            onSubmit={
                handleSubmit
            }
            className="
                space-y-7
            "
        >
            {/* Contact information */}
            <section
                className="
                    rounded-[2rem]
                    border border-slate-200
                    bg-white
                    p-6
                    shadow-[0_18px_60px_rgba(18,50,45,0.06)]
                    sm:p-8
                "
            >
                <SectionTitle
                    icon={
                        <Mail className="h-5 w-5" />
                    }
                    eyebrow="Step 01"
                    title="Your contact details"
                    description="Tell us who you are and how our Sri Lanka travel team can contact you."
                />

                <div className="grid gap-5 sm:grid-cols-2">
                    <label>
                        <FieldLabel
                            required
                        >
                            Full name
                        </FieldLabel>

                        <input
                            type="text"
                            name="fullName"
                            required
                            autoComplete="name"
                            placeholder="Your full name"
                            className={
                                inputClassName
                            }
                        />
                    </label>

                    <label>
                        <FieldLabel
                            required
                        >
                            Email address
                        </FieldLabel>

                        <div className="relative">
                            <Mail
                                className="
                                    pointer-events-none
                                    absolute
                                    left-4 top-1/2
                                    mt-1 h-5 w-5
                                    -translate-y-1/2
                                    text-slate-400
                                "
                            />

                            <input
                                type="email"
                                name="email"
                                required
                                autoComplete="email"
                                placeholder="you@example.com"
                                className={`${inputClassName} pl-12`}
                            />
                        </div>
                    </label>

                    <label>
                        <FieldLabel
                            required
                        >
                            WhatsApp number
                        </FieldLabel>

                        <div className="relative">
                            <Phone
                                className="
                                    pointer-events-none
                                    absolute
                                    left-4 top-1/2
                                    mt-1 h-5 w-5
                                    -translate-y-1/2
                                    text-slate-400
                                "
                            />

                            <input
                                type="tel"
                                name="whatsappNumber"
                                required
                                autoComplete="tel"
                                placeholder="+44 123 456 7890"
                                className={`${inputClassName} pl-12`}
                            />
                        </div>
                    </label>

                    <label>
                        <FieldLabel
                            required
                        >
                            Country
                        </FieldLabel>

                        <div className="relative">
                            <Globe2
                                className="
                                    pointer-events-none
                                    absolute
                                    left-4 top-1/2
                                    mt-1 h-5 w-5
                                    -translate-y-1/2
                                    text-slate-400
                                "
                            />

                            <input
                                type="text"
                                name="country"
                                required
                                autoComplete="country-name"
                                placeholder="United Kingdom"
                                className={`${inputClassName} pl-12`}
                            />
                        </div>
                    </label>
                </div>
            </section>

            {/* Travel dates */}
            <section
                className="
                    rounded-[2rem]
                    border border-slate-200
                    bg-white
                    p-6
                    shadow-[0_18px_60px_rgba(18,50,45,0.06)]
                    sm:p-8
                "
            >
                <SectionTitle
                    icon={
                        <CalendarDays className="h-5 w-5" />
                    }
                    eyebrow="Step 02"
                    title="Travel dates and group size"
                    description="Estimated dates are completely fine. We can adjust the final itinerary later."
                />

                <div className="grid gap-5 sm:grid-cols-2">
                    <label>
                        <FieldLabel
                            required
                        >
                            Expected arrival date
                        </FieldLabel>

                        <input
                            type="date"
                            name="arrivalDate"
                            required
                            min={
                                today ||
                                undefined
                            }
                            className={
                                inputClassName
                            }
                        />
                    </label>

                    <label>
                        <FieldLabel>
                            Expected departure date
                        </FieldLabel>

                        <input
                            type="date"
                            name="departureDate"
                            min={
                                today ||
                                undefined
                            }
                            className={
                                inputClassName
                            }
                        />
                    </label>

                    <label>
                        <FieldLabel
                            required
                        >
                            Adults
                        </FieldLabel>

                        <div className="relative">
                            <UsersRound
                                className="
                                    pointer-events-none
                                    absolute
                                    left-4 top-1/2
                                    mt-1 h-5 w-5
                                    -translate-y-1/2
                                    text-slate-400
                                "
                            />

                            <input
                                type="number"
                                name="adults"
                                required
                                min={1}
                                max={100}
                                defaultValue={
                                    2
                                }
                                className={`${inputClassName} pl-12`}
                            />
                        </div>
                    </label>

                    <label>
                        <FieldLabel>
                            Children
                        </FieldLabel>

                        <input
                            type="number"
                            name="children"
                            min={0}
                            max={100}
                            defaultValue={
                                0
                            }
                            className={
                                inputClassName
                            }
                        />
                    </label>
                </div>
            </section>

            {/* Package and vehicle */}
            <section
                className="
                    rounded-[2rem]
                    border border-slate-200
                    bg-white
                    p-6
                    shadow-[0_18px_60px_rgba(18,50,45,0.06)]
                    sm:p-8
                "
            >
                <SectionTitle
                    icon={
                        <PackageOpen className="h-5 w-5" />
                    }
                    eyebrow="Step 03"
                    title="Tour and vehicle preferences"
                    description="Select an existing package or request a completely custom private journey."
                />

                <div className="grid gap-5 sm:grid-cols-2">
                    <label>
                        <FieldLabel>
                            Preferred tour package
                        </FieldLabel>

                        <select
                            name="preferredPackageId"
                            defaultValue={
                                initialTourId
                            }
                            className={
                                selectClassName
                            }
                        >
                            <option value="">
                                Custom private tour
                            </option>

                            {tourOptions.map(
                                (
                                    option
                                ) => (
                                    <option
                                        key={
                                            option.id
                                        }
                                        value={
                                            option.id
                                        }
                                    >
                                        {
                                            option.label
                                        }
                                        {option.meta
                                            ? ` — ${option.meta}`
                                            : ""}
                                    </option>
                                )
                            )}
                        </select>
                    </label>

                    <label>
                        <FieldLabel>
                            Preferred vehicle
                        </FieldLabel>

                        <div className="relative">
                            <CarFront
                                className="
                                    pointer-events-none
                                    absolute
                                    left-4 top-1/2
                                    mt-1 h-5 w-5
                                    -translate-y-1/2
                                    text-slate-400
                                "
                            />

                            <select
                                name="preferredVehicleId"
                                defaultValue={
                                    initialVehicleId
                                }
                                className={`${selectClassName} pl-12`}
                            >
                                <option value="">
                                    Please recommend a vehicle
                                </option>

                                {vehicleOptions.map(
                                    (
                                        option
                                    ) => (
                                        <option
                                            key={
                                                option.id
                                            }
                                            value={
                                                option.id
                                            }
                                        >
                                            {
                                                option.label
                                            }
                                            {option.meta
                                                ? ` — ${option.meta}`
                                                : ""}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
                    </label>

                    <label>
                        <FieldLabel>
                            Travel style
                        </FieldLabel>

                        <div className="relative">
                            <Compass
                                className="
                                    pointer-events-none
                                    absolute
                                    left-4 top-1/2
                                    mt-1 h-5 w-5
                                    -translate-y-1/2
                                    text-slate-400
                                "
                            />

                            <select
                                name="travelStyle"
                                defaultValue=""
                                className={`${selectClassName} pl-12`}
                            >
                                <option value="">
                                    Select travel style
                                </option>

                                <option value="Culture and Heritage">
                                    Culture and heritage
                                </option>

                                <option value="Wildlife and Nature">
                                    Wildlife and nature
                                </option>

                                <option value="Beach Holiday">
                                    Beach holiday
                                </option>

                                <option value="Honeymoon and Romance">
                                    Honeymoon and romance
                                </option>

                                <option value="Family Holiday">
                                    Family holiday
                                </option>

                                <option value="Adventure">
                                    Adventure
                                </option>

                                <option value="Relaxed Private Tour">
                                    Relaxed private tour
                                </option>

                                <option value="Luxury Travel">
                                    Luxury travel
                                </option>
                            </select>
                        </div>
                    </label>

                    <label>
                        <FieldLabel>
                            Budget level
                        </FieldLabel>

                        <div className="relative">
                            <WalletCards
                                className="
                                    pointer-events-none
                                    absolute
                                    left-4 top-1/2
                                    mt-1 h-5 w-5
                                    -translate-y-1/2
                                    text-slate-400
                                "
                            />

                            <select
                                name="budgetLevel"
                                defaultValue=""
                                className={`${selectClassName} pl-12`}
                            >
                                <option value="">
                                    Select budget level
                                </option>

                                <option value="Budget">
                                    Budget
                                </option>

                                <option value="Comfort">
                                    Comfort
                                </option>

                                <option value="Mid-range">
                                    Mid-range
                                </option>

                                <option value="Premium">
                                    Premium
                                </option>

                                <option value="Luxury">
                                    Luxury
                                </option>

                                <option value="Not decided">
                                    Not decided yet
                                </option>
                            </select>
                        </div>
                    </label>

                    <label className="sm:col-span-2">
                        <FieldLabel>
                            Accommodation preference
                        </FieldLabel>

                        <div className="relative">
                            <Hotel
                                className="
                                    pointer-events-none
                                    absolute
                                    left-4 top-1/2
                                    mt-1 h-5 w-5
                                    -translate-y-1/2
                                    text-slate-400
                                "
                            />

                            <select
                                name="accommodation"
                                defaultValue=""
                                className={`${selectClassName} pl-12`}
                            >
                                <option value="">
                                    Select accommodation preference
                                </option>

                                <option value="No hotels required">
                                    No hotels required
                                </option>

                                <option value="Guesthouses and budget hotels">
                                    Guesthouses and budget hotels
                                </option>

                                <option value="3-star hotels">
                                    3-star hotels
                                </option>

                                <option value="4-star hotels">
                                    4-star hotels
                                </option>

                                <option value="5-star hotels">
                                    5-star hotels
                                </option>

                                <option value="Boutique hotels">
                                    Boutique hotels
                                </option>

                                <option value="Luxury resorts">
                                    Luxury resorts
                                </option>

                                <option value="Mixed accommodation">
                                    Mixed accommodation
                                </option>
                            </select>
                        </div>
                    </label>
                </div>
            </section>

            {/* Destinations */}
            <section
                className="
                    rounded-[2rem]
                    border border-slate-200
                    bg-white
                    p-6
                    shadow-[0_18px_60px_rgba(18,50,45,0.06)]
                    sm:p-8
                "
            >
                <SectionTitle
                    icon={
                        <MapPin className="h-5 w-5" />
                    }
                    eyebrow="Step 04"
                    title="Destinations you would like to visit"
                    description="Choose as many places as you like. Our route planner will organise them into a realistic journey."
                />

                {destinationOptions.length >
                0 ? (
                    <div
                        className="
                            grid gap-3
                            sm:grid-cols-2
                            lg:grid-cols-3
                        "
                    >
                        {destinationOptions.map(
                            (
                                destination
                            ) => (
                                <label
                                    key={
                                        destination.id
                                    }
                                    className="
                                        group
                                        flex cursor-pointer
                                        items-start
                                        gap-3
                                        rounded-2xl
                                        border
                                        border-slate-200
                                        bg-[#F7FAF9]
                                        p-4
                                        transition
                                        hover:border-[#008D86]/40
                                        hover:bg-[#008D86]/[0.05]
                                    "
                                >
                                    <input
                                        type="checkbox"
                                        name="destinations"
                                        value={
                                            destination.id
                                        }
                                        defaultChecked={initialDestinationIds.includes(
                                            destination.id
                                        )}
                                        className="
                                            mt-1
                                            h-4 w-4
                                            rounded
                                            border-slate-300
                                            accent-[#008D86]
                                        "
                                    />

                                    <span>
                                        <span className="block font-bold text-slate-900">
                                            {
                                                destination.label
                                            }
                                        </span>

                                        {destination.meta && (
                                            <span className="mt-1 block text-xs leading-5 text-slate-500">
                                                {
                                                    destination.meta
                                                }
                                            </span>
                                        )}
                                    </span>
                                </label>
                            )
                        )}
                    </div>
                ) : (
                    <div
                        className="
                            rounded-2xl
                            border
                            border-dashed
                            border-slate-300
                            bg-[#F7FAF9]
                            p-6
                            text-center
                            text-slate-600
                        "
                    >
                        Destination options are
                        temporarily unavailable. Add
                        your preferred places in the
                        requirements box below.
                    </div>
                )}
            </section>

            {/* Requirements */}
            <section
                className="
                    rounded-[2rem]
                    border border-slate-200
                    bg-white
                    p-6
                    shadow-[0_18px_60px_rgba(18,50,45,0.06)]
                    sm:p-8
                "
            >
                <SectionTitle
                    icon={
                        <MessageSquareText className="h-5 w-5" />
                    }
                    eyebrow="Step 05"
                    title="Tell us about your ideal journey"
                    description="Share interests, preferred pace, celebrations, mobility requirements or anything else our planner should know."
                />

                <label>
                    <FieldLabel>
                        Additional requirements
                    </FieldLabel>

                    <textarea
                        name="message"
                        rows={6}
                        placeholder="Example: We prefer a relaxed journey with culture, wildlife, the Ella train ride and several days at the beach."
                        className="
                            mt-2 w-full
                            resize-y
                            rounded-2xl
                            border border-slate-300
                            bg-white
                            px-4 py-3
                            leading-7
                            text-slate-900
                            outline-none
                            transition
                            placeholder:text-slate-400
                            focus:border-[#008D86]
                            focus:ring-4
                            focus:ring-[#008D86]/10
                        "
                    />
                </label>

                <label className="mt-5 block">
                    <FieldLabel>
                        How did you find us?
                    </FieldLabel>

                    <select
                        name="referralSource"
                        defaultValue=""
                        className={
                            selectClassName
                        }
                    >
                        <option value="">
                            Select an option
                        </option>

                        <option value="Google Search">
                            Google Search
                        </option>

                        <option value="Google Maps">
                            Google Maps
                        </option>

                        <option value="Facebook">
                            Facebook
                        </option>

                        <option value="Instagram">
                            Instagram
                        </option>

                        <option value="TikTok">
                            TikTok
                        </option>

                        <option value="Tripadvisor">
                            Tripadvisor
                        </option>

                        <option value="Recommendation">
                            Friend or family recommendation
                        </option>

                        <option value="Travel Agent">
                            Travel agent
                        </option>

                        <option value="AI Assistant">
                            ChatGPT or another AI assistant
                        </option>

                        <option value="Other">
                            Other
                        </option>
                    </select>
                </label>

                <label
                    className="
                        mt-6
                        flex items-start
                        gap-3
                        rounded-2xl
                        bg-[#F7FAF9]
                        p-4
                        text-sm
                        leading-6
                        text-slate-600
                    "
                >
                    <input
                        type="checkbox"
                        required
                        className="
                            mt-1
                            h-4 w-4
                            shrink-0
                            accent-[#008D86]
                        "
                    />

                    <span>
                        I agree that Dream Ceylon
                        Journeys may contact me
                        regarding this travel
                        request.
                    </span>
                </label>

                {errorMessage && (
                    <div
                        role="alert"
                        className="
                            mt-6
                            rounded-2xl
                            border
                            border-rose-200
                            bg-rose-50
                            px-5 py-4
                            text-sm
                            leading-6
                            text-rose-700
                        "
                    >
                        {errorMessage}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={
                        isSubmitting
                    }
                    className="
                        mt-7
                        inline-flex
                        min-h-14
                        w-full
                        items-center
                        justify-center
                        gap-3
                        rounded-full
                        bg-[#C62D52]
                        px-8
                        font-bold
                        text-white
                        shadow-[0_16px_35px_rgba(198,45,82,0.25)]
                        transition
                        hover:-translate-y-0.5
                        hover:bg-[#A92343]
                        disabled:translate-y-0
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                        sm:w-auto
                    "
                >
                    {isSubmitting ? (
                        <>
                            <LoaderCircle className="h-5 w-5 animate-spin" />

                            Submitting Your Request…
                        </>
                    ) : (
                        <>
                            <Send className="h-5 w-5" />

                            Submit My Tour Request
                        </>
                    )}
                </button>

                <div
                    className="
                        mt-5
                        flex items-start
                        gap-3
                        text-sm
                        leading-6
                        text-slate-500
                    "
                >
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#008D86]" />

                    Your request will appear
                    directly inside the Dream
                    Ceylon CRM for review by the
                    travel planning team.
                </div>
            </section>
        </form>
    );
}