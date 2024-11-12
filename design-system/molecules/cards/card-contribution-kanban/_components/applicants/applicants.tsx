import { UserGroup } from "@/shared/features/user/user-group/user-group";

import { ApplicantsProps } from "./applicants.types";

export function Applicants({ applicants }: ApplicantsProps) {
  if (!applicants?.length) return null;

  return (
    <UserGroup
      avatarProps={{ size: "xs" }}
      users={applicants}
      maxUsers={2}
      label={{
        size: "xs",
        weight: "regular",
        color: "tertiary",
        translate: {
          token: "cards:cardContributionKanban.applicants",
          count: applicants.length,
        },
      }}
    />
  );
}
