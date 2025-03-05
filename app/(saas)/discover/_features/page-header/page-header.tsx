import background from "@/public/images/backgrounds/discover-header.png";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Button } from "@/shared/ui/button";
import { TypographyH2, TypographyP } from "@/shared/ui/typography";

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
            <TypographyH2 className="text-center">Match your next</TypographyH2>
            <TypographyH2 className="bg-gradient-to-r from-purple-500 to-primary bg-clip-text text-center text-transparent">
              Open source contributions
            </TypographyH2>
          </div>
          <TypographyP className="text-center">
            Get recommendations based on your profile and past contributions
          </TypographyP>
        </div>
        <Button>
          You don’t find your perfect fit ?
          <ArrowRight />
        </Button>
      </div>
    </header>
  );
}
