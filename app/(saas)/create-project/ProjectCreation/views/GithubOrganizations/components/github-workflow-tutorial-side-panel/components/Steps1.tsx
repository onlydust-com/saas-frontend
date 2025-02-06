import { OAuthGithubConfigLink } from "@/app/(saas)/create-project/ProjectCreation/utils/githubSetupLink";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { TypographyP } from "@/shared/ui/typography";
import { Github } from "lucide-react";
import Link from "next/link";

const TutorialSidePanelSteps1 = () => (
    <Card className="flex w-full flex-col items-start justify-start gap-6 p-5">
      <TypographyP className="uppercase">
        1. Open your configuration page on github
      </TypographyP>

      <Link href={OAuthGithubConfigLink} target="_blank" rel="noopener noreferrer" className="w-full">
        <Button variant="secondary" size="sm" className="w-full">
          <Github />
          Open configuration page
        </Button>
      </Link>
    </Card>
  );

export default TutorialSidePanelSteps1;