"use client";

import { CategoryCard } from "@/app/(saas)/discover/_components/category-card/category-card";
import { Section } from "@/app/(saas)/discover/_components/section/section";

import { ProjectCategoryReactQueryAdapter } from "@/core/application/react-query-adapter/project-category";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/ui/carousel";

export function Categories() {
  const { data, isLoading, isError } = ProjectCategoryReactQueryAdapter.client.useGetProjectCategories({});

  return (
    <Section title="Categories" seeAll={NEXT_ROUTER.categories.root}>
      <Carousel>
        <CarouselContent className="-ml-6">
          {data?.categories.map(category => (
            <CarouselItem key={category.id} className="pl-6 md:basis-1/2 lg:basis-1/3">
              <CategoryCard
                name={category.name}
                description={category.description}
                slug={category.slug}
                projectCount={category.projectCount}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="flex gap-6"></div>
    </Section>
  );
}
