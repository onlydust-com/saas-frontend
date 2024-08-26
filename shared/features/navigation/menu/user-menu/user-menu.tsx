import { LogIn } from "lucide-react";

import { Avatar } from "@/design-system/atoms/avatar";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { Typo } from "@/design-system/atoms/typo";

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
    <div className={"group/user flex w-full items-center justify-between gap-1 overflow-hidden"}>
      <div className="flex flex-1 flex-row gap-2">
        <div className={"relative"}>
          <Avatar
            src={user?.avatarUrl}
            alt={user?.login}
            shape="square"
            size={"l"}
            classNames={{
              base: cn({ "group-hover/user:!opacity-0 transition-all": isFolded }),
            }}
          />
          {isFolded && (
            <Button
              variant={"secondary"}
              startIcon={{ component: LogIn }}
              iconOnly={true}
              size={"lg"}
              onClick={handleLogout}
              classNames={{
                base: "absolute top-0 left-0 transition-all opacity-0 group-hover/user:opacity-100 w-full",
              }}
            />
          )}
        </div>
        <div className="flex w-[100px] flex-1 flex-col overflow-hidden">
          <Typo size={"md"} weight={"medium"} classNames={{ base: "truncate" }}>
            {login}
          </Typo>
          <Typo size={"xs"} color={"secondary"} classNames={{ base: "truncate" }}>
            {email}
          </Typo>
        </div>
      </div>
      <Button
        variant={"secondary"}
        startIcon={{ component: LogIn }}
        iconOnly={true}
        size={"md"}
        onClick={handleLogout}
      />
    </div>
  );
}
