import { AvatarDescription } from "@/design-system/molecules/avatar-description";
import { AvatarGroup } from "@/design-system/molecules/avatar-group";

import { UserGroupProps } from "./user-group.types";

export function UserGroup({ users, avatarProps = {} }: UserGroupProps) {
  if (users.length === 1) {
    return (
      <AvatarDescription
        avatarProps={{
          ...avatarProps,
          src: users[0].avatarUrl,
        }}
        labelProps={{ children: users[0].login }}
      />
    );
  }

  return (
    <AvatarGroup
      avatars={
        users?.map(({ avatarUrl, login }) => ({
          src: avatarUrl,
          name: login,
        })) ?? []
      }
      maxAvatars={4}
    />
  );
}
