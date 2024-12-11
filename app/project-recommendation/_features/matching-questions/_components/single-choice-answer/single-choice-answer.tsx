import { PropsWithChildren } from "react";

import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { SingleChoiceAnswerProps } from "./single-choice-answer.types";

export function SingleChoiceAnswer({ children, answer, isSelected }: PropsWithChildren<SingleChoiceAnswerProps>) {
  return (
    <Paper size="lg" background="tertiary" hasBorderHover border={isSelected ? "brand-primary" : "tertiary"}>
      <div className="flex items-center justify-between gap-md">
        <Typo>{answer.body}</Typo>
        {children}
      </div>
    </Paper>
  );
}
