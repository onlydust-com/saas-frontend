"use client";

import { useQuery } from "@tanstack/react-query";

import { Submission } from "@/app/api/fillout/submissions/[formId]/route";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH3, TypographyMuted, TypographySmall } from "@/shared/ui/typography";

import { FilloutResponseProps } from "./fillout-response.types";

const fetchSubmissionDetails = async (submissionId: string): Promise<Submission> => {
  const response = await fetch(NEXT_ROUTER.api.fillout.submissions.details.root("7nGf4YdHqzus", submissionId));
  const data = await response.json();
  return data.data;
};

function Question({ question }: { question: { name: string; value: string | null; id: string } }) {
  return (
    <div>
      <TypographySmall>{question.name}</TypographySmall>
      <TypographyMuted>{question.value ?? "No answer"}</TypographyMuted>
    </div>
  );
}

const QUESTION_TO_INCLUDE = ["qDyH", "q9rQ", "uDUq", "n1jC"];

export function FilloutResponse({ applicationId }: FilloutResponseProps) {
  const { data, error, isFetching } = useQuery({
    queryKey: ["submissionDetails", applicationId],
    queryFn: () => fetchSubmissionDetails(applicationId),
    staleTime: 5000,
  });

  const questions = data?.questions.filter(question => QUESTION_TO_INCLUDE.includes(question.id));

  if (isFetching) return <Skeleton className="h-[200px] w-full" />;

  if (error || !questions) return null;

  return (
    <Card>
      <CardHeader>
        <TypographyH3>Availability & Commitment</TypographyH3>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {questions?.map(question => <Question key={question.id} question={question} />)}
      </CardContent>
    </Card>
  );
}
