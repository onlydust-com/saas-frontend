import logo from "@/public/images/logos/logo-light-purple.svg";
import Image from "next/image";

import { Paper } from "@/design-system/atoms/paper/variants/paper-default";
import { Typo } from "@/design-system/atoms/typo/variants/typo-default";

export function HackathonListBanner() {
  return (
    <Paper
      size="4xl"
      background="secondary"
      rounded="2xl"
      classNames={{ base: "flex justify-between items-center gap-4xl overflow-hidden" }}
    >
      <div className="flex flex-col gap-md">
        <Typo variant={"heading"} size="md" weight="medium" translate={{ token: "hackathon:list.banner.title" }} />
        <Typo size="sm" color="tertiary" translate={{ token: "hackathon:list.banner.subtitle" }} />
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

        <Image src={logo} alt="OnlyDust" width={64} height={64} className="size-16" />
      </div>
    </Paper>
  );
}
