import { GoodFirstIssues } from "@/app/(saas)/projects/[projectSlug]/overview/_features/good-first-issues/good-first-issues";

import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { HoverBorderGradient } from "@/shared/ui/hover-border-gradient";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { TypographyH4, TypographyP } from "@/shared/ui/typography";

export function ContributeNow({ projectId }: { projectId?: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <HoverBorderGradient>
          <Button asChild>
            <span>Contribute now</span>
          </Button>
        </HoverBorderGradient>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-[460px] overflow-hidden">
        <ScrollArea style={{ maxHeight: "700px" }}>
          <div className="flex flex-col gap-4">
            <Card className="flex flex-col gap-3 p-3">
              <TypographyH4>ODBoost in progress</TypographyH4>

              <TypographyP>
                Now is the best time to contribute to this project!
                <br />
                It&apos;s currently in an ODBoost.
              </TypographyP>
            </Card>

            <GoodFirstIssues projectId={projectId} size="small" />

            <Card className="flex flex-col gap-3 p-3">
              <TypographyH4>Join social networks</TypographyH4>

              <TypographyP>
                Join our community on social networks to stay updated and interact with other contributors.
              </TypographyP>
            </Card>

            <Card className="flex flex-col gap-3 p-3">
              <TypographyH4>Test the application</TypographyH4>

              <TypographyP>
                Why not test the application?
                <br />
                Follow our guide to report bugs or suggest improvements.
              </TypographyP>

              <Button variant={"outline"} asChild className="w-fit">
                <a href="" target="_blank" rel="noopener noreferrer">
                  Test the application
                </a>
              </Button>
            </Card>
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
