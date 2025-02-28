import { PropsWithChildren } from "react";

export interface RenderComponentProps extends PropsWithChildren {
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  classNames?: Partial<{
    loading: string;
    error: string;
    empty: string;
    default: string;
  }>;
}
