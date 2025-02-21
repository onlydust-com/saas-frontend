"use client";

import { Submission } from "@/app/api/fillout/forms/[formId]/submissions/route";

import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { TypographyH3, TypographyMuted, TypographySmall } from "@/shared/ui/typography";

function Question({ question }: { question: { name: string; value: string | null; id: string } }) {
  return (
    <div>
      <TypographySmall>{question.name}</TypographySmall>
      <TypographyMuted>{question.value ?? "No answer"}</TypographyMuted>
    </div>
  );
}

const QUESTION_TO_INCLUDE = ["qDyH", "q9rQ", "uDUq", "n1jC"];

export function FilloutResponse({ submission }: { submission?: Submission }) {
  const questions = submission?.questions.filter(question => QUESTION_TO_INCLUDE.includes(question.id));

  if (!questions) return null;

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
