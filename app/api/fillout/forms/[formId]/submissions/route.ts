import { type NextRequest } from "next/server";

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

export async function GET(request: NextRequest, context: { params: { formId: string } }) {
  const { formId } = context.params;

  const url = new URL(`https://api.fillout.com/v1/api/forms/${formId}/submissions`);

  const searchParams = request.nextUrl.searchParams;

  searchParams.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  url.searchParams.set("limit", "150");

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${process.env.FILLOUT_API_KEY}`,
    },
  });

  const data = await response.json();

  return Response.json({ data: data.responses as Submission[] });
}
