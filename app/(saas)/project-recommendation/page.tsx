"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { withAuthenticated } from "@/shared/providers/auth-provider";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";

import { MatchingQuestions } from "./_features/matching-questions/matching-questions";

function ProjectRecommendationPage() {
  return (
    <>
      <PosthogCaptureOnMount eventName={"project_recommendation_form_viewed"} />
      <MatchingQuestions />
    </>
  );
}

export default withClientOnly(withAuthenticated(ProjectRecommendationPage));
