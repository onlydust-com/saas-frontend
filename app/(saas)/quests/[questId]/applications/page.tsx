"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { QuestListData } from "@/app/(saas)/quests/_data/quest-list.data";
import { Submission } from "@/app/api/fillout/forms/[formId]/submissions/route";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { withAuthenticated } from "@/shared/providers/auth-provider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";

import { withQuestLead } from "./_components/with-quest-lead";

const fetchSubmissions = async ({ queryParams }: { queryParams: Record<string, string> }): Promise<Submission[]> => {
  const url = new URL(NEXT_ROUTER.api.fillout.forms.submissions.root("7nGf4YdHqzus"), window.location.origin);

  Object.entries(queryParams).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url.toString());

  return (await response.json()).data;
};

const limit = "150";

function QuestApplicationsPage({ params }: { params: { questId: string } }) {
  const router = useRouter();

  const { data: page1 = [] } = useQuery({
    queryKey: ["quest-applications", params.questId, 1],
    queryFn: () => fetchSubmissions({ queryParams: { search: params.questId, limit } }),
    staleTime: 5000,
  });

  const { data: page2 = [] } = useQuery({
    queryKey: ["quest-applications", params.questId, 2],
    queryFn: () => fetchSubmissions({ queryParams: { search: params.questId, limit, offset: limit } }),
    staleTime: 5000,
  });

  const data = [...page1, ...page2];

  const quest = QuestListData.find(quest => quest.id === params.questId);

  return (
    <PageContainer size="large" className="py-10">
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Quests",
            href: NEXT_ROUTER.quests.root,
          },
          {
            id: "quest",
            label: quest?.name ?? "",
            href: NEXT_ROUTER.quests.details.root(params.questId),
          },
          {
            id: "applications",
            label: "Applications",
          },
        ]}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Full name</TableHead>
              <TableHead>Github</TableHead>
              <TableHead>Telegram</TableHead>
              <TableHead className="w-[150px]">Hours per week</TableHead>
              <TableHead>Constraints</TableHead>
              <TableHead>Key information</TableHead>
              <TableHead>Questions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.map(application => (
              <TableRow
                key={application.submissionId}
                onClick={() => {
                  router.push(
                    NEXT_ROUTER.quests.details.applications.details.root(params.questId, application.submissionId)
                  );
                }}
                className="cursor-pointer"
              >
                <TableCell>{application.questions.find(q => q.id === "7Nxw")?.value}</TableCell>
                <TableCell>{application.questions.find(q => q.id === "wWhp")?.value}</TableCell>
                <TableCell>{application.questions.find(q => q.id === "xjui")?.value}</TableCell>
                <TableCell>{application.questions.find(q => q.id === "qDyH")?.value}</TableCell>
                <TableCell>{application.questions.find(q => q.id === "q9rQ")?.value}</TableCell>
                <TableCell>{application.questions.find(q => q.id === "uDUq")?.value}</TableCell>
                <TableCell>{application.questions.find(q => q.id === "n1jC")?.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </PageContainer>
  );
}

export default withAuthenticated(withQuestLead(QuestApplicationsPage));

// {
// 	"submissionId": "3753fb33-3501-49b9-a3b0-675d60c4f041",
// 	"questions": [
// 		{
// 			"id": "7Nxw",
// 			"name": "Full Name",
// 			"type": "ShortAnswer",
// 			"value": ""
// 		},
// 		{
// 			"id": "ucvS",
// 			"name": "Email Address",
// 			"type": "EmailInput",
// 			"value": ""
// 		},
// 		{
// 			"id": "wWhp",
// 			"name": "Github Name",
// 			"type": "ShortAnswer",
// 			"value": ""
// 		},
// 		{
// 			"id": "xjui",
// 			"name": "Telegram Handle (for communication purposes with the maintainers)",
// 			"type": "ShortAnswer",
// 			"value": ""
// 		},
// 		{
// 			"id": "mTjS",
// 			"name": "Quest ID",
// 			"type": "ShortAnswer",
// 			"value": null
// 		},
// 		{
// 			"id": "qDyH",
// 			"name": "How many hours per week can you commit to this Quest?",
// 			"type": "MultipleChoice",
// 			"value": "10-15 hours"
// 		},
// 		{
// 			"id": "q9rQ",
// 			"name": "Are there any foreseeable constraints that might affect your participation? (e.g., other work, travel, exams, etc.)",
// 			"type": "LongAnswer",
// 			"value": ""
// 		},
// 		{
// 			"id": "uDUq",
// 			"name": "Briefly share any key information that can be useful for the maintainer to make a guided choice (optional).",
// 			"type": "LongAnswer",
// 			"value": null
// 		},
// 		{
// 			"id": "n1jC",
// 			"name": "Do you have any questions or concerns before starting?",
// 			"type": "LongAnswer",
// 			"value": null
// 		}
// 	],
// 	"urlParameters": [
// 		{
// 			"id": "full_name",
// 			"name": "full_name",
// 			"value": ""
// 		},
// 		{
// 			"id": "email",
// 			"name": "email",
// 			"value": ""
// 		},
// 		{
// 			"id": "github_login",
// 			"name": "github_login",
// 			"value": ""
// 		},
// 		{
// 			"id": "linkedin_profile",
// 			"name": "linkedin_profile",
// 			"value": ""
// 		},
// 		{
// 			"id": "telegram_handle",
// 			"name": "telegram_handle",
// 			"value": ""
// 		},
// 		{
// 			"id": "project_slug",
// 			"name": "project_slug",
// 			"value": null
// 		},
// 		{
// 			"id": "quest_id",
// 			"name": "quest_id",
// 			"value": null
// 		}
// 	],
// },
