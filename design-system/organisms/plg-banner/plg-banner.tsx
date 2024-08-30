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
      variant={"secondary"}
    >
      {cta.text}
    </Button>
  );
}

export function PlgBanner({ title, subTitle, date, description, cta }: PlgBannerProps) {
  return (
    <div
      className={
        "relative flex h-auto max-h-full w-full flex-col overflow-hidden rounded-xl border border-border-primary p-6"
      }
    >
      <Image
        src={PlgMarketing}
        alt={title}
        className={"pointer-events-none absolute h-full w-full object-cover object-center"}
        fill
        priority
      />

      <div className="relative flex h-auto max-h-full w-full flex-col gap-2.5">
        <div className={"flex flex-col gap-8"}>
          <div className={"flex flex-col gap-2"}>
            <div className={"flex w-full items-center justify-between"}>
              {title ? (
                <Typo size={"sm"} weight={"regular"} color={"tertiary"}>
                  {title}
                </Typo>
              ) : null}
              {date ? (
                <Typo size={"sm"} weight={"regular"} color={"tertiary"}>
                  {date}
                </Typo>
              ) : null}
            </div>
            {subTitle ? (
              <Typo size={"md"} color={"secondary"}>
                {subTitle}
              </Typo>
            ) : null}

            {description ? (
              <Typo size={"sm"} weight={"regular"} color={"tertiary"}>
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
