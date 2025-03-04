import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { PageInner } from "@/shared/features/page/page-inner/page-inner";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { TypographyP } from "@/shared/ui/typography";

import { IssueCard } from "./_components/issue-card/issue-card";
import { PageCarousel } from "./_components/page-carousel/page-carousel";
import { PageHeader } from "./_features/page-header/page-header";

export default function DiscoverPageV2() {
  return (
    <PageContainer size="full">
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Discover",
          },
        ]}
      />

      <div className="flex flex-col gap-16 pt-4">
        <PageHeader />
        <PageInner className="relative z-[1] flex w-full flex-col gap-14">
          <PageCarousel
            title="Recommended for you"
            count={10}
            description="Find issues to contribute to"
            resourceType="issue"
          >
            {["Issue 1", "Issue 2", "Issue 3", "Issue 4"].map(i => (
              <IssueCard
                key={i}
                title={i}
                languages={[
                  {
                    logoUrl: "https://od-languages-develop.s3.eu-west-1.amazonaws.com/background/typescript.png",
                  },
                  {
                    logoUrl: "https://od-languages-develop.s3.eu-west-1.amazonaws.com/background/javascript.png",
                  },
                ]}
                project={{
                  name: "OnlyRust",
                  repo: "repo 1",
                  logoUrl:
                    "https://develop-onlydust-app-images.s3.eu-west-1.amazonaws.com/d1a4698447769f2de7e4467144024b97.png",
                }}
                issue={{
                  number: 555,
                  githubStatus: "OPEN",
                }}
                createdAt="2021-01-01"
                labels={["bug", "help wanted", "good first issue"]}
              />
            ))}
          </PageCarousel>
          <PageCarousel
            title="React projects"
            count={10}
            description="Find projects to contribute to"
            resourceType="project"
          >
            <Card>
              <CardHeader>
                <CardTitle>Project 1</CardTitle>
              </CardHeader>
              <CardContent>
                <TypographyP>Project 1</TypographyP>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Project 2</CardTitle>
              </CardHeader>
              <CardContent>
                <TypographyP>Project 2</TypographyP>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Project 3</CardTitle>
              </CardHeader>
              <CardContent>
                <TypographyP>Project 3</TypographyP>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Project 4</CardTitle>
              </CardHeader>
              <CardContent>
                <TypographyP>Project 4</TypographyP>
              </CardContent>
            </Card>
          </PageCarousel>
        </PageInner>
      </div>
    </PageContainer>
  );
}
