import { Fragment } from "react";

import { AppUserMenu } from "@/shared/features/app/app-user-menu/app-user-menu";
import { GlobalSearch } from "@/shared/features/global-search/global-search";
import { useNavigation } from "@/shared/features/navigation/navigation.context";
import { NotificationsPopover } from "@/shared/features/notifications/notifications-popover";
import { IsAuthenticated, SignInButton } from "@/shared/providers/auth-provider";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";
import { Separator } from "@/shared/ui/separator";
import { SidebarTrigger } from "@/shared/ui/sidebar";

export function AppHeader() {
  const { breadcrumb } = useNavigation();

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <SidebarTrigger />

        <Separator orientation="vertical" className="mr-2 h-4" />

        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumb?.map((item, index) => (
              <Fragment key={index}>
                {index > 0 ? <BreadcrumbSeparator className="hidden xl:block" /> : null}
                <BreadcrumbItem className={index < breadcrumb.length - 1 ? "hidden xl:block" : ""}>
                  {index === breadcrumb.length - 1 ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : item.href ? (
                    <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                  ) : (
                    item.label
                  )}
                </BreadcrumbItem>
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className={"flex flex-1 flex-row items-center justify-end gap-3"}>
        <IsAuthenticated>
          <IsAuthenticated.Yes>
            <GlobalSearch />

            <NotificationsPopover />

            <AppUserMenu />
          </IsAuthenticated.Yes>
          <IsAuthenticated.No>
            <SignInButton />
          </IsAuthenticated.No>
        </IsAuthenticated>
      </div>
    </header>
  );
}
