import { useState } from "react";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { usePosthog } from "@/shared/tracking/posthog/use-posthog";

interface FeedbackData {
  projectExperience: number;
  maintainerCollaboration: number;
  wouldRecommend: boolean;
  whatCouldBeBetter?: string;
  whatEnjoyed?: string;
}

const filloutId = process.env.NEXT_PUBLIC_OD_PULL_REQUEST_SURVEY_FORM_ID ?? "";

interface CreateSubmissionsBody {
  submissions: Array<{
    questions: [
      {
        id: "vqFJ"; // experience
        value: number;
      },
      {
        id: "eJU7"; // maintainer collaboration
        value: number;
      },
      {
        id: "bFir"; // would recommend
        value: boolean;
      },
      {
        id: "sSoX"; // what could be better
        value: string | null;
      },
      {
        id: "3v8P"; // what enjoyed
        value: string | null;
      },
    ];
    urlParameters: [
      {
        id: "projectId";
        name: "projectId";
        value: string;
      },
      {
        id: "projectSlug";
        name: "projectSlug";
        value: string;
      },
      {
        id: "contributionId";
        name: "contributionId";
        value: string;
      },
      {
        id: "githubUserId";
        name: "githubUserId";
        value: string;
      },
      {
        id: "githubLogin";
        name: "githubLogin";
        value: string;
      },
    ];
    submissionTime: string;
  }>;
}

const createSubmissions = async ({ body }: { body: CreateSubmissionsBody }) => {
  const url = new URL(NEXT_ROUTER.api.fillout.forms.submissions.root(filloutId), window.location.origin);

  try {
    await fetch(url.toString(), {
      method: "POST",
      body: JSON.stringify(body),
    });
    return true;
  } catch (error) {
    console.error("error", error);
    return false;
  }
};

export interface ContributionData {
  contributionId: string;
  projectId: string;
  projectSlug: string;
  issueNumber: number;
  issueTitle: string;
}

export function usePullRequestSurvey() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthUser();
  const { capture } = usePosthog();
  const [contribution, setContribution] = useState<ContributionData | null>(null);

  const openSurvey = (contribution: ContributionData) => {
    setContribution(contribution);
    setIsOpen(true);
  };
  const closeSurvey = () => {
    setIsOpen(false);
    setContribution(null);
  };

  const handleSubmit = async (feedback: FeedbackData) => {
    if (!user || !contribution) return;

    await createSubmissions({
      body: {
        submissions: [
          {
            submissionTime: new Date().toISOString(),
            questions: [
              { id: "vqFJ", value: feedback.projectExperience },
              { id: "eJU7", value: feedback.maintainerCollaboration },
              { id: "bFir", value: feedback.wouldRecommend },
              { id: "sSoX", value: feedback.whatCouldBeBetter ?? "" },
              { id: "3v8P", value: feedback.whatEnjoyed ?? "" },
            ],
            urlParameters: [
              { id: "projectId", name: "projectId", value: contribution.projectId },
              { id: "projectSlug", name: "projectSlug", value: contribution.projectSlug },
              { id: "contributionId", name: "contributionId", value: contribution.contributionId },
              { id: "githubUserId", name: "githubUserId", value: user.id },
              { id: "githubLogin", name: "githubLogin", value: user.login },
            ],
          },
        ],
      },
    });
    capture("pull_request_survey_submitted", {
      project_experience: feedback.projectExperience,
      maintainer_collaboration: feedback.maintainerCollaboration,
      would_recommend: feedback.wouldRecommend,
      what_could_be_better: feedback.whatCouldBeBetter,
      what_enjoyed: feedback.whatEnjoyed,
    });

    closeSurvey();
  };

  return {
    isOpen,
    openSurvey,
    closeSurvey,
    handleSubmit,
    contribution,
  };
}
