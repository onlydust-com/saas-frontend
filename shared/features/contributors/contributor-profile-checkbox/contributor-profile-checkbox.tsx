import { Avatar } from "@/design-system/atoms/avatar";
import { Checkbox } from "@/design-system/atoms/checkbox";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { ContributorProfileCheckboxProps } from "@/shared/features/contributors/contributor-profile-checkbox/contributor-profile-checkbox.types";

export function ContributorProfileCheckbox({ user, isDisabled, value, ...props }: ContributorProfileCheckboxProps) {
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
        <Avatar size={"sm"} shape={"squared"} src={user.avatarUrl} />
        <div className={"flex flex-1 flex-col gap-md"}>
          <div className="flex flex-col">
            <Typo size={"sm"} weight={"medium"}>
              {user.login}
            </Typo>
            <Typo as={"div"} size={"sm"} color={"secondary"}>
              {/*TODO handle rank in bi contributor model*/}
              {/*{user.rank.getRankSummary()}*/}
            </Typo>
          </div>

          <div className="flex gap-sm">
            {/*TODO add rewardedCount and contributionCount badges*/}
            {/*<Badge size={"xxs"} />*/}
          </div>
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
