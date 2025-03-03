import { useQuery } from "@tanstack/react-query";

import { Submission } from "@/app/api/fillout/forms/[formId]/submissions/route";

import { OdNewsModel } from "@/core/domain/fillout/models/od-news-model";

import { NEXT_ROUTER } from "@/shared/constants/router";

const filloutId = process.env.NEXT_PUBLIC_OD_NEWS_FORM_ID ?? "";

const fetchSubmissions = async ({ queryParams }: { queryParams: Record<string, string> }): Promise<OdNewsModel[]> => {
  const url = new URL(NEXT_ROUTER.api.fillout.forms.submissions.root(filloutId), window.location.origin);

  Object.entries(queryParams).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url.toString());

  const data = await response.json();

  return data?.data?.map((n: Submission) => new OdNewsModel(n)) ?? [];
};

export function useGetOdNews({ projectId, limit = "10" }: { projectId?: string; limit?: string }) {
  return useQuery({
    queryKey: ["od-news", projectId, limit],
    queryFn: () => fetchSubmissions({ queryParams: { search: projectId ?? "", limit, sort: "desc" } }),
    staleTime: 5000,
    enabled: Boolean(projectId),
  });
}
