import "server-only";

import {
    readdir,
} from "node:fs/promises";

import path from "node:path";

import {
    imageSizeFromFile,
} from "image-size/fromFile";

import type {
    GalleryPhoto,
} from "@/types/gallery";

const galleryRoot =
    path.join(
        process.cwd(),
        "public",
        "images",
        "gallery"
    );

const supportedExtensions =
    new Set([
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
    ]);

function isNodeError(
    error: unknown
): error is NodeJS.ErrnoException {
    return (
        error instanceof Error &&
        "code" in error
    );
}

function formatWords(
    value: string
): string {
    return value
        .replace(
            /[-_]+/g,
            " "
        )
        .replace(
            /\s+/g,
            " "
        )
        .trim()
        .replace(
            /\b\w/g,
            (character) =>
                character.toUpperCase()
        );
}

function isCameraFilename(
    filename: string
): boolean {
    const normalized =
        filename
            .replace(
                /[-_\s]/g,
                ""
            )
            .toLowerCase();

    const isCameraGenerated =
        /^(dsc|dscf|img|image|pxl|mg|photo)\d+/.test(
            normalized
        );

    const isSocialMediaGenerated =
        /^\d{12,}n?$/.test(
            normalized
        );

    return (
        isCameraGenerated ||
        isSocialMediaGenerated
    );
}

function getPhotoTitle(
    absolutePath: string,
    categoryLabel: string
): string {
    const filename =
        path.parse(
            absolutePath
        ).name;

    if (
        isCameraFilename(
            filename
        )
    ) {
        return `${categoryLabel} Tour Moment`;
    }

    const readableName =
        formatWords(
            filename
        );

    return (
        readableName ||
        `${categoryLabel} Tour Moment`
    );
}

function createPublicImagePath(
    relativePath: string
): string {
    const encodedPath =
        relativePath
            .split(
                path.sep
            )
            .map(
                (segment) =>
                    encodeURIComponent(
                        segment
                    )
            )
            .join("/");

    return `/images/gallery/${encodedPath}`;
}

async function findImageFiles(
    directory: string
): Promise<string[]> {
    try {
        const entries =
            await readdir(
                directory,
                {
                    withFileTypes:
                        true,
                }
            );

        const results =
            await Promise.all(
                entries.map(
                    async (
                        entry
                    ) => {
                        const fullPath =
                            path.join(
                                directory,
                                entry.name
                            );

                        if (
                            entry.isDirectory()
                        ) {
                            return findImageFiles(
                                fullPath
                            );
                        }

                        const extension =
                            path.extname(
                                entry.name
                            )
                                .toLowerCase();

                        if (
                            !entry.isFile() ||
                            !supportedExtensions.has(
                                extension
                            )
                        ) {
                            return [];
                        }

                        return [
                            fullPath,
                        ];
                    }
                )
            );

        return results.flat();
    } catch (error) {
        if (
            isNodeError(
                error
            ) &&
            error.code ===
            "ENOENT"
        ) {
            return [];
        }

        throw error;
    }
}

async function createGalleryPhoto(
    absolutePath: string
): Promise<GalleryPhoto | null> {
    try {
        const relativePath =
            path.relative(
                galleryRoot,
                absolutePath
            );

        const pathSegments =
            relativePath.split(
                path.sep
            );

        const category =
            pathSegments.length >
            1
                ? pathSegments[0]
                : "general";

        const categoryLabel =
            formatWords(
                category
            );

        const dimensions =
            await imageSizeFromFile(
                absolutePath
            );

        if (
            !dimensions.width ||
            !dimensions.height
        ) {
            console.warn(
                `[Gallery] Could not read image dimensions: ${relativePath}`
            );

            return null;
        }

        const title =
            getPhotoTitle(
                absolutePath,
                categoryLabel
            );

        const id =
            relativePath
                .split(
                    path.sep
                )
                .join("-");

        return {
            key:
            id,

            id,

            src:
                createPublicImagePath(
                    relativePath
                ),

            width:
            dimensions.width,

            height:
            dimensions.height,

            title,

            alt:
                `${title} in Sri Lanka`,

            category:
                category.toLowerCase(),

            categoryLabel,
        };
    } catch (error) {
        console.error(
            `[Gallery] Failed to process ${absolutePath}`,
            error
        );

        return null;
    }
}

export async function getGalleryPhotos(): Promise<
    GalleryPhoto[]
> {
    const imageFiles =
        await findImageFiles(
            galleryRoot
        );

    const processedPhotos =
        await Promise.all(
            imageFiles.map(
                createGalleryPhoto
            )
        );

    return processedPhotos
        .filter(
            (
                photo
            ): photo is GalleryPhoto =>
                photo !== null
        )
        .sort(
            (
                first,
                second
            ) => {
                const categoryComparison =
                    first.categoryLabel.localeCompare(
                        second.categoryLabel
                    );

                if (
                    categoryComparison !==
                    0
                ) {
                    return categoryComparison;
                }

                return first.src.localeCompare(
                    second.src
                );
            }
        );
}