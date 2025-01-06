export enum HackathonStatus {
  Live = "live",
  Open = "open",
  Closed = "closed",
}
export type HackathonStatusUnion = `${HackathonStatus}`;

export enum HackathonEventStatus {
  Planned = "planned",
  Terminated = "terminated",
  Highlight = "highlight",
}
export type HackathonEventStatusUnion = `${HackathonEventStatus}`;
