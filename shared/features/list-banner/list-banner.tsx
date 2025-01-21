import { Paper } from "@/design-system/atoms/paper/variants/paper-default";
import { Typo } from "@/design-system/atoms/typo/variants/typo-default";

import { ListBannerProps } from "@/shared/features/list-banner/list-banner.types";

export function ListBanner({ title, subtitle, logo }: ListBannerProps) {
  return (
    <Paper
      size="4xl"
      background="primary"
      border="primary"
      rounded="2xl"
      classNames={{ base: "flex justify-between items-center gap-4xl overflow-hidden" }}
    >
      <div className="flex flex-col gap-md">
        <Typo as="h1" variant={"heading"} size="md" weight="medium" {...title} />
        <Typo as="p" size="sm" color="tertiary" {...subtitle} />
      </div>

      <div
        className="relative flex size-32 shrink-0 items-center justify-center rounded-full"
        style={{
          background: "linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)",
        }}
      >
        <div
          className="absolute -inset-[33rem] rounded-full"
          style={{
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.03) 100%)",
          }}
        />
        <div
          className="absolute -inset-72 rounded-full"
          style={{
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.01) 0%, rgba(255, 255, 255, 0.04) 100%)",
          }}
        />
        <div
          className="absolute -inset-36 rounded-full"
          style={{
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)",
          }}
        />
        <div
          className="absolute -inset-12 rounded-l-full"
          style={{
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.01) -0.01%, rgba(255, 255, 255, 0.04) 99.99%)",
          }}
        />

        {logo}
      </div>
    </Paper>
  );
}
