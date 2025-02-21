import { Submission } from "../../route";

export async function GET(_: Request, context: { params: { formId: string; detailId: string } }) {
  const { formId, detailId } = context.params;

  const response = await fetch(`https://api.fillout.com/v1/api/forms/${formId}/submissions/${detailId}`, {
    headers: {
      Authorization: `Bearer ${process.env.FILLOUT_API_KEY}`,
    },
  });

  const data = await response.json();

  return Response.json({ data: data.submission as Submission });
}
