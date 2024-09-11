import { LogIn } from "lucide-react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";

import { cn } from "@/shared/helpers/cn";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { useLogout } from "@/shared/hooks/auth/use-logout";

import { UserMenuProps } from "./user-menu.types";

export function UserMenu({ isFolded }: UserMenuProps) {
  const { user, isLoading } = useAuthUser();
  const login = user?.login;
  const email = user?.email;

  const handleLogout = useLogout();

  if (isLoading) {
    return <Skeleton className={"h-10 w-full"} />;
  }

  return (
    <div
      className={cn(
        "group/user flex w-fit items-center justify-center gap-1 overflow-hidden px-lg py-md pl-2 transition-all"
      )}
    >
      <div className={cn("relative flex-1")}>
        <AvatarLabelGroup
          avatars={[{ src: user?.avatarUrl, alt: user?.login }]}
          size={"md"}
          shape={"rounded"}
          title={{ children: login }}
          description={{ children: email }}
          classNames={{
            base: cn("transition-all", {
              "flex justify-center gap-[18px] transition-all w-full group-hover/user:opacity-0": isFolded,
            }),
          }}
        />
        {isFolded && (
          <Button
            variant={"tertiary"}
            startIcon={{ component: LogIn }}
            iconOnly={true}
            size={"xs"}
            onClick={handleLogout}
            classNames={{
              base: "opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all group-hover/user:opacity-100 w-full h-full justify-center items-center",
            }}
          />
        )}
      </div>
      {!isFolded && (
        <Button
          variant={"tertiary"}
          startIcon={{ component: LogIn }}
          iconOnly={true}
          size={"xs"}
          onClick={handleLogout}
        />
      )}
    </div>
  );
}
