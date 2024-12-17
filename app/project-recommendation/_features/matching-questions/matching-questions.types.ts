export interface Answer {
  body: string;
  chosen: boolean;
  value?: string;
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
