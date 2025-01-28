import { PropsWithChildren } from "react";

import { cn } from "@/shared/utils";

export function TypographyH1({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <h1 className={cn("font-clash text-4xl font-semibold tracking-tight lg:text-5xl", className)}>{children}</h1>;
}

export function TypographyH2({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <h2 className={cn("font-clash text-3xl font-medium tracking-tight", className)}>{children}</h2>;
}

export function TypographyH3({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <h3 className={cn("font-clash text-2xl font-medium tracking-tight", className)}>{children}</h3>;
}

export function TypographyH4({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <h4 className={cn("font-clash text-xl font-medium tracking-tight", className)}>{children}</h4>;
}

export function TypographyP({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <p className={cn("leading-7", className)}>{children}</p>;
}

export function TypographyLarge({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <p className={cn("text-lg font-semibold", className)}>{children}</p>;
}

export function TypographySmall({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <small className={cn("text-sm font-medium leading-none", className)}>{children}</small>;
}

export function TypographyMuted({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>;
}
