import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { TypographyH3, TypographyMuted } from "@/shared/ui/typography";

export default function ProjectRecommendationLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageContainer size="small" className="flex flex-col gap-7xl px-4 py-4xl">
      <header className="flex flex-col items-center gap-md text-center">
        <TypographyH3>Find Your Perfect Project</TypographyH3>
        <TypographyMuted>
          Answer a few questions to discover projects that match your interests and skills
        </TypographyMuted>
      </header>

      {children}
    </PageContainer>
  );
}
