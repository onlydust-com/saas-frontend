"use client";

import background from "@/public/images/backgrounds/discover-header.png";
import Image from "next/image";

import { TypographyH2 } from "@/shared/ui/typography";
import { TypographyP } from "@/shared/ui/typography";

export function PageHeader() {
  return (
    <header className="relative z-[1] w-full py-16">
      <Image
        src={background}
        alt=""
        className={"pointer-events-none absolute inset-0 -z-[1] h-auto w-full rounded-t-2xl opacity-50"}
        loading="eager"
      />
      <div className="relative z-[1] mx-auto flex w-full max-w-[600px] flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex flex-col items-center justify-center">
            <TypographyH2 className="text-center">Seosonal Contributors</TypographyH2>
            <TypographyH2 className="bg-gradient-to-r from-purple-500 to-primary bg-clip-text text-center text-transparent">
              Leaderboard
            </TypographyH2>
          </div>
          <TypographyP className="text-center">
            These aren&apos;t just contributors—they&apos;re the backbone of this project. Raw numbers, real impact.
            Where do you stand?
          </TypographyP>
        </div>
      </div>
    </header>
  );
}
