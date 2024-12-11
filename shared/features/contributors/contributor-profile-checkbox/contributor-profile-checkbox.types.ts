import { BiContributorListItemInterface } from "@/core/domain/bi/models/bi-contributor-list-item-model";

import { CheckboxPort } from "@/design-system/atoms/checkbox";

type CheckBoxProps = Omit<CheckboxPort, "classNames" | "variant" | "mixed">;

export interface ContributorProfileCheckboxProps extends CheckBoxProps {
  contributor: BiContributorListItemInterface;
}
