export enum HackathonEventMenuItem {
  ALL_EVENTS = "ALL_EVENTS",
  PAST_EVENTS = "PAST_EVENTS",
  UPCOMING_EVENTS = "UPCOMING_EVENTS",
}

export interface HackathonEventMenuProps {
  selectedEvent: HackathonEventMenuItem;
  onAction: (event: HackathonEventMenuItem) => void;
}
