import { Avatar } from "@/design-system/atoms/avatar";
import { Checkbox } from "@/design-system/atoms/checkbox";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { ContributorProfileCheckboxProps } from "@/shared/features/contributors/contributor-profile-checkbox/contributor-profile-checkbox.types";

export function ContributorProfileCheckbox({
  avatarUrl,
  login,
  isDisabled,
  value,
  ...props
}: ContributorProfileCheckboxProps) {
  function onCardClick() {
    if (props.onChange) {
      props.onChange(!value);
    }
  }

  return (
    <Paper
      border={value ? "active" : "primary"}
      classNames={{ base: "flex flex-col gap-lg" }}
      onClick={onCardClick}
      background="transparent"
    >
      <div className="flex justify-start gap-lg">
        <Avatar size={"sm"} shape={"squared"} src={avatarUrl} />
        <div className={"flex-1"}>
          <Typo size={"sm"} weight={"medium"}>
            {login}
          </Typo>
        </div>
        <Checkbox
          isDisabled={isDisabled}
          {...props}
          {...(value ? { attr: { "data-focus": true } } : {})}
          value={value}
          classNames={{ base: "pointer-events-none" }}
        />
      </div>
    </Paper>
  );
}
