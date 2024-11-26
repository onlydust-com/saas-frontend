import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useUpdateSearchParams = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  return {
    updateSearchParams: useCallback(
      (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(key, value);
        router.push(`${pathname}?${params.toString()}`);
      },
      [pathname, router, searchParams]
    ),
    searchParams,
  };
};

export const useUpdateMultipleSearchParams = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  return {
    updateMultipleSearchParams: useCallback(
      (value: Record<string, string>) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(value).forEach(([key, value]) => {
          params.set(key, value);
        });
        router.push(`${pathname}?${params.toString()}`);
      },
      [pathname, router, searchParams]
    ),
    searchParams,
  };
};
