interface classNames {
  base: string;
  illustration: string;
  wordmark: string;
}

export interface LogoProps {
  type?: "illustration" | "word-mark" | "full";
  classNames?: Partial<classNames>;
}
