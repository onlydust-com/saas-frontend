import { cn } from "@/shared/utils";

interface Props {
  className?: string;
}

export default function User3Line({ className }: Props) {
  return <i className={cn("ri-user-3-line", className)} />;
}
