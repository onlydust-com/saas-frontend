import { revalidateTag as NextRevalidateTag } from "next/cache";

import { BaseQueriesDefaultParams, BaseQueriesOptions } from "./type.actions";

const defaultRevalidateValue = 60;

function convertParamsToURLSearchParams(params?: BaseQueriesDefaultParams) {
  if (!params) return undefined;
  return Object.entries(params).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      if (typeof value === "string" || typeof value === "number") {
        acc.append(key, value.toString());
      }
      if (typeof value === "boolean") {
        if (value) {
          acc.append(key, "true");
        } else {
          acc.append(key, "false");
        }
      }
    }
    return acc;
  }, new URLSearchParams());
}

export async function BaseQueries<RESPONSE extends object>(
  url: string,
  options: BaseQueriesOptions | undefined
): Promise<RESPONSE> {
  const { provideTag, revalidate, revalidateTag, onSuccess, onError, ...baseOptions } = options || {};
  const queriesParams = convertParamsToURLSearchParams(options?.params);
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
