import { Answer } from "../../matching-questions.types";

export interface AnswerGridProps {
  answers: Answer[];
  selectedAnswers: Answer[];
  onAnswerSelect: (answer: Answer) => void;
  isMultipleChoice: boolean;
}
