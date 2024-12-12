import { RadioGroup } from "@/design-system/atoms/radio-group";

import { MultipleChoiceAnswer } from "../multiple-choice-answer/multiple-choice-answer";
import { SingleChoiceAnswer } from "../single-choice-answer/single-choice-answer";
import { AnswerGridProps } from "./answer-grid.types";

export function AnswerGrid({ answers, selectedAnswers, onAnswerSelect, isMultipleChoice }: AnswerGridProps) {
  if (isMultipleChoice) {
    return (
      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-md">
        {answers.map(answer => (
          <MultipleChoiceAnswer
            key={answer.index}
            answer={answer}
            isSelected={selectedAnswers.find(a => a.index === answer.index)?.chosen ?? false}
            onSelect={() => onAnswerSelect(answer)}
          />
        ))}
      </div>
    );
  }

  return (
    <RadioGroup
      value={String(selectedAnswers[0]?.index ?? "-1")}
      onChange={value => onAnswerSelect(answers.find(a => a.index === Number(value)) ?? answers[0])}
      as={SingleChoiceAnswer}
      items={answers.map(answer => ({
        value: String(answer.index),
        componentProps: {
          isSelected: selectedAnswers[0]?.index === answer.index,
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
