import { ComponentProps } from "react";

import { BannerReactQueryAdapter } from "@/core/application/react-query-adapter/banner";

import { Skeleton } from "@/design-system/atoms/skeleton";
import { PlgBanner } from "@/design-system/organisms/plg-banner/plg-banner";

import { PrimaryBannerProps } from "@/shared/features/navigation/primary-banner/primary-banner.types";

export function PrimaryBanner({ isFolded }: PrimaryBannerProps) {
  const { data: bannerData, isLoading, isError } = BannerReactQueryAdapter.client.useGetBanner({});

  function getCta(): ComponentProps<typeof PlgBanner>["cta"] {
    if (!bannerData?.buttonText || !bannerData?.buttonLinkUrl) return undefined;

    return {
      text: bannerData.buttonText,
      href: bannerData.buttonLinkUrl,
      // TODO @Mehdi @Backend add Banner avatar URL to bannerData response and show avatar in CTA
    };
  }

  if (isLoading) {
    return <Skeleton className={"h-full w-full"} />;
  }

  if (isFolded || !bannerData || !bannerData.text || isError) {
    return null;
  }

  return (
    <div className="flex-1">
      <PlgBanner
        title={"title"}
        subTitle={"subtitle"}
        date={"10.06.2024"}
        description={bannerData.text}
        cta={getCta()}
      />
    </div>
  );
}
