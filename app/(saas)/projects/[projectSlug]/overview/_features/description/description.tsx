"use client";

import { useState } from "react";

import { Markdown } from "@/shared/features/markdown/markdown";
import { usePosthog } from "@/shared/tracking/posthog/use-posthog";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { TypographyH3 } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

import { DescriptionProps } from "./description.types";

export function Description({ description, projectId }: DescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { capture } = usePosthog();

  if (!description) return null;

  function handleClick() {
    const newValue = !isExpanded;

    if (newValue) {
      capture("project_overview_open_description", { projectId });
    } else {
      capture("project_overview_close_description", { projectId });
    }

    setIsExpanded(newValue);
  }

  return (
    <Card className={"relative flex flex-col gap-4 p-4"}>
      <TypographyH3>Description</TypographyH3>

      <div className={cn("relative h-[320px] overflow-hidden", { "h-auto": isExpanded })}>
        <Markdown content={description} />
        {!isExpanded ? <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" /> : null}
      </div>

      <div className={cn("flex justify-center", { "absolute bottom-4 left-0 right-0": !isExpanded })}>
        <Button variant={"secondary"} size={"sm"} onClick={handleClick}>
          {isExpanded ? "Show less" : "Show more"}
        </Button>
      </div>
    </Card>
  );
}
