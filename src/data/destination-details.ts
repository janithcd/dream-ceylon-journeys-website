import "server-only";

export type DestinationFactIcon =
    | "temperature"
    | "stay"
    | "season"
    | "location"
    | "heritage"
    | "elevation";

export type DestinationQuickFact = {
    label: string;
    value: string;
    note?: string;
    icon: DestinationFactIcon;
};

export type DestinationActivity = {
    title: string;
    description: string;
    duration?: string;
    bestTime?: string;
    difficulty?: string;
};

export type NearbyPlace = {
    name: string;
    travelTime: string;
    distance?: string;
    description: string;
    destinationSlug?: string;
    mapUrl?: string;
};

export type RouteConnection = {
    route: string;
    travelTime: string;
    description: string;
    note?: string;
};

export type DestinationClimate = {
    temperatureRange: string;
    bestMonths: string;
    relativelyDrierPeriods: string;
    wetterPeriods: string;
    advice: string;
};

export type DestinationLocation = {
    latitude: number;
    longitude: number;
    areaDescription: string;
    mapEmbedUrl: string;
    directionsUrl: string;
};

export type DestinationFaq = {
    question: string;
    answer: string;
};

export type DestinationSource = {
    label: string;
    url: string;
};

export type DestinationDetail = {
    slug: string;

    introduction: string[];

    quickFacts: DestinationQuickFact[];

    climate: DestinationClimate;

    location: DestinationLocation;

    recommendedStay: string;

    activities: DestinationActivity[];

    nearbyPlaces: NearbyPlace[];

    routeConnections: RouteConnection[];

    practicalTips: string[];

    faqs: DestinationFaq[];

    sources: DestinationSource[];

    lastVerified: string;

    planningDisclaimer: string;
};

const destinationDetails: Record<
    string,
    DestinationDetail
