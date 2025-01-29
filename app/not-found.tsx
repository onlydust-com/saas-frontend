import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Button } from "@/shared/ui/button";
import { TypographyH1 } from "@/shared/ui/typography";

export default function NotFound() {
  return (
    <div className={"flex h-screen items-center justify-center"}>
      <div className={"flex flex-col items-center justify-center gap-6"}>
        <TypographyH1>Page Not Found</TypographyH1>

        <Button asChild>
          <Link href={NEXT_ROUTER.home.root}>
            <ChevronLeft />
            Back
          </Link>
        </Button>
      </div>
    </div>
  );
}
