import { revalidateTag as NextRevalidateTag } from "next/cache";

import { bootstrap } from "@/core/bootstrap";

import { BaseQueriesOptions } from "./type.actions";

const defaultRevalidateValue = 60;

// TODO Mehdi Refactor using Core Http-client
export async function BaseQueries<RESPONSE extends object>(
  url: string,
  options: BaseQueriesOptions | undefined
): Promise<RESPONSE> {
  const { provideTag, revalidate, revalidateTag, onSuccess, onError, ...baseOptions } = options || {};
  const urlKernelPort = bootstrap.getUrlKernelPort();
  const queriesParams = urlKernelPort.convertParamsToURLSearchParams(options?.params);
  const data = await fetch(`${url}${queriesParams ? `?${queriesParams}` : ""}`, {
    cache: "no-store",
    ...(baseOptions || {}),
    next: {
      ...(revalidate ? { revalidate: revalidate || defaultRevalidateValue } : {}),
      tags: provideTag,
    },
    headers: {
      ...(options?.headers || {}),
      authorization: `Bearer ${options?.accessToken || ""}`,
    },
  });

  if (data.ok) {
    if (revalidateTag) {
      revalidateTag.map(tag => NextRevalidateTag(tag));
    }
    if (onSuccess) {
      onSuccess();
    }
    return data.json();
  }

  if (onError) {
    onError();
  }

  throw new Error("Failed to fetch data.");
}
