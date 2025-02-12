"use client";

import { useState } from "react";

import { Markdown } from "@/shared/features/markdown/markdown";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { TypographyH3 } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

import { DescriptionProps } from "./description.types";

export function Description({ description }: DescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!description) return null;

  return (
    <Card className={"relative flex flex-col gap-4 p-4"}>
      <TypographyH3>Description</TypographyH3>

      <div className={cn("relative h-[320px] overflow-hidden", { "h-auto": isExpanded })}>
        <Markdown content={description} />
        {!isExpanded ? <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" /> : null}
      </div>

      <div className={cn("flex justify-center", { "absolute bottom-4 left-0 right-0": !isExpanded })}>
        <Button variant={"secondary"} size={"sm"} onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Show less" : "Show more"}
        </Button>
      </div>
    </Card>
  );
}
