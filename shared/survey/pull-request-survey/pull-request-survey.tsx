import { Clock } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { Label } from "@/shared/ui/label";
import { TypographyP } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

interface PullRequestSurveyProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    feedback: FeedbackData,
    contribution: {
      contributionId: string;
      projectId: string;
      projectSlug: string;
    }
  ) => void;
  issueNumber?: string;
  issueTitle?: string;
  projectId?: string;
  projectSlug?: string;
  contributionId?: string;
}

interface FeedbackData {
  projectExperience: number;
  maintainerCollaboration: number;
  wouldRecommend: boolean;
}

const Emoji = dynamic(() => import("react-emoji-render"));

const emojiRatings = ["😫", "😕", "😐", "🙂", "😄"];

export function PullRequestSurvey({
  isOpen,
  onClose,
  onSubmit,
  issueNumber,
  issueTitle,
  projectId,
  projectSlug,
  contributionId,
}: PullRequestSurveyProps) {
  const [feedback, setFeedback] = useState<FeedbackData>({
    projectExperience: -1,
    maintainerCollaboration: -1,
    wouldRecommend: false,
  });

  const handleSubmit = () => {
    const isFormComplete =
      feedback.projectExperience !== -1 &&
      feedback.maintainerCollaboration !== -1 &&
      feedback.wouldRecommend !== undefined;

    if (!isFormComplete || !contributionId || !projectId || !projectSlug) return;

    onSubmit(
      {
        projectExperience: feedback.projectExperience,
        maintainerCollaboration: feedback.maintainerCollaboration,
        wouldRecommend: feedback.wouldRecommend,
      },
      {
        contributionId,
        projectId,
        projectSlug,
      }
    );
    onClose();
  };

  const isComplete =
    feedback.projectExperience !== -1 &&
    feedback.maintainerCollaboration !== -1 &&
    feedback.wouldRecommend !== undefined;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center text-2xl font-semibold">Quick Contribution Feedback</DialogTitle>

          {(issueNumber || issueTitle) && (
            <Card className="flex items-center gap-2 p-3">
              <ContributionBadge type="PULL_REQUEST" number={issueNumber} githubStatus="MERGED" />
              <TypographyP className="line-clamp-1">
                <Emoji>
                  <>{issueTitle}</>
                </Emoji>
              </TypographyP>
            </Card>
          )}

          <div className="flex items-center justify-start gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Takes less than 30 seconds</span>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Project Experience Rating */}
          <div className="space-y-3">
            <Label className="text-base">How was your experience with this project?</Label>
            <div className="flex justify-between gap-3 px-2">
              {emojiRatings.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => setFeedback(prev => ({ ...prev, projectExperience: index }))}
                  className={cn(
                    "flex-1 rounded-lg border-1 border-border bg-card px-3 py-1 text-3xl transition-all",
                    feedback.projectExperience === index ? "bg-accent hover:bg-card" : "bg-card hover:bg-accent"
                  )}
                  aria-label={`Rate ${index + 1} out of 5`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Maintainer Collaboration Rating */}
          <div className="space-y-3">
            <Label className="text-base">How was the collaboration with the maintainer?</Label>
            <div className="flex justify-between gap-3 px-2">
              {emojiRatings.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => setFeedback(prev => ({ ...prev, maintainerCollaboration: index }))}
                  className={cn(
                    "flex-1 rounded-lg border-1 border-border bg-card px-3 py-1 text-3xl transition-all",
                    feedback.maintainerCollaboration === index ? "bg-accent hover:bg-card" : "bg-card hover:bg-accent"
                  )}
                  aria-label={`Rate ${index + 1} out of 5`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Project Recommendation */}
          <div className="space-y-3">
            <Label className="text-base">Would you recommend this project?</Label>
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setFeedback(prev => ({ ...prev, wouldRecommend: true }))}
                className={`flex-1 ${feedback.wouldRecommend === true ? "bg-primary text-primary-foreground" : ""}`}
              >
                Yes
              </Button>
              <Button
                variant="outline"
                onClick={() => setFeedback(prev => ({ ...prev, wouldRecommend: false }))}
                className={`flex-1 ${feedback.wouldRecommend === false ? "bg-primary text-primary-foreground" : ""}`}
              >
                No
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>
            Maybe Later
          </Button>
          <Button onClick={handleSubmit} disabled={!isComplete}>
            Submit Feedback
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
