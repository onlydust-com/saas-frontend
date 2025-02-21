import { Submission } from "../route";

export async function GET(_: Request, context: { params: { formId: string; submissionId: string } }) {
  const { formId, submissionId } = context.params;

  if (!formId) {
    return new Response("formId is required.", {
      status: 400,
    });
  }

  if (!submissionId) {
    return new Response("submissionId is required.", {
      status: 400,
    });
  }

  try {
    const response = await fetch(`https://api.fillout.com/v1/api/forms/${formId}/submissions/${submissionId}`, {
      headers: {
        Authorization: `Bearer ${process.env.FILLOUT_API_KEY}`,
      },
    });

    const data = await response.json();

    return Response.json({ data: data.submission as Submission });
  } catch (error) {
    console.error(error);

    return new Response("Failed to fetch submission.", {
      status: 500,
    });
  }
}
