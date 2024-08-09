import Image from "next/image";
import PlgMarketing from "public/images/banners/plg-marketing.png";

import { Avatar } from "@/design-system/atoms/avatar";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";

import { PlgBannerProps } from "./plg-banner.types";

function Cta({ cta }: { cta: PlgBannerProps["cta"] }) {
  if (!cta) return null;

  const avatar = cta.avatar ? <Avatar {...cta.avatar} /> : undefined;

  return (
    <Button
      as={"a"}
      htmlProps={{
        href: cta.href,
        target: cta.isExternal ? "_blank" : undefined,
        rel: cta.isExternal ? "noopener noreferrer" : undefined,
      }}
      startContent={avatar}
      variant={"secondary-light"}
    >
      {cta.text}
    </Button>
  );
}

export function PlgBanner({ title, subTitle, date, description, cta }: PlgBannerProps) {
  return (
    <div className={"relative flex w-full flex-col overflow-hidden rounded-xl p-6"}>
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
            <Typo size={"s"} weight={"regular"} color={"text-1"}>
              {title}
            </Typo>
            <Typo size={"3xl"} weight={"regular"} variant={"brand"} color={"text-1"}>
              {subTitle}
            </Typo>

            <Typo size={"m"} weight={"regular"} color={"text-1"}>
              {date}
            </Typo>

            <Typo size={"s"} weight={"regular"} color={"text-2"}>
              {description}
            </Typo>
          </div>

          <Cta cta={cta} />
        </div>
      </div>
    </div>
  );
}
