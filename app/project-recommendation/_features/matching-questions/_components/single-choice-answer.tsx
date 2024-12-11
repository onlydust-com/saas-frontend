"use client";

import { PropsWithChildren } from "react";

import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { Answer } from "../matching-questions.types";

interface SingleChoiceAnswerProps {
  answer: Answer;
}

export function SingleChoiceAnswer({ children, answer }: PropsWithChildren<SingleChoiceAnswerProps>) {
  return (
    <Paper size="lg" background="tertiary" hasBorderHover border={answer.chosen ? "brand-primary" : "tertiary"}>
      <div className="flex items-center justify-between gap-md">
        <Typo>{answer.body}</Typo>
        {children}
      </div>
    </Paper>
  );
}
