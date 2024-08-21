import { Popover } from "@/design-system/atoms/popover";
import { AvatarDescription } from "@/design-system/molecules/avatar-description";
import { AvatarGroup } from "@/design-system/molecules/avatar-group";

import { UserGroupProps } from "./user-group.types";

export function UserGroup({ users, avatarProps = {}, maxUsers, totalUsersCount }: UserGroupProps) {
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
    <Popover>
      <Popover.Trigger>
        {() => (
          <div className={"max-w-full cursor-pointer overflow-hidden"}>
            <AvatarGroup
              avatars={
                users?.map(({ avatarUrl, login }) => ({
                  src: avatarUrl,
                  name: login,
                })) ?? []
              }
              maxAvatars={maxUsers || 4}
              totalAvatarsCount={totalUsersCount}
            />
          </div>
        )}
      </Popover.Trigger>
      <Popover.Content>
        {() => (
          <div className={"grid gap-3"}>
            {users?.map(({ avatarUrl, login }) => (
              <AvatarDescription
                key={login}
                avatarProps={{
                  ...avatarProps,
                  src: avatarUrl,
                }}
                labelProps={{ children: login }}
              />
            ))}
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}
