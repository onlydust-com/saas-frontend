import { Calendar, ChevronDown } from "lucide-react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Menu } from "@/design-system/molecules/menu";
import { MenuItemPort } from "@/design-system/molecules/menu-item/menu-item.types";

import { Translate } from "@/shared/translation/components/translate/translate";

import { EcosystemEventMenuItem, EcosystemEventMenuProps } from "./ecosystem-event-menu.types";

const items: MenuItemPort<EcosystemEventMenuItem>[] = [
  {
    label: <Translate token="ecosystems:details.events.allEvents" />,
    id: EcosystemEventMenuItem.ALL_EVENTS,
  },
  {
    label: <Translate token="ecosystems:details.events.pastEvents" />,
    id: EcosystemEventMenuItem.PAST_EVENTS,
  },
  {
    label: <Translate token="ecosystems:details.events.upcomingEvents" />,
    id: EcosystemEventMenuItem.UPCOMING_EVENTS,
  },
];

export function EcosystemEventMenu({ selectedEvent, onAction }: EcosystemEventMenuProps) {
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
