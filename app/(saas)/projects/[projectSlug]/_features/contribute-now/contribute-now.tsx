import { HackathonInProgress } from "@/app/(saas)/projects/[projectSlug]/_components/hackathon-in-progress/hackathon-in-progress";
import { JoinSocialNetworks } from "@/app/(saas)/projects/[projectSlug]/_components/join-social-networks/join-social-networks";
import { TestApplication } from "@/app/(saas)/projects/[projectSlug]/_components/test-application/test-application";
import { GoodFirstIssues } from "@/app/(saas)/projects/[projectSlug]/overview/_features/good-first-issues/good-first-issues";

import { usePosthog } from "@/shared/tracking/posthog/use-posthog";
import { Button } from "@/shared/ui/button";
import { HoverBorderGradient } from "@/shared/ui/hover-border-gradient";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

export function ContributeNow({ projectId }: { projectId?: string }) {
  const { capture } = usePosthog();

  return (
    <Popover
      onOpenChange={open => {
        if (open) {
          capture("project_overview_open_contribute_now", { project_id: projectId });
        }
      }}
    >
      <PopoverTrigger asChild>
        <HoverBorderGradient>
          <Button asChild>
            <span>Contribute now</span>
          </Button>
        </HoverBorderGradient>
      </PopoverTrigger>

      <PopoverContent align="end" className="max-h-[80vh] w-screen max-w-[460px] overflow-auto p-0 md:max-h-[600px]">
        <div className="flex flex-col gap-4 p-3">
          <HackathonInProgress projectId={projectId} />

          <GoodFirstIssues
            projectId={projectId}
            size="small"
            hideWhenEmpty
            posthogPrefix="project_overview_contribute_now_click_good_first_issue"
          />

          <JoinSocialNetworks projectId={projectId} />

          <TestApplication projectId={projectId} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
