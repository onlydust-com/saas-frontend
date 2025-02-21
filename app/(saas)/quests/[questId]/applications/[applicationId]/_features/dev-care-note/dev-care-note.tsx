import devCareNoteAvatar from "@/public/images/avatars/sofia.jpeg";
import { Info, Sparkles } from "lucide-react";

import { Avatar, AvatarImage } from "@/shared/ui/avatar";
import { Card } from "@/shared/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { TypographyH3, TypographyMuted, TypographyP } from "@/shared/ui/typography";
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
          <Tooltip>
            <TooltipTrigger>
              <Info className={"h-4 w-4 text-foreground"} />
            </TooltipTrigger>
            <TooltipContent side="bottom" align="start">
              <TypographyP className="max-w-[300px]">
                This is our opinion, written to help you understand more about the contributor. It&apos;s not intended
                as a statement of fact, but was written to be as accurate as possible at the time of publishing
              </TypographyP>
            </TooltipContent>
          </Tooltip>
        </div>
      </header>

      <div className={"relative h-fit overflow-hidden transition-all"}>
        <TypographyP>{children}</TypographyP>
        <div className="flex flex-row gap-2 pb-2 pt-6">
          <Avatar className="h-12 w-12">
            <AvatarImage src={devCareNoteAvatar.src} />
          </Avatar>
          <div className="flex flex-col gap-px">
            <TypographyP>Sofia</TypographyP>
            <TypographyMuted>Dev Care Team OnlyDust</TypographyMuted>
          </div>
        </div>
      </div>
    </Card>
  );
}
