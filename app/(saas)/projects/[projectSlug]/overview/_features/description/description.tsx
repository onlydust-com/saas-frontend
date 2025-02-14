"use client";

import { Sparkles, ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Markdown } from "@/shared/features/markdown/markdown";
import { usePosthog } from "@/shared/tracking/posthog/use-posthog";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { TypographyH3 } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

import { DescriptionProps } from "./description.types";

const MAX_HEIGHT = 320;

export function Description({ description, projectId, isIaGenerated, title }: DescriptionProps) {
  const [isVoted, setIsVoted] = useState(false);
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

    if (isIaGenerated) {
      if (newValue) {
        capture("project_overview_open_generated_description", { projectId });
      } else {
        capture("project_overview_close_generated_description", { projectId });
      }
    } else {
      if (newValue) {
        capture("project_overview_open_description", { projectId });
      } else {
        capture("project_overview_close_description", { projectId });
      }
    }
    setIsExpanded(newValue);
  }

  function onThumbsUp() {
    capture("project_overview_generated_description_relevant", { projectId });
    setIsVoted(true);
  }

  function onThumbsDown() {
    capture("project_overview_generated_description_not_relevant", { projectId });
    setIsVoted(true);
  }

  return (
    <Card
      className={cn("overflow-hiddenp-4 relative flex flex-col gap-4 p-4", {
        "bg-gradient-to-br from-purple-950 to-transparent to-20%": isIaGenerated,
      })}
    >
      <header className={"flex w-full items-center justify-between gap-2"}>
        <div className={"flex items-center gap-2"}>
          {isIaGenerated && <Sparkles className={"text-purple-700"} />}
          <TypographyH3>{title}</TypographyH3>
        </div>
        {isIaGenerated && !isVoted ? (
          <div className={"flex items-center justify-end gap-px"}>
            <Button variant={"ghost"} size={"icon"} onClick={onThumbsUp}>
              <ThumbsUp />
            </Button>
            <Button variant={"ghost"} size={"icon"} onClick={onThumbsDown}>
              <ThumbsDown />
            </Button>
          </div>
        ) : (
          <div />
        )}
      </header>

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
