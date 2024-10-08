import { PropsWithChildren } from "react";

export interface TimelineItemProps extends PropsWithChildren {
  title: string;
  date: Date;
}

export interface TimelineProps extends PropsWithChildren {}
