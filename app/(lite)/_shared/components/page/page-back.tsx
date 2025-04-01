import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";

export function PageBack({ children, href }: PropsWithChildren<{ href: string }>) {
  return (
    <Link href={href} className="flex items-center gap-2">
      <ChevronLeft className="size-4" />
      {children}
    </Link>
  );
}
