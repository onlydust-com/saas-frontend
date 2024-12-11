export interface Answer {
  index: number;
  body: string;
}

export interface Question {
  body: string;
  description?: string;
  answers: Answer[];
  multipleChoice: boolean;
}

export interface MatchingQuestionsState {
  currentQuestionIndex: number;
  selectedAnswers: Record<number, string[]>;
}
