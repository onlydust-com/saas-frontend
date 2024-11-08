import { UserGroup } from "@/shared/features/user/user-group/user-group";

import { ContributorsProps } from "./contributors.types";

export function Contributors({ contributors }: ContributorsProps) {
  if (!contributors?.length) return null;

  return (
    <UserGroup
      avatarProps={{ size: "xs" }}
      users={contributors}
      maxUsers={2}
      label={{
        size: "xs",
        weight: "regular",
        color: "tertiary",
        translate: {
          token: "cards:cardContributionKanban.contributors",
          count: contributors.length,
        },
      }}
    />
  );
}
