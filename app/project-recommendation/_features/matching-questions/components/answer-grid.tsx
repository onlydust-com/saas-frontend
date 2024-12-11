"use client";

import { RadioGroup } from "@/design-system/atoms/radio-group";

import { type Answer } from "../matching-questions.types";
import { MultipleChoiceAnswer } from "./multiple-choice-answer";
import { SingleChoiceAnswer } from "./single-choice-answer";

interface AnswerGridProps {
  answers: Answer[];
  selectedAnswers: string[];
  onAnswerSelect: (answerId: string) => void;
  isMultipleChoice: boolean;
}

export function AnswerGrid({ answers, selectedAnswers, onAnswerSelect, isMultipleChoice }: AnswerGridProps) {
  if (isMultipleChoice) {
    return (
      <div className="grid grid-cols-2 gap-md">
        {answers.map(answer => (
          <MultipleChoiceAnswer
            key={answer.index}
            answer={answer}
            isSelected={selectedAnswers.includes(String(answer.index))}
            onSelect={() => onAnswerSelect(String(answer.index))}
          />
        ))}
      </div>
    );
  }

  return (
    <RadioGroup
      value={selectedAnswers[0] ?? "-1"}
      onChange={onAnswerSelect}
      as={SingleChoiceAnswer}
      items={answers.map(answer => ({
        value: String(answer.index),
        componentProps: {
          isSelected: selectedAnswers[0] === String(answer.index),
          answer,
        },
      }))}
      classNames={{
        base: "grid grid-cols-2 gap-md",
        item: "w-full",
      }}
    />
  );
}
