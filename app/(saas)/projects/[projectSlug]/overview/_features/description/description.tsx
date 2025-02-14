"use client";

import { useEffect, useRef, useState } from "react";

import { Markdown } from "@/shared/features/markdown/markdown";
import { usePosthog } from "@/shared/tracking/posthog/use-posthog";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { TypographyH3 } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

import { DescriptionProps } from "./description.types";

const MAX_HEIGHT = 320;

export function Description({ description, projectId }: DescriptionProps) {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [descriptionHeight, setDescriptionHeight] = useState(100000000);
  const [isExpanded, setIsExpanded] = useState(false);
  const { capture } = usePosthog();

  const showExpanded = descriptionHeight > MAX_HEIGHT;

  useEffect(() => {
    if (descriptionRef.current) {
      setDescriptionHeight(descriptionRef.current.offsetHeight);
    }
  }, [description, descriptionRef]);

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

  if (!description) return null;

  return (
    <Card className={"relative flex flex-col gap-4 p-4"}>
      <TypographyH3>Description</TypographyH3>

      <div
        className={"relative h-fit overflow-hidden transition-all"}
        style={{
          maxHeight: isExpanded ? descriptionHeight : MAX_HEIGHT,
        }}
      >
        <div ref={descriptionRef}>
          <Markdown content={description} />
        </div>
        {!isExpanded && showExpanded ? (
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        ) : null}
      </div>

      {showExpanded && (
        <div className={cn("flex justify-center", { "absolute bottom-4 left-0 right-0": !isExpanded })}>
          <Button variant={"secondary"} size={"sm"} onClick={handleClick}>
            {isExpanded ? "Show less" : "Show more"}
          </Button>
        </div>
      )}
    </Card>
  );
}
