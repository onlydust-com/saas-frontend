import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { TypographyH3, TypographyMuted, TypographySmall } from "@/shared/ui/typography";

import { FilloutResponseProps } from "./fillout-response.types";

const fetchSubmissionDetails = async (
  submissionId: string
): Promise<{ submission: { questions: Array<{ name: string; value: string; id: string }> } }> => {
  const response = await fetch(
    "https://api.fillout.com/v1/api/forms/7nGf4YdHqzus/submissions/143b4c08-6640-46bb-ad1d-25d5b96262f9",
    {
      headers: {
        Authorization:
          "Bearer sk_prod_FXIIbsS7q0CIN2RZXTpnD5hmExVQj3goWRZy3IVdSZyjnTRP7rVaOsUeUSDMvnw8SpRGnShsSVZWPLx9NLbRZv3mO8fgZ0UeSj9_18072",
      },
    }
  );
  return await response.json();
};

function Question({ question }: { question: { name: string; value: string; id: string } }) {
  return (
    <div>
      <TypographySmall>{question.name}</TypographySmall>
      <TypographyMuted>{question.value ?? "No answer"}</TypographyMuted>
    </div>
  );
}

const QUESTION_TO_INCLUDE = ["qDyH", "q9rQ", "uDUq", "n1jC"];

export function FilloutResponse({ applicationId }: FilloutResponseProps) {
  const { status, data, error, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["submissionDetails", applicationId],
    queryFn: () => fetchSubmissionDetails(applicationId),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  const questions = data?.submission?.questions.filter(question => QUESTION_TO_INCLUDE.includes(question.id));

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
