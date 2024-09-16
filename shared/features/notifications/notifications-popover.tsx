import { Paper } from "@/design-system/atoms/paper";
import { Popover } from "@/design-system/atoms/popover";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NotificationsButton } from "@/shared/features/notifications/_components/notifications-button/notifications-button";
import { NotificationsContent } from "@/shared/features/notifications/_components/notifications-content/notifications-content";

export function NotificationsPopover() {
  return (
    <Popover placement={"bottom-end"}>
      <Popover.Trigger>
        {() => (
          <div>
            <NotificationsButton />
          </div>
        )}
      </Popover.Trigger>
      <Popover.Content unstyled className={"w-[560px]"}>
        {({ setIsOpen }) => (
          <Paper
            as={ScrollView}
            size={"3xl"}
            background={"primary-alt"}
            border={"primary"}
            classNames={{ base: "effect-box-shadow-xl w-full h-[400px]" }}
          >
            <NotificationsContent onClose={() => setIsOpen(false)} />
          </Paper>
        )}
      </Popover.Content>
    </Popover>
  );
}
