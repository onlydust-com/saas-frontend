import * as React from "react";
import { cn } from "@/shared/helpers/cn";

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function AvatarGroup({ className, children, ...props }: AvatarGroupProps) {
  const childrenArray = React.Children.toArray(children);

  return (
    <div
      className={cn("flex -space-x-2", className)}
      {...props}
    >
      {childrenArray.map((child, index) => (
        <div key={index} className="ring-2 ring-background rounded-full">
          {child}
        </div>
      ))}
    </div>
  );
} 