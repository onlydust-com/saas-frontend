import { RadioGroup } from "@/design-system/atoms/radio-group";

import { type Answer } from "../matching-questions.types";
import { MultipleChoiceAnswer } from "./multiple-choice-answer";
import { SingleChoiceAnswer } from "./single-choice-answer";

interface AnswerGridProps {
  answers: Answer[];
  selectedAnswers: Answer[];
  onAnswerSelect: (answer: Answer) => void;
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
