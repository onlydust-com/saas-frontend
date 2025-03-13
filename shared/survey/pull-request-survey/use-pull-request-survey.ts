import { useState } from "react";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";

interface FeedbackData {
  projectExperience: number;
  maintainerCollaboration: number;
  wouldRecommend: boolean;
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

export function usePullRequestSurvey() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthUser();

  const openSurvey = () => setIsOpen(true);
  const closeSurvey = () => setIsOpen(false);

  const handleSubmit = async (
    feedback: FeedbackData,
    contribution: {
      contributionId: string;
      projectId: string;
      projectSlug: string;
    }
  ) => {
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
    closeSurvey();
  };

  return {
    isOpen,
    openSurvey,
    closeSurvey,
    handleSubmit,
  };
}
