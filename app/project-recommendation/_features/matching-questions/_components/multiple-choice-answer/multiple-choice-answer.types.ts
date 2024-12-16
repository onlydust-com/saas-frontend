import { Answer } from "../../matching-questions.types";

export interface MultipleChoiceAnswerProps {
  answer: Answer;
  isSelected: boolean;
  onSelect: () => void;
}
