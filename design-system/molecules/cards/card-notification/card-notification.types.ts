import { TypoPort } from "@/design-system/atoms/typo";

interface Variants {}

interface ClassNames {
  base: string;
}

export interface CardNotificationPort extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  titleProps: TypoPort<"p">;
  descriptionProps: TypoPort<"p">;
  onClick: () => void;
}
