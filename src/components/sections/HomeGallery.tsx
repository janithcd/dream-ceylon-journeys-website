import Link from "next/link";

import {
    ArrowRight,
    Images,
} from "lucide-react";

import { HomeGalleryCarousel } from "@/components/gallery/HomeGalleryCarousel";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

import { getGalleryPhotos } from "@/lib/gallery";

import type {
    GalleryPhoto,
} from "@/types/gallery";

const previewPhotoLimit =
    10;

function selectGalleryPreview(
    photos: GalleryPhoto[],
    limit: number
): GalleryPhoto[] {
    const categoryGroups =
        new Map<
            string,
            GalleryPhoto[]
        >();

    photos.forEach(
        (
            photo
        ) => {
            const categoryPhotos =
                categoryGroups.get(
                    photo.category
                ) ?? [];

            categoryPhotos.push(
                photo
            );

            categoryGroups.set(
                photo.category,
                categoryPhotos
            );
        }
    );

    const groups =
        Array.from(
            categoryGroups.values()
        );

    const selectedPhotos:
        GalleryPhoto[] = [];

    let photoPosition =
        0;

    while (
        selectedPhotos.length <
        limit
        ) {
        let photoAdded =
            false;

        for (
            const group
            of groups
            ) {
            const photo =
                group[
                    photoPosition
                    ];

            if (!photo) {
                continue;
            }

            selectedPhotos.push(
                photo
            );

            photoAdded =
                true;

            if (
                selectedPhotos.length ===
                limit
            ) {
                break;
            }
        }

        if (!photoAdded) {
            break;
        }

        photoPosition +=
            1;
    }

    return selectedPhotos;
}

export async function HomeGallery() {
    const photos =
        await getGalleryPhotos();

    const previewPhotos =
        selectGalleryPreview(
            photos,
            previewPhotoLimit
        );

    if (
        previewPhotos.length ===
        0
    ) {
        return null;
    }

    return (
        <section
            id="tour-gallery"
            className="
                relative
                overflow-hidden
                bg-[#F5F8F7]
                py-20
                sm:py-24
            "
        >
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -right-32
                    -top-32
                    h-96
                    w-96
                    rounded-full
                    bg-[#FEC52E]/15
                    blur-3xl
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -bottom-36
                    -left-32
                    h-96
                    w-96
                    rounded-full
                    bg-[#008D86]/10
                    blur-3xl
                "
            />

            <Container>
                <div
                    className="
                        relative
                        flex
                        flex-col
                        gap-7
                        lg:flex-row
                        lg:items-end
                        lg:justify-between
                    "
                >
                    <SectionHeading
                        eyebrow="Travel moments"
                        title="Swipe through real journeys across Sri Lanka."
                        description="Discover authentic guest experiences, wildlife encounters, beautiful landscapes, cultural discoveries, and unforgettable memories from our private tours."
                    />

                    <Link
                        href="/gallery"
                        className="
                            inline-flex
                            min-h-13
                            shrink-0
                            items-center
                            justify-center
                            gap-2
                            self-start
                            rounded-full
                            bg-[#043F3B]
                            px-7
                            font-bold
                            text-white
                            shadow-[0_16px_35px_rgba(4,63,59,0.16)]
                            transition
                            hover:-translate-y-0.5
                            hover:bg-[#008D86]
                            lg:self-auto
                        "
                    >
                        <Images
                            className="h-5 w-5"
                            aria-hidden="true"
                        />

                        View Full Gallery

                        <ArrowRight
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                    </Link>
                </div>

                <div className="relative mt-12">
                    <HomeGalleryCarousel
                        photos={
                            previewPhotos
                        }
                    />
                </div>

                <p
                    className="
                        relative
                        mt-7
                        text-center
                        text-sm
                        leading-6
                        text-slate-500
                    "
                >
                    Swipe or drag to explore
                    more travel moments.
                </p>
            </Container>
        </section>
    );
}