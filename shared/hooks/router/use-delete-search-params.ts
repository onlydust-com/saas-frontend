import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useDeleteSearchParams = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  return {
    deleteSearchParams: useCallback(
      (key: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete(key);
        router.push(`${pathname}?${params.toString()}`);
      },
      [pathname, router, searchParams]
    ),
    searchParams,
  };
};
