import { Popover } from "@/design-system/atoms/popover";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarGroup } from "@/design-system/molecules/avatar-group";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";

import { UserGroupProps } from "./user-group.types";

export function UserGroup({ users, maxUsers = 4, avatarProps, label }: UserGroupProps) {
  const usersCount = users.length;

  if (!usersCount) return null;

  if (users.length === 1) {
    return (
      <AvatarLabelGroup
        avatars={[
          {
            ...avatarProps,
            src: users[0].avatarUrl,
          },
        ]}
        title={{ children: users[0].login }}
        truncate
        size={avatarProps?.size}
      />
    );
  }

  return (
    <Popover>
      <Popover.Trigger>
        {() => (
          <div className={"flex max-w-full cursor-pointer items-center gap-md overflow-hidden"}>
            <AvatarGroup
              avatars={
                users?.map(({ avatarUrl, login }) => ({
                  src: avatarUrl,
                  name: login,
                  size: avatarProps?.size,
                })) ?? []
              }
              quantity={maxUsers}
              totalAvatarsCount={usersCount}
            />

            {label ? <Typo size={"xs"} color={"tertiary"} {...label} /> : null}
          </div>
        )}
      </Popover.Trigger>
      <Popover.Content>
        {() => (
          <div className={"grid gap-3"}>
            {users?.map(({ avatarUrl, login }) => (
              <AvatarLabelGroup
                key={login}
                avatars={[
                  {
                    ...avatarProps,
                    src: avatarUrl,
                  },
                ]}
                title={{ children: login }}
              />
            ))}
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}
