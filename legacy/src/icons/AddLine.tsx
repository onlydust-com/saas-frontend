import { cn } from "@/shared/utils";

export default function AddLine({ className }: { className?: string }) {
  return <i className={cn("ri-add-line", className)} />;
}
