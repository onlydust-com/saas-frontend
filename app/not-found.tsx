"use client";

import { ChevronLeft } from "lucide-react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { Translate } from "@/shared/translation/components/translate/translate";

export default function NotFound() {
  return (
    <div className={"flex size-full items-center justify-center"}>
      <div className={"flex flex-col items-center justify-center gap-6"}>
        <Typo
          variant={"heading"}
          size={"2xl"}
          classNames={{ base: "capitalize" }}
          translate={{
            token: "notFound:title",
          }}
        />

        <Button
          as={BaseLink}
          htmlProps={{
            href: NEXT_ROUTER.home.root,
          }}
          size={"md"}
          startIcon={{ component: ChevronLeft }}
        >
          <Translate token={"notFound:back"} />
        </Button>
      </div>
    </div>
  );
}
