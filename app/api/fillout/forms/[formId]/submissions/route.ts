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

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FILLOUT_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log("body 2", JSON.stringify(body));
    console.log("response", response);

    // get the error
    const error = await response.json();
    console.log("error", error, error?.message);

    const data = await response.json();

    return Response.json({ data: data.responses as Submission[] });
  } catch (error) {
    console.error(error);

    return new Response("Failed to fetch submissions.", {
      status: 500,
    });
  }
}

// const test = {
//   submissions: [
//     {
//       questions: [
//         { id: "vqFJ", value: 2 },
//         { id: "eJU7", value: 1 },
//         { id: "bFir", value: false },
//       ],
//       urlParameters: [
//         { id: "projectId", name: "projectId", value: "123" },
//         { id: "projectSlug", name: "projectSlug", value: "project-slug" },
//         { id: "contributionId", name: "contributionId", value: "456" },
//         { id: "githubUserId", name: "githubUserId", value: "96f512d9-ab4b-4cf2-adc2-ec2591d4e7f6" },
//         { id: "githubLogin", name: "githubLogin", value: "alexbeno" },
//       ],
//     },
//   ],
// };
