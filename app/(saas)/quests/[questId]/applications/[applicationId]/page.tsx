"use client";

import { FilloutResponse } from "./_features/fillout-response/fillout-response";

export default function QuestApplicationPage({ params }: { params: { applicationId: string } }) {
  // 1, contributor detail + metrics
  // 2, contributor scoring from backend
  // 3, devcare team contributor review
  // 4, application detail from fillout (reponse aux question de la quest)

  return (
    <div>
      <FilloutResponse applicationId={params.applicationId} />
    </div>
  );
}
