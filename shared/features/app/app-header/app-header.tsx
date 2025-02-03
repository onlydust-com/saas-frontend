import { AppUserMenu } from "@/shared/features/app/app-user-menu/app-user-menu";
import { GlobalSearch } from "@/shared/features/global-search/global-search";
import { useNavigation } from "@/shared/features/navigation/navigation.context";
import { NotificationsPopover } from "@/shared/features/notifications/notifications-popover";
import { useIsTablet } from "@/shared/hooks/ui/use-media-query";
import { IsAuthenticated, SignInButton } from "@/shared/providers/auth-provider";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";
import { Separator } from "@/shared/ui/separator";
import { SidebarTrigger } from "@/shared/ui/sidebar";

export function AppHeader() {
  const { breadcrumb } = useNavigation();
  const isTablet = useIsTablet("lower");

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-white/80 px-4 backdrop-blur-sm dark:bg-black/80">
      <div className="flex items-center gap-2">
        <SidebarTrigger />

        <Separator orientation="vertical" className="mr-2 h-4" />

        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumb?.map((item, index) => (
              <>
                {index > 0 ? <BreadcrumbSeparator className="hidden md:block" /> : null}
                <BreadcrumbItem className={index < breadcrumb.length - 1 ? "hidden md:block" : ""}>
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                </BreadcrumbItem>
              </>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className={"flex flex-1 flex-row items-center justify-end gap-3"}>
        <IsAuthenticated>
          <IsAuthenticated.Yes>
            <GlobalSearch isMobile={isTablet} />

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
