"use client";

import { useCallback } from "react";

import { CategoryCard } from "@/app/(saas)/discover/_components/category-card/category-card";
import { Section } from "@/app/(saas)/discover/_components/section/section";

import { ProjectCategoryReactQueryAdapter } from "@/core/application/react-query-adapter/project-category";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/ui/carousel";
import { Skeleton } from "@/shared/ui/skeleton";

export function Categories() {
  const { data, isLoading, isError } = ProjectCategoryReactQueryAdapter.client.useGetProjectCategories({});

  if (isError) return null;

  const renderCategories = useCallback(() => {
    if (isLoading) {
      return Array.from({ length: 3 }).map((_, index) => (
        <CarouselItem key={index} className="pl-6 md:basis-1/2 lg:basis-1/3">
          <Skeleton className="h-[120px] w-full rounded-xl" />
        </CarouselItem>
      ));
    }

    return data?.categories.map(category => (
      <CarouselItem key={category.id} className="pl-6 md:basis-1/2 lg:basis-1/3">
        <CategoryCard
          name={category.name}
          description={category.description}
          slug={category.slug}
          projectCount={category.projectCount}
        />
      </CarouselItem>
    ));
  }, [data, isLoading]);

  return (
    <Section title="Categories">
      <Carousel>
        <CarouselContent className="-ml-6">{renderCategories()}</CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </Section>
  );
}
