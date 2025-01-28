"use client";

import slide1 from "@/public/images/signup/slide-1.png";
import slide2 from "@/public/images/signup/slide-2.png";
import slide3 from "@/public/images/signup/slide-3.png";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import { Button } from "@/shared/ui/button";
import { Carousel, CarouselContent, CarouselItem, useCarousel } from "@/shared/ui/carousel";
import { TypographyH3, TypographyMuted } from "@/shared/ui/typography";

function CarouselPrevious() {
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      className={"h-4 w-4 rounded-xs"}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
    >
      <ChevronLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext() {
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      className={"h-4 w-4 rounded-xs"}
      disabled={!canScrollNext}
      onClick={scrollNext}
    >
      <ChevronRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

const slides = [
  {
    title: "Explore & Discover Projects 🔍",
    description:
      "Browse a curated selection of exciting projects tailored to your interests. There’s something for everyone!",
    background: slide1,
  },
  {
    title: "Participate 👥",
    description: "Find a project you’re passionate about, submit your application, and start collaborating today!",
    background: slide2,
  },
  {
    title: "Grow, Earn & Get Recognized 🌟",
    description: "Sharpen your skills, earn rewards, and gain recognition within the community.",
    background: slide3,
  },
] as const;

export function SignupCarousel() {
  return (
    <Carousel opts={{ loop: true }} plugins={[Autoplay(), Fade()]}>
      <CarouselContent className="-ml-0 h-full">
        {slides.map((slide, index) => (
          <CarouselItem key={index} className="relative flex aspect-square p-8">
            <Image src={slide.background} alt={slide.title} className="absolute inset-0 object-cover" />

            <div className="relative z-10 flex flex-col gap-2 self-end">
              <TypographyH3>{slide.title}</TypographyH3>
              <TypographyMuted>{slide.description}</TypographyMuted>

              <div className="flex items-center gap-1 text-xs">
                <CarouselPrevious />
                {index + 1}/{slides.length}
                <CarouselNext />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
