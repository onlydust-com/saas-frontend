export interface SingleUserFlowProps {
  githubUserId: number;
  onValidate: (githubUserId: number) => void;
  disableAmountConfirm?: boolean;
}
