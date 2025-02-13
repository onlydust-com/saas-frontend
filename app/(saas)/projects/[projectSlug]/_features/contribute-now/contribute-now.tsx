import { HackathonInProgress } from "@/app/(saas)/projects/[projectSlug]/_components/hackathon-in-progress/hackathon-in-progress";
import { JoinSocialNetworks } from "@/app/(saas)/projects/[projectSlug]/_components/join-social-networks/join-social-networks";
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

      <PopoverContent align="end" className="w-screen max-w-[460px] overflow-hidden p-0">
        <ScrollArea style={{ height: "700px" }} className="p-3">
          <div className="flex flex-col gap-4">
            <HackathonInProgress projectId={projectId} />

            <GoodFirstIssues projectId={projectId} size="small" />

            <JoinSocialNetworks projectId={projectId} />

            <Card className="flex flex-col gap-3 p-3">
              <TypographyH4>Test the application</TypographyH4>

              <TypographyP className="text-sm">
                Why not test the application?
                <br />
                Follow our guide to report bugs or suggest improvements.
              </TypographyP>

              <Button variant={"outline"} asChild className="w-fit">
                {/* TODO @hayden */}
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
