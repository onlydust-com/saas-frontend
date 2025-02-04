import { FC } from "react";

import { cn } from "@/shared/utils";

export interface FieldLabelProps {
  id: string;
  children: React.ReactElement | string;
  className?: string;
}

export const FieldLabel: FC<FieldLabelProps> = ({ className, children, id }) => {
  return (
    <label className={cn("font-walsheim text-spaceBlue-200 text-sm font-medium", className)} htmlFor={id}>
      {children}
    </label>
  );
};
