import { Popover } from "@/design-system/atoms/popover";
import { AvatarGroup } from "@/design-system/molecules/avatar-group";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";

import { UserGroupProps } from "./user-group.types";

export function UserGroup({ users, avatarProps = {}, maxUsers, totalUsersCount }: UserGroupProps) {
  if (users.length === 1) {
    return (
      <AvatarLabelGroup
        avatars={[
          {
            ...avatarProps,
            src: users[0].avatarUrl,
          },
        ]}
        description={{ children: users[0].login }}
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
              quantity={maxUsers || 4}
              totalAvatarsCount={totalUsersCount}
            />
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
