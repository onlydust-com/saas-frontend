import { Calendar, ChevronDown } from "lucide-react";

import {
  HackathonEventMenuItem,
  HackathonEventMenuProps,
} from "@/app/(saas)/osw/[hackathonSlug]/_components/hackathon-events-menu/hackathon-events-menu.types";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Menu } from "@/design-system/molecules/menu";
import { MenuItemPort } from "@/design-system/molecules/menu-item";

import { Translate } from "@/shared/translation/components/translate/translate";

const items: MenuItemPort<HackathonEventMenuItem>[] = [
  {
    label: <Translate token="hackathon:details.events.allEvents" />,
    id: HackathonEventMenuItem.ALL_EVENTS,
  },
  {
    label: <Translate token="hackathon:details.events.pastEvents" />,
    id: HackathonEventMenuItem.PAST_EVENTS,
  },
  {
    label: <Translate token="hackathon:details.events.upcomingEvents" />,
    id: HackathonEventMenuItem.UPCOMING_EVENTS,
  },
];

export function HackathonEventMenu({ selectedEvent, onAction }: HackathonEventMenuProps) {
  return (
    <Menu
      items={items}
      selectedIds={[selectedEvent]}
      onAction={onAction}
      isPopOver
      closeOnSelect
      placement="bottom-end"
    >
      <Button size="xs" variant="tertiary" startIcon={{ component: Calendar }} endIcon={{ component: ChevronDown }}>
        {items.find(item => item.id === selectedEvent)?.label}
      </Button>
    </Menu>
  );
}
