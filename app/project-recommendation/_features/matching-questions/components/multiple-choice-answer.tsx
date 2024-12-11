"use client";

import { Checkbox } from "@/design-system/atoms/checkbox";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { type Answer } from "../matching-questions.types";

interface MultipleChoiceAnswerProps {
  answer: Answer;
  isSelected: boolean;
  onSelect: () => void;
}

export function MultipleChoiceAnswer({ answer, isSelected, onSelect }: MultipleChoiceAnswerProps) {
  return (
    <Paper
      size="lg"
      onClick={onSelect}
      background="tertiary"
      hasBorderHover
      border={isSelected ? "brand-primary" : "tertiary"}
    >
      <div className="flex items-center justify-between gap-md">
        <Typo>{answer.body}</Typo>
        <Checkbox value={isSelected} onChange={() => {}} />
      </div>
    </Paper>
  );
}
