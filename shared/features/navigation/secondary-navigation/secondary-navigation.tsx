"use client";

import { Bell } from "lucide-react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Popover } from "@/design-system/atoms/popover";
import { PageHeader } from "@/design-system/organisms/page-header";

import { SecondaryNavigationProps } from "@/shared/features/navigation/secondary-navigation/secondary-navigation.types";
import { Notifications } from "@/shared/features/notifications/notifications";
import { useIsTablet } from "@/shared/hooks/ui/use-media-query";

export function SecondaryNavigation({ ...props }: SecondaryNavigationProps) {
  const isTablet = useIsTablet("lower");

  if (isTablet) {
    return null;
  }

  return (
    <>
      <PageHeader
        endContent={
          <Popover placement={"bottom-end"}>
            <Popover.Trigger>
              {() => (
                <div>
                  <Button variant={"tertiary"} size={"xs"} startIcon={{ component: Bell }} iconOnly />
                </div>
              )}
            </Popover.Trigger>
            <Popover.Content unstyled className={"max-w-[560px]"}>
              {({ setIsOpen }) => <Notifications onClose={() => setIsOpen(false)} />}
            </Popover.Content>
          </Popover>
        }
        {...props}
      />
    </>
  );
}
