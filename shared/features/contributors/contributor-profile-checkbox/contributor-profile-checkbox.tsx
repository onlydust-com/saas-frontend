import { GitPullRequest } from "lucide-react";

import { Avatar } from "@/design-system/atoms/avatar";
import { Badge } from "@/design-system/atoms/badge";
import { Checkbox } from "@/design-system/atoms/checkbox";
import { Icon } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { ContributorProfileCheckboxProps } from "@/shared/features/contributors/contributor-profile-checkbox/contributor-profile-checkbox.types";

export function ContributorProfileCheckbox({
  contributor,
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
        <Avatar size={"sm"} shape={"squared"} src={contributor.contributor.avatarUrl} />
        <div className={"flex flex-1 flex-col gap-md"}>
          <div className="flex flex-col">
            <Typo size={"sm"} weight={"medium"}>
              {contributor.contributor.login}
            </Typo>
            <Typo as={"div"} size={"sm"} color={"tertiary"}>
              {contributor.rank?.getRankSummary()}
            </Typo>
          </div>

          <div className="flex gap-sm">
            <Badge size={"sm"}>
              <div className="flex gap-xs">
                <Typo
                  size={"xs"}
                  color={"tertiary"}
                  translate={{ token: "features:contributorProfileCheckbox.badges.rewarded" }}
                />
                <Typo size={"xs"} color={"primary"}>
                  {contributor.rewardCount.value}
                </Typo>
              </div>
            </Badge>
            <Badge size={"sm"} startContent={<Icon component={GitPullRequest} size={"sm"} />}>
              <Typo size={"xs"} color={"primary"}>
                {contributor.prCount.value}
              </Typo>
            </Badge>
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
