"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import { FolderOpen } from "lucide-react";
import { useMemo } from "react";

import NotFound from "@/app/not-found";

import { ProjectCategoryReactQueryAdapter } from "@/core/application/react-query-adapter/project-category";

import { RemixIconsName } from "@/design-system/atoms/icon/adapters/remix-icon/remix-icon-names.types";
import { RemixIcon } from "@/design-system/atoms/icon/variants/icon-remix";
import { Skeleton } from "@/design-system/atoms/skeleton";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ListBanner } from "@/shared/features/list-banner/list-banner";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";

import ProjectList from "./_features/project-list/project-list";

function CatergoryPage({ params }: { params: { categorySlug: string } }) {
  const { data, isLoading, isError } = ProjectCategoryReactQueryAdapter.client.useGetProjectCategories({});
  const category = useMemo(
    () => data?.categories.find(category => category.slug === params.categorySlug),
    [data, params.categorySlug]
  );

  if (isLoading) {
    return (
      <PageWrapper containerSize="small">
        <div className="flex w-full flex-col">
          <div className="flex h-full flex-col gap-4xl py-4xl">
            <Skeleton className="h-[194px]" />
            <Skeleton className="h-8" />
            <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              <Skeleton className="h-[200px]" />
              <Skeleton className="h-[200px]" />
              <Skeleton className="h-[200px]" />
              <Skeleton className="h-[200px]" />
              <Skeleton className="h-[200px]" />
              <Skeleton className="h-[200px]" />
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (!category || isError) {
    return <NotFound />;
  }

  return (
    <PageWrapper containerSize="small" shouldScroll>
      <PosthogCaptureOnMount
        eventName={"categories_viewed"}
        params={{
          category_id: category.id,
        }}
        paramsReady={Boolean(category?.id)}
      />

      <div className="pb-7xl">
        <NavigationBreadcrumb
          breadcrumb={[
            {
              id: "root",
              label: "Categories",
            },
            {
              id: category.slug,
              label: category.name,
              iconProps: {
                component: FolderOpen,
              },
            },
          ]}
        />

        <div className="mx-auto flex flex-col gap-4xl py-4xl">
          <ListBanner
            title={{ children: category.name }}
            subtitle={{
              children: category.description,
            }}
            logo={
              <RemixIcon
                name={category.iconSlug as RemixIconsName}
                size="lg"
                classNames={{
                  base: "size-16",
                }}
              />
            }
          />
        </div>

        <ProjectList params={{ categorySlug: params.categorySlug }} />
      </div>
    </PageWrapper>
  );
}

export default withClientOnly(withAuthenticationRequired(CatergoryPage));
