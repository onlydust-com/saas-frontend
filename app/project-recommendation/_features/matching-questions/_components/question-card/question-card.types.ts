import { Answer, Question } from "../../matching-questions.types";

export interface QuestionCardProps {
  question: Question;
  selectedAnswers: Answer[];
  onAnswerSelect: (answer: Answer) => void;
}
