import { useEffect, useState } from "react";

import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";

interface Program {
  firstProgram?: string;
  hasMultiplePrograms?: boolean;
  hasPrograms?: boolean;
  loading?: boolean;
}

export const useShowProgramsList = (): [Program, () => Program] => {
  const [program, setProgram] = useState<Program>({
    loading: true,
    hasMultiplePrograms: false,
    hasPrograms: false,
    firstProgram: undefined,
  });

  const { user } = useAuthUser();

  function buildProgram() {
    if (!user?.programs?.length) {
      return {
        loading: false,
        hasMultiplePrograms: false,
        hasPrograms: false,
        firstProgram: undefined,
      };
    }

    if (user?.programs?.length === 1) {
      return {
        loading: false,
        hasMultiplePrograms: false,
        hasPrograms: true,
        firstProgram: user?.programs[0].id,
      };
    }

    return {
      loading: false,
      hasMultiplePrograms: true,
      hasPrograms: true,
      firstProgram: undefined,
    };
  }

  useEffect(() => {
    if (user) {
      setProgram(buildProgram());
    }
  }, [user]);

  return [program, buildProgram];
};
