export enum EcosystemEventMenuItem {
  ALL_EVENTS = "ALL_EVENTS",
  PAST_EVENTS = "PAST_EVENTS",
  UPCOMING_EVENTS = "UPCOMING_EVENTS",
}

export interface EcosystemEventMenuProps {
  selectedEvent: EcosystemEventMenuItem;
  onAction: (event: EcosystemEventMenuItem) => void;
}
