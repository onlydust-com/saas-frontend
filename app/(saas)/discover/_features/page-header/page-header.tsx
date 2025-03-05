import background from "@/public/images/backgrounds/discover-header.png";
import { ArrowRight, Bot, FolderSearch, LayoutList } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Button } from "@/shared/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { GlowingEffect } from "@/shared/ui/glowing-effect";
import { TypographyH2, TypographyP } from "@/shared/ui/typography";

function HasSufficentData() {
  return (
    <Button>
      You don’t find your perfect fit ?
      <ArrowRight />
    </Button>
  );
}

function NoSufficentData() {
  return (
    <div className="flex flex-col gap-4">
      <TypographyP className="text-center">Didn’t find what you’re looking for?</TypographyP>
      <div className="flex flex-row gap-4">
        <Link href={NEXT_ROUTER.projects.root} className="flex-1 cursor-pointer transition-opacity hover:opacity-80">
          <Card className="relative flex-1">
            <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />

            <CardHeader className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <FolderSearch className="size-5 text-cyan-200" />
                <CardTitle className="text-left text-base text-cyan-100">Browse</CardTitle>
              </div>
              <CardDescription className="text-left">Explore projects on your own with Browse.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href={NEXT_ROUTER.odSay.root} className="flex-1 cursor-pointer transition-opacity hover:opacity-80">
          <Card className="relative flex-1">
            <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />

            <CardHeader className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <Bot className="size-5 text-purple-200" />
                <CardTitle className="text-left text-base text-purple-100">ODSay</CardTitle>
              </div>
              <CardDescription className="text-left">Let our chatbot help you find the right project.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}
export function PageHeader({ hasSufficentData = false }: { hasSufficentData?: boolean }) {
  const Footer = hasSufficentData ? HasSufficentData : NoSufficentData;

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
        <Footer />
      </div>
    </header>
  );
}
