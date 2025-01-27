import { RadioGroup } from "@/design-system/atoms/radio-group";

import { MultipleChoiceAnswer } from "../multiple-choice-answer/multiple-choice-answer";
import { SingleChoiceAnswer } from "../single-choice-answer/single-choice-answer";
import { AnswerGridProps } from "./answer-grid.types";

export function AnswerGrid({ answers, selectedAnswers, onAnswerSelect, isMultipleChoice }: AnswerGridProps) {
  if (isMultipleChoice) {
    return (
      <div className="grid grid-cols-1 gap-md tablet:grid-cols-2">
        {answers.map(answer => (
          <MultipleChoiceAnswer
            key={answer.value}
            answer={answer}
            isSelected={selectedAnswers.find(a => a.value === answer.value)?.chosen ?? false}
            onSelect={() => onAnswerSelect(answer)}
          />
        ))}
      </div>
    );
  }

  return (
    <RadioGroup
      value={String(selectedAnswers[0]?.value ?? "-1")}
      onChange={value => onAnswerSelect(answers.find(a => a.value === value) ?? answers[0])}
      as={SingleChoiceAnswer}
      items={answers.map(answer => ({
        value: String(answer.value),
        componentProps: {
          isSelected: selectedAnswers[0]?.value === answer.value,
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
