"use client";

import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { useCallback } from "react";

import { CategoryCard, CategoryCardSkeleton } from "@/app/(saas)/discover/_components/category-card/category-card";
import { Section } from "@/app/(saas)/discover/_components/section/section";

import { ProjectCategoryReactQueryAdapter } from "@/core/application/react-query-adapter/project-category";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/ui/carousel";

export function Categories() {
  const { data, isLoading, isError } = ProjectCategoryReactQueryAdapter.client.useGetProjectCategories({});

  const renderCategories = useCallback(() => {
    if (isLoading) {
      return Array.from({ length: 3 }).map((_, index) => (
        <CarouselItem key={index} className="pl-6 md:basis-1/2 lg:basis-1/3">
          <CategoryCardSkeleton />
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
          iconSlug={category.iconSlug}
        />
      </CarouselItem>
    ));
  }, [data, isLoading]);

  if (isError) return null;

  return (
    <Section title="Categories">
      <Carousel plugins={[WheelGesturesPlugin()]}>
        <CarouselContent className="-ml-6">{renderCategories()}</CarouselContent>
        <CarouselPrevious className="hidden xl:flex" />
        <CarouselNext className="hidden xl:flex" />
      </Carousel>
    </Section>
  );
}
