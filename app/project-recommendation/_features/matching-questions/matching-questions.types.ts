export interface Answer {
  index?: number;
  body: string;
  chosen: boolean;
}

export interface Question {
  id: string;
  body: string;
  description?: string;
  answers: Answer[];
  multipleChoice: boolean;
}

export interface MatchingQuestionsState {
  currentQuestionIndex: number;
  selectedAnswers: Record<string, Answer[]>;
}
