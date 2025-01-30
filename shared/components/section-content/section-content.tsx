import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH3, TypographyH4 } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

interface SectionContentProps {
  title: string;
  variant?: "h3" | "h4";
  showAction?: boolean;
  actionLabel?: string;
  onAction?: () => void;
  isLoading?: boolean;
  error?: boolean;
  errorMessage?: string;
  className?: string;
  children: React.ReactNode;
}

function SectionHeader({
  title,
  variant = "h3",
  showAction = true,
  actionLabel = "Show more",
  onAction,
}: Pick<SectionContentProps, "title" | "variant" | "showAction" | "actionLabel" | "onAction">) {
  const Title = variant === "h3" ? TypographyH3 : TypographyH4;

  return (
    <div className="flex items-center justify-between">
      <Title>{title}</Title>
      {showAction && (
        <Button variant="secondary" size={variant === "h4" ? "sm" : "default"} onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

function SectionHeaderSkeleton({ variant = "h3" }: Pick<SectionContentProps, "variant">) {
  const height = variant === "h3" ? "h-9" : "h-7";
  const buttonHeight = variant === "h3" ? "h-10" : "h-8";

  return (
    <div className="flex items-center justify-between">
      <Skeleton className={`${height} w-48`} />
      <Skeleton className={`${buttonHeight} w-24`} />
    </div>
  );
}

export function SectionContent({
  title,
  variant = "h3",
  showAction,
  actionLabel,
  onAction,
  isLoading,
  error,
  errorMessage = "Failed to load content. Please try again later.",
  className,
  children,
}: SectionContentProps) {
  if (error) {
    return variant === "h3" ? <div className="text-center text-red-500">{errorMessage}</div> : null;
  }

  return (
    <section className={cn("space-y-4", className)}>
      {isLoading ? (
        <SectionHeaderSkeleton variant={variant} />
      ) : (
        <SectionHeader
          title={title}
          variant={variant}
          showAction={showAction}
          actionLabel={actionLabel}
          onAction={onAction}
        />
      )}
      {children}
    </section>
  );
}
