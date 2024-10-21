"use client";

import logoWhite from "@/public/images/logos/logo-white.svg";
import background from "@/public/images/splash/github-callback-background.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Typo } from "@/design-system/atoms/typo";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { isInMaintenanceMode } from "@/shared/helpers/maintenance";

export default function MaintenancePage() {
  const router = useRouter();
  const { inMaintenance } = isInMaintenanceMode();

  useEffect(() => {
    if (!inMaintenance) {
      router.push(NEXT_ROUTER.notFound);
    }
  }, [inMaintenance]);

  if (!inMaintenance) return null;

  return (
    <div className={"fixed inset-0 z-[9999]"}>
      <Image src={background} alt="" className={"absolute inset-0 size-full object-cover"} />
      <div className={"relative h-dvh w-dvw place-content-center place-items-center p-4"}>
        <Image src={logoWhite} alt="OnlyDust" width={78} height={78} className={"m-auto pb-[12%] desktop:pb-[170px]"} />

        <div className={"grid gap-5 text-center"}>
          <Typo
            variant={"heading"}
            size={"2xl"}
            weight={"medium"}
            translate={{
              token: "splash:maintenance.title",
            }}
          />
          <Typo
            variant={"heading"}
            size={"sm"}
            color={"tertiary"}
            translate={{
              token: "splash:maintenance.subtitle",
            }}
            classNames={{ base: "whitespace-pre-line" }}
          />
        </div>
      </div>
    </div>
  );
}
