import PlgMarketing from "@/public/images/banners/plg-marketing.png";
import Image from "next/image";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { RemixIcon } from "@/design-system/atoms/icon/variants/icon-remix";
import { Typo } from "@/design-system/atoms/typo";

import { PlgBannerProps } from "./plg-banner.types";

function Cta({ cta }: { cta: PlgBannerProps["cta"] }) {
  if (!cta) return null;

  const startIcon = cta.icon ? <RemixIcon name={cta.icon} /> : undefined;

  return (
    <Button
      as={"a"}
      htmlProps={{
        href: cta.href,
        target: cta.isExternal ? "_blank" : undefined,
        rel: cta.isExternal ? "noopener noreferrer" : undefined,
      }}
      startContent={startIcon}
      variant={"secondary-light"}
    >
      {cta.text}
    </Button>
  );
}

export function PlgBanner({ title, subTitle, date, description, cta }: PlgBannerProps) {
  return (
    <div
      className={
        "relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-container-stroke-separator p-6"
      }
    >
      <Image
        src={PlgMarketing}
        alt={title}
        className={"pointer-events-none absolute h-full w-full object-cover object-center"}
        fill
        priority
      />

      <div className="relative flex h-full w-full flex-col gap-2.5">
        <div className="flex-1" />

        <div className={"flex flex-col gap-8"}>
          <div className={"flex flex-col gap-2"}>
            {title ? (
              <Typo size={"s"} weight={"regular"} color={"text-1"}>
                {title}
              </Typo>
            ) : null}
            {subTitle ? (
              <Typo size={"3xl"} weight={"regular"} variant={"brand"} color={"text-1"}>
                {subTitle}
              </Typo>
            ) : null}

            {date ? (
              <Typo size={"m"} weight={"regular"} color={"text-1"}>
                {date}
              </Typo>
            ) : null}

            {description ? (
              <Typo size={"s"} weight={"regular"} color={"text-2"}>
                {description}
              </Typo>
            ) : null}
          </div>

          <Cta cta={cta} />
        </div>
      </div>
    </div>
  );
}
