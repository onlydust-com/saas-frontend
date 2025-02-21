import { Sparkles } from "lucide-react";

import { Card } from "@/shared/ui/card";
import { TypographyH3, TypographyP } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

import { DevCareNoteProps } from "./dev-care-note.types";

export function DevCareNote({ children }: DevCareNoteProps) {
  if (!children) return null;

  return (
    <Card
      className={cn(
        "relative flex flex-col gap-4 overflow-hidden bg-gradient-to-br from-purple-950 to-transparent to-20% p-4"
      )}
    >
      <header className={"flex w-full items-center justify-start gap-2"}>
        <div className={"flex items-center gap-2"}>
          <Sparkles className={"text-purple-700"} />
          <TypographyH3>Dev Care Note</TypographyH3>
        </div>
      </header>

      <div className={"relative h-fit overflow-hidden transition-all"}>
        <TypographyP>{children}</TypographyP>
      </div>
    </Card>
  );
}
