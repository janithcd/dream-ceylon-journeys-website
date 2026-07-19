import {
    CustomTourInquiryForm,
    type InquiryPackageOption,
} from "@/components/forms/CustomTourInquiryForm";

import {
    getPublicPackages,
} from "@/lib/public-api";

export async function CustomTourInquiry() {
    const response =
        await getPublicPackages();

    const packages: InquiryPackageOption[] =
        (
            response?.packages ?? []
        )
            .filter(
                (tourPackage) =>
                    Boolean(
                        tourPackage._id &&
                        tourPackage.title
                    )
            )
            .slice(0, 20)
            .map(
                (tourPackage) => ({
                    id:
                    tourPackage._id,

                    title:
                    tourPackage.title,

                    durationDays:
                    tourPackage.durationDays,
                })
            );

    return (
        <CustomTourInquiryForm
            packages={packages}
        />
    );
}