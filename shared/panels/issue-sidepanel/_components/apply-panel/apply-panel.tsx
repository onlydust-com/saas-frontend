import { ArrowRight, CircleDotDashed, CircleEllipsis, CircleHelp, GitMerge } from "lucide-react";
import { PropsWithChildren, useState } from "react";

import { ContributionGithubStatusUnion } from "@/core/domain/contribution/models/contribution.types";

import { Header } from "@/shared/panels/issue-sidepanel/_components/header/header";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui/sheet";
import { TypographyH3, TypographyMuted, TypographyP } from "@/shared/ui/typography";

export function ApplyPanel({
  children,
  issueTitle,
  issueNumber,
  issueStatus,
  onApply,
  onBookmark,
}: PropsWithChildren<{
  issueTitle: string;
  issueNumber: number;
  issueStatus: ContributionGithubStatusUnion;
  onApply: () => void;
  onBookmark: () => void;
}>) {
  const [open, setOpen] = useState(false);

  function handleApply() {
    onApply();
    setOpen(false);
  }

  function handleBookmark() {
    // TODO bookmark issue?
    onBookmark();
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="isolate flex h-full flex-col" overlayProps={{ className: "bg-transparent" }}>
        <Header
          issueNumber={issueNumber}
          issueStatus={issueStatus}
          issueTitle={issueTitle}
          onBack={() => setOpen(false)}
        />

        <div className="flex flex-1 flex-col gap-4 overflow-auto">
          <Card className="flex flex-col gap-3 p-3">
            <div className="flex items-center gap-1">
              <CircleDotDashed className="size-8 text-green-500" />
              <ArrowRight className="size-4 text-muted-foreground" />
              <CircleEllipsis className="size-8 text-pink-500" />
              <ArrowRight className="size-4 text-muted-foreground" />
              <GitMerge className="size-8 text-purple-500" />
            </div>

            <TypographyH3>Apply and Wait for Assignment</TypographyH3>

            <TypographyMuted>
              Perfect for contributors who love structure and value support from the maintainer.
            </TypographyMuted>

            <TypographyP>
              ✅ Clear direction from the maintainer
              <br />
              ✅ Structured support throughout
              <br />✅ Ensure you're on the right track before diving in
            </TypographyP>

            <TypographyP>❌ You need to wait for assignment before starting</TypographyP>

            <Button className="w-fit" onClick={handleApply}>
              <ArrowRight /> Apply and Wait for Assignment
            </Button>
          </Card>

          <Card className="flex flex-col gap-3 p-3">
            <div className="flex items-center gap-1">
              <CircleDotDashed className="size-8 text-green-500" />
              <ArrowRight className="size-4 text-muted-foreground" />
              <CircleHelp className="size-8 text-pink-500" />
            </div>

            <TypographyH3>Take Initiative, Test Your Skill</TypographyH3>

            <TypographyMuted>
              Ideal for contributors who thrive on independence and love to challenge themselves.
            </TypographyMuted>

            <TypographyP>
              ✅ Work independently, no need to wait
              <br />
              ✅ Great for self-starters and problem-solvers
              <br />✅ Test your skills and prove your expertise
            </TypographyP>

            <TypographyP>
              ⚠️ No guarantee that your PR will be merged
              <br />
              ⚠️ Risk of overlapping with others on the same issue
            </TypographyP>

            <Button className="w-fit" onClick={handleBookmark}>
              <ArrowRight /> Get to work
            </Button>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}
