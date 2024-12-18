"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import { withClientOnly } from "@/shared/components/client-only/client-only";

import { MatchingQuestions } from "./_features/matching-questions/matching-questions";

function ProjectRecommendationPage() {
  return <MatchingQuestions />;
}

export default withClientOnly(withAuthenticationRequired(ProjectRecommendationPage));
