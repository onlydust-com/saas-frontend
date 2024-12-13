import { LogIn } from "lucide-react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";

import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { useLogout } from "@/shared/hooks/auth/use-logout";

import { UserMenuProps } from "./user-menu.types";

export function UserMenu({ isCompact }: UserMenuProps) {
  const { user, isLoading } = useAuthUser();
  const handleLogout = useLogout();

  const { avatarUrl, login, email } = user ?? {};

  if (isLoading) {
    return <Skeleton className={"h-10 w-full"} />;
  }

  if (isCompact) {
    return (
      <div className={"group/user relative"}>
        <AvatarLabelGroup
          avatars={[{ src: avatarUrl, alt: login }]}
          size={"md"}
          shape={"rounded"}
          withPopover={false}
          classNames={{
            base: "transition-all flex justify-center !gap-0 w-full group-hover/user:opacity-0",
          }}
          truncate
        />
        <Button
          variant={"tertiary"}
          startIcon={{ component: LogIn }}
          iconOnly
          size={"xs"}
          onClick={handleLogout}
          classNames={{
            base: "opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all group-hover/user:opacity-100 w-full h-full justify-center items-center rounded-full",
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={"group/user flex w-full items-center justify-center gap-1 overflow-hidden px-lg py-md transition-all"}
    >
      <div className={"relative flex-1"}>
        <AvatarLabelGroup
          avatars={[{ src: avatarUrl, alt: login }]}
          size={"md"}
          shape={"rounded"}
          title={{ children: login }}
          description={{ children: email }}
          truncate
        />
      </div>

      <Button variant={"tertiary"} startIcon={{ component: LogIn }} iconOnly size={"xs"} onClick={handleLogout} />
    </div>
  );
}
