"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { withAuthenticated } from "@/shared/providers/auth-provider";

import { MatchingQuestions } from "./_features/matching-questions/matching-questions";

function ProjectRecommendationPage() {
  return <MatchingQuestions />;
}

export default withClientOnly(withAuthenticated(ProjectRecommendationPage));
