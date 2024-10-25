import { TypoPort } from "@/design-system/atoms/typo";

interface Variants {}

interface ClassNames {
  base: string;
}

export interface CardNotificationPort extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  titleProps: TypoPort<"span">;
  descriptionProps: TypoPort<"span">;
  hasRead: boolean;
  onClick: () => void;
}
