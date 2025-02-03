import logoColor from "@/public/images/logos/logo-color.svg";
import Image from "next/image";

import { cn } from "@/shared/helpers/cn";

import { LogoProps } from "./logo.types";

export function Logo({ classNames }: LogoProps) {
  return (
    <div className={cn("flex w-fit flex-row items-center justify-start", classNames?.base)}>
      <Image src={logoColor} alt="OnlyDust logo" className={cn("h-6 w-fit", classNames?.image)} />
    </div>
  );
}
