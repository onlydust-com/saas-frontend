import { ButtonPort } from "@/design-system/atoms/button/button.types";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

export interface ContributionsPopoverProps {
  labelProps: TranslateProps;
  buttonProps?: ButtonPort<"button">;
  rewardId: string;
  projectId: string;
}
