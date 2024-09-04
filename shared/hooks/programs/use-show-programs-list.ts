import { useEffect, useState } from "react";

import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";

interface Program {
  firstProgram?: string;
  hasMultiplePrograms?: boolean;
  loading?: boolean;
}

export const useShowProgramsList = (): [Program, () => Program] => {
  const [program, setProgram] = useState<Program>({
    loading: true,
    hasMultiplePrograms: false,
    firstProgram: undefined,
  });

  const { user } = useAuthUser();

  function buildProgram() {
    if (user?.programs?.length === 1) {
      return {
        loading: false,
        hasMultiplePrograms: false,
        firstProgram: user?.programs[0].id,
      };
    }
    return {
      loading: false,
      hasMultiplePrograms: true,
      firstProgram: undefined,
    };
  }

  useEffect(() => {
    if (user) {
      setProgram(buildProgram());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return [program, buildProgram];
};
