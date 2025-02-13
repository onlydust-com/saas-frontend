import { useRouter } from "next/navigation";

import { QuestListData } from "@/app/(saas)/quests/_data/quest-list.data";

import { NEXT_ROUTER } from "@/shared/constants/router";

import { QuestCard } from "../../_components/quest-card/quest-card";

export function QuestList() {
  const router = useRouter();
  const quests = QuestListData;

  return quests.map(quest => (
    <QuestCard key={quest.id} {...quest} onClick={() => router.push(NEXT_ROUTER.quests.details.root(quest.id))} />
  ));
}
