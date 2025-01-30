import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { ProjectCategoryReactQueryAdapter } from "@/core/application/react-query-adapter/project-category";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { Skeleton } from "@/shared/ui/skeleton";

import { CategoryCard } from "../../_components/category-card/category-card";

export function CategoriesSection() {
  const { data, isLoading, isError } = ProjectCategoryReactQueryAdapter.client.useGetProjectCategories({});
  const router = useRouter();

  const renderCategories = useMemo(() => {
    if (isLoading)
      return (
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      );
    if (isError) return <ErrorState />;
    if (!data?.categories.length) return null;
    return (
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.categories.map(category => (
          <CategoryCard
            key={category.slug}
            category={category}
            onClick={() => router.push(NEXT_ROUTER.categories.details.root(category.slug))}
          />
        ))}
      </div>
    );
  }, [data, isLoading, isError]);

  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">Categories</h2>
      {renderCategories}
    </section>
  );
}
