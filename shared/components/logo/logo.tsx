import logoIllustration from "@/public/images/logos/logo-illustration.svg";
import logoWordmark from "@/public/images/logos/logo-wordmark.svg";
import Image from "next/image";

import { cn } from "@/shared/helpers/cn";

import { LogoProps } from "./logo.types";

export function Logo({ type = "full", classNames }: LogoProps) {
  const showIllustration = type === "illustration" || type === "full";
  const showWordmark = type === "word-mark" || type === "full";

  return (
    <div className={cn("flex flex-row items-center justify-start gap-3", classNames?.base)}>
      {showIllustration && (
        <Image src={logoIllustration} alt="logo illustration" className={cn("min-w-10", classNames?.illustration)} />
      )}
      {showWordmark && (
        <Image src={logoWordmark} alt="logo word mark" className={cn("h-auto min-w-[100px]", classNames?.wordmark)} />
      )}
    </div>
  );
}
