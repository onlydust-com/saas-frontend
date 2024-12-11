"use client";

import { PropsWithChildren } from "react";

import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

interface SingleChoiceAnswerProps {
  isSelected: boolean;
  body: string;
}

export function SingleChoiceAnswer({ children, body, isSelected }: PropsWithChildren<SingleChoiceAnswerProps>) {
  return (
    <Paper size="lg" background="tertiary" hasBorderHover border={isSelected ? "brand-primary" : "tertiary"}>
      <div className="flex items-center justify-between gap-md">
        <Typo>{body}</Typo>
        {children}
      </div>
    </Paper>
  );
}
