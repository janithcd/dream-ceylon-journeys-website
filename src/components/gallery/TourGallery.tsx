"use client";

import Image from "next/image";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Camera,
    Images,
} from "lucide-react";

import {
    MasonryPhotoAlbum,
} from "react-photo-album";

import type {
    RenderImageContext,
    RenderImageProps,
} from "react-photo-album";

import Lightbox from "yet-another-react-lightbox";

import Counter from "yet-another-react-lightbox/plugins/counter";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import type {
    GalleryPhoto,
} from "@/types/gallery";

import "react-photo-album/masonry.css";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

type TourGalleryProps = {
    photos: GalleryPhoto[];
};

const initialPhotoCount =
    18;

const loadMoreCount =
    18;

function renderNextImage(
    {
        alt = "",
        title,
        sizes,
    }: RenderImageProps,
    {
        photo,
        width,
        height,
    }: RenderImageContext
) {
    const galleryPhoto =
        photo as GalleryPhoto;

    return (
        <div
            className="
                group
                relative
                w-full
                overflow-hidden
                rounded-[1.35rem]
                bg-slate-100
            "
            style={{
                aspectRatio:
                    `${width} / ${height}`,
            }}
        >
            <Image
                fill
                src={
                    galleryPhoto.src
                }
                alt={
                    alt ||
                    galleryPhoto.alt
                }
                title={
                    title ||
                    galleryPhoto.title
                }
                sizes={
                    sizes ||
                    "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                }
                quality={82}
                className="
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-[1.035]
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute inset-0
                    bg-gradient-to-t
                    from-[#043F3B]/75
                    via-transparent
                    to-transparent
                    opacity-70
                    transition-opacity
                    duration-300
                    group-hover:opacity-90
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    bottom-0
                    flex
                    items-end
                    justify-between
                    gap-4
                    p-4
                "
            >
                <span
                    className="
                        rounded-full
                        border
                        border-white/20
                        bg-black/20
                        px-3 py-1.5
                        text-xs
                        font-bold
                        uppercase
                        tracking-[0.12em]
                        text-white
                        backdrop-blur-md
                    "
                >
                    {
                        galleryPhoto.categoryLabel
                    }
                </span>

                <span
                    className="
                        flex h-10 w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-white/15
                        text-white
                        opacity-0
                        backdrop-blur-md
                        transition
                        group-hover:opacity-100
                    "
                >
                    <Camera
                        className="h-4 w-4"
                        aria-hidden="true"
                    />
                </span>
            </div>
        </div>
    );
}

export function TourGallery({
                                photos,
                            }: TourGalleryProps) {
    const [
        activeCategory,
        setActiveCategory,
    ] =
        useState(
            "all"
        );

    const [
        visibleCount,
        setVisibleCount,
    ] =
        useState(
            initialPhotoCount
        );

    const [
        lightboxIndex,
        setLightboxIndex,
    ] =
        useState(
            -1
        );

    const categories =
        useMemo(
            () => [
                {
                    value:
                        "all",

                    label:
                        "All Photos",
                },

                ...Array.from(
                    new Map(
                        photos.map(
                            (
                                photo
                            ) => [
                                photo.category,
                                photo.categoryLabel,
                            ]
                        )
                    )
                ).map(
                    ([
                         value,
                         label,
                     ]) => ({
                        value,
                        label,
                    })
                ),
            ],
            [
                photos,
            ]
        );

    const filteredPhotos =
        useMemo(
            () =>
                activeCategory ===
                "all"
                    ? photos
                    : photos.filter(
                        (
                            photo
                        ) =>
                            photo.category ===
                            activeCategory
                    ),
            [
                activeCategory,
                photos,
            ]
        );

    const visiblePhotos =
        useMemo(
            () =>
                filteredPhotos.slice(
                    0,
                    visibleCount
                ),
            [
                filteredPhotos,
                visibleCount,
            ]
        );

    const lightboxSlides =
        useMemo(
            () =>
                visiblePhotos.map(
                    (
                        photo
                    ) => ({
                        src:
                        photo.src,

                        width:
                        photo.width,

                        height:
                        photo.height,

                        alt:
                        photo.alt,

                        title:
                        photo.title,

                        description:
                        photo.categoryLabel,
                    })
                ),
            [
                visiblePhotos,
            ]
        );

    useEffect(
        () => {
            setVisibleCount(
                initialPhotoCount
            );

            setLightboxIndex(
                -1
            );
        },
        [
            activeCategory,
        ]
    );

    if (
        photos.length ===
        0
    ) {
        return (
            <div
                className="
                    rounded-[2rem]
                    border
                    border-dashed
                    border-slate-300
                    bg-slate-50
                    px-6 py-16
                    text-center
                "
            >
                <div
                    className="
                        mx-auto
                        flex h-16 w-16
                        items-center
                        justify-center
                        rounded-2xl
                        bg-[#008D86]/10
                        text-[#008D86]
                    "
                >
                    <Images
                        className="h-8 w-8"
                        aria-hidden="true"
                    />
                </div>

                <h2
                    className="
                        mt-5
                        font-display
                        text-2xl
                        font-semibold
                        text-[#043F3B]
                    "
                >
                    Gallery photos are coming soon
                </h2>

                <p
                    className="
                        mx-auto
                        mt-3
                        max-w-xl
                        leading-7
                        text-slate-600
                    "
                >
                    Add JPG, PNG or WebP
                    images inside
                    public/images/gallery
                    and restart the
                    development server.
                </p>
            </div>
        );
    }

    return (
        <>
            <div
                className="
                    mb-8
                    flex
                    gap-3
                    overflow-x-auto
                    pb-3
                    [scrollbar-width:none]
                    [&::-webkit-scrollbar]:hidden
                "
                aria-label="Gallery categories"
            >
                {categories.map(
                    (
                        category
                    ) => {
                        const isActive =
                            activeCategory ===
                            category.value;

                        return (
                            <button
                                key={
                                    category.value
                                }
                                type="button"
                                onClick={() =>
                                    setActiveCategory(
                                        category.value
                                    )
                                }
                                className={`
                                    shrink-0
                                    rounded-full
                                    border
                                    px-5 py-2.5
                                    text-sm
                                    font-bold
                                    transition
                                    ${
                                    isActive
                                        ? "border-[#008D86] bg-[#008D86] text-white shadow-[0_12px_30px_rgba(0,141,134,0.20)]"
                                        : "border-slate-200 bg-white text-slate-700 hover:border-[#008D86]/40 hover:text-[#008D86]"
                                }
                                `}
                            >
                                {
                                    category.label
                                }
                            </button>
                        );
                    }
                )}
            </div>

            <MasonryPhotoAlbum
                photos={
                    visiblePhotos
                }
                spacing={14}
                columns={(
                    containerWidth
                ) => {
                    if (
                        containerWidth <
                        560
                    ) {
                        return 2;
                    }

                    if (
                        containerWidth <
                        900
                    ) {
                        return 3;
                    }

                    if (
                        containerWidth <
                        1280
                    ) {
                        return 4;
                    }

                    return 5;
                }}
                render={{
                    image:
                    renderNextImage,
                }}
                onClick={({
                              index,
                          }) =>
                    setLightboxIndex(
                        index
                    )
                }
                sizes={{
                    size:
                        "calc(100vw - 48px)",

                    sizes: [
                        {
                            viewport:
                                "(min-width: 1280px)",

                            size:
                                "1200px",
                        },
                    ],
                }}
                componentsProps={{
                    button: {
                        className:
                            "overflow-hidden rounded-[1.35rem] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FEC52E]/60",
                    },
                }}
            />

            {visibleCount <
                filteredPhotos.length && (
                    <div
                        className="
                        mt-10
                        flex
                        justify-center
                    "
                    >
                        <button
                            type="button"
                            onClick={() =>
                                setVisibleCount(
                                    (
                                        current
                                    ) =>
                                        current +
                                        loadMoreCount
                                )
                            }
                            className="
                            inline-flex
                            min-h-13
                            items-center
                            justify-center
                            gap-2
                            rounded-full
                            bg-[#043F3B]
                            px-7
                            font-bold
                            text-white
                            transition
                            hover:-translate-y-0.5
                            hover:bg-[#008D86]
                        "
                        >
                            <Images
                                className="h-5 w-5"
                                aria-hidden="true"
                            />

                            Load More Photos

                            <span
                                className="
                                rounded-full
                                bg-white/15
                                px-2 py-0.5
                                text-xs
                            "
                            >
                            {filteredPhotos.length -
                                visibleCount}
                        </span>
                        </button>
                    </div>
                )}

            <Lightbox
                open={
                    lightboxIndex >=
                    0
                }
                close={() =>
                    setLightboxIndex(
                        -1
                    )
                }
                index={
                    lightboxIndex >=
                    0
                        ? lightboxIndex
                        : 0
                }
                slides={
                    lightboxSlides
                }
                plugins={[
                    Counter,
                    Fullscreen,
                    Thumbnails,
                    Zoom,
                ]}
                counter={{
                    separator:
                        " / ",
                }}
                thumbnails={{
                    borderRadius:
                        10,

                    padding:
                        3,

                    gap:
                        10,

                    imageFit:
                        "cover",
                }}
                zoom={{
                    maxZoomPixelRatio:
                        3,

                    scrollToZoom:
                        true,
                }}
                styles={{
                    container: {
                        backgroundColor:
                            "rgba(2, 24, 22, 0.97)",
                    },
                }}
            />
        </>
    );
}