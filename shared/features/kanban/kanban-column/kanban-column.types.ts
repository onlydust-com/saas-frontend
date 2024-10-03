import { PropsWithChildren, ReactNode } from "react";

import { AnyType } from "@/core/kernel/types";

import { BadgePort } from "@/design-system/atoms/badge";

interface header {
  startContent?: ReactNode;
  title: ReactNode;
  badge?: BadgePort<AnyType>;
  endContent?: ReactNode;
}

export interface KanbanColumnProps extends PropsWithChildren {
  header: header;
  hasNextPage?: boolean;
  onNext?: () => void;
  isLoading?: boolean;
}
