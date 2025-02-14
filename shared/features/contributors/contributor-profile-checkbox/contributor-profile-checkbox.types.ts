import { CheckboxPort } from "@/design-system/atoms/checkbox";

type CheckBoxProps = Omit<CheckboxPort, "classNames" | "variant" | "mixed">;

export interface ContributorProfileCheckboxProps extends CheckBoxProps {
  avatarUrl?: string;
  login?: string;
}
