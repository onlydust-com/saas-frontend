import { motion } from "framer-motion";
import { ComponentProps } from "react";

import { BannerReactQueryAdapter } from "@/core/application/react-query-adapter/banner";
import { bootstrap } from "@/core/bootstrap";

import { RemixIconPort } from "@/design-system/atoms/icon";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { PlgBanner } from "@/design-system/organisms/plg-banner/plg-banner";

import { PrimaryBannerProps } from "@/shared/features/navigation/primary-banner/primary-banner.types";

export function PrimaryBanner({ isFolded }: PrimaryBannerProps) {
  const { format } = bootstrap.getDateKernelPort();
  const { data: bannerData, isLoading, isError } = BannerReactQueryAdapter.client.useGetBanner({});

  function getCta(): ComponentProps<typeof PlgBanner>["cta"] {
    if (!bannerData?.buttonText || !bannerData?.buttonLinkUrl) return undefined;

    return {
      text: bannerData.buttonText,
      href: bannerData.buttonLinkUrl,
      icon: (bannerData.buttonIconSlug as RemixIconPort["name"]) || undefined,
    };
  }

  if (isLoading) {
    return <Skeleton className={"h-[116px] w-full"} />;
  }

  if (!bannerData || !bannerData.longDescription || isError) {
    return null;
  }

  return (
    <motion.div
      className="flex w-full overflow-hidden"
      animate={isFolded ? "folded" : "unFolded"}
      initial={"unFolded"}
      variants={{
        folded: { opacity: 0, height: "0" },
        unFolded: { opacity: 1, height: "fit-content" },
      }}
    >
      <div className="h-auto max-h-full w-[246px] min-w-[246px]">
        <PlgBanner
          title={bannerData.title}
          subTitle={bannerData.subTitle}
          date={bannerData.date ? format(new Date(bannerData.date), "MM.dd.yyyy") : undefined}
          description={bannerData.longDescription}
          cta={getCta()}
        />
      </div>
    </motion.div>
  );
}
