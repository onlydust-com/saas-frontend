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
  lastUpdatedAt: string;
}

export async function GET(request: NextRequest, context: { params: { formId: string } }) {
  const { formId } = context.params;

  if (!formId) {
    return new Response("formId is required.", {
      status: 400,
    });
  }

  try {
    const url = new URL(`https://api.fillout.com/v1/api/forms/${formId}/submissions`);

    const searchParams = request.nextUrl.searchParams;

    searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${process.env.FILLOUT_API_KEY}`,
      },
    });

    const data = await response.json();

    return Response.json({ data: data.responses as Submission[] });
  } catch (error) {
    console.error(error);

    return new Response("Failed to fetch submissions.", {
      status: 500,
    });
  }
}

export async function POST(request: NextRequest, context: { params: { formId: string } }) {
  const { formId } = context.params;

  const body = await request.json();
  console.log("body", body);

  if (!formId) {
    return new Response("formId is required.", {
      status: 400,
    });
  }

  try {
    const url = new URL(`https://api.fillout.com/v1/api/forms/${formId}/submissions`);

    const searchParams = request.nextUrl.searchParams;

    searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });

    await fetch(url.toString(), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FILLOUT_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return Response.json({ data: true });
  } catch (error) {
    console.error(error);

    return new Response("Failed to fetch submissions.", {
      status: 500,
    });
  }
}
