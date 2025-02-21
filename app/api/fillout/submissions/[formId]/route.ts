interface Question {
  id: string;
  name: string;
  value: string | null;
}

interface UrlParameter {
  id: string;
  name: string;
  value: string | null;
}

export interface Submission {
  submissionId: string;
  questions: Question[];
  urlParameters: UrlParameter[];
}

export async function GET(_: Request, context: { params: { formId: string } }) {
  const { formId } = context.params;

  const response = await fetch(`https://api.fillout.com/v1/api/forms/${formId}/submissions?limit=150`, {
    headers: {
      Authorization: `Bearer ${process.env.FILLOUT_API_KEY}`,
    },
  });

  const data = await response.json();

  return Response.json({ data: data.responses as Submission[] });
}
