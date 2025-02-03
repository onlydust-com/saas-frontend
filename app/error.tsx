"use client";

import { ChevronLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Button } from "@/shared/ui/button";
import { TypographyH1 } from "@/shared/ui/typography";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={"flex h-screen items-center justify-center"}>
      <div className={"flex flex-col items-center justify-center gap-6"}>
        <TypographyH1 className="capitalize">An Error Occurred</TypographyH1>

        <div className={"flex gap-4"}>
          <Button asChild>
            <Link href={NEXT_ROUTER.home.root}>
              <ChevronLeft />
              Back
            </Link>
          </Button>

          <Button onClick={reset}>
            <RefreshCw />
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
}
