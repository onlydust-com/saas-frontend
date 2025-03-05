import { Target } from "lucide-react";
import Link from "next/link";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { ListBanner } from "@/shared/features/list-banner/list-banner";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { PageInner } from "@/shared/features/page/page-inner/page-inner";
import { Button } from "@/shared/ui/button";

import { IssueCard } from "./_components/issue-card/issue-card";
import { NewProjectCard } from "./_components/new-project-card/new-project-card";
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

          <ListBanner
            title={{
              children: (
                <>
                  Embark on an <span className="text-indigo-500">ODQuest</span> Adventure
                </>
              ),
            }}
            subtitle={{
              children: "Unlock epic rewards by conquering challenges and join a thriving community of adventurers on an exciting Quest!",
            }}
            logo={<Target className="size-16 text-indigo-500" />}
            classNames={{
              base: "bg-gradient-to-br from-indigo-900 to-transparent to-80%",
            }}
          >
            <Button size="sm" asChild>
              <Link href={NEXT_ROUTER.quests.root}>Join now</Link>
            </Button>
          </ListBanner>

          <PageCarousel
            title="React projects"
            count={10}
            description="Find projects to contribute to"
            resourceType="project"
          >
            <NewProjectCard
              className="min-h-full"
              name="OnlyRust"
              logoUrl="https://develop-onlydust-app-images.s3.eu-west-1.amazonaws.com/d1a4698447769f2de7e4467144024b97.png"
              description="Strapi is the next-gen headless CMS, open-source, javascript, enabling content-rich experiences to be created, managed open-source, javascript, enabling open-source, javascript, enabling"
              categories={["React", "JavaScript"]}
              languages={[
                {
                  logoUrl: "https://od-languages-develop.s3.eu-west-1.amazonaws.com/background/typescript.png",
                },
                {
                  logoUrl: "https://od-languages-develop.s3.eu-west-1.amazonaws.com/background/javascript.png",
                },
              ]}
              stars={100}
              forks={100}
              contributors={100}
            />
            <NewProjectCard
              className="min-h-full"
              name="OnlyRust"
              logoUrl="https://develop-onlydust-app-images.s3.eu-west-1.amazonaws.com/d1a4698447769f2de7e4467144024b97.png"
              description="Strapi is the next-gen"
              categories={["React", "JavaScript"]}
              languages={[
                {
                  logoUrl: "https://od-languages-develop.s3.eu-west-1.amazonaws.com/background/typescript.png",
                },
                {
                  logoUrl: "https://od-languages-develop.s3.eu-west-1.amazonaws.com/background/javascript.png",
                },
              ]}
              stars={100}
              forks={100}
              contributors={100}
            />

            <NewProjectCard
              className="min-h-full"
              name="OnlyRust"
              logoUrl="https://develop-onlydust-app-images.s3.eu-west-1.amazonaws.com/d1a4698447769f2de7e4467144024b97.png"
              description="Strapi is the next-gen headless CMS, open-source, javascript, enabling content-rich experiences to be created, managed open-source, javascript, enabling open-source, javascript, enabling"
              categories={["React", "JavaScript"]}
              languages={[
                {
                  logoUrl: "https://od-languages-develop.s3.eu-west-1.amazonaws.com/background/typescript.png",
                },
                {
                  logoUrl: "https://od-languages-develop.s3.eu-west-1.amazonaws.com/background/javascript.png",
                },
              ]}
              stars={100}
              forks={100}
              contributors={100}
            />
          </PageCarousel>
        </PageInner>
      </div>
    </PageContainer>
  );
}
