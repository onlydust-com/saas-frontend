"use client";

import { ChevronLeft, RefreshCw } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { Translate } from "@/shared/translation/components/translate/translate";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={"flex size-full items-center justify-center"}>
      <div className={"flex flex-col items-center justify-center gap-6"}>
        <Typo
          variant={"brand"}
          size={"4xl"}
          classNames={{ base: "capitalize" }}
          translate={{
            token: "error:title",
          }}
        />

        <div className={"flex gap-4"}>
          <Button
            as={BaseLink}
            htmlProps={{
              href: NEXT_ROUTER.home.root,
            }}
            variant={"secondary-light"}
            size={"l"}
            startIcon={{ component: ChevronLeft }}
          >
            <Translate token={"error:back"} />
          </Button>

          <Button size={"l"} startIcon={{ component: RefreshCw }} onClick={reset}>
            <Translate token={"error:refresh"} />
          </Button>
        </div>
      </div>
    </div>
  );
}
