import { Clock } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { usePosthog } from "@/shared/tracking/posthog/use-posthog";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import { TypographyP } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

import { ContributionData } from "./use-pull-request-survey";

interface PullRequestSurveyProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: FeedbackData) => void;
  contribution: ContributionData | null;
}

interface FeedbackData {
  projectExperience: number;
  maintainerCollaboration: number;
  wouldRecommend: boolean;
  whatCouldBeBetter?: string;
  whatEnjoyed?: string;
}

const Emoji = dynamic(() => import("react-emoji-render"));

const emojiRatings = ["😫", "😕", "😐", "🙂", "😄"];

export function PullRequestSurvey({ isOpen, onClose, onSubmit, contribution }: PullRequestSurveyProps) {
  const { capture } = usePosthog();
  const [step, setStep] = useState<"feedback" | "what-could-be-better" | "what-enjoyed">("feedback");
  const [feedback, setFeedback] = useState<FeedbackData>({
    projectExperience: -1,
    maintainerCollaboration: -1,
    wouldRecommend: false,
  });

  function handleClose() {
    setStep("feedback");
    setFeedback({
      projectExperience: -1,
      maintainerCollaboration: -1,
      wouldRecommend: false,
    });
    onClose();
  }

  function getIsFormComplete() {
    return (
      feedback.projectExperience !== -1 &&
      feedback.maintainerCollaboration !== -1 &&
      feedback.wouldRecommend !== undefined
    );
  }

  const handleSubmit = () => {
    const isFormComplete = getIsFormComplete();

    if (step === "feedback" && isFormComplete) {
      if (feedback.wouldRecommend === false) {
        setStep("what-could-be-better");
      } else {
        setStep("what-enjoyed");
      }
      return;
    }

    if (!isFormComplete || !contribution?.contributionId || !contribution?.projectId || !contribution?.projectSlug)
      return;

    onSubmit({
      projectExperience: feedback.projectExperience,
      maintainerCollaboration: feedback.maintainerCollaboration,
      wouldRecommend: feedback.wouldRecommend,
      whatCouldBeBetter: feedback.whatCouldBeBetter,
      whatEnjoyed: feedback.whatEnjoyed,
    });
    onClose();
  };

  const isComplete = getIsFormComplete();

  function renderSurveyContent() {
    if (step === "what-could-be-better") {
      return (
        <div className="space-y-3">
          <Label className="text-base">What could be better?</Label>
          <Textarea
            value={feedback.whatCouldBeBetter}
            onChange={e => setFeedback(prev => ({ ...prev, whatCouldBeBetter: e.target.value }))}
          />
        </div>
      );
    }

    if (step === "what-enjoyed") {
      return (
        <div className="space-y-3">
          <Label className="text-base">What did you enjoy?</Label>
          <Textarea
            value={feedback.whatEnjoyed}
            onChange={e => setFeedback(prev => ({ ...prev, whatEnjoyed: e.target.value }))}
          />
        </div>
      );
    }

    return (
      <>
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
      </>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center text-2xl font-semibold">Quick Contribution Feedback</DialogTitle>

          {(contribution?.issueNumber || contribution?.issueTitle) && (
            <Card className="flex items-center gap-2 p-3">
              <ContributionBadge type="PULL_REQUEST" number={contribution?.issueNumber} githubStatus="MERGED" />
              <TypographyP className="line-clamp-1">
                <Emoji>
                  <>{contribution?.issueTitle}</>
                </Emoji>
              </TypographyP>
            </Card>
          )}

          <div className="flex items-center justify-start gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Takes less than 30 seconds</span>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">{renderSurveyContent()}</div>

        <div className="flex justify-end gap-3">
          <Button
            variant="ghost"
            onClick={() => {
              onClose();
              capture("pull_request_survey_dismissed");
            }}
          >
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
