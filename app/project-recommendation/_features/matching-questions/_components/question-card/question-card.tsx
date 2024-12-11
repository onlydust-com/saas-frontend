import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { AnswerGrid } from "../answer-grid/answer-grid";
import { QuestionCardProps } from "./question-card.types";

export function QuestionCard({ question, selectedAnswers, onAnswerSelect }: QuestionCardProps) {
  return (
    <Paper size="4xl" classNames={{ base: "flex flex-col gap-lg" }} background="secondary">
      <Typo variant="heading" size="xs">
        {question.body}
      </Typo>
      {question.description && (
        <Typo color="secondary" size="sm">
          {question.description}
        </Typo>
      )}
      <AnswerGrid
        answers={question.answers}
        selectedAnswers={selectedAnswers}
        onAnswerSelect={onAnswerSelect}
        isMultipleChoice={question.multipleChoice}
      />
    </Paper>
  );
}
