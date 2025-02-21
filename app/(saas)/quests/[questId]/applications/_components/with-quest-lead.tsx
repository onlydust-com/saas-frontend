import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

import { QuestListData } from "@/app/(saas)/quests/_data/quest-list.data";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";

export function withQuestLead<P extends object>(Component: React.ComponentType<P>) {
  return function WithQuestLeadComponent(props: P) {
    const router = useRouter();
    const params = useParams();

    const { user } = useAuthUser();

    const quest = QuestListData.find(quest => quest.id === params.questId);

    const isQuestLead = useMemo(
      () => user?.projectsLed?.some(project => project.id === quest?.projectId) ?? false,
      [user, quest]
    );

    useEffect(() => {
      if (user && !user.isAdmin && !isQuestLead) {
        router.push(NEXT_ROUTER.quests.root);
      }
    }, [user, isQuestLead]);

    if (user?.isAdmin || isQuestLead) {
      return <Component {...props} />;
    }

    return null;
  };
}
