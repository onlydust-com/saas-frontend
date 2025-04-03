import { useRouter } from "next/navigation";

import { QuestListData } from "@/app/(saas)/quests/_data/quest-list.data";

import { NEXT_ROUTER } from "@/shared/constants/router";

import { QuestCard } from "../../_components/quest-card/quest-card";

const statusPriority = {
  started: 0,
  "application-open": 1,
  finished: 2,
};

export function QuestList() {
  const router = useRouter();
  
  // Sort quests by status priority
  const sortedQuests = [...QuestListData].sort((a, b) => {
    return statusPriority[a.status] - statusPriority[b.status];
  });

  return (
    <div className="flex flex-col gap-4">
      {sortedQuests.map(quest => (
        <QuestCard key={quest.id} {...quest} onClick={() => router.push(NEXT_ROUTER.quests.details.root(quest.id))} />
      ))}
    </div>
  );
}
