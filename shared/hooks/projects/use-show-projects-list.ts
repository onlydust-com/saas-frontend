import { useEffect, useState } from "react";

import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";

interface Project {
  firstProject?: string;
  hasMultipleProjects?: boolean;
  hasProjects?: boolean;
  loading?: boolean;
}

export const useShowProjectsList = (): [Project, () => Project] => {
  const [project, setProject] = useState<Project>({
    loading: true,
    hasMultipleProjects: false,
    hasProjects: false,
    firstProject: undefined,
  });

  const { user } = useAuthUser();

  function buildProject() {
    if (!user?.projectsLed?.length) {
      return {
        loading: false,
        hasMultipleProjects: false,
        hasProjects: false,
        firstProject: undefined,
      };
    }

    console.log(user?.projectsLed);

    if (user?.projectsLed?.length === 1) {
      return {
        loading: false,
        hasMultipleProjects: false,
        hasProjects: true,
        firstProject: user?.projectsLed[0].slug,
      };
    }

    return {
      loading: false,
      hasMultipleProjects: true,
      hasProjects: true,
      firstProject: undefined,
    };
  }

  useEffect(() => {
    if (user) {
      setProject(buildProject());
    }
  }, [user]);

  return [project, buildProject];
};
