import { useClientBootstrapContext } from "@/core/bootstrap/client-bootstrap-context";

import { Avatar } from "@/design-system/atoms/avatar";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";

import { UserMenuProps } from "./user-menu.types";

export function UserMenu({ isFolded }: UserMenuProps) {
  const { user, isLoading } = useAuthUser();
  const login = user?.login;
  const email = user?.email;
  const {
    clientBootstrap: { authProvider },
  } = useClientBootstrapContext();
  const { logout } = authProvider ?? {};

  function onLogout() {
    if (process.env.NEXT_PUBLIC_MARKETPLACE_URL) {
      logout?.({
        logoutParams: {
          returnTo: process.env.NEXT_PUBLIC_MARKETPLACE_URL,
        },
      });
    }
  }

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
              variant={"secondary-light"}
              startIcon={{ name: "ri-login-box-line" }}
              hideText={true}
              size={"l"}
              onClick={onLogout}
              classNames={{
                base: "absolute top-0 left-0 transition-all opacity-0 group-hover/user:opacity-100 w-full",
              }}
            />
          )}
        </div>
        <div className="flex w-[100px] flex-1 flex-col overflow-hidden">
          <Typo size={"m"} weight={"medium"} classNames={{ base: "whitespace-nowrap text-ellipsis" }}>
            {login}
          </Typo>
          <Typo size={"xxs"} color={"text-2"} classNames={{ base: "whitespace-nowrap text-ellipsis" }}>
            {email}
          </Typo>
        </div>
      </div>
      <Button
        variant={"secondary-light"}
        startIcon={{ name: "ri-login-box-line" }}
        hideText={true}
        size={"l"}
        onClick={onLogout}
      />
    </div>
  );
}
