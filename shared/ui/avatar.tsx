"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";

import { cn } from "@/shared/utils";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={cn("aspect-square h-full w-full object-cover", className)} {...props} />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

const AvatarGroup = ({
  avatars,
  max = 5,
  classNames,
}: {
  avatars: React.ComponentPropsWithoutRef<typeof AvatarImage>[];
  max?: number;
  classNames?: Partial<{
    container: string;
    avatar: string;
    fallback: string;
  }>;
}) => {
  const avatarsToShow = avatars.slice(0, max);
  return (
    <div className={cn("flex items-center gap-0", classNames?.container)}>
      {avatarsToShow.map((avatar, index) => (
        <Avatar key={index} className={classNames?.avatar}>
          <AvatarImage {...avatar} />
          <AvatarFallback className={classNames?.fallback}>{avatar.alt?.charAt(0)}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
};

export { Avatar, AvatarFallback, AvatarImage, AvatarGroup };
