export interface NavigationButtonsProps {
  onNext: () => void;
  onBack: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  isSavingAnswers: boolean;
}
