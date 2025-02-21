import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { TypographyP, TypographySmall } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

import { AmountOfWorkBadgeProps } from "./amount-of-work-badge.types";

export function AmountOfWorkBadge({ value }: AmountOfWorkBadgeProps) {
  const numberOfLines = 8;
  const isRed = value <= 1;
  const isOrange = value <= 2 && value > 1;
  const isAmber = value <= 3 && value > 2;
  const isYellow = value <= 4 && value > 3;
  const isLime = value > 4 && value <= 5;

  const lines = Array.from({ length: numberOfLines }, (_, index) => {
    const threshold = (index * 5) / numberOfLines;
    return index < 1 || value >= threshold;
  });

  return (
    <Tooltip>
      <TooltipTrigger>
        <div
          className={cn(
            "flex h-8 w-auto items-center justify-center gap-2 rounded-md border px-2.5 py-0.5 text-xs font-semibold",
            "!border-border !bg-transparent",
            {
              "border-border from-red-950 text-red-600": isRed,
              "border-orange-950 from-orange-950 text-orange-600": isOrange,
              "border-amber-950 from-amber-950 text-amber-600": isAmber,
              "border-yellow-950 from-yellow-950 text-yellow-600": isYellow,
              "border-lime-950 from-lime-950 text-lime-600": isLime,
            }
          )}
        >
          <TypographySmall className="text-inherit">Amount of work ({value})</TypographySmall>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("text-inherit")}
          >
            <path d="M12 2v4" className={cn("text-border", { "text-inherit": lines[0] })} />
            <path d="m16.2 7.8 2.9-2.9" className={cn("text-border", { "text-inherit": lines[1] })} />
            <path d="M18 12h4" className={cn("text-border", { "text-inherit": lines[2] })} />
            <path d="m16.2 16.2 2.9 2.9" className={cn("text-border", { "text-inherit": lines[3] })} />
            <path d="M12 18v4" className={cn("text-border", { "text-inherit": lines[4] })} />
            <path d="m4.9 19.1 2.9-2.9" className={cn("text-border", { "text-inherit": lines[5] })} />
            <path d="M2 12h4" className={cn("text-border", { "text-inherit": lines[6] })} />
            <path d="m4.9 4.9 2.9 2.9" className={cn("text-border", { "text-inherit": lines[7] })} />
          </svg>
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" align="start">
        <div className="max-w-[450px]">
          <TypographyP>
            This amount of work score is a guideline rather than an exact calculation. Compare pull requests with each
            other to keep the evaluation relevant.
          </TypographyP>
          <ul className="list-disc p-2">
            <li>
              <TypographyP>{"1-2 : Very Small (<2h): Minor fixes or simple changes"}</TypographyP>
            </li>
            <li>
              <TypographyP>{"2-2 : Small (2-5h): Multiple bug fixes, simple feature tweaks"}</TypographyP>
            </li>
            <li>
              <TypographyP>
                {"3-4: Medium (5h-1 day): New features using existing patterns, moderate refactoring"}
              </TypographyP>
            </li>
            <li>
              <TypographyP>{"4-5 : Large (1-3 days): Complex features, architectural changes"}</TypographyP>
            </li>
            <li>
              <TypographyP>{"5 : Major (3+ days): Critical overhauls, major system rewrites"}</TypographyP>
            </li>
          </ul>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
