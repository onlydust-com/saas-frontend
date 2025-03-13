import { Fragment } from "react";

import { AppUserMenu } from "@/shared/features/app/app-user-menu/app-user-menu";
import { GlobalSearch } from "@/shared/features/global-search/global-search";
import { useNavigation } from "@/shared/features/navigation/navigation.context";
import { NotificationsPopover } from "@/shared/features/notifications/notifications-popover";
import { IsAuthenticated, SignInButton, useAuthContext } from "@/shared/providers/auth-provider";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import { SidebarTrigger } from "@/shared/ui/sidebar";
import { Skeleton } from "@/shared/ui/skeleton";

import { PullRequestSurvey } from "../../../survey/pull-request-survey/pull-request-survey";
import { usePullRequestSurvey } from "../../../survey/pull-request-survey/use-pull-request-survey";
import { RenderComponent } from "../../render-component/render-component";

export function AppHeader() {
  const { breadcrumb } = useNavigation();
  const { isLoading } = useAuthContext();
  const { isOpen, openSurvey, closeSurvey, handleSubmit } = usePullRequestSurvey();

  return (
    <header className="sticky top-0 z-[39] flex h-16 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur-sm">
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

      <RenderComponent isLoading={isLoading} classNames={{ default: "flex flex-1", loading: "flex flex-1" }}>
        <RenderComponent.Loading>
          <div className={"flex flex-1 flex-row items-center justify-end gap-3"}>
            <Skeleton className="h-9 w-36" />
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-9" />
          </div>
        </RenderComponent.Loading>
        <RenderComponent.Error errorMessage="Error loading overview" />
        <RenderComponent.Default>
          <div className={"flex flex-1 flex-row items-center justify-end gap-3"}>
            <IsAuthenticated>
              <IsAuthenticated.Yes>
                <GlobalSearch />

                <NotificationsPopover />

                <AppUserMenu />
                <Button onClick={openSurvey}>Give Feedback</Button>
                <PullRequestSurvey
                  isOpen={isOpen}
                  onClose={closeSurvey}
                  onSubmit={handleSubmit}
                  issueNumber="500"
                  issueTitle="Improve the performance of algorithm"
                  projectId="123"
                  projectSlug="project-slug"
                  contributionId="456"
                />
              </IsAuthenticated.Yes>
              <IsAuthenticated.No>
                <SignInButton />
              </IsAuthenticated.No>
            </IsAuthenticated>
          </div>
        </RenderComponent.Default>
      </RenderComponent>
    </header>
  );
}
