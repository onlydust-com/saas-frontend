import { BiContributorInterface } from "@/core/domain/bi/models/bi-contributor-model";

import { CheckboxPort } from "@/design-system/atoms/checkbox";

type CheckBoxProps = Omit<CheckboxPort, "classNames" | "variant" | "mixed">;

export interface ContributorProfileCheckboxProps extends CheckBoxProps {
  user: BiContributorInterface["contributor"];
}