> = {
    sigiriya: {
        slug: "sigiriya",

        introduction: [
            "Sigiriya is one of Sri Lanka’s most important cultural destinations and a central stop within the Cultural Triangle. The ancient complex combines a royal citadel, landscaped water gardens, defensive structures, frescoes and panoramic views from the summit.",

            "The destination works particularly well as a two or three-night base because travellers can combine Sigiriya Rock Fortress with Pidurangala, Dambulla, wildlife safaris and the ancient cities of Polonnaruwa or Anuradhapura.",

            "A private chauffeur-guided route allows the main climb to be scheduled early in the morning while nearby cultural and wildlife experiences can be arranged around the temperature, weather and the traveller’s preferred pace.",
        ],

        quickFacts: [
            {
                label: "Typical temperature",
                value: "24°C – 34°C",
                note:
                    "Approximate planning range. Midday conditions can feel hotter.",
                icon: "temperature",
            },
            {
                label: "Recommended stay",
                value: "2 – 3 nights",
                note:
                    "Suitable for combining heritage, nature and safari experiences.",
                icon: "stay",
            },
            {
                label: "Best visiting time",
                value: "Early morning",
                note:
                    "A morning start generally provides cooler climbing conditions.",
                icon: "season",
            },
            {
                label: "Location",
                value: "Central Province",
                note:
                    "Matale District within Sri Lanka’s Cultural Triangle.",
                icon: "location",
            },
            {
                label: "Heritage status",
                value: "UNESCO World Heritage",
                note:
                    "The Ancient City of Sigiriya was inscribed in 1982.",
                icon: "heritage",
            },
        ],

        climate: {
            temperatureRange:
                "Typical daytime temperatures are approximately 28°C to 34°C, with cooler conditions during the early morning and evening.",

            bestMonths:
                "Sigiriya can be visited throughout the year. January to March and parts of June to September often provide useful planning windows for Cultural Triangle routes.",

            relativelyDrierPeriods:
                "Conditions can be relatively drier during parts of the first quarter and the middle of the year, although tropical showers remain possible.",

            wetterPeriods:
                "Rain and thunderstorms are more likely during inter-monsoon periods, particularly later in the year.",

            advice:
                "Start the main climb early, carry drinking water, use sun protection and keep a light rain layer available. Climate information is general guidance rather than a live forecast.",
        },

        location: {
            latitude: 7.95,
            longitude: 80.75,

            areaDescription:
                "Sigiriya is located in Matale District in Sri Lanka’s Central Province. It sits between Dambulla, Habarana and Polonnaruwa, making it a practical base for exploring the Cultural Triangle.",

            mapEmbedUrl:
                "https://www.google.com/maps?q=7.95,80.75&z=13&output=embed",

            directionsUrl:
                "https://www.google.com/maps/search/?api=1&query=Sigiriya+Rock+Fortress+Sri+Lanka",
        },

        recommendedStay:
            "Two nights are suitable for Sigiriya, Pidurangala and one nearby experience. Three nights provide a more relaxed pace and allow time for Dambulla, a safari or Polonnaruwa.",

        activities: [
            {
                title:
                    "Climb Sigiriya Rock Fortress",

                description:
                    "Explore the landscaped gardens, mirror wall, historic fresco area, lion staircase and summit ruins of the ancient royal citadel.",

                duration:
                    "Approximately 3 – 4 hours",

                bestTime:
                    "Early morning",

                difficulty:
                    "Moderate climb with many stairs",
            },
            {
                title:
                    "Watch sunrise from Pidurangala",

                description:
                    "Climb the nearby rock for a wide landscape view and one of the best elevated perspectives of Sigiriya Rock.",

                duration:
                    "Approximately 2 – 3 hours",

                bestTime:
                    "Before sunrise or late afternoon",

                difficulty:
                    "Moderate with a short rocky section",
            },
            {
                title:
                    "Visit Dambulla Cave Temple",

                description:
                    "Discover a historic cave-temple complex containing Buddhist statues, paintings and religious spaces within the Cultural Triangle.",

                duration:
                    "Approximately 1.5 – 2 hours",

                bestTime:
                    "Morning or late afternoon",

                difficulty:
                    "Moderate stair climb",
            },
            {
                title:
                    "Join a wildlife safari",

                description:
                    "Visit Minneriya, Kaudulla or another suitable nearby park depending on the season and current wildlife movement.",

                duration:
                    "Approximately 3 – 4 hours",

                bestTime:
                    "Morning or afternoon depending on conditions",

                difficulty:
                    "Suitable for most travellers",
            },
            {
                title:
                    "Experience a local village",

                description:
                    "Add a locally arranged village experience involving rural scenery, traditional food or farming activities according to availability.",

                duration:
                    "Approximately 2 – 3 hours",

                bestTime:
                    "Morning or afternoon",

                difficulty:
                    "Easy",
            },
        ],

        nearbyPlaces: [
            {
                name: "Pidurangala Rock",

                travelTime:
                    "Approximately 10 – 15 minutes",

                distance:
                    "Around 4 km",

                description:
                    "A popular sunrise and sunset viewpoint offering a direct panoramic view of Sigiriya Rock.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Pidurangala+Rock+Sri+Lanka",
            },
            {
                name:
                    "Dambulla Cave Temple",

                travelTime:
                    "Approximately 30 – 40 minutes",

                distance:
                    "Around 20 km",

                description:
                    "A major Buddhist cave-temple complex that combines naturally with a Sigiriya itinerary.",

                destinationSlug:
                    "dambulla",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Dambulla+Cave+Temple+Sri+Lanka",
            },
            {
                name:
                    "Minneriya National Park",

                travelTime:
                    "Approximately 35 – 50 minutes",

                distance:
                    "Around 30 km",

                description:
                    "A wildlife area known for elephants, birdlife and seasonal safari opportunities.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Minneriya+National+Park+Sri+Lanka",
            },
            {
                name: "Polonnaruwa",

                travelTime:
                    "Approximately 1 hour 15 minutes – 1 hour 45 minutes",

                distance:
                    "Around 55 km",

                description:
                    "An ancient royal city containing archaeological ruins, monuments, reservoirs and religious sites.",

                destinationSlug:
                    "polonnaruwa",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Polonnaruwa+Ancient+City+Sri+Lanka",
            },
            {
                name: "Anuradhapura",

                travelTime:
                    "Approximately 1 hour 45 minutes – 2 hours 15 minutes",

                distance:
                    "Around 75 km",

                description:
                    "A sacred ancient city known for monumental stupas, monasteries and important Buddhist heritage.",

                destinationSlug:
                    "anuradhapura",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Anuradhapura+Ancient+City+Sri+Lanka",
            },
        ],

        routeConnections: [
            {
                route:
                    "Colombo Airport → Sigiriya",

                travelTime:
                    "Approximately 3.5 – 4.5 hours",

                description:
                    "A common first-day private transfer for travellers beginning their journey in the Cultural Triangle.",

                note:
                    "Actual time depends on arrival time, traffic, comfort stops and road conditions.",
            },
            {
                route:
                    "Anuradhapura → Sigiriya",

                travelTime:
                    "Approximately 1.5 – 2 hours",

                description:
                    "A useful heritage route connecting two of Sri Lanka’s major ancient destinations.",
            },
            {
                route:
                    "Sigiriya → Kandy",

                travelTime:
                    "Approximately 2.5 – 3.5 hours",

                description:
                    "A classic route from the Cultural Triangle towards Sri Lanka’s sacred hill capital.",

                note:
                    "Dambulla and Matale can be included depending on the itinerary.",
            },
            {
                route:
                    "Sigiriya → Polonnaruwa",

                travelTime:
                    "Approximately 1.25 – 1.75 hours",

                description:
                    "Suitable as a day trip or as part of a wider Cultural Triangle itinerary.",
            },
        ],

        practicalTips: [
            "Begin the Sigiriya climb early to avoid stronger midday heat.",

            "Wear supportive footwear with good grip because the route includes stairs and exposed sections.",

            "Carry water, sun protection and a hat, but avoid carrying unnecessary heavy bags.",

            "Travellers with reduced mobility, vertigo or serious health concerns should review the climb before starting.",

            "Dress respectfully when combining Sigiriya with Dambulla or other religious sites.",

            "Entrance fees, opening hours and access arrangements can change and should be reconfirmed before travel.",

            "Wildlife sightings and the best safari park depend on natural and seasonal conditions.",
        ],

        faqs: [
            {
                question:
                    "How many nights should I stay in Sigiriya?",

                answer:
                    "Two nights are suitable for the main fortress, Pidurangala and one nearby activity. Three nights provide a more relaxed Cultural Triangle experience with time for Dambulla, a safari or Polonnaruwa.",
            },
            {
                question:
                    "Is the Sigiriya climb difficult?",

                answer:
                    "The climb includes many stairs and exposed elevated sections. Most reasonably active travellers can complete it at a comfortable pace, but it may not be suitable for everyone.",
            },
            {
                question:
                    "What is the best time to climb Sigiriya?",

                answer:
                    "An early-morning start is generally recommended because temperatures are cooler and the site may be less crowded than later in the day.",
            },
            {
                question:
                    "Can children visit Sigiriya?",

                answer:
                    "Many families visit Sigiriya, but children should be supervised closely on stairs and elevated sections. The suitability depends on the child’s age, confidence and fitness.",
            },
            {
                question:
                    "Can Sigiriya and Dambulla be visited on the same day?",

                answer:
                    "Yes. They are commonly combined, although starting early and allowing sufficient rest time creates a more comfortable itinerary.",
            },
            {
                question:
                    "Which safari should I combine with Sigiriya?",

                answer:
                    "Minneriya and Kaudulla are common options, but the most suitable park can vary with wildlife movement, weather and seasonal conditions. The final choice should be confirmed locally.",
            },
        ],

        sources: [
            {
                label:
                    "UNESCO — Ancient City of Sigiriya",

                url:
                    "https://whc.unesco.org/en/list/202/",
            },
            {
                label:
                    "Sri Lanka Tourism — Sigiriya Rock Fortress and City",

                url:
                    "https://srilanka.travel/heritage-discover-the-past?article=28",
            },
            {
                label:
                    "Sri Lanka Tourism — Climate Guide",

                url:
                    "https://www.srilanka.travel/weather",
            },
        ],

        lastVerified:
            "2026-07-19",

        planningDisclaimer:
            "Travel times, climate ranges, opening arrangements, entrance fees and activity availability are approximate and must be reconfirmed before the final itinerary is issued.",
    },
    ella: {
        slug: "ella",

        introduction: [
            "Ella is a scenic hill-country town in Sri Lanka’s Uva Province, surrounded by tea-covered slopes, forest, waterfalls and mountain viewpoints.",

            "The destination is well suited to travellers interested in light hiking, railway scenery, photography, tea-country landscapes and a slower atmosphere between the central highlands and Sri Lanka’s wildlife regions.",

            "Ella is commonly included after Kandy or Nuwara Eliya and before continuing towards Yala, Udawalawe or the south coast.",
        ],

        quickFacts: [
            {
                label:
                    "Typical temperature",

                value:
                    "18°C – 30°C",

                note:
                    "Mornings and evenings can feel considerably cooler than the lowlands.",

                icon:
                    "temperature",
            },
            {
                label:
                    "Recommended stay",

                value:
                    "2 – 3 nights",

                note:
                    "Allows time for viewpoints, walks and tea-country experiences.",

                icon:
                    "stay",
            },
            {
                label:
                    "Best visiting time",

                value:
                    "Early morning",

                note:
                    "Morning conditions often provide clearer views for outdoor activities.",

                icon:
                    "season",
            },
            {
                label:
                    "Location",

                value:
                    "Uva Province",

                note:
                    "Badulla District in Sri Lanka’s hill country.",

                icon:
                    "location",
            },
            {
                label:
                    "Approximate elevation",

                value:
                    "Around 1,000 metres",

                note:
                    "The elevation contributes to Ella’s cooler hill-country climate.",

                icon:
                    "elevation",
            },
        ],

        climate: {
            temperatureRange:
                "Typical conditions range from cooler mornings and evenings near 18°C to warm daytime temperatures that can approach 30°C.",

            bestMonths:
                "January to March often provides useful windows for clearer hill-country mornings, although Ella remains a year-round destination.",

            relativelyDrierPeriods:
                "Clearer periods are often more likely during the early months of the year, but hill-country weather can change quickly.",

            wetterPeriods:
                "Rain, mist and cloud can occur throughout the year, with heavier or more frequent showers during wetter seasonal periods.",

            advice:
                "Plan hikes early, carry a light rain jacket and keep flexible alternatives for misty or wet conditions. Climate information is general guidance rather than a live forecast.",
        },

        location: {
            latitude:
                6.8736,

            longitude:
                81.049,

            areaDescription:
                "Ella is located in Badulla District in Sri Lanka’s Uva Province. The town lies along an important hill-country route connecting Nuwara Eliya and Bandarawela with Yala and the southern region.",

            mapEmbedUrl:
                "https://www.google.com/maps?q=6.8736,81.049&z=13&output=embed",

            directionsUrl:
                "https://www.google.com/maps/search/?api=1&query=Ella+Sri+Lanka",
        },

        recommendedStay:
            "Two nights allow time for Nine Arch Bridge, Little Adam’s Peak and the town. Three nights provide a more relaxed stay with an additional hike, tea experience or nearby excursion.",

        activities: [
            {
                title:
                    "Visit Nine Arch Bridge",

                description:
                    "Walk through tea-country scenery to one of Sri Lanka’s most photographed railway landmarks.",

                duration:
                    "Approximately 1.5 – 2.5 hours",

                bestTime:
                    "Early morning",

                difficulty:
                    "Easy to moderate depending on the route",
            },
            {
                title:
                    "Hike Little Adam’s Peak",

                description:
                    "Follow a relatively accessible hill-country trail to panoramic viewpoints over the surrounding valleys and mountains.",

                duration:
                    "Approximately 1.5 – 2.5 hours",

                bestTime:
                    "Early morning or late afternoon",

                difficulty:
                    "Easy to moderate",
            },
            {
                title:
                    "Hike Ella Rock",

                description:
                    "Take a longer hike through railway-side paths, forest and open mountain areas to a higher viewpoint.",

                duration:
                    "Approximately 4 – 6 hours",

                bestTime:
                    "Early morning",

                difficulty:
                    "Moderate to challenging",
            },
            {
                title:
                    "Explore a tea estate",

                description:
                    "Learn about tea cultivation and production while enjoying the scenery of Sri Lanka’s hill country.",

                duration:
                    "Approximately 2 – 3 hours",

                bestTime:
                    "Morning or afternoon",

                difficulty:
                    "Easy",
            },
            {
                title:
                    "Stop at Ravana Falls",

                description:
                    "Visit a well-known waterfall situated along the road connecting Ella with the southern plains.",

                duration:
                    "Approximately 30 – 60 minutes",

                bestTime:
                    "During daylight",

                difficulty:
                    "Easy from the roadside viewing area",
            },
        ],

        nearbyPlaces: [
            {
                name:
                    "Nine Arch Bridge",

                travelTime:
                    "Approximately 10 – 20 minutes to the access area",

                description:
                    "A historic railway bridge surrounded by forest and tea-country scenery.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Nine+Arch+Bridge+Ella+Sri+Lanka",
            },
            {
                name:
                    "Little Adam’s Peak",

                travelTime:
                    "Approximately 10 – 15 minutes to the trail area",

                description:
                    "A popular short hill-country hike with broad views across the Ella landscape.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Little+Adams+Peak+Ella+Sri+Lanka",
            },
            {
                name:
                    "Ravana Falls",

                travelTime:
                    "Approximately 15 – 25 minutes",

                distance:
                    "Around 7 km",

                description:
                    "A prominent roadside waterfall situated along the Ella–Wellawaya route.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Ravana+Falls+Sri+Lanka",
            },
            {
                name:
                    "Haputale",

                travelTime:
                    "Approximately 1 – 1.5 hours",

                description:
                    "A quieter hill-country town providing access to tea landscapes and viewpoints such as Lipton’s Seat.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Haputale+Sri+Lanka",
            },
            {
                name:
                    "Diyaluma Falls",

                travelTime:
                    "Approximately 1.5 – 2 hours",

                description:
                    "A major waterfall excursion requiring careful route and weather planning.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Diyaluma+Falls+Sri+Lanka",
            },
            {
                name:
                    "Nuwara Eliya",

                travelTime:
                    "Approximately 2.5 – 3.5 hours by road",

                description:
                    "A highland destination known for tea estates, cool weather, gardens and colonial-era character.",

                destinationSlug:
                    "nuwara-eliya",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Nuwara+Eliya+Sri+Lanka",
            },
        ],

        routeConnections: [
            {
                route:
                    "Kandy → Ella",

                travelTime:
                    "Approximately 4.5 – 6 hours by road",

                description:
                    "A major hill-country route connecting Sri Lanka’s cultural capital with Ella.",

                note:
                    "A scenic train journey may be used for part or all of this route, subject to current schedules and seat availability.",
            },
            {
                route:
                    "Nuwara Eliya → Ella",

                travelTime:
                    "Approximately 2.5 – 3.5 hours by road",

                description:
                    "A scenic tea-country route that can include viewpoints, estates or a railway segment.",
            },
            {
                route:
                    "Ella → Yala",

                travelTime:
                    "Approximately 2.5 – 3.5 hours",

                description:
                    "A popular transition from the hill country to Sri Lanka’s southern wildlife region.",

                note:
                    "Ravana Falls and other route stops can be considered depending on timing.",
            },
            {
                route:
                    "Ella → Mirissa",

                travelTime:
                    "Approximately 3.5 – 4.5 hours",

                description:
                    "Connects the hill country with the south coast for beach time, whale watching and coastal activities.",
            },
            {
                route:
                    "Ella → Colombo",

                travelTime:
                    "Approximately 5.5 – 7 hours by road",

                description:
                    "A longer transfer generally used near the end of a journey or when connecting with Colombo.",
            },
        ],

        practicalTips: [
            "Begin hikes early because morning conditions may provide clearer views and cooler temperatures.",

            "Carry a lightweight rain jacket because hill-country conditions can change quickly.",

            "Wear suitable footwear because trails and railway-side paths may become slippery.",

            "Do not walk on active railway tracks and follow local safety instructions near bridges and railway areas.",

            "Train tickets and reserved seats should be planned in advance, but schedules and availability must be reconfirmed.",

            "Avoid entering waterfalls, pools or cliff-edge areas during heavy rain or unsafe conditions.",

            "Allow extra travel time when fog, rain, roadworks or traffic affect hill-country roads.",
        ],

        faqs: [
            {
                question:
                    "How many nights should I stay in Ella?",

                answer:
                    "Two nights are suitable for the main viewpoints and town. Three nights allow a more relaxed visit with a longer hike, tea experience or nearby excursion.",
            },
            {
                question:
                    "Is Ella suitable for families?",

                answer:
                    "Ella can suit families, although the suitability of individual hikes depends on children’s ages, weather, footwear and fitness.",
            },
            {
                question:
                    "What is the easiest hike in Ella?",

                answer:
                    "Little Adam’s Peak is generally considered one of the more accessible popular viewpoints, although it still includes uphill walking and steps.",
            },
            {
                question:
                    "Can I travel from Kandy to Ella by train?",

                answer:
                    "Train travel is a popular option, but timetables, operational conditions and reserved-seat availability must be checked before the journey.",
            },
            {
                question:
                    "Can Ella and Yala be included in the same itinerary?",

                answer:
                    "Yes. Ella to Yala is one of the most common route connections between Sri Lanka’s hill country and southern wildlife region.",
            },
            {
                question:
                    "Does it rain frequently in Ella?",

                answer:
                    "Ella is a tropical hill-country destination where showers, mist and cloud can occur throughout the year. Outdoor plans should remain flexible.",
            },
        ],

        sources: [
            {
                label:
                    "Sri Lanka Tourism — Little Adam’s Peak and Ella",

                url:
                    "https://srilanka.travel/attraction?attraction_id=183",
            },
            {
                label:
                    "Sri Lanka Railways",

                url:
                    "https://www.railway.gov.lk/web/",
            },
            {
                label:
                    "Sri Lanka Tourism — Climate Guide",

                url:
                    "https://www.srilanka.travel/weather",
            },
        ],

        lastVerified:
            "2026-07-19",

        planningDisclaimer:
            "Travel times, railway operations, climate ranges, hiking conditions and activity availability are approximate and must be reconfirmed before the final itinerary is issued.",
    },
    kandy: {
        slug: "kandy",

        introduction: [
            "Kandy is Sri Lanka’s historic hill capital and one of the country’s most important cultural and religious destinations. Set among green hills in the Central Province, the city combines royal heritage, Buddhist traditions, lakeside scenery, gardens, arts and access to the central highlands.",

            "The Sacred City of Kandy was the last capital of the Sinhala kings and is home to the Temple of the Sacred Tooth Relic, one of the most revered Buddhist pilgrimage sites in Sri Lanka. The city’s historic importance, architecture and living traditions led to its inscription as a UNESCO World Heritage Site in 1988.",

            "Kandy is also an important route connection between Sigiriya and Sri Lanka’s hill country. Travellers commonly continue from Kandy towards Nuwara Eliya, Ella or the Knuckles region, making the city a practical and culturally rewarding stop within a private Sri Lanka itinerary.",
        ],

        quickFacts: [
            {
                label: "Typical temperature",
                value: "20°C – 30°C",
                note:
                    "Approximate planning range. Evenings can feel cooler than Sri Lanka’s coastal areas.",
                icon: "temperature",
            },
            {
                label: "Recommended stay",
                value: "2 – 3 nights",
                note:
                    "Suitable for heritage, gardens, viewpoints and nearby excursions.",
                icon: "stay",
            },
            {
                label: "Best visiting time",
                value: "Morning and late afternoon",
                note:
                    "Useful for temple visits, walking and avoiding stronger midday heat.",
                icon: "season",
            },
            {
                label: "Location",
                value: "Central Province",
                note:
                    "Kandy District in Sri Lanka’s central hill region.",
                icon: "location",
            },
            {
                label: "Heritage status",
                value: "UNESCO World Heritage",
                note:
                    "The Sacred City of Kandy was inscribed in 1988.",
                icon: "heritage",
            },
        ],

        climate: {
            temperatureRange:
                "Kandy generally has warm daytime conditions and comparatively cooler mornings and evenings because of its central hill-country location. A practical planning range is approximately 20°C to 30°C, although temperatures vary with elevation, season, rainfall and time of day.",

            bestMonths:
                "Kandy can be visited throughout the year. January to March often provides useful planning periods for clearer mornings, while the annual Esala Perahera period attracts large numbers of visitors on dates that vary each year.",

            relativelyDrierPeriods:
                "Parts of January through March can be relatively drier, although tropical showers remain possible and weather patterns vary from year to year.",

            wetterPeriods:
                "Rain and thunderstorms may occur during monsoon and inter-monsoon periods, particularly around April to May and October to December. Rain can affect viewpoints, walking routes and road travel.",

            advice:
                "Carry a light rain layer, wear comfortable walking shoes and keep modest clothing available for religious sites. Kandy’s weather can change during the day, so outdoor activities should remain flexible.",
        },

        location: {
            latitude: 7.2906,
            longitude: 80.6337,

            areaDescription:
                "Kandy is located in Sri Lanka’s Central Province, surrounded by forested hills and centred around Kandy Lake and the historic royal complex. It is an important route bridge between the Cultural Triangle, tea country and Sri Lanka’s central highlands.",

            mapEmbedUrl:
                "https://www.google.com/maps?q=7.2906,80.6337&z=13&output=embed",

            directionsUrl:
                "https://www.google.com/maps/search/?api=1&query=Kandy+Sri+Lanka",
        },

        recommendedStay:
            "Two nights are suitable for the Temple of the Tooth, Kandy Lake, a cultural performance and the Royal Botanic Gardens. Three nights provide a more relaxed visit with time for viewpoints, Udawattakele, Ambuluwawa, the Knuckles region or another nearby excursion.",

        activities: [
            {
                title:
                    "Visit the Temple of the Sacred Tooth Relic",

                description:
                    "Explore Kandy’s most important religious landmark within the historic royal palace complex. The temple houses Sri Lanka’s sacred Tooth Relic and remains an active place of Buddhist worship and pilgrimage.",

                duration:
                    "Approximately 1.5 – 2.5 hours",

                bestTime:
                    "Early morning or during an evening ritual period",

                difficulty:
                    "Easy walking with some steps",
            },
            {
                title:
                    "Walk around Kandy Lake",

                description:
                    "Enjoy a relaxed walk around the historic lake at the centre of the city, with views towards the Temple of the Tooth, royal buildings, hills and everyday city life.",

                duration:
                    "Approximately 1 – 1.5 hours",

                bestTime:
                    "Early morning or late afternoon",

                difficulty:
                    "Easy",
            },
            {
                title:
                    "Explore the Royal Botanic Gardens, Peradeniya",

                description:
                    "Walk through one of Sri Lanka’s most important botanical gardens, featuring extensive collections of palms, orchids, medicinal plants, flowering trees and tropical species beside the Mahaweli River.",

                duration:
                    "Approximately 2 – 3 hours",

                bestTime:
                    "Morning or late afternoon",

                difficulty:
                    "Easy to moderate walking",
            },
            {
                title:
                    "Watch a Kandyan cultural performance",

                description:
                    "Experience traditional drumming, dancing, costumes and performance styles associated with Sri Lanka’s central highlands and Kandyan cultural heritage.",

                duration:
                    "Approximately 1 – 1.5 hours",

                bestTime:
                    "Usually late afternoon or evening",

                difficulty:
                    "Suitable for most travellers",
            },
            {
                title:
                    "Visit Bahirawakanda viewpoint",

                description:
                    "Travel to the elevated Bahirawakanda area for views across Kandy city, the surrounding hills and the large Buddha statue overlooking the urban landscape.",

                duration:
                    "Approximately 1 – 1.5 hours",

                bestTime:
                    "Morning or late afternoon",

                difficulty:
                    "Easy when reached by vehicle; includes some steps",
            },
            {
                title:
                    "Walk through Udawattakele Forest Reserve",

                description:
                    "Explore a protected forest area near central Kandy with shaded paths, tropical vegetation, birdlife and historic connections to the former royal city.",

                duration:
                    "Approximately 1.5 – 3 hours",

                bestTime:
                    "Morning",

                difficulty:
                    "Easy to moderate depending on the trail",
            },
        ],

        nearbyPlaces: [
            {
                name:
                    "Royal Botanic Gardens, Peradeniya",

                travelTime:
                    "Approximately 20 – 35 minutes",

                distance:
                    "Around 5.5 km west of Kandy",

                description:
                    "A major botanical attraction with extensive palm, orchid, medicinal, spice and tropical plant collections beside the Mahaweli River.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Royal+Botanic+Gardens+Peradeniya+Sri+Lanka",
            },
            {
                name:
                    "Ambuluwawa Biodiversity Complex",

                travelTime:
                    "Approximately 1 – 1.5 hours",

                distance:
                    "Around 25 km depending on the route",

                description:
                    "An elevated biodiversity and religious complex near Gampola, known for its distinctive tower and panoramic views during clear conditions.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Ambuluwawa+Tower+Sri+Lanka",
            },
            {
                name:
                    "Knuckles Mountain Range",

                travelTime:
                    "Approximately 1.5 – 3 hours depending on the selected access point",

                description:
                    "A mountain region offering scenery, villages, forest, viewpoints and hiking experiences that require route-specific planning.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Knuckles+Mountain+Range+Sri+Lanka",
            },
            {
                name:
                    "Matale",

                travelTime:
                    "Approximately 1 – 1.5 hours",

                distance:
                    "Around 25 km",

                description:
                    "A regional town between Kandy and Dambulla that can be combined with spice gardens, Hindu heritage and selected countryside stops.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Matale+Sri+Lanka",
            },
            {
                name:
                    "Nuwara Eliya",

                travelTime:
                    "Approximately 2.5 – 3.5 hours",

                description:
                    "A cooler highland destination known for tea estates, gardens, mountain scenery and colonial-era character.",

                destinationSlug:
                    "nuwara-eliya",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Nuwara+Eliya+Sri+Lanka",
            },
            {
                name:
                    "Sigiriya",

                travelTime:
                    "Approximately 2.5 – 3.5 hours",

                description:
                    "Sri Lanka’s famous ancient rock citadel and a central destination within the Cultural Triangle.",

                destinationSlug:
                    "sigiriya",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Sigiriya+Rock+Fortress+Sri+Lanka",
            },
        ],

        routeConnections: [
            {
                route:
                    "Sigiriya → Kandy",

                travelTime:
                    "Approximately 2.5 – 3.5 hours",

                description:
                    "A classic Sri Lanka route connecting the Cultural Triangle with the island’s historic hill capital.",

                note:
                    "Dambulla, Matale or a carefully selected spice-garden stop may be included depending on the itinerary and available time.",
            },
            {
                route:
                    "Colombo Airport → Kandy",

                travelTime:
                    "Approximately 3.5 – 5 hours",

                description:
                    "A common arrival transfer for travellers beginning their journey in central Sri Lanka.",

                note:
                    "Arrival time, traffic near Colombo, road conditions and comfort stops can significantly affect the journey.",
            },
            {
                route:
                    "Colombo → Kandy",

                travelTime:
                    "Approximately 3.5 – 5 hours by road",

                description:
                    "Connects Sri Lanka’s commercial capital with the central hill region and historic city of Kandy.",
            },
            {
                route:
                    "Kandy → Nuwara Eliya",

                travelTime:
                    "Approximately 2.5 – 3.5 hours",

                description:
                    "A scenic highland route that may include tea-country viewpoints, waterfalls and selected estate experiences.",

                note:
                    "Mountain roads, traffic and sightseeing stops can increase the total travel time.",
            },
            {
                route:
                    "Kandy → Ella",

                travelTime:
                    "Approximately 4.5 – 6 hours by road",

                description:
                    "A major hill-country connection between Kandy and Ella through Sri Lanka’s tea-growing regions.",

                note:
                    "A train journey may be included for part or all of this route, subject to current timetables, operational conditions and reserved-seat availability.",
            },
            {
                route:
                    "Kandy → Dambulla",

                travelTime:
                    "Approximately 2 – 3 hours",

                description:
                    "A useful route when travelling from Kandy back towards Dambulla, Sigiriya or the Cultural Triangle.",
            },
        ],

        practicalTips: [
            "Wear clothing that covers the shoulders and knees when entering the Temple of the Tooth and other religious locations.",

            "Shoes and hats must be removed before entering certain temple areas. Carry socks if the ground is hot or uncomfortable.",

            "Remain respectful during worship and avoid blocking devotees, ceremonies or religious processions for photographs.",

            "Temple opening arrangements, ritual times, security checks and ticket conditions should be reconfirmed before visiting.",

            "Allow extra travel time during religious festivals, public holidays and the Kandy Esala Perahera period because roads may be crowded or temporarily restricted.",

            "The dates of the Esala Perahera change each year according to the religious calendar and must be checked before advertising or booking.",

            "Reserve hill-country train seats early where possible, but always reconfirm schedules because railway operations can change.",

            "Carry a light rain jacket or umbrella because showers may occur even outside the wetter periods.",

            "Use comfortable footwear for Kandy Lake, the botanical gardens and forest walking routes.",

            "Travellers with limited mobility should review temple steps, walking distances and vehicle access before finalizing the daily schedule.",
        ],

        faqs: [
            {
                question:
                    "How many nights should I stay in Kandy?",

                answer:
                    "Two nights are suitable for the Temple of the Tooth, Kandy Lake, a cultural performance and the Royal Botanic Gardens. Three nights allow a more relaxed pace and time for an additional excursion.",
            },
            {
                question:
                    "Why is Kandy important?",

                answer:
                    "Kandy was the last capital of the Sinhala kings and remains one of Sri Lanka’s most important Buddhist, cultural and historic cities. It is home to the Temple of the Sacred Tooth Relic and is recognized as a UNESCO World Heritage Site.",
            },
            {
                question:
                    "What should I wear to the Temple of the Tooth?",

                answer:
                    "Visitors should wear modest clothing covering the shoulders and knees. Shoes and hats must be removed before entering designated religious areas.",
            },
            {
                question:
                    "Can Sigiriya and Kandy be included in the same tour?",

                answer:
                    "Yes. Sigiriya to Kandy is one of Sri Lanka’s most popular private-tour routes and can include Dambulla, Matale or selected cultural stops along the way.",
            },
            {
                question:
                    "Can I travel from Kandy to Ella by train?",

                answer:
                    "Yes, rail travel is a popular way to experience the hill country. However, current timetables, service changes and reserved-seat availability must be checked before the journey.",
            },
            {
                question:
                    "Is Kandy suitable for families?",

                answer:
                    "Kandy is generally suitable for families, with cultural attractions, gardens, city walks and performances. Parents should still consider temple behaviour, walking distances and weather.",
            },
            {
                question:
                    "When is the Kandy Esala Perahera?",

                answer:
                    "The festival normally takes place during the Esala season, but its exact dates change each year according to the religious calendar. Dates, ticket arrangements and road restrictions must be reconfirmed.",
            },
            {
                question:
                    "Is one day enough for Kandy?",

                answer:
                    "One day can cover the main temple and city highlights, but at least two nights provide a more comfortable experience and allow time for the Royal Botanic Gardens and a cultural performance.",
            },
        ],

        sources: [
            {
                label:
                    "UNESCO — Sacred City of Kandy",

                url:
                    "https://whc.unesco.org/en/list/450/",
            },
            {
                label:
                    "Sri Lanka Tourism — Cultural Heritage",

                url:
                    "https://www.srilanka.travel/cultural_heritage",
            },
            {
                label:
                    "Sri Lanka Tourism — Temple of the Sacred Tooth Relic",

                url:
                    "https://www.srilanka.travel/buddhist-places/attractions.php",
            },
            {
                label:
                    "Department of National Botanic Gardens — Royal Botanic Gardens Peradeniya",

                url:
                    "https://botanicgardens.gov.lk/service/royal-botanic-gardens-peradeniya/",
            },
            {
                label:
                    "Sri Lanka Railways — Train Schedules",

                url:
                    "https://railway.gov.lk/web/index.php/en/schedules",
            },
            {
                label:
                    "Department of Meteorology Sri Lanka",

                url:
                    "https://meteo.gov.lk/",
            },
        ],

        lastVerified:
            "2026-07-19",

        planningDisclaimer:
            "Travel times, temperatures, temple arrangements, ritual times, train operations, event dates, entrance fees and activity availability are approximate or subject to change. All operational details must be reconfirmed before issuing the final itinerary.",
    },
    yala: {
        slug: "yala",

        introduction: [
            "Yala National Park is one of Sri Lanka’s best-known wildlife destinations, situated in the island’s southeast across parts of the Southern and Uva Provinces. Its landscape includes dry forest, scrubland, grassland, rocky outcrops, lagoons, freshwater areas and coastal habitats.",

            "The park is especially known for Sri Lankan leopards, Asian elephants, sloth bears, crocodiles, deer, buffalo and extensive birdlife. Every safari is different, however, and sightings depend entirely on natural animal movement, weather, water availability, visitor pressure and luck.",

            "Yala fits naturally into a private Sri Lanka itinerary after Ella and before travelling towards Mirissa, Tangalle or Galle. Most travellers stay around Tissamaharama, Kirinda, Palatupana or Kataragama and enter the park with a licensed safari jeep.",
        ],

        quickFacts: [
            {
                label: "Average temperature",
                value: "Around 26°C – 27°C",
                note:
                    "Regional mean guidance; daytime safari conditions can feel considerably warmer.",
                icon: "temperature",
            },
            {
                label: "Recommended stay",
                value: "1 – 2 nights",
                note:
                    "Suitable for one safari, with additional time for nearby cultural or nature sites.",
                icon: "stay",
            },
            {
                label: "Best safari time",
                value: "Early morning or afternoon",
                note:
                    "Final timing depends on current park operations and local conditions.",
                icon: "season",
            },
            {
                label: "Location",
                value: "Southeast Sri Lanka",
                note:
                    "The protected area extends across the Southern and Uva Provinces.",
                icon: "location",
            },
            {
                label: "Destination type",
                value: "Wildlife & Nature",
                note:
                    "Dry-zone habitats, lagoons, coastal areas and wildlife safaris.",
                icon: "heritage",
            },
        ],

        climate: {
            temperatureRange:
                "The Yala region is generally hot and dry, with a regional mean temperature of approximately 26°C to 27°C. Daytime temperatures can feel hotter inside an open safari jeep, while early mornings may be more comfortable.",

            bestMonths:
                "Yala can be visited during much of the year. Drier periods can improve visibility around remaining water sources, but wildlife activity changes naturally and no month can guarantee particular sightings.",

            relativelyDrierPeriods:
                "Parts of the period from May to September are generally drier and warmer, with reduced water availability in some areas.",

            wetterPeriods:
                "Rainfall is more likely around April to May and again during October to January. Heavy rain can affect tracks, wildlife movement and park operations.",

            advice:
                "Wear lightweight neutral-coloured clothing, carry water, sun protection and a hat, and keep a light rain layer available. Check current park access, closures and weather before confirming the safari.",
        },

        location: {
            latitude: 6.3728,
            longitude: 81.5169,

            areaDescription:
                "Yala National Park lies in southeastern Sri Lanka. The commonly used Palatupana side is reached through the Tissamaharama and Kirinda area, while other entrances may be used according to the selected block and current access arrangements.",

            mapEmbedUrl:
                "https://www.google.com/maps?q=6.3728,81.5169&z=11&output=embed",

            directionsUrl:
                "https://www.google.com/maps/search/?api=1&query=Yala+National+Park+Sri+Lanka",
        },

        recommendedStay:
            "One night can work for travellers completing a single safari while travelling between Ella and the south coast. Two nights provide a more comfortable pace and allow time for an additional safari or nearby places such as Tissamaharama, Kataragama, Kirinda or Bundala.",

        activities: [
            {
                title:
                    "Morning wildlife safari",

                description:
                    "Enter the park early with a licensed jeep and local driver to explore dry forest, open plains, waterholes and lagoon habitats while wildlife activity may be greater.",

                duration:
                    "Approximately 4 – 5 hours",

                bestTime:
                    "Early morning",

                difficulty:
                    "Suitable for most travellers; jeep tracks can be rough",
            },
            {
                title:
                    "Afternoon wildlife safari",

                description:
                    "Explore Yala during the later part of the day when temperatures may begin to ease and animals may move towards water or open areas.",

                duration:
                    "Approximately 4 – 5 hours",

                bestTime:
                    "Afternoon until park closing time",

                difficulty:
                    "Suitable for most travellers; jeep tracks can be rough",
            },
            {
                title:
                    "Full-day wildlife experience",

                description:
                    "Spend a longer period inside the permitted safari area for travellers whose main interest is wildlife observation and photography.",

                duration:
                    "Most of the day",

                bestTime:
                    "Subject to current park rules and access",

                difficulty:
                    "Long jeep journey; better suited to dedicated wildlife travellers",
            },
            {
                title:
                    "Wildlife and bird photography",

                description:
                    "Observe elephants, deer, crocodiles, buffalo, monkeys and varied birdlife while keeping a respectful distance and following park instructions.",

                duration:
                    "During any safari",

                bestTime:
                    "Morning and late afternoon light",

                difficulty:
                    "Suitable for most travellers",
            },
            {
                title:
                    "Visit Sithulpawwa",

                description:
                    "Explore an ancient Buddhist monastic site located within the wider Yala landscape, subject to current access arrangements and itinerary timing.",

                duration:
                    "Approximately 1 – 2 hours",

                bestTime:
                    "Morning or late afternoon",

                difficulty:
                    "Includes walking and some elevated areas",
            },
            {
                title:
                    "Explore Tissamaharama",

                description:
                    "Visit the historic Tissamaharama area, its reservoir, local town and religious heritage while staying near Yala.",

                duration:
                    "Approximately 1 – 2 hours",

                bestTime:
                    "Morning or evening",

                difficulty:
                    "Easy",
            },
        ],

        nearbyPlaces: [
            {
                name: "Tissamaharama",

                travelTime:
                    "Approximately 30 – 45 minutes from the Palatupana entrance area",

                description:
                    "A common accommodation base for Yala safaris, known for its historic stupa, reservoir and convenient access to the region.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Tissamaharama+Sri+Lanka",
            },
            {
                name: "Kirinda",

                travelTime:
                    "Approximately 30 – 45 minutes",

                description:
                    "A coastal village known for its rocky setting, ocean views and historic temple overlooking the sea.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Kirinda+Temple+Sri+Lanka",
            },
            {
                name: "Kataragama",

                travelTime:
                    "Approximately 45 – 75 minutes depending on the selected Yala entrance",

                description:
                    "A major pilgrimage town respected by Buddhist, Hindu, Muslim and indigenous Vedda communities.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Kataragama+Sri+Lanka",
            },
            {
                name: "Bundala National Park",

                travelTime:
                    "Approximately 45 minutes – 1 hour",

                description:
                    "A protected wetland and birdwatching destination especially important for resident and migratory waterbirds.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Bundala+National+Park+Sri+Lanka",
            },
            {
                name: "Sithulpawwa Rock Temple",

                travelTime:
                    "Travel time depends on the permitted route and current park access",

                description:
                    "An ancient Buddhist monastic location set among the rocky wilderness of the wider Yala landscape.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Sithulpawwa+Rock+Temple+Sri+Lanka",
            },
            {
                name: "Tangalle",

                travelTime:
                    "Approximately 2 – 3 hours",

                description:
                    "A quieter south-coast beach area that works well after completing a wildlife safari.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Tangalle+Sri+Lanka",
            },
        ],

        routeConnections: [
            {
                route:
                    "Ella → Yala",

                travelTime:
                    "Approximately 2.5 – 3.5 hours",

                description:
                    "A popular route connecting Sri Lanka’s hill country with its southern wildlife region.",

                note:
                    "Ravana Falls and selected roadside stops may be included when the itinerary allows.",
            },
            {
                route:
                    "Yala → Mirissa",

                travelTime:
                    "Approximately 3 – 4 hours",

                description:
                    "Connect the wildlife region with the south coast for beaches, whale-watching activities and coastal relaxation.",

                note:
                    "Travel time varies according to the accommodation location, traffic and stops.",
            },
            {
                route:
                    "Yala → Galle",

                travelTime:
                    "Approximately 4 – 5 hours",

                description:
                    "A common journey towards Galle Fort and the southwestern coast after completing the safari portion of a tour.",
            },
            {
                route:
                    "Yala → Tangalle",

                travelTime:
                    "Approximately 2 – 3 hours",

                description:
                    "A shorter connection from the wildlife region to a relaxed beach stay on Sri Lanka’s southern coast.",
            },
            {
                route:
                    "Colombo Airport → Yala",

                travelTime:
                    "Approximately 5.5 – 7 hours",

                description:
                    "A long direct transfer that is normally more comfortable when divided with an overnight stop or incorporated into a wider itinerary.",

                note:
                    "Traffic, arrival time and comfort stops can significantly affect the total journey.",
            },
            {
                route:
                    "Kataragama → Yala",

                travelTime:
                    "Approximately 30 – 75 minutes",

                description:
                    "The journey depends on whether the safari uses Katagamuwa, Palatupana or another currently available entrance.",
            },
        ],

        practicalTips: [
            "Choose a responsible licensed safari operator and follow all instructions provided by park officers and the jeep driver.",

            "Wildlife sightings are never guaranteed. Leopards, elephants and other animals move naturally throughout a large protected landscape.",

            "Do not ask drivers to speed, crowd animals, block their movement or compete aggressively with other jeeps.",

            "Remain inside the vehicle unless park officers specifically permit otherwise.",

            "Never feed animals, throw litter, play loud music or use behaviour that disturbs wildlife.",

            "Use neutral-coloured lightweight clothing, sunscreen, a hat and sufficient drinking water.",

            "Protect cameras and personal items from dust, sudden rain and movement over uneven jeep tracks.",

            "Travellers with back, neck or mobility concerns should discuss the rough jeep conditions before booking.",

            "Park blocks, entrances, opening arrangements and seasonal closures can change. Reconfirm them before the safari date.",

            "Entrance tickets, jeep charges and guide arrangements should be clearly confirmed before travel.",
        ],

        faqs: [
            {
                question:
                    "How many nights should I stay near Yala?",

                answer:
                    "One night may be sufficient for a single safari while travelling from Ella to the south coast. Two nights provide a more relaxed schedule and allow time for another safari or nearby cultural and nature attractions.",
            },
            {
                question:
                    "Is a leopard sighting guaranteed in Yala?",

                answer:
                    "No. Yala is an important leopard habitat, but every sighting depends on natural wildlife movement, weather, visitor conditions and luck. No responsible operator should guarantee a leopard sighting.",
            },
            {
                question:
                    "Is a morning or afternoon safari better?",

                answer:
                    "Both can be rewarding. Morning safaris often offer cooler conditions, while afternoon safaris may have attractive light and wildlife movement later in the day. The choice should fit the overall itinerary and current local advice.",
            },
            {
                question:
                    "Should I book a half-day or full-day safari?",

                answer:
                    "A half-day safari suits most first-time visitors. A full-day safari is better for dedicated wildlife travellers and photographers who are comfortable spending many hours on rough jeep tracks.",
            },
            {
                question:
                    "Can children join a Yala safari?",

                answer:
                    "Many families visit Yala, but parents should consider the child’s age, patience, sensitivity to heat and ability to remain seated during a long and sometimes rough jeep journey.",
            },
            {
                question:
                    "Can I travel from Ella to Yala on the same day as a safari?",

                answer:
                    "It may be possible with careful timing, especially for an afternoon safari, but staying overnight before the safari usually creates a less rushed and more comfortable experience.",
            },
            {
                question:
                    "What animals may be seen in Yala?",

                answer:
                    "Possible sightings include elephants, leopards, spotted deer, sambar, wild buffalo, crocodiles, monkeys, mongoose, wild boar and many bird species. Actual sightings always vary.",
            },
            {
                question:
                    "Does Yala close during part of the year?",

                answer:
                    "Certain blocks or entrances may close because of drought, weather, conservation requirements or operational decisions. Current access must be checked with the Department of Wildlife Conservation before travel.",
            },
        ],

        sources: [
            {
                label:
                    "Sri Lanka Tourism — Yala National Park",

                url:
                    "https://www.srilanka.travel/attraction?attraction_id=163",
            },
            {
                label:
                    "Department of Wildlife Conservation — Protected Areas",

                url:
                    "https://www.dwc.gov.lk/?page_id=72",
            },
            {
                label:
                    "Department of Wildlife Conservation — Yala Regional Climate",

                url:
                    "https://www.dwc.gov.lk/?page_id=286",
            },
            {
                label:
                    "Sri Lanka Tourism — Wild Safaris",

                url:
                    "https://srilanka.travel/wild-safaris",
            },
            {
                label:
                    "Yala Sri Lanka — Visitor Information",

                url:
                    "https://www.yalasrilanka.lk/",
            },
        ],

        lastVerified:
            "2026-07-19",

        planningDisclaimer:
            "Safari times, travel times, entrance fees, jeep charges, park blocks, entrances, seasonal closures, road conditions and wildlife sightings are subject to change. All operational details must be reconfirmed before issuing the final itinerary.",
    },
    mirissa: {
        slug: "mirissa",

        introduction: [
            "Mirissa is one of Sri Lanka’s best-known south-coast beach destinations, combining a tropical bay, fishing-harbour character, ocean viewpoints, surfing access and seasonal whale-watching excursions.",

            "The destination works well for couples, families and travellers who want to relax after exploring Sri Lanka’s cultural sites, hill country or wildlife parks. Mirissa can be included as a short beach stop or used as a base for exploring Weligama, Matara, Dondra and Galle.",

            "Whale-watching excursions usually depart early from Mirissa Harbour. Marine-wildlife sightings are never guaranteed, and travellers should select a responsible operator that follows current safety, registration and marine-mammal observation requirements.",
        ],

        quickFacts: [
            {
                label: "Typical temperature",
                value: "24°C – 31°C",
                note:
                    "Approximate tropical coastal planning range rather than a live forecast.",
                icon: "temperature",
            },
            {
                label: "Recommended stay",
                value: "2 – 4 nights",
                note:
                    "Suitable for beach time, whale watching and nearby coastal experiences.",
                icon: "stay",
            },
            {
                label: "Best beach period",
                value: "November – April",
                note:
                    "The south coast generally experiences calmer sea conditions during this period.",
                icon: "season",
            },
            {
                label: "Location",
                value: "Southern Province",
                note:
                    "Matara District on Sri Lanka’s south coast.",
                icon: "location",
            },
            {
                label: "Destination type",
                value: "Beach & Activities",
                note:
                    "Beaches, ocean viewpoints, surfing and seasonal whale watching.",
                icon: "heritage",
            },
        ],

        climate: {
            temperatureRange:
                "Mirissa has a warm tropical coastal climate. A practical planning range is approximately 24°C to 31°C, with high humidity and strong sunshine possible throughout the year.",

            bestMonths:
                "November to April is generally the most convenient period for beach holidays on Sri Lanka’s south coast, with a greater likelihood of calmer seas and suitable conditions for marine activities.",

            relativelyDrierPeriods:
                "Parts of December through March are often relatively drier and more suitable for extended beach time, although short tropical showers can still occur.",

            wetterPeriods:
                "The southwest monsoon and inter-monsoon periods can bring heavier rain, stronger winds and rougher sea conditions, particularly from May onwards and again during wetter transitional periods.",

            advice:
                "Use sun protection, remain hydrated and check daily sea conditions before swimming, surfing or joining a boat excursion. Climate and sea-condition information is general planning guidance rather than a live forecast.",
        },

        location: {
            latitude: 5.9483,
            longitude: 80.4716,

            areaDescription:
                "Mirissa is located in Matara District on Sri Lanka’s southern coastline, between Weligama and Matara. It is well positioned for routes connecting Yala or Ella with Galle, Bentota and Colombo.",

            mapEmbedUrl:
                "https://www.google.com/maps?q=5.9483,80.4716&z=13&output=embed",

            directionsUrl:
                "https://www.google.com/maps/search/?api=1&query=Mirissa+Sri+Lanka",
        },

        recommendedStay:
            "Two nights are suitable for a whale-watching excursion and relaxed beach time. Three or four nights provide a slower coastal stay with opportunities for surfing, viewpoints, nearby beaches, Matara, Dondra or a day trip to Galle.",

        activities: [
            {
                title:
                    "Join a responsible whale-watching excursion",

                description:
                    "Depart from Mirissa Harbour on a registered boat to search for whales, dolphins and other marine life while following current safety and marine-mammal observation requirements.",

                duration:
                    "Approximately 3 – 5 hours",

                bestTime:
                    "Early morning during suitable sea conditions",

                difficulty:
                    "Boat journey; may not suit travellers prone to seasickness",
            },
            {
                title:
                    "Relax at Mirissa Beach",

                description:
                    "Spend time beside Mirissa’s palm-fringed bay, with opportunities for swimming, sunbathing, cafés and relaxed coastal evenings when sea conditions are suitable.",

                duration:
                    "Flexible",

                bestTime:
                    "Morning or late afternoon",

                difficulty:
                    "Easy",
            },
            {
                title:
                    "Visit Coconut Tree Hill",

                description:
                    "Walk to one of Mirissa’s best-known coastal viewpoints for elevated views across the ocean, shoreline and surrounding palm landscape.",

                duration:
                    "Approximately 45 – 90 minutes",

                bestTime:
                    "Early morning or before sunset",

                difficulty:
                    "Easy to moderate walking",
            },
            {
                title:
                    "Explore Parrot Rock",

                description:
                    "Visit the small rocky viewpoint near Mirissa Beach for coastal scenery, subject to tide, waves and safe access conditions.",

                duration:
                    "Approximately 30 – 60 minutes",

                bestTime:
                    "During daylight and safe tide conditions",

                difficulty:
                    "Short walk with uneven and potentially slippery surfaces",
            },
            {
                title:
                    "Learn to surf in Weligama",

                description:
                    "Travel to nearby Weligama Bay for beginner-friendly surf lessons or board hire from a properly equipped local provider.",

                duration:
                    "Approximately 1.5 – 3 hours",

                bestTime:
                    "According to daily wave and weather conditions",

                difficulty:
                    "Beginner to advanced options available",
            },
            {
                title:
                    "Experience a south-coast sunset",

                description:
                    "Enjoy the evening atmosphere from Mirissa Beach, an oceanfront café or a suitable coastal viewpoint while allowing for seasonal sunset and weather conditions.",

                duration:
                    "Approximately 1 – 2 hours",

                bestTime:
                    "Late afternoon and sunset",

                difficulty:
                    "Easy",
            },
        ],

        nearbyPlaces: [
            {
                name: "Weligama",

                travelTime:
                    "Approximately 15 – 25 minutes",

                distance:
                    "Around 7 km",

                description:
                    "A broad coastal bay known for beginner surfing, local fishing activity, cafés and access to nearby beaches.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Weligama+Sri+Lanka",
            },
            {
                name: "Matara",

                travelTime:
                    "Approximately 20 – 35 minutes",

                distance:
                    "Around 12 km",

                description:
                    "A major southern city with local markets, coastal scenery, religious sites and historic Dutch-era landmarks.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Matara+Sri+Lanka",
            },
            {
                name: "Dondra Head",

                travelTime:
                    "Approximately 35 – 50 minutes",

                distance:
                    "Around 20 km",

                description:
                    "The southernmost area of Sri Lanka, known for its lighthouse, ocean views and important coastal location.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Dondra+Head+Lighthouse+Sri+Lanka",
            },
            {
                name: "Polhena Beach",

                travelTime:
                    "Approximately 25 – 40 minutes",

                description:
                    "A sheltered coastal area near Matara that may offer swimming or snorkelling opportunities when sea and reef conditions are suitable.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Polhena+Beach+Sri+Lanka",
            },
            {
                name: "Galle",

                travelTime:
                    "Approximately 1 – 1.5 hours",

                distance:
                    "Around 40 km",

                description:
                    "A historic coastal city centred around the UNESCO-listed Galle Fort, with architecture, museums, shops, cafés and ocean views.",

                destinationSlug:
                    "galle",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Galle+Fort+Sri+Lanka",
            },
            {
                name: "Tangalle",

                travelTime:
                    "Approximately 1.5 – 2.5 hours",

                description:
                    "A quieter south-coast beach region known for long stretches of sand, lagoons and a more relaxed atmosphere.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Tangalle+Sri+Lanka",
            },
        ],

        routeConnections: [
            {
                route:
                    "Yala → Mirissa",

                travelTime:
                    "Approximately 3 – 4 hours",

                description:
                    "A popular route connecting Sri Lanka’s main southern wildlife region with its beach and whale-watching coast.",

                note:
                    "The total journey depends on the Yala accommodation location, traffic, road conditions and selected stops.",
            },
            {
                route:
                    "Ella → Mirissa",

                travelTime:
                    "Approximately 3.5 – 4.5 hours",

                description:
                    "Connects the scenic hill country with Sri Lanka’s south coast, often following the route through Wellawaya and Matara District.",

                note:
                    "Ravana Falls or selected roadside stops may be included when timing permits.",
            },
            {
                route:
                    "Mirissa → Galle",

                travelTime:
                    "Approximately 1 – 1.5 hours",

                description:
                    "A straightforward coastal connection that allows travellers to combine Mirissa’s beaches with the historic streets of Galle Fort.",
            },
            {
                route:
                    "Mirissa → Colombo",

                travelTime:
                    "Approximately 2.5 – 3.5 hours",

                description:
                    "A common journey towards Colombo using the southern expressway where appropriate.",

                note:
                    "Traffic near Colombo and the exact accommodation location can affect the total journey.",
            },
            {
                route:
                    "Mirissa → Colombo Airport",

                travelTime:
                    "Approximately 3 – 4 hours",

                description:
                    "A frequent final transfer for travellers ending their Sri Lanka itinerary on the south coast.",

                note:
                    "A generous time allowance should be used for international departures.",
            },
            {
                route:
                    "Tangalle → Mirissa",

                travelTime:
                    "Approximately 1.5 – 2.5 hours",

                description:
                    "A coastal route connecting Tangalle’s quieter beaches with Mirissa’s activities, cafés and whale-watching harbour.",
            },
        ],

        practicalTips: [
            "Choose a registered and responsible whale-watching operator that follows current marine-mammal observation and safety requirements.",

            "Whale and dolphin sightings are never guaranteed because marine animals move naturally across a large ocean area.",

            "Avoid operators that chase animals, approach too closely, block their movement or promise guaranteed sightings.",

            "Take seasickness medication only after obtaining suitable medical or pharmaceutical advice and follow the recommended timing.",

            "Confirm that life jackets, communication equipment, passenger insurance and appropriate safety procedures are provided before departure.",

            "Wear sun protection and carry drinking water because boat journeys can involve several hours of direct sunlight.",

            "Protect cameras, phones and valuables from sea spray using suitable waterproof covers.",

            "Check flags, currents, waves and local safety advice before swimming because sea conditions can change quickly.",

            "Do not climb Parrot Rock or other exposed coastal areas during high tide, rough seas or unsafe weather.",

            "Use responsible surf schools with suitable instructors, safety equipment and lessons matched to the traveller’s experience.",

            "Whale-watching departures, beach conditions and marine activities may be cancelled or changed because of weather or sea conditions.",
        ],

        faqs: [
            {
                question:
                    "How many nights should I stay in Mirissa?",

                answer:
                    "Two nights are suitable for a whale-watching excursion and beach time. Three or four nights provide a more relaxed stay with surfing, viewpoints and nearby south-coast excursions.",
            },
            {
                question:
                    "What is the best time to visit Mirissa?",

                answer:
                    "November to April is generally the most convenient period for south-coast beach activities because the sea is more likely to be calmer. Weather and sea conditions still vary and should be checked before activities.",
            },
            {
                question:
                    "Is whale watching available throughout the year?",

                answer:
                    "Whale-watching operations are most commonly associated with the calmer south-coast season. Excursions outside the main period depend on sea conditions, operator schedules and current safety advice.",
            },
            {
                question:
                    "Is seeing a blue whale guaranteed?",

                answer:
                    "No. Mirissa is an important whale-watching location, but sightings depend on natural marine-animal movement, sea conditions, weather and luck. Responsible operators should never guarantee a sighting.",
            },
            {
                question:
                    "What time do whale-watching trips begin?",

                answer:
                    "Most excursions depart early in the morning. The exact reporting time, departure time and duration should be confirmed directly with the selected registered operator.",
            },
            {
                question:
                    "Is whale watching suitable for children?",

                answer:
                    "Many families join whale-watching excursions, but parents should consider the child’s age, ability to remain on a boat for several hours, sun exposure and risk of seasickness.",
            },
            {
                question:
                    "Can I surf in Mirissa?",

                answer:
                    "Surfing is available in the Mirissa and Weligama region, but the most suitable location depends on current waves, weather and the traveller’s experience. Weligama is commonly selected for beginner lessons.",
            },
            {
                question:
                    "Can I visit Galle from Mirissa?",

                answer:
                    "Yes. Galle is approximately one to one-and-a-half hours away by road and can be visited as a day trip or as the next overnight destination.",
            },
        ],

        sources: [
            {
                label:
                    "Sri Lanka Tourism — Mirissa",

                url:
                    "https://srilanka.travel/attraction?attraction_id=165",
            },
            {
                label:
                    "Sri Lanka Tourism — Whale Watching",

                url:
                    "https://www.srilanka.travel/whale-watching",
            },
            {
                label:
                    "Department of Wildlife Conservation — Marine Tourism",

                url:
                    "https://www.dwc.gov.lk/?page_id=817",
            },
            {
                label:
                    "Sri Lanka Tourism Development Authority — Water-Based Activity Guidelines",

                url:
                    "https://www.sltda.gov.lk/en/register-with-us",
            },
            {
                label:
                    "Sri Lanka Coast Guard — Whale-Watching Safety Awareness",

                url:
                    "https://news.coastguard.gov.lk/news/2026/06",
            },
            {
                label:
                    "Department of Meteorology Sri Lanka",

                url:
                    "https://meteo.gov.lk/",
            },
        ],

        lastVerified:
            "2026-07-19",

        planningDisclaimer:
            "Weather, sea conditions, whale-watching departures, wildlife sightings, activity availability, travel times, prices and safety arrangements are subject to change. All operational information must be reconfirmed before issuing the final client itinerary.",
    },
    galle: {
        slug: "galle",

        introduction: [
            "Galle is one of Sri Lanka’s most distinctive coastal cities, combining a living historic fort, colonial-era architecture, ocean-facing ramparts, museums, cafés, religious buildings and easy access to the beaches of the south coast.",

            "The Old Town of Galle and its Fortifications is recognized as a UNESCO World Heritage Site. The fortified town developed from the Portuguese period and reached its greatest extent under Dutch colonial rule, creating an urban landscape where European planning and architecture were adapted to Sri Lankan materials, climate and traditions.",

            "Galle works well as a one or two-night cultural stop after Mirissa, Yala or Ella. It can also be used as a base for visiting Unawatuna, Rumassala, Koggala, Hikkaduwa and other destinations along Sri Lanka’s southern coastline.",
        ],

        quickFacts: [
            {
                label: "Typical temperature",
                value: "24°C – 31°C",
                note:
                    "Approximate tropical coastal planning range rather than a live forecast.",
                icon: "temperature",
            },
            {
                label: "Recommended stay",
                value: "1 – 2 nights",
                note:
                    "Suitable for the fort, museums, coastal walks and nearby beaches.",
                icon: "stay",
            },
            {
                label: "Best exploring time",
                value: "Morning and late afternoon",
                note:
                    "Usually more comfortable for walking around the fort and ramparts.",
                icon: "season",
            },
            {
                label: "Location",
                value: "Southern Province",
                note:
                    "Galle District on Sri Lanka’s southwest coast.",
                icon: "location",
            },
            {
                label: "Heritage status",
                value: "UNESCO World Heritage",
                note:
                    "The Old Town and Fortifications were inscribed in 1988.",
                icon: "heritage",
            },
        ],

        climate: {
            temperatureRange:
                "Galle has a warm and humid tropical coastal climate. A practical planning range is approximately 24°C to 31°C, although direct sunshine and humidity can make daytime walking feel considerably warmer.",

            bestMonths:
                "December to March often provides convenient conditions for exploring Galle and combining the city with beaches along Sri Lanka’s southwest and south coast.",

            relativelyDrierPeriods:
                "Parts of December through March are often relatively drier, although brief tropical showers remain possible throughout the year.",

            wetterPeriods:
                "Heavier rain and thunderstorms are more likely during southwest monsoon and inter-monsoon periods, particularly from approximately May onwards and again later in the year.",

            advice:
                "Plan long walks during the morning or late afternoon, carry drinking water and use sun protection. A light umbrella or rain jacket is useful because coastal weather can change quickly.",
        },

        location: {
            latitude: 6.0329,
            longitude: 80.2168,

            areaDescription:
                "Galle is located on Sri Lanka’s southwest coast in the Southern Province. The historic fort occupies a rocky coastal promontory and is connected by road and rail with Colombo, Hikkaduwa, Mirissa and Matara.",

            mapEmbedUrl:
                "https://www.google.com/maps?q=6.0329,80.2168&z=14&output=embed",

            directionsUrl:
                "https://www.google.com/maps/search/?api=1&query=Galle+Fort+Sri+Lanka",
        },

        recommendedStay:
            "One night is suitable for a guided fort walk, sunset on the ramparts and selected museums or historic buildings. Two nights provide a more relaxed experience and allow time for Unawatuna, Rumassala, Koggala or another nearby coastal excursion.",

        activities: [
            {
                title:
                    "Walk through Galle Fort",

                description:
                    "Explore the fort’s narrow streets, historic houses, administrative buildings, religious sites, boutiques and preserved colonial-era urban layout.",

                duration:
                    "Approximately 2 – 3 hours",

                bestTime:
                    "Early morning or late afternoon",

                difficulty:
                    "Easy to moderate walking",
            },
            {
                title:
                    "Walk along the fort ramparts",

                description:
                    "Follow sections of the defensive walls and bastions for views across the Indian Ocean, harbour, lighthouse and historic town.",

                duration:
                    "Approximately 1 – 2 hours",

                bestTime:
                    "Late afternoon and sunset",

                difficulty:
                    "Easy walking with some uneven surfaces",
            },
            {
                title:
                    "Visit Galle Lighthouse",

                description:
                    "See one of Galle Fort’s most recognizable landmarks, positioned near the southeastern ramparts with views over the ocean and surrounding historic buildings.",

                duration:
                    "Approximately 30 – 60 minutes",

                bestTime:
                    "Morning or late afternoon",

                difficulty:
                    "Easy",
            },
            {
                title:
                    "Explore the National Maritime Museum",

                description:
                    "Learn about Sri Lanka’s maritime heritage, seafaring history, coastal communities and archaeological connections to the Indian Ocean.",

                duration:
                    "Approximately 1 – 1.5 hours",

                bestTime:
                    "During current museum opening hours",

                difficulty:
                    "Easy",
            },
            {
                title:
                    "Visit the Galle National Museum",

                description:
                    "Explore exhibitions connected with the cultural, historical and artistic heritage of Galle and Sri Lanka’s Southern Province.",

                duration:
                    "Approximately 1 hour",

                bestTime:
                    "During current museum opening hours",

                difficulty:
                    "Easy",
            },
            {
                title:
                    "Discover historic religious buildings",

                description:
                    "Visit selected churches, mosques and temples that reflect the multi-religious and multicultural history of the living fortified town.",

                duration:
                    "Approximately 1 – 2 hours",

                bestTime:
                    "Morning or afternoon, subject to access",

                difficulty:
                    "Easy",
            },
            {
                title:
                    "Enjoy cafés, galleries and local shops",

                description:
                    "Explore restored buildings containing cafés, restaurants, galleries, jewellery stores, craft shops and small boutique businesses.",

                duration:
                    "Flexible",

                bestTime:
                    "Late morning, afternoon or evening",

                difficulty:
                    "Easy",
            },
            {
                title:
                    "Watch sunset from the fort",

                description:
                    "Finish the day on a suitable section of the ramparts while watching the sun set over the Indian Ocean.",

                duration:
                    "Approximately 45 – 90 minutes",

                bestTime:
                    "Late afternoon",

                difficulty:
                    "Easy, with care required near exposed edges",
            },
        ],

        nearbyPlaces: [
            {
                name: "Unawatuna",

                travelTime:
                    "Approximately 15 – 25 minutes",

                distance:
                    "Around 6 km",

                description:
                    "A popular coastal area known for its curved beach, accommodation, restaurants and access to nearby marine and nature attractions.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Unawatuna+Beach+Sri+Lanka",
            },
            {
                name: "Rumassala and Jungle Beach",

                travelTime:
                    "Approximately 20 – 35 minutes",

                description:
                    "A forested coastal headland near Unawatuna offering walking routes, ocean viewpoints and access to small beach areas.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Rumassala+Jungle+Beach+Sri+Lanka",
            },
            {
                name: "Koggala",

                travelTime:
                    "Approximately 30 – 45 minutes",

                distance:
                    "Around 15 km",

                description:
                    "A coastal and lagoon area associated with beaches, lake excursions, local communities and the Martin Wickramasinghe cultural complex.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Koggala+Sri+Lanka",
            },
            {
                name: "Hikkaduwa",

                travelTime:
                    "Approximately 30 – 50 minutes",

                distance:
                    "Around 20 km",

                description:
                    "An established beach destination known for surfing, coastal activities and marine environments, subject to seasonal sea conditions.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Hikkaduwa+Beach+Sri+Lanka",
            },
            {
                name: "Mirissa",

                travelTime:
                    "Approximately 1 – 1.5 hours",

                distance:
                    "Around 40 km",

                description:
                    "A south-coast beach destination known for ocean viewpoints, surfing access and seasonal whale-watching excursions.",

                destinationSlug:
                    "mirissa",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Mirissa+Sri+Lanka",
            },
            {
                name: "Ahangama",

                travelTime:
                    "Approximately 35 – 50 minutes",

                description:
                    "A coastal town known for surf breaks, cafés, small beaches and access to the wider Koggala and Weligama coastline.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Ahangama+Sri+Lanka",
            },
        ],

        routeConnections: [
            {
                route:
                    "Mirissa → Galle",

                travelTime:
                    "Approximately 1 – 1.5 hours",

                description:
                    "A straightforward coastal route connecting Mirissa’s beaches and marine activities with Galle’s UNESCO-listed historic fort.",

                note:
                    "Travel time depends on coastal traffic, accommodation locations and sightseeing stops.",
            },
            {
                route:
                    "Yala → Galle",

                travelTime:
                    "Approximately 4 – 5 hours",

                description:
                    "A common route connecting Sri Lanka’s southern wildlife region with its historic southwest coast.",

                note:
                    "Tangalle, Matara or selected coastal stops may be included depending on the itinerary.",
            },
            {
                route:
                    "Ella → Galle",

                travelTime:
                    "Approximately 5 – 6.5 hours",

                description:
                    "Connects Sri Lanka’s hill country with the southern coastline and Galle Fort.",

                note:
                    "This is a longer travel day. Comfort stops and route conditions should be considered carefully.",
            },
            {
                route:
                    "Galle → Colombo",

                travelTime:
                    "Approximately 2 – 3 hours",

                description:
                    "A common transfer using the southern expressway where suitable, connecting Galle with Sri Lanka’s commercial capital.",

                note:
                    "Traffic approaching Colombo can increase the journey time.",
            },
            {
                route:
                    "Galle → Colombo Airport",

                travelTime:
                    "Approximately 2.5 – 3.5 hours",

                description:
                    "A frequent final transfer for travellers ending their Sri Lanka journey in Galle or the surrounding south-coast region.",

                note:
                    "Allow generous additional time for international departures, traffic and airport check-in.",
            },
            {
                route:
                    "Hikkaduwa → Galle",

                travelTime:
                    "Approximately 30 – 50 minutes",

                description:
                    "A short coastal connection allowing Hikkaduwa beach stays to be combined with Galle Fort.",
            },
            {
                route:
                    "Galle → Bentota",

                travelTime:
                    "Approximately 1.5 – 2.5 hours",

                description:
                    "Connects Galle with resort areas, water-based activities and the southwestern coastline north of Hikkaduwa.",
            },
        ],

        practicalTips: [
            "Begin longer fort walks during the morning or late afternoon because midday conditions can be hot and humid.",

            "Wear comfortable footwear because the fort includes stone surfaces, uneven pathways, steps and long walking distances.",

            "Carry drinking water, sunscreen, sunglasses and a hat when walking around the ramparts.",

            "Remain behind safe barriers and avoid sitting or standing dangerously close to exposed rampart edges.",

            "Respect residents because Galle Fort is a living neighbourhood rather than only a visitor attraction.",

            "Ask permission before photographing people, private homes, religious ceremonies or residents working inside the fort.",

            "Wear appropriate clothing when entering churches, mosques, temples and other religious buildings.",

            "Museum opening hours, admission fees and temporary closures should be checked before the visit.",

            "Avoid touching, climbing or damaging historic walls, monuments and archaeological structures.",

            "Use designated waste bins and avoid leaving plastic or food waste within the heritage area.",

            "Check sea conditions before visiting beaches near Galle, Unawatuna or Hikkaduwa because currents and waves vary seasonally.",

            "Allow additional travel time during weekends, holidays and busy tourism periods when roads and parking areas may be crowded.",
        ],

        faqs: [
            {
                question:
                    "How many nights should I stay in Galle?",

                answer:
                    "One night is suitable for the main fort attractions and a sunset walk. Two nights provide a more relaxed visit and allow time for nearby beaches, museums or coastal excursions.",
            },
            {
                question:
                    "Is Galle Fort a UNESCO World Heritage Site?",

                answer:
                    "Yes. The Old Town of Galle and its Fortifications was inscribed on the UNESCO World Heritage List in 1988 for its exceptional combination of European fortification and South Asian architectural traditions.",
            },
            {
                question:
                    "How long does it take to explore Galle Fort?",

                answer:
                    "A basic walking tour may take approximately two to three hours. A longer visit including museums, religious buildings, cafés and sunset can take most of the day.",
            },
            {
                question:
                    "Is there an entrance fee for Galle Fort?",

                answer:
                    "Walking into the fort and exploring its public streets is generally possible without a general fort entrance ticket. Individual museums, attractions or guided experiences may charge separate fees.",
            },
            {
                question:
                    "What is the best time to walk around Galle Fort?",

                answer:
                    "Early morning and late afternoon are usually more comfortable because the temperature and direct sunlight may be stronger around midday.",
            },
            {
                question:
                    "Can I visit Galle from Mirissa?",

                answer:
                    "Yes. Mirissa and Galle are commonly combined and the road journey generally takes approximately one to one-and-a-half hours, depending on traffic and accommodation locations.",
            },
            {
                question:
                    "Can I visit Unawatuna from Galle?",

                answer:
                    "Yes. Unawatuna is only a short drive from Galle and can be visited for beach time, dining or nearby coastal attractions.",
            },
            {
                question:
                    "Is Galle suitable for families?",

                answer:
                    "Galle is suitable for many families because it offers walking, museums, ocean views, cafés and nearby beaches. Children should be supervised carefully near ramparts, roads and exposed coastal areas.",
            },
            {
                question:
                    "Can Galle be visited as a day trip from Colombo?",

                answer:
                    "Yes. Galle can be visited as a full-day trip from Colombo using the southern expressway, although an overnight stay allows a more relaxed experience and an evening walk inside the fort.",
            },
        ],

        sources: [
            {
                label:
                    "UNESCO — Old Town of Galle and its Fortifications",

                url:
                    "https://whc.unesco.org/en/list/451/",
            },
            {
                label:
                    "Sri Lanka Tourism — Galle Fort",

                url:
                    "https://www.srilanka.travel/attraction?attraction_id=153",
            },
            {
                label:
                    "Department of Archaeology Sri Lanka",

                url:
                    "https://archaeology.gov.lk/",
            },
            {
                label:
                    "Department of National Museums",

                url:
                    "https://www.museum.gov.lk/v1/places-visit",
            },
            {
                label:
                    "Sri Lanka Tourism — Southern Beaches",

                url:
                    "https://srilanka.travel/pristine-beach-holidays",
            },
            {
                label:
                    "Department of Meteorology Sri Lanka",

                url:
                    "https://meteo.gov.lk/",
            },
        ],

        lastVerified:
            "2026-07-19",

        planningDisclaimer:
            "Travel times, temperatures, museum schedules, entrance fees, religious-site access, road conditions, beach safety and activity availability are approximate or subject to change. All operational details must be reconfirmed before issuing the final itinerary.",
    },
    "nuwara-eliya": {
        slug: "nuwara-eliya",

        introduction: [
            "Nuwara Eliya is Sri Lanka’s best-known highland town, surrounded by tea estates, vegetable farms, misty mountains, waterfalls and cool-climate scenery. Its elevated setting creates a noticeably different atmosphere from the island’s tropical coastal and dry-zone destinations.",

            "The town developed as a colonial-era hill station and still features country-style houses, landscaped gardens, a racecourse, historic hotels and buildings influenced by British architecture. Today it remains an important centre for tea production, agriculture and highland tourism.",

            "Nuwara Eliya fits naturally between Kandy and Ella within a private Sri Lanka itinerary. Travellers can combine the town with tea estates, Gregory Lake, waterfalls, Hakgala Botanical Garden, Horton Plains National Park and the railway station at Nanu Oya.",
        ],

        quickFacts: [
            {
                label: "Typical temperature",
                value: "11°C – 20°C",
                note:
                    "Official annual average guidance; mornings and nights can feel colder.",
                icon: "temperature",
            },
            {
                label: "Recommended stay",
                value: "2 – 3 nights",
                note:
                    "Suitable for tea country, Horton Plains, gardens and scenic drives.",
                icon: "stay",
            },
            {
                label: "Best visiting time",
                value: "Early morning",
                note:
                    "Useful for clearer mountain views and outdoor activities.",
                icon: "season",
            },
            {
                label: "Location",
                value: "Central Province",
                note:
                    "Nuwara Eliya District in Sri Lanka’s central highlands.",
                icon: "location",
            },
            {
                label: "Elevation",
                value: "Around 1,868 metres",
                note:
                    "One of Sri Lanka’s highest major towns.",
                icon: "elevation",
            },
        ],

        climate: {
            temperatureRange:
                "Nuwara Eliya has a subtropical highland climate because of its elevation. Official tourism information gives an average annual temperature range of approximately 11°C to 20°C, although daytime temperatures can rise higher and nights can feel considerably colder.",

            bestMonths:
                "January to March often provides useful conditions for clearer highland mornings. April is traditionally a busy domestic holiday period, while the town remains visitable throughout the year with suitable rain and clothing preparation.",

            relativelyDrierPeriods:
                "March is generally among the relatively drier months, while parts of January through March may provide clearer mornings for viewpoints, gardens and outdoor activities.",

            wetterPeriods:
                "Rain and mist can occur throughout the year. October is commonly associated with higher rainfall, while monsoon and inter-monsoon periods can affect views, roads, trails and railway operations.",

            advice:
                "Carry a warm layer, rain jacket and suitable walking shoes. Start scenic activities early because mist and cloud may increase later in the day. Climate information is general planning guidance rather than a live forecast.",
        },

        location: {
            latitude: 6.9497,
            longitude: 80.7891,

            areaDescription:
                "Nuwara Eliya is located in Sri Lanka’s Central Province at an elevation of approximately 1,868 metres. It lies between Kandy and Ella and is reached by road through tea-country landscapes or by rail through nearby Nanu Oya station.",

            mapEmbedUrl:
                "https://www.google.com/maps?q=6.9497,80.7891&z=13&output=embed",

            directionsUrl:
                "https://www.google.com/maps/search/?api=1&query=Nuwara+Eliya+Sri+Lanka",
        },

        recommendedStay:
            "Two nights are suitable for Nuwara Eliya town, Gregory Lake, a tea experience and selected waterfalls or gardens. Three nights provide a more comfortable schedule for Horton Plains, Hakgala Botanical Garden and additional highland scenery.",

        activities: [
            {
                title:
                    "Explore a tea estate and factory",

                description:
                    "Visit a working tea estate to learn about cultivation, hand-picking, processing, grading and the role of high-grown Ceylon tea in Sri Lanka’s economy and culture.",

                duration:
                    "Approximately 1.5 – 3 hours",

                bestTime:
                    "Morning or early afternoon",

                difficulty:
                    "Easy; estate walking varies",
            },
            {
                title:
                    "Visit Horton Plains National Park",

                description:
                    "Walk through high-altitude grassland and cloud forest towards viewpoints and waterfalls within one of Sri Lanka’s most important protected highland ecosystems.",

                duration:
                    "Approximately 4 – 6 hours including the main walk",

                bestTime:
                    "Very early morning",

                difficulty:
                    "Moderate walking over uneven and potentially wet terrain",
            },
            {
                title:
                    "Walk around Gregory Lake",

                description:
                    "Enjoy views across the lake and surrounding hills, with seasonal leisure activities available according to current operating and weather conditions.",

                duration:
                    "Approximately 1 – 2 hours",

                bestTime:
                    "Morning or late afternoon",

                difficulty:
                    "Easy",
            },
            {
                title:
                    "Explore Hakgala Botanical Garden",

                description:
                    "Walk through a cool-climate botanical garden known for landscaped grounds, flowering plants, trees, ferns and highland plant collections.",

                duration:
                    "Approximately 1.5 – 2.5 hours",

                bestTime:
                    "Morning",

                difficulty:
                    "Easy to moderate walking with slopes",
            },
            {
                title:
                    "Visit a highland waterfall",

                description:
                    "Include a suitable waterfall such as Ramboda Falls, Devon Falls, St. Clair’s Falls or another route-appropriate viewpoint according to weather and itinerary direction.",

                duration:
                    "Approximately 30 minutes – 2 hours",

                bestTime:
                    "During daylight and safe weather conditions",

                difficulty:
                    "Varies by viewpoint and access route",
            },
            {
                title:
                    "Discover colonial-era Nuwara Eliya",

                description:
                    "Explore the town’s historic post office, old hotels, landscaped spaces, racecourse area and architecture connected with its former hill-station identity.",

                duration:
                    "Approximately 1.5 – 3 hours",

                bestTime:
                    "Morning or afternoon",

                difficulty:
                    "Easy",
            },
            {
                title:
                    "Visit Seetha Amman Temple",

                description:
                    "Visit a Hindu temple near Hakgala associated with the Ramayana tradition and respected as an active religious location.",

                duration:
                    "Approximately 45 – 90 minutes",

                bestTime:
                    "Morning or afternoon subject to worship arrangements",

                difficulty:
                    "Easy",
            },
            {
                title:
                    "Travel through the hill country by train",

                description:
                    "Use nearby Nanu Oya station for part of the scenic rail journey towards Kandy, Haputale or Ella, subject to current train operations and seat availability.",

                duration:
                    "Depends on the selected railway segment",

                bestTime:
                    "According to the confirmed timetable",

                difficulty:
                    "Suitable for most travellers with advance logistics planning",
            },
        ],

        nearbyPlaces: [
            {
                name:
                    "Horton Plains National Park",

                travelTime:
                    "Approximately 1 – 1.5 hours",

                distance:
                    "Around 30 km depending on the route",

                description:
                    "A protected high-altitude plateau containing montane grassland, cloud forest, waterfalls and the well-known World’s End viewpoint.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Horton+Plains+National+Park+Sri+Lanka",
            },
            {
                name:
                    "Hakgala Botanical Garden",

                travelTime:
                    "Approximately 25 – 40 minutes",

                distance:
                    "Around 10 km",

                description:
                    "A highland botanical garden featuring cool-climate plant collections, landscaped areas and mountain scenery.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Hakgala+Botanical+Garden+Sri+Lanka",
            },
            {
                name:
                    "Nanu Oya Railway Station",

                travelTime:
                    "Approximately 20 – 30 minutes",

                distance:
                    "Around 9 km",

                description:
                    "The main railway station serving Nuwara Eliya and an important stop on Sri Lanka’s scenic hill-country line.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Nanu+Oya+Railway+Station+Sri+Lanka",
            },
            {
                name:
                    "Ramboda Falls",

                travelTime:
                    "Approximately 1 – 1.5 hours",

                description:
                    "A prominent waterfall along the Kandy–Nuwara Eliya route, surrounded by tea-country and mountain scenery.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Ramboda+Falls+Sri+Lanka",
            },
            {
                name:
                    "Ambewela",

                travelTime:
                    "Approximately 45 minutes – 1 hour",

                description:
                    "A cool highland farming area known for open landscapes, dairy farms and scenic countryside.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Ambewela+Sri+Lanka",
            },
            {
                name:
                    "Ella",

                travelTime:
                    "Approximately 2.5 – 3.5 hours by road",

                description:
                    "A scenic hill-country town known for Nine Arch Bridge, mountain viewpoints, hiking trails and tea landscapes.",

                destinationSlug:
                    "ella",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Ella+Sri+Lanka",
            },
            {
                name:
                    "Kandy",

                travelTime:
                    "Approximately 2.5 – 3.5 hours",

                description:
                    "Sri Lanka’s historic hill capital, home to the Temple of the Sacred Tooth Relic, Kandy Lake and the Royal Botanic Gardens.",

                destinationSlug:
                    "kandy",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Kandy+Sri+Lanka",
            },
        ],

        routeConnections: [
            {
                route:
                    "Kandy → Nuwara Eliya",

                travelTime:
                    "Approximately 2.5 – 3.5 hours",

                description:
                    "A scenic highland route through tea-growing areas, mountain roads, viewpoints and waterfalls.",

                note:
                    "Ramboda Falls, tea estates and selected viewpoints may be included depending on timing and weather.",
            },
            {
                route:
                    "Nuwara Eliya → Ella",

                travelTime:
                    "Approximately 2.5 – 3.5 hours by road",

                description:
                    "A popular tea-country connection that continues through the central highlands towards Ella.",

                note:
                    "Travellers may use the train from Nanu Oya for part of the journey, subject to confirmed operations and seat availability.",
            },
            {
                route:
                    "Nanu Oya → Ella by train",

                travelTime:
                    "Usually several hours depending on the selected service",

                description:
                    "One of the most scenic railway sections in Sri Lanka, travelling through highland stations, tea estates, forests and mountain scenery.",

                note:
                    "Do not publish a fixed duration until the exact train and travel date have been confirmed through Sri Lanka Railways.",
            },
            {
                route:
                    "Colombo → Nuwara Eliya",

                travelTime:
                    "Approximately 5 – 6.5 hours by road",

                description:
                    "A long highland journey that can travel through Kitulgala, Hatton or another route selected according to the itinerary.",

                note:
                    "Traffic, mountain roads, weather and comfort stops can significantly affect travel time.",
            },
            {
                route:
                    "Colombo Airport → Nuwara Eliya",

                travelTime:
                    "Approximately 5.5 – 7 hours",

                description:
                    "A long direct transfer from the airport into the central highlands.",

                note:
                    "An intermediate overnight stop may be more comfortable after a long international flight.",
            },
            {
                route:
                    "Nuwara Eliya → Horton Plains",

                travelTime:
                    "Approximately 1 – 1.5 hours",

                description:
                    "An early-morning road journey towards the park entrance through highland villages and open mountain landscapes.",

                note:
                    "Departure before sunrise is commonly required for clearer conditions and a comfortable walking schedule.",
            },
            {
                route:
                    "Nuwara Eliya → Yala",

                travelTime:
                    "Approximately 4 – 5.5 hours",

                description:
                    "Connects Sri Lanka’s central highlands with the southern wildlife region through Welimada, Ella or Wellawaya according to the selected route.",
            },
        ],

        practicalTips: [
            "Pack a warm jacket or sweater because mornings, evenings and rainy periods can feel cold.",

            "Carry a rain jacket or umbrella because mist and rainfall can occur throughout the year.",

            "Begin Horton Plains and mountain-view activities very early because cloud and mist may reduce visibility later in the morning.",

            "Wear supportive waterproof footwear for Horton Plains, gardens and estate walks.",

            "Do not leave designated paths, feed wildlife, remove plants or discard litter inside protected natural areas.",

            "Horton Plains entrance permits, fees, opening arrangements and trail conditions must be confirmed before travel.",

            "Travellers with heart, respiratory, mobility or joint concerns should review long walks and high-altitude conditions before visiting Horton Plains.",

            "Reserved train seats should be arranged early where possible, but schedules and operations must still be reconfirmed close to travel.",

            "Nanu Oya is the railway station used for Nuwara Eliya; the town itself does not have a mainline railway station.",

            "Allow additional road-travel time during rain, fog, roadworks and peak domestic holiday periods.",

            "April can be particularly busy because of local holiday activities and seasonal events in Nuwara Eliya.",

            "Dress respectfully when entering Seetha Amman Temple or other active religious locations.",

            "Tea estates are working agricultural properties, so visitors should follow staff instructions and avoid entering restricted production areas.",
        ],

        faqs: [
            {
                question:
                    "How many nights should I stay in Nuwara Eliya?",

                answer:
                    "Two nights are suitable for the town, a tea experience and selected gardens or waterfalls. Three nights provide a more comfortable schedule for Horton Plains and additional highland activities.",
            },
            {
                question:
                    "What is the temperature in Nuwara Eliya?",

                answer:
                    "Official tourism information gives an average annual range of approximately 11°C to 20°C. Conditions vary by season and time of day, and mornings and nights can feel colder.",
            },
            {
                question:
                    "What should I wear in Nuwara Eliya?",

                answer:
                    "Bring layers, including a sweater or light jacket, as well as a rain layer and comfortable walking shoes. Warmer clothing is particularly useful for early-morning departures.",
            },
            {
                question:
                    "Is Nuwara Eliya worth visiting?",

                answer:
                    "Yes, particularly for travellers interested in tea estates, cool weather, highland scenery, waterfalls, gardens, colonial history and Horton Plains.",
            },
            {
                question:
                    "How do I reach Nuwara Eliya by train?",

                answer:
                    "The nearest mainline railway station is Nanu Oya. Travellers continue from Nanu Oya to Nuwara Eliya by road, generally taking around 20 to 30 minutes depending on traffic.",
            },
            {
                question:
                    "Can I travel from Nuwara Eliya to Ella by train?",

                answer:
                    "Yes. Travellers can board at Nanu Oya and continue towards Ella, subject to the current timetable, operational conditions and reserved-seat availability.",
            },
            {
                question:
                    "What is the best time to visit Horton Plains?",

                answer:
                    "A very early-morning visit is generally recommended because views are often clearer before cloud and mist develop later in the day.",
            },
            {
                question:
                    "Can children visit Horton Plains?",

                answer:
                    "Many families visit, but parents should consider the child’s age, fitness, cold or wet conditions and ability to complete several hours of walking over uneven terrain.",
            },
            {
                question:
                    "Can Kandy, Nuwara Eliya and Ella be included in one tour?",

                answer:
                    "Yes. Kandy, Nuwara Eliya and Ella form one of Sri Lanka’s most popular hill-country routes and can combine private road transport with a selected railway segment.",
            },
        ],

        sources: [
            {
                label:
                    "Sri Lanka Tourism — Nuwara Eliya Destination",

                url:
                    "https://srilanka.travel/index.php?destination=4&route=attractions%2Fdestination",
            },
            {
                label:
                    "Sri Lanka Tourism — Nuwara Eliya Holiday Resort",

                url:
                    "https://www.srilanka.travel/national_holiday_resorts",
            },
            {
                label:
                    "Sri Lanka Tourism — Scenic Beauty",

                url:
                    "https://www.srilanka.travel/scenic-beauty",
            },
            {
                label:
                    "Department of Wildlife Conservation — Protected Areas",

                url:
                    "https://www.dwc.gov.lk/?page_id=72",
            },
            {
                label:
                    "Sri Lanka Railways",

                url:
                    "https://railway.gov.lk/web/index.php/en/",
            },
            {
                label:
                    "Sri Lanka Railways — Train Schedule Service",

                url:
                    "https://www.eservices.railway.gov.lk/schedule/homeAction.action?lag=en",
            },
            {
                label:
                    "Department of Meteorology Sri Lanka",

                url:
                    "https://meteo.gov.lk/",
            },
        ],

        lastVerified:
            "2026-07-19",

        planningDisclaimer:
            "Temperatures, travel times, railway services, reserved-seat availability, park access, permits, opening hours, entrance fees, weather, trail conditions and activity availability are subject to change. All operational information must be reconfirmed before issuing the final client itinerary.",
    },
    anuradhapura: {
        slug: "anuradhapura",

        introduction: [
            "Anuradhapura is one of Sri Lanka’s most important ancient cities and a major Buddhist pilgrimage destination. The sacred landscape contains monumental stupas, monastic complexes, reservoirs, stone carvings, royal ruins and active places of worship spread across an extensive archaeological area.",

            "The city developed around the sacred Sri Maha Bodhi and served as an important political and religious capital for approximately thirteen centuries. Today, visitors can explore both archaeological remains and living religious traditions within the UNESCO-listed Sacred City of Anuradhapura.",

            "Anuradh UNESCO-listed Sacred City of Anuradhapura works well as a two-night cultural stop before or after Sigiriya. It can also be connected with Mihintale, Wilpattu National Park, Ritigala, Polonnaruwa, Trincomalee or northern Sri Lanka within a longer private itinerary.",
        ],

        quickFacts: [
            {
                label: "Typical temperature",
                value: "24°C – 34°C",
                note:
                    "Approximate dry-zone planning range. Midday conditions can feel considerably hotter.",
                icon: "temperature",
            },
            {
                label: "Recommended stay",
                value: "2 – 3 nights",
                note:
                    "Suitable for the sacred city, Mihintale and nearby cultural or wildlife experiences.",
                icon: "stay",
            },
            {
                label: "Best exploring time",
                value: "Early morning and late afternoon",
                note:
                    "Usually more comfortable for temple visits, cycling and archaeological exploration.",
                icon: "season",
            },
            {
                label: "Location",
                value: "North Central Province",
                note:
                    "Anuradhapura District in Sri Lanka’s northern dry zone.",
                icon: "location",
            },
            {
                label: "Heritage status",
                value: "UNESCO World Heritage",
                note:
                    "The Sacred City of Anuradhapura was inscribed in 1982.",
                icon: "heritage",
            },
        ],

        climate: {
            temperatureRange:
                "Anuradhapura has a warm tropical dry-zone climate. A practical planning range is approximately 24°C to 34°C, although exposed archaeological sites can feel hotter during the middle of the day.",

            bestMonths:
                "Anuradhapura can be visited throughout the year. January to March and parts of May through September can provide useful periods for Cultural Triangle itineraries, although high temperatures and tropical showers remain possible.",

            relativelyDrierPeriods:
                "Parts of the middle of the year are generally drier and hotter, with stronger sunshine across exposed archaeological areas.",

            wetterPeriods:
                "Rain and thunderstorms are more likely during inter-monsoon and northeast-monsoon periods, particularly later in the year. Heavy rain may affect walking, cycling and road conditions.",

            advice:
                "Begin archaeological visits early, carry sufficient drinking water, use sun protection and keep a light rain layer available. Climate information is general planning guidance rather than a live forecast.",
        },

        location: {
            latitude: 8.335,
            longitude: 80.388,

            areaDescription:
                "Anuradhapura is located in Sri Lanka’s North Central Province. The sacred and archaeological city extends across a large area containing stupas, monasteries, reservoirs, gardens and active religious sites.",

            mapEmbedUrl:
                "https://www.google.com/maps?q=8.335,80.388&z=12&output=embed",

            directionsUrl:
                "https://www.google.com/maps/search/?api=1&query=Sacred+City+of+Anuradhapura+Sri+Lanka",
        },

        recommendedStay:
            "Two nights are suitable for the main sacred-city monuments and Mihintale. Three nights provide a more relaxed pace and allow time for additional archaeological areas, Ritigala, Wilpattu National Park or local village and reservoir experiences.",

        activities: [
            {
                title:
                    "Visit the sacred Sri Maha Bodhi",

                description:
                    "Experience one of Anuradhapura’s most revered Buddhist sites, centred around the sacred Bodhi tree traditionally connected with the tree beneath which the Buddha attained enlightenment.",

                duration:
                    "Approximately 1 – 1.5 hours",

                bestTime:
                    "Early morning or evening",

                difficulty:
                    "Easy walking with religious-site access requirements",
            },
            {
                title:
                    "Explore Ruwanwelisaya",

                description:
                    "Visit the great white stupa associated with King Dutugemunu and observe the active religious atmosphere surrounding one of Anuradhapura’s most important monuments.",

                duration:
                    "Approximately 1 – 1.5 hours",

                bestTime:
                    "Early morning or late afternoon",

                difficulty:
                    "Easy",
            },
            {
                title:
                    "Discover the Abhayagiri Monastery complex",

                description:
                    "Explore the remains of an extensive monastic institution containing a major stupa, ponds, stone carvings, image houses and archaeological structures.",

                duration:
                    "Approximately 1.5 – 2.5 hours",

                bestTime:
                    "Morning or late afternoon",

                difficulty:
                    "Easy to moderate walking",
            },
            {
                title:
                    "Visit Jetavanaramaya",

                description:
                    "See one of Anuradhapura’s most impressive ancient brick monuments and explore the surrounding monastic archaeological complex.",

                duration:
                    "Approximately 1 – 1.5 hours",

                bestTime:
                    "Morning or late afternoon",

                difficulty:
                    "Easy",
            },
            {
                title:
                    "Explore Isurumuniya Temple",

                description:
                    "Visit a historic rock temple known for stone carvings, religious spaces, ponds and a scenic setting near Tissa Wewa.",

                duration:
                    "Approximately 1 – 1.5 hours",

                bestTime:
                    "Morning or late afternoon",

                difficulty:
                    "Easy to moderate with some steps",
            },
            {
                title:
                    "Visit Thuparamaya",

                description:
                    "Explore one of Sri Lanka’s earliest Buddhist stupas and an important place within Anuradhapura’s sacred landscape.",

                duration:
                    "Approximately 45 – 75 minutes",

                bestTime:
                    "Morning or evening",

                difficulty:
                    "Easy",
            },
            {
                title:
                    "Cycle through the ancient city",

                description:
                    "Explore selected monuments, reservoirs and monastic areas by bicycle with a route suited to the traveller’s fitness, weather and available time.",

                duration:
                    "Approximately 3 – 5 hours",

                bestTime:
                    "Early morning",

                difficulty:
                    "Moderate because of heat, distance and road conditions",
            },
            {
                title:
                    "Watch sunset beside Tissa Wewa",

                description:
                    "Enjoy a quieter evening near one of Anuradhapura’s ancient reservoirs, with views across the water and surrounding sacred-city landscape.",

                duration:
                    "Approximately 45 – 90 minutes",

                bestTime:
                    "Late afternoon and sunset",

                difficulty:
                    "Easy",
            },
        ],

        nearbyPlaces: [
            {
                name: "Mihintale",

                travelTime:
                    "Approximately 20 – 30 minutes",

                distance:
                    "Around 11 km",

                description:
                    "A major Buddhist pilgrimage and archaeological site traditionally associated with the introduction of Buddhism to Sri Lanka.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Mihintale+Sri+Lanka",
            },
            {
                name: "Wilpattu National Park",

                travelTime:
                    "Approximately 45 minutes – 1.5 hours depending on the entrance",

                description:
                    "Sri Lanka’s largest national park, known for natural lakes, dry-zone forest and wildlife including elephants, deer, sloth bears and leopards.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Wilpattu+National+Park+Sri+Lanka",
            },
            {
                name: "Ritigala Forest Monastery",

                travelTime:
                    "Approximately 1 – 1.5 hours",

                distance:
                    "Around 45 km depending on the route",

                description:
                    "A forested mountain and ancient monastic area containing stone paths, ruins and a quieter archaeological environment.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Ritigala+Forest+Monastery+Sri+Lanka",
            },
            {
                name: "Aukana Buddha Statue",

                travelTime:
                    "Approximately 1.5 – 2 hours",

                description:
                    "A monumental standing Buddha image carved from rock and associated with Sri Lanka’s ancient sculptural tradition.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Aukana+Buddha+Statue+Sri+Lanka",
            },
            {
                name: "Sigiriya",

                travelTime:
                    "Approximately 1.5 – 2.25 hours",

                description:
                    "Sri Lanka’s famous ancient rock citadel, landscaped garden complex and UNESCO World Heritage Site.",

                destinationSlug:
                    "sigiriya",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Sigiriya+Rock+Fortress+Sri+Lanka",
            },
            {
                name: "Polonnaruwa",

                travelTime:
                    "Approximately 2.5 – 3.5 hours",

                description:
                    "Sri Lanka’s second major ancient capital, known for royal ruins, Buddhist monuments and historic irrigation systems.",

                destinationSlug:
                    "polonnaruwa",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Polonnaruwa+Ancient+City+Sri+Lanka",
            },
        ],

        routeConnections: [
            {
                route:
                    "Colombo Airport → Anuradhapura",

                travelTime:
                    "Approximately 4 – 5.5 hours",

                description:
                    "A direct journey from the international airport towards Sri Lanka’s North Central Province and ancient cultural region.",

                note:
                    "Arrival time, traffic, road conditions and comfort stops can significantly affect the total journey.",
            },
            {
                route:
                    "Sigiriya → Anuradhapura",

                travelTime:
                    "Approximately 1.5 – 2.25 hours",

                description:
                    "A common Cultural Triangle connection between Sigiriya’s rock citadel and Anuradhapura’s extensive sacred city.",

                note:
                    "Ritigala or selected countryside stops may be included depending on the route and available time.",
            },
            {
                route:
                    "Anuradhapura → Polonnaruwa",

                travelTime:
                    "Approximately 2.5 – 3.5 hours",

                description:
                    "Connects Sri Lanka’s first major ancient capital with the later royal city of Polonnaruwa.",
            },
            {
                route:
                    "Anuradhapura → Trincomalee",

                travelTime:
                    "Approximately 2.5 – 3.5 hours",

                description:
                    "A useful route from Sri Lanka’s ancient cultural region towards the beaches and natural harbour of the east coast.",
            },
            {
                route:
                    "Anuradhapura → Jaffna",

                travelTime:
                    "Approximately 3.5 – 5 hours",

                description:
                    "Connects the North Central Province with Sri Lanka’s northern peninsula and Jaffna’s cultural region.",

                note:
                    "Road conditions, traffic, security checks and comfort stops can affect the journey.",
            },
            {
                route:
                    "Anuradhapura → Wilpattu",

                travelTime:
                    "Approximately 45 minutes – 1.5 hours",

                description:
                    "A common connection for travellers combining ancient heritage with a dry-zone wildlife safari.",

                note:
                    "The journey depends on the selected park entrance and accommodation location.",
            },
            {
                route:
                    "Anuradhapura → Kandy",

                travelTime:
                    "Approximately 3.5 – 5 hours",

                description:
                    "A longer route connecting Sri Lanka’s northern ancient capital with the historic hill capital of Kandy.",

                note:
                    "Dambulla, Matale or selected Cultural Triangle stops may be included depending on the itinerary.",
            },
        ],

        practicalTips: [
            "Begin archaeological exploration early because many monuments are spread across open areas with limited shade.",

            "Wear lightweight, breathable clothing and carry sufficient drinking water, sunscreen and a hat.",

            "Keep clothing that covers the shoulders and knees available when entering active Buddhist temples and sacred areas.",

            "Shoes and hats must be removed before entering many religious compounds. Socks can be useful on hot stone surfaces.",

            "Do not turn your back directly towards Buddha images while posing for photographs, and avoid disrespectful poses or behaviour.",

            "Ask before photographing monks, pilgrims, ceremonies or people engaged in worship.",

            "Do not climb, sit on or touch ancient statues, carvings, stupas and archaeological structures unless access is clearly permitted.",

            "The archaeological city covers a large area, so private transport, bicycles or a properly planned guided route can save time.",

            "Avoid cycling during the hottest part of the day and use helmets and suitable bicycles.",

            "Carry cash for smaller ticket counters, donations and local purchases, while reconfirming accepted payment methods.",

            "Full-moon Poya days and pilgrimage periods can bring larger crowds and changes to normal traffic or access arrangements.",

            "Mosquito protection is useful during early mornings, evenings and visits near reservoirs or vegetation.",

            "Entrance fees, archaeological tickets, opening arrangements and monument access should be reconfirmed before travel.",
        ],

        faqs: [
            {
                question:
                    "How many nights should I stay in Anuradhapura?",

                answer:
                    "Two nights are suitable for the main sacred-city monuments and Mihintale. Three nights provide a more relaxed experience and allow time for Wilpattu, Ritigala or additional archaeological areas.",
            },
            {
                question:
                    "Why is Anuradhapura important?",

                answer:
                    "Anuradhapura was one of Sri Lanka’s longest-serving political and religious capitals and remains one of the country’s most sacred Buddhist cities. Its monuments, monasteries and religious traditions led to UNESCO World Heritage recognition.",
            },
            {
                question:
                    "Is Anuradhapura a UNESCO World Heritage Site?",

                answer:
                    "Yes. The Sacred City of Anuradhapura was inscribed on the UNESCO World Heritage List in 1982.",
            },
            {
                question:
                    "How long does it take to explore the ancient city?",

                answer:
                    "The principal monuments normally require most of a day. Travellers interested in archaeology, photography or religious heritage may prefer to divide the visit across two days.",
            },
            {
                question:
                    "Can I explore Anuradhapura by bicycle?",

                answer:
                    "Yes. Cycling is a popular way to travel between selected monuments, but travellers should consider heat, traffic, distance, fitness and bicycle safety.",
            },
            {
                question:
                    "What should I wear in Anuradhapura?",

                answer:
                    "Wear lightweight clothing for the hot climate and carry modest clothing that covers the shoulders and knees for religious sites. Comfortable footwear that can be removed easily is useful.",
            },
            {
                question:
                    "Can I visit Mihintale from Anuradhapura?",

                answer:
                    "Yes. Mihintale is approximately 11 kilometres from Anuradhapura and is commonly visited during the same stay.",
            },
            {
                question:
                    "Can Anuradhapura and Sigiriya be included in one tour?",

                answer:
                    "Yes. They are commonly combined within a Cultural Triangle itinerary, with a road journey generally taking around one-and-a-half to slightly over two hours.",
            },
            {
                question:
                    "Can I combine Anuradhapura with Wilpattu National Park?",

                answer:
                    "Yes. Anuradhapura can be used as part of a heritage-and-wildlife route, although the most convenient arrangement depends on the park entrance, safari time and accommodation location.",
            },
            {
                question:
                    "Is Anuradhapura suitable for families?",

                answer:
                    "Yes, but families should plan around the heat, walking distances and religious-site behaviour. Private transport between the monuments can make the visit more comfortable.",
            },
        ],

        sources: [
            {
                label:
                    "UNESCO — Sacred City of Anuradhapura",

                url:
                    "https://whc.unesco.org/en/list/200/",
            },
            {
                label:
                    "Sri Lanka Tourism — Heritage",

                url:
                    "https://www.srilanka.travel/heritage-discover-the-past",
            },
            {
                label:
                    "Sri Lanka Tourism — Buddhist Places",

                url:
                    "https://www.srilanka.travel/buddhist-places/attractions.php",
            },
            {
                label:
                    "Sri Lanka Tourism — Anuradhapura National Holiday Resort",

                url:
                    "https://www.srilanka.travel/national_holiday_resorts",
            },
            {
                label:
                    "Department of Archaeology Sri Lanka",

                url:
                    "https://archaeology.gov.lk/",
            },
            {
                label:
                    "Department of Meteorology Sri Lanka",

                url:
                    "https://meteo.gov.lk/",
            },
        ],

        lastVerified:
            "2026-07-19",

        planningDisclaimer:
            "Temperatures, travel times, archaeological tickets, religious-site access, park operations, entrance fees, road conditions, opening hours and activity availability are approximate or subject to change. All operational information must be reconfirmed before issuing the final client itinerary.",
    },
    polonnaruwa: {
        slug: "polonnaruwa",

        introduction: [
            "Polonnaruwa is one of Sri Lanka’s most important ancient cities and the island’s second major historic capital after Anuradhapura. Its archaeological landscape contains royal palaces, Buddhist monasteries, Hindu monuments, bathing pools, audience halls, image houses, stone carvings and advanced irrigation works.",

            "The ancient city reached its greatest development during the twelfth century under King Parakramabahu I. The remains of the royal garden city, the Parakrama Samudra reservoir, Gal Vihara and extensive religious complexes demonstrate the engineering, artistic and administrative achievements of the Polonnaruwa Kingdom.",

            "Polonnaruwawa Kingdom.",

            "Polonnaruwa works naturally within a Cultural Triangle journey alongside Sigiriya, Dambulla and Anuradhapura. It can also be combined with a wildlife safari in Minneriya, Kaudulla or another suitable nearby national park according to current elephant movement and park conditions.",
        ],

        quickFacts: [
            {
                label: "Typical temperature",
                value: "24°C – 34°C",
                note:
                    "Approximate dry-zone planning range. Exposed archaeological areas can feel hotter at midday.",
                icon: "temperature",
            },
            {
                label: "Recommended stay",
                value: "1 – 2 nights",
                note:
                    "Suitable for the ancient city, reservoir and a nearby wildlife experience.",
                icon: "stay",
            },
            {
                label: "Best exploring time",
                value: "Early morning and late afternoon",
                note:
                    "Usually more comfortable for walking, cycling and photography.",
                icon: "season",
            },
            {
                label: "Location",
                value: "North Central Province",
                note:
                    "Polonnaruwa District within Sri Lanka’s Cultural Triangle.",
                icon: "location",
            },
            {
                label: "Heritage status",
                value: "UNESCO World Heritage",
                note:
                    "The Ancient City of Polonnaruwa was inscribed in 1982.",
                icon: "heritage",
            },
        ],

        climate: {
            temperatureRange:
                "Polonnaruwa has a warm tropical dry-zone climate. A practical daytime planning range is approximately 24°C to 34°C, although direct sunlight across exposed ruins can make conditions feel considerably hotter.",

            bestMonths:
                "Polonnaruwa can be visited throughout the year. January to March and parts of May through September can provide useful periods for Cultural Triangle itineraries, although heat and tropical showers remain possible.",

            relativelyDrierPeriods:
                "Parts of the middle of the year are generally drier and warmer. These conditions can improve access but may also create stronger heat during archaeological visits.",

            wetterPeriods:
                "Rain and thunderstorms are more likely during inter-monsoon and northeast-monsoon periods, particularly later in the year. Heavy rain can affect paths, cycling, road conditions and wildlife safaris.",

            advice:
                "Start archaeological exploration early, carry drinking water and use sun protection. Keep a light rain layer available and avoid scheduling long outdoor walks during the hottest part of the day.",
        },

        location: {
            latitude: 7.9403,
            longitude: 81.0188,

            areaDescription:
                "Polonnaruwa is located in Sri Lanka’s North Central Province. The modern town and Kaduruwela area are separate from the protected ancient-city zone, which extends beside the Parakrama Samudra reservoir.",

            mapEmbedUrl:
                "https://www.google.com/maps?q=7.9403,81.0188&z=13&output=embed",

            directionsUrl:
                "https://www.google.com/maps/search/?api=1&query=Ancient+City+of+Polonnaruwa+Sri+Lanka",
        },

        recommendedStay:
            "One night can work for travellers visiting the principal ancient-city monuments while travelling between Sigiriya and the east coast. Two nights provide a more relaxed archaeological visit and allow time for a nearby wildlife safari or additional cultural sites.",

        activities: [
            {
                title:
                    "Explore the Royal Palace complex",

                description:
                    "Walk through the remains of King Parakramabahu’s royal complex, including the palace foundations, council chamber and bathing areas associated with the medieval capital.",

                duration:
                    "Approximately 1 – 1.5 hours",

                bestTime:
                    "Early morning",

                difficulty:
                    "Easy to moderate walking over uneven ground",
            },
            {
                title:
                    "Visit the Sacred Quadrangle",

                description:
                    "Explore the Dalada Maluwa, a concentrated group of important religious structures including the Vatadage, Hatadage, Atadage and other monuments associated with the sacred Tooth Relic tradition.",

                duration:
                    "Approximately 1 – 2 hours",

                bestTime:
                    "Morning or late afternoon",

                difficulty:
                    "Easy to moderate walking",
            },
            {
                title:
                    "See the Gal Vihara rock statues",

                description:
                    "Visit the famous rock shrine containing seated, standing and reclining Buddha images carved directly from a granite rock face during the Polonnaruwa period.",

                duration:
                    "Approximately 1 – 1.5 hours",

                bestTime:
                    "Morning or late afternoon",

                difficulty:
                    "Easy",
            },
            {
                title:
                    "Explore Alahana Pirivena",

                description:
                    "Discover the remains of a major twelfth-century monastic and educational complex containing stupas, image houses, chapter buildings, monks’ cells and an ancient hospital area.",

                duration:
                    "Approximately 1.5 – 2.5 hours",

                bestTime:
                    "Morning or late afternoon",

                difficulty:
                    "Moderate walking across a large archaeological area",
            },
            {
                title:
                    "Visit Rankoth Vehera",

                description:
                    "See one of the largest stupas in Polonnaruwa, constructed within the extensive monastic landscape of the ancient capital.",

                duration:
                    "Approximately 45 – 75 minutes",

                bestTime:
                    "Early morning or evening",

                difficulty:
                    "Easy",
            },
            {
                title:
                    "Walk beside Parakrama Samudra",

                description:
                    "Experience views across the large historic reservoir associated with King Parakramabahu I and Polonnaruwa’s advanced irrigation landscape.",

                duration:
                    "Approximately 45 minutes – 1.5 hours",

                bestTime:
                    "Early morning or sunset",

                difficulty:
                    "Easy",
            },
            {
                title:
                    "Cycle through the ancient city",

                description:
                    "Travel between selected archaeological monuments by bicycle using a route suited to the weather, road conditions, fitness and available time.",

                duration:
                    "Approximately 3 – 5 hours",

                bestTime:
                    "Early morning",

                difficulty:
                    "Moderate because of heat, distance and uneven surfaces",
            },
            {
                title:
                    "Join a nearby wildlife safari",

                description:
                    "Visit Minneriya, Kaudulla or another suitable park depending on current elephant movement, weather, access and advice from local wildlife authorities.",

                duration:
                    "Approximately 3 – 4 hours",

                bestTime:
                    "Morning or afternoon according to current conditions",

                difficulty:
                    "Suitable for most travellers; jeep tracks may be rough",
            },
        ],

        nearbyPlaces: [
            {
                name:
                    "Minneriya National Park",

                travelTime:
                    "Approximately 40 – 60 minutes",

                distance:
                    "Around 35 km depending on the route",

                description:
                    "A protected dry-zone park centred around the Minneriya reservoir and known for elephants, birdlife and seasonal wildlife activity.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Minneriya+National+Park+Sri+Lanka",
            },
            {
                name:
                    "Kaudulla National Park",

                travelTime:
                    "Approximately 45 minutes – 1.25 hours",

                description:
                    "A nearby national park containing reservoir, grassland and forest habitats used by elephants and other dry-zone wildlife.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Kaudulla+National+Park+Sri+Lanka",
            },
            {
                name:
                    "Medirigiriya Vatadage",

                travelTime:
                    "Approximately 45 minutes – 1 hour",

                distance:
                    "Around 30 km",

                description:
                    "An archaeological site known for its circular relic-house structure, stone pillars and quieter forested setting.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Medirigiriya+Vatadage+Sri+Lanka",
            },
            {
                name:
                    "Somawathiya Sacred Area",

                travelTime:
                    "Approximately 1.5 – 2.5 hours",

                description:
                    "A significant Buddhist pilgrimage destination situated near the Mahaweli River within a remote dry-zone landscape.",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Somawathiya+Stupa+Sri+Lanka",
            },
            {
                name:
                    "Sigiriya",

                travelTime:
                    "Approximately 1.25 – 1.75 hours",

                distance:
                    "Around 55 km",

                description:
                    "Sri Lanka’s famous ancient rock citadel, royal garden complex and UNESCO World Heritage Site.",

                destinationSlug:
                    "sigiriya",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Sigiriya+Rock+Fortress+Sri+Lanka",
            },
            {
                name:
                    "Anuradhapura",

                travelTime:
                    "Approximately 2.5 – 3.5 hours",

                description:
                    "Sri Lanka’s earlier sacred capital, known for monumental stupas, monasteries, reservoirs and active Buddhist pilgrimage sites.",

                destinationSlug:
                    "anuradhapura",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Sacred+City+of+Anuradhapura+Sri+Lanka",
            },
            {
                name:
                    "Trincomalee",

                travelTime:
                    "Approximately 2.5 – 3.5 hours",

                description:
                    "An east-coast destination known for its natural harbour, beaches, temples and seasonal marine activities.",

                destinationSlug:
                    "trincomalee",

                mapUrl:
                    "https://www.google.com/maps/search/?api=1&query=Trincomalee+Sri+Lanka",
            },
        ],

        routeConnections: [
            {
                route:
                    "Sigiriya → Polonnaruwa",

                travelTime:
                    "Approximately 1.25 – 1.75 hours",

                description:
                    "A classic Cultural Triangle route connecting Sigiriya’s rock citadel with Sri Lanka’s medieval capital.",

                note:
                    "A Minneriya or Kaudulla safari may be included according to timing, park access and wildlife movement.",
            },
            {
                route:
                    "Anuradhapura → Polonnaruwa",

                travelTime:
                    "Approximately 2.5 – 3.5 hours",

                description:
                    "Connects Sri Lanka’s first major ancient capital with the later royal and administrative centre of Polonnaruwa.",

                note:
                    "The route can be incorporated into a wider Cultural Triangle itinerary rather than treated as a rushed day trip.",
            },
            {
                route:
                    "Polonnaruwa → Trincomalee",

                travelTime:
                    "Approximately 2.5 – 3.5 hours",

                description:
                    "A useful route connecting Sri Lanka’s ancient cultural region with the beaches and natural harbour of the east coast.",

                note:
                    "Travel time depends on road conditions, traffic, accommodation location and comfort stops.",
            },
            {
                route:
                    "Polonnaruwa → Kandy",

                travelTime:
                    "Approximately 3.5 – 4.5 hours",

                description:
                    "Connects the North Central Province with Sri Lanka’s historic hill capital through Habarana, Dambulla and Matale.",

                note:
                    "Dambulla or selected route stops can be added when the itinerary allows.",
            },
            {
                route:
                    "Polonnaruwa → Dambulla",

                travelTime:
                    "Approximately 1.5 – 2.25 hours",

                description:
                    "A Cultural Triangle connection towards the Dambulla Cave Temple and onward travel to Kandy or Colombo.",
            },
            {
                route:
                    "Colombo Airport → Polonnaruwa",

                travelTime:
                    "Approximately 4.5 – 6 hours",

                description:
                    "A long transfer from the international airport into Sri Lanka’s North Central Province.",

                note:
                    "A first-night stop in Negombo, Sigiriya or Dambulla may create a more comfortable arrival itinerary.",
            },
            {
                route:
                    "Polonnaruwa → Batticaloa",

                travelTime:
                    "Approximately 2.5 – 3.5 hours",

                description:
                    "Connects the ancient city with Sri Lanka’s eastern lagoons, beaches and Batticaloa region.",
            },
        ],

        practicalTips: [
            "Begin archaeological exploration early because many ruins are exposed to strong sunlight with limited shade.",

            "Carry sufficient drinking water, sunscreen, sunglasses and a hat.",

            "Wear lightweight clothing while keeping the shoulders and knees covered for religious monuments and active worship areas.",

            "Shoes and hats must be removed at some Buddhist sites. Socks can be useful on hot stone and sand surfaces.",

            "Do not climb, sit on or touch ancient statues, carvings, walls and archaeological structures unless access is clearly permitted.",

            "Avoid disrespectful photographs or poses in front of Buddha images, and do not turn your back directly towards sacred statues while posing.",

            "The archaeological zone covers a large area, so private transport or bicycles can make the visit more manageable.",

            "Use a helmet and suitable bicycle, avoid cycling during extreme heat and take care around vehicles and uneven surfaces.",

            "Check archaeological ticket conditions, museum hours, site access and temporary closures before visiting.",

            "Choose a responsible safari operator and never request drivers to chase, surround or disturb elephants and other wildlife.",

            "Elephant sightings and the most suitable national park depend on natural movement, water availability and seasonal conditions.",

            "Do not approach wild elephants encountered beside public roads. Remain inside the vehicle and allow them sufficient space.",

            "Carry mosquito protection for early-morning, evening and reservoir-side activities.",

            "Allow extra travel time during heavy rain, public holidays and busy pilgrimage periods.",
        ],

        faqs: [
            {
                question:
                    "How many nights should I stay in Polonnaruwa?",

                answer:
                    "One night can work for the main ancient-city monuments. Two nights provide a more comfortable visit and allow time for a nearby wildlife safari or additional archaeological sites.",
            },
            {
                question:
                    "Is Polonnaruwa a UNESCO World Heritage Site?",

                answer:
                    "Yes. The Ancient City of Polonnaruwa was inscribed on the UNESCO World Heritage List in 1982.",
            },
            {
                question:
                    "Why is Polonnaruwa important?",

                answer:
                    "Polonnaruwa became Sri Lanka’s second major capital after Anuradhapura and developed into an important royal, religious, administrative and irrigation centre during the medieval period.",
            },
            {
                question:
                    "How long does it take to explore Polonnaruwa?",

                answer:
                    "The principal archaeological monuments generally require four to six hours. Travellers with a deeper interest in archaeology, cycling or photography may prefer a full day.",
            },
            {
                question:
                    "Can I explore Polonnaruwa by bicycle?",

                answer:
                    "Yes. Cycling is a popular way to travel between selected monuments, but travellers should consider heat, road traffic, fitness and bicycle condition.",
            },
            {
                question:
                    "What should I wear in Polonnaruwa?",

                answer:
                    "Wear lightweight, breathable clothing and keep the shoulders and knees covered when entering Buddhist monuments. Comfortable footwear that can be removed easily is useful.",
            },
            {
                question:
                    "Can Sigiriya and Polonnaruwa be visited on the same day?",

                answer:
                    "It is possible with an early start, but the schedule can feel rushed. Staying in the Cultural Triangle for at least two or three nights creates a more comfortable experience.",
            },
            {
                question:
                    "Can I combine Polonnaruwa with a safari?",

                answer:
                    "Yes. Minneriya and Kaudulla are common options, but the most suitable park should be selected according to current wildlife movement, park access and local advice.",
            },
            {
                question:
                    "Are elephants guaranteed near Polonnaruwa?",

                answer:
                    "No. The surrounding region contains important elephant habitat, but sightings depend on natural animal movement, weather, water availability and the selected park.",
            },
            {
                question:
                    "Is Polonnaruwa suitable for families?",

                answer:
                    "Yes. Private transport between monuments can make the experience comfortable for families. Parents should plan around heat, walking distances and respectful behaviour at religious sites.",
            },
        ],

        sources: [
            {
                label:
                    "UNESCO — Ancient City of Polonnaruwa",

                url:
                    "https://whc.unesco.org/en/list/201/",
            },
            {
                label:
                    "Sri Lanka Tourism — Polonnaruwa",

                url:
                    "https://www.srilanka.travel/index.php?destination=13&route=attractions%2Fdestination",
            },
            {
                label:
                    "Sri Lanka Tourism — Polonnaruwa Heritage",

                url:
                    "https://srilanka.travel/index.php?article=30&route=theame%2Fmain&theame=2",
            },
            {
                label:
                    "Sri Lanka Tourism — Buddhist Attractions",

                url:
                    "https://www.srilanka.travel/buddhist-places/attractions.php",
            },
            {
                label:
                    "Department of Archaeology Sri Lanka",

                url:
                    "https://archaeology.gov.lk/",
            },
            {
                label:
                    "Department of Wildlife Conservation — Protected Areas",

                url:
                    "https://www.dwc.gov.lk/?page_id=72",
            },
            {
                label:
                    "Department of Meteorology Sri Lanka",

                url:
                    "https://meteo.gov.lk/",
            },
        ],

        lastVerified:
            "2026-07-19",

        planningDisclaimer:
            "Temperatures, travel times, archaeological tickets, religious-site access, national-park operations, wildlife movement, entrance fees, road conditions and activity availability are approximate or subject to change. All operational information must be reconfirmed before issuing the final client itinerary.",
    },
    trincomalee: {
        slug: "trincomalee",

        introduction: [
            "Trincomalee is one of Sri Lanka’s most distinctive east-coast destinations, combining a vast natural harbour, tropical beaches, Hindu and Buddhist heritage, colonial fortifications and access to protected marine environments.",

            "The destination is home to the beaches of Nilaveli and Uppuveli, the offshore Pigeon Island National Park, historic Fort Frederick and Koneswaram Temple on Swami Rock. The surrounding coastline also supports seasonal whale watching, diving, snorkelling, fishing communities and quieter beach stays.",

            "Trincomalee works particularly well after Sigiriya, Polonnaruwa or Anuradhapura. Travellers can include it as a two-to-four-night east-coast extension before continuing towards Pasikuda, Batticaloa or northern Sri Lanka.",
        ],

        quickFacts: [
            {
                label: "Typical temperature",
                value: "24°C – 32°C",
                note:
                    "Approximate tropical east-coast planning range rather than a live forecast.",
                icon: "temperature",
            },
            {
                label: "Recommended stay",
                value: "2 – 4 nights",
                note:
                    "Suitable for beaches, heritage, snorkelling and seasonal marine activities.",
                icon: "stay",
            },
            {
                label: "Best beach period",
                value: "May – September",
                note:
                    "The east coast is often drier with more suitable sea conditions during this period.",
                icon: "season",
            },
            {
                label: "Location",
                value: "Eastern Province",
                note:
                    "Trincomalee District on Sri Lanka’s northeast coast.",
                icon: "location",
            },
            {
                label: "Destination type",
                value: "Beach, Marine & Heritage",
                note:
                    "Natural harbour, beaches, temples, fortifications and marine experiences.",
                icon: "heritage",
            },
        ],

        climate: {
            temperatureRange:
                "Trincomalee has a warm tropical coastal climate. A practical planning range is approximately 24°C to 32°C, with strong sunshine, humidity and warmer daytime conditions possible throughout the year.",

            bestMonths:
                "May to September is generally the most useful period for east-coast beach holidays, snorkelling and marine activities. Some whale-watching operations may continue into October, subject to sea conditions and confirmed schedules.",

            relativelyDrierPeriods:
                "The southwest-monsoon months from approximately May to September often bring comparatively drier conditions to Trincomalee while heavier rain affects parts of Sri Lanka’s southwest coast.",

            wetterPeriods:
                "The northeast monsoon and inter-monsoon periods, particularly from October through January, may bring heavier rain, thunderstorms, wind and rougher sea conditions to the east coast.",

            advice:
                "Use sun protection, stay hydrated and check daily marine forecasts before swimming, snorkelling, diving or joining a boat excursion. Climate and sea information is general planning guidance rather than a live forecast.",
        },

        location: {
            latitude: 8.5874,
            longitude: 81.2152,

            areaDescription:
                "Trincomalee is located on Sri Lanka’s northeast coast in the Eastern Province. The city surrounds a large natural harbour, while the main beach areas of Uppuveli and Nilaveli extend north along the coastline.",

            mapEmbedUrl:
                "https://www.google.com/maps?q=8.5874,81.2152&z=12&output=embed",

            directionsUrl:
                "https://www.google.com/maps/search/?api=1&query=Trincomalee+Sri+Lanka",
        },

        recommendedStay:
            "Two nights are suitable for a city tour, Koneswaram Temple and beach time. Three or four nights provide a more relaxed stay with Pigeon Island, snorkelling, diving, whale watching or nearby east-coast excursions.",

        activities: [
            {
                title:
                    "Visit Koneswaram Temple",

                description:
                    "Explore the important Hindu temple dedicated to Lord Shiva on Swami Rock, with views across the Indian Ocean, Trincomalee Bay and the surrounding coastline.",

                duration:
                    "Approximately 1 – 1.5 hours",

                bestTime:
                    "Early morning or late afternoon",

                difficulty:
                    "Easy to moderate walking with some steps",
            },
            {
                title:
                    "Explore Fort Frederick",

                description:
                    "Walk through the historic fortified area originally developed by the Portuguese and later used by Dutch and British colonial powers.",

                duration:
                    "Approximately 1 – 2 hours",

                bestTime:
                    "Morning or late afternoon",

                difficulty:
                    "Easy to moderate walking",
            },
            {
                title:
                    "Relax at Nilaveli Beach",

                description:
                    "Spend time on one of Trincomalee’s best-known beaches, with soft sand, open coastal scenery and access to Pigeon Island boat services when operating.",

                duration:
                    "Flexible",

                bestTime:
                    "Morning or late afternoon during suitable sea conditions",

                difficulty:
                    "Easy",
            },
            {
                title:
                    "Enjoy Uppuveli Beach",

                description:
                    "Relax at a convenient beach area closer to Trincomalee town, with accommodation, cafés, restaurants and access to local marine-activity providers.",

                duration:
                    "Flexible",

                bestTime:
                    "Morning or late afternoon",

                difficulty:
                    "Easy",
            },
            {
                title:
                    "Snorkel at Pigeon Island National Park",

                description:
                    "Travel by authorized boat from Nilaveli to the protected marine national park, known for coral habitats, reef fish and other marine life.",

                duration:
                    "Approximately 3 – 4 hours including boat transfers",

                bestTime:
                    "Morning during calm and clear sea conditions",

                difficulty:
                    "Swimming and snorkelling ability required",
            },
            {
                title:
                    "Join a seasonal whale-watching cruise",

                description:
                    "Travel into the waters off Trincomalee with a registered and safety-conscious operator to search for whales, dolphins and other marine wildlife.",

                duration:
                    "Approximately 4 – 5 hours",

                bestTime:
                    "Early morning, generally during the east-coast operating season",

                difficulty:
                    "Boat journey; may not suit travellers prone to seasickness",
            },
            {
                title:
                    "Experience scuba diving",

                description:
                    "Explore selected reefs, underwater landscapes or wreck-diving locations with a properly certified and registered dive centre.",

                duration:
                    "Half-day or full-day depending on certification and dive plan",

                bestTime:
                    "During suitable visibility, current and sea conditions",

                difficulty:
                    "Certification and experience requirements vary",
            },
            {
                title:
                    "Visit Kanniya Hot Wells",

                description:
                    "Visit the historic group of wells near Trincomalee, known for water that varies in temperature between the individual wells.",

                duration:
                    "Approximately 45 – 90 minutes",

                bestTime:
                    "Morning or late afternoon",

                difficulty:
                    "Easy",
            },
            {
                title:
                    "Explore Trincomalee Harbour",

                description:
                    "Discover the city’s naval and maritime history through an approved harbour, museum or dockyard experience where current public access is available.",

                duration:
                    "Approximately 1 – 3 hours",

                bestTime:
                    "According to confirmed access and booking arrangements",

            difficulty:
                "Suitable for most travellers",
        },
    ],

    nearbyPlaces: [
        {
            name: "Nilaveli Beach",

            travelTime:
                "Approximately 25 – 40 minutes",

            distance:
                "Around 15 – 20 km",

            description:
                "A peaceful east-coast beach and the principal departure area for authorized trips to Pigeon Island National Park.",

            mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Nilaveli+Beach+Sri+Lanka",
        },
        {
            name: "Uppuveli Beach",

            travelTime:
                "Approximately 10 – 20 minutes",

            distance:
                "Around 5 km",

            description:
                "A convenient beach area close to Trincomalee town, with accommodation, restaurants and marine-activity services.",

            mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Uppuveli+Beach+Sri+Lanka",
        },
        {
            name:
                "Pigeon Island National Park",

            travelTime:
                "Approximately 15 – 30 minutes by boat from Nilaveli after reaching the departure point",

            description:
                "A protected marine national park with coral reefs, reef fish and shallow-water marine habitats.",

            mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Pigeon+Island+National+Park+Sri+Lanka",
        },
        {
            name: "Marble Beach",

            travelTime:
                "Approximately 30 – 50 minutes",

            description:
                "A sheltered beach area near the harbour region, known for clear water and a quieter coastal setting when public access is available.",

            mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Marble+Beach+Trincomalee+Sri+Lanka",
        },
        {
            name:
                "Kanniya Hot Wells",

            travelTime:
                "Approximately 20 – 30 minutes",

            distance:
                "Around 8 – 10 km",

            description:
                "A group of historic wells containing naturally warm water at varying temperatures.",

            mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Kanniya+Hot+Water+Wells+Sri+Lanka",
        },
        {
            name:
                "Seruwila Mangala Raja Maha Viharaya",

            travelTime:
                "Approximately 1.5 – 2.5 hours",

            description:
                "An important Buddhist pilgrimage site southeast of Trincomalee, suitable for inclusion in a cultural east-coast journey.",

            mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Seruwila+Mangala+Raja+Maha+Viharaya+Sri+Lanka",
        },
        {
            name: "Polonnaruwa",

            travelTime:
                "Approximately 2.5 – 3.5 hours",

            description:
                "Sri Lanka’s medieval capital, known for royal ruins, Buddhist monuments, stone carvings and historic irrigation works.",

            destinationSlug:
                "polonnaruwa",

            mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Ancient+City+of+Polonnaruwa+Sri+Lanka",
        },
        {
            name: "Pasikuda",

            travelTime:
                "Approximately 2.5 – 3.5 hours",

            description:
                "An east-coast beach destination known for its broad bay, shallow coastal water and resort-style stays.",

            mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Pasikuda+Sri+Lanka",
        },
    ],

    routeConnections: [
        {
            route:
                "Sigiriya → Trincomalee",

            travelTime:
                "Approximately 2.5 – 3.5 hours",

            description:
                "A popular route connecting the Cultural Triangle with Sri Lanka’s northeast beaches and natural harbour.",

            note:
                "Travel time depends on traffic, road conditions, accommodation location and selected stops.",
        },
        {
            route:
                "Polonnaruwa → Trincomalee",

            travelTime:
                "Approximately 2.5 – 3.5 hours",

            description:
                "Connects Sri Lanka’s medieval capital with the east-coast beaches, temples and marine experiences of Trincomalee.",
        },
        {
            route:
                "Anuradhapura → Trincomalee",

            travelTime:
                "Approximately 2.5 – 3.5 hours",

            description:
                "A useful route between Sri Lanka’s ancient sacred city and the northeast coast.",

            note:
                "Mihintale or selected cultural stops may be included depending on timing.",
        },
        {
            route:
                "Trincomalee → Pasikuda",

            travelTime:
                "Approximately 2.5 – 3.5 hours",

            description:
                "A scenic east-coast connection between Trincomalee and the resort beaches of Pasikuda and Kalkudah.",
        },
        {
            route:
                "Trincomalee → Batticaloa",

            travelTime:
                "Approximately 3 – 4 hours",

            description:
                "Connects Trincomalee with Batticaloa’s lagoon, historic sites and eastern coastal region.",
        },
        {
            route:
                "Colombo Airport → Trincomalee",

            travelTime:
                "Approximately 5.5 – 7 hours",

            description:
                "A long transfer from the international airport to Sri Lanka’s northeast coast.",

            note:
                "A first-night stop in Negombo, Sigiriya, Dambulla or Anuradhapura may create a more comfortable itinerary.",
        },
        {
            route:
                "Kandy → Trincomalee",

            travelTime:
                "Approximately 4.5 – 6 hours",

            description:
                "A longer route connecting Sri Lanka’s central hill capital with its northeast harbour and beach region.",

            note:
                "Dambulla or Sigiriya can be included as an intermediate stop within a longer itinerary.",
        },
        {
            route:
                "Trincomalee → Jaffna",

            travelTime:
                "Approximately 4.5 – 6 hours",

            description:
                "Connects Sri Lanka’s northeast coast with the cultural landscapes and islands of the northern peninsula.",
        },
    ],

    practicalTips: [
        "Visit Koneswaram Temple in modest clothing that covers the shoulders and knees.",

        "Remove shoes and hats before entering designated temple areas and avoid interrupting worship or ceremonies.",

        "Fort Frederick remains connected with military and government activities, so visitors should respect signs, restricted areas and security instructions.",

        "Use only authorized boat operators for Pigeon Island, diving, snorkelling and whale-watching excursions.",

        "Pigeon Island is a protected national park. Do not stand on, touch, collect or damage coral.",

        "Do not feed, touch, chase or surround reef fish, sharks, turtles or other marine animals.",

        "Use reef-conscious sun protection where appropriate and avoid leaving plastic or other waste on beaches and islands.",

        "Check wind, waves, currents and visibility before swimming, snorkelling or diving.",

        "Marine activities can be cancelled because of rough seas, rain, poor visibility or operational restrictions.",

        "Whales and dolphins are wild animals, so sightings are never guaranteed.",

        "Choose whale-watching operators that keep a respectful distance and follow marine-mammal observation and safety rules.",

        "Travellers prone to seasickness should seek suitable medical or pharmaceutical advice before joining a boat excursion.",

        "Carry sun protection and sufficient drinking water during beach and boat activities.",

        "Protect cameras, phones and valuables from sea spray using waterproof bags or covers.",

        "Entrance fees, park permits, boat charges, diving requirements, harbour access and operating times must be reconfirmed before travel.",

        "The east coast can experience heavy rain and rougher seas during the northeast-monsoon period, so itineraries should remain flexible.",
    ],

    faqs: [
        {
            question:
                "How many nights should I stay in Trincomalee?",

            answer:
                "Two nights are suitable for the main city attractions and beach time. Three or four nights provide a more relaxed visit with Pigeon Island, diving, snorkelling or seasonal whale watching.",
        },
        {
            question:
                "What is the best time to visit Trincomalee?",

            answer:
                "May to September is generally the most useful period for east-coast beach holidays and marine activities. Conditions vary each year, so weather and sea forecasts should still be checked.",
        },
        {
            question:
                "Can I visit Pigeon Island from Trincomalee?",

            answer:
                "Yes. Visitors normally travel by road to Nilaveli and then use an authorized boat service to reach Pigeon Island National Park, subject to current permits and sea conditions.",
        },
        {
            question:
                "Is snorkelling at Pigeon Island suitable for beginners?",

            answer:
                "Conditions may suit some beginners, but suitability depends on swimming confidence, currents, waves, visibility and guidance. Travellers should use proper safety equipment and an experienced provider.",
        },
        {
            question:
                "Can I see sharks at Pigeon Island?",

            answer:
                "Blacktip reef sharks and other marine species may sometimes be observed, but sightings are natural and cannot be guaranteed. Visitors should maintain a respectful distance.",
        },
        {
            question:
                "When is whale watching available in Trincomalee?",

            answer:
                "Whale-watching operations are generally associated with the east-coast period from approximately May to October. Exact schedules depend on the operator, weather and sea conditions.",
        },
        {
            question:
                "Are whale sightings guaranteed?",

            answer:
                "No. Whales and dolphins move naturally through a large marine environment, so sightings depend on season, sea conditions and luck.",
        },
        {
            question:
                "Can Sigiriya and Trincomalee be included in the same tour?",

            answer:
                "Yes. Sigiriya and Trincomalee are commonly combined, allowing travellers to connect the Cultural Triangle with an east-coast beach stay.",
        },
        {
            question:
                "Is Trincomalee suitable for families?",

            answer:
                "Yes. Families can enjoy beaches, temples and city attractions, but parents should carefully consider boat safety, swimming ability, sun exposure and the length of marine excursions.",
        },
        {
            question:
                "What should I wear at Koneswaram Temple?",

            answer:
                "Wear respectful clothing that covers the shoulders and knees. Shoes and hats should be removed before entering designated religious areas.",
        },
    ],

    sources: [
        {
            label:
                "Sri Lanka Tourism — Trincomalee",

            url:
                "https://srilanka.travel/index.php?destination=10&route=attractions%2Fdestination",
        },
        {
            label:
                "Sri Lanka Tourism — Trincomalee, Nilaveli and Uppuveli",

            url:
                "https://www.srilanka.travel/index.php?article=46&route=theame%2Fmain&theame=1",
        },
        {
            label:
                "Sri Lanka Tourism — Trincomalee Port",

            url:
                "https://www.srilanka.travel/ArrivebyaCruise/trinco-port.php",
        },
        {
            label:
                "Sri Lanka Tourism — Pigeon Island National Park",

            url:
                "https://www.srilanka.travel/attraction?attraction_id=159",
        },
        {
            label:
                "Department of Wildlife Conservation — Marine Tourism",

            url:
                "https://www.dwc.gov.lk/?page_id=817",
        },
        {
            label:
                "Sri Lanka Tourism — Koneswaram Temple",

            url:
                "https://srilanka.travel/index.php?attraction_id=167&route=attractions%2Fattraction",
        },
        {
            label:
                "Sri Lanka Navy — Whale Watching",

            url:
                "https://whalewatching.navy.lk/",
        },
        {
            label:
                "Sri Lanka Navy — Visit Trincomalee Dockyard",

            url:
                "https://visitdockyard.navy.lk/",
        },
        {
            label:
                "Sri Lanka Tourism — Weather Guide",

            url:
                "https://www.srilanka.travel/weather",
        },
        {
            label:
                "Department of Meteorology Sri Lanka",

            url:
                "https://meteo.gov.lk/",
        },
    ],

    lastVerified:
        "2026-07-19",

    planningDisclaimer:
        "Temperatures, travel times, weather, sea conditions, whale sightings, park permits, boat services, diving requirements, harbour access, entrance fees and activity availability are approximate or subject to change. All operational information must be reconfirmed before issuing the final client itinerary.",
},
};

function normalizeSlug(
    slug: string
): string {
    return slug
        .trim()
        .toLowerCase()
        .replace(
            /^\/+|\/+$/g,
            ""
        );
}

export function getDestinationDetail(
    slug: string
): DestinationDetail | null {
    const normalizedSlug =
        normalizeSlug(
            slug
        );

    return (
        destinationDetails[
            normalizedSlug
            ] ?? null
    );
}

export function getDestinationDetailSlugs(): string[] {
    return Object.keys(
        destinationDetails
    );
}

export {
    destinationDetails,
};


