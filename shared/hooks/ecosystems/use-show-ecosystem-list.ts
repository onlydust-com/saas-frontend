import { useEffect, useState } from "react";

import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";

interface Ecosystem {
  firstEcosystem?: string;
  hasMultipleEcosystems?: boolean;
  hasEcosystems?: boolean;
  loading?: boolean;
}

export const useShowEcosystemList = (): [Ecosystem, () => Ecosystem] => {
  const [ecosystem, setEcosystem] = useState<Ecosystem>({
    loading: true,
    hasMultipleEcosystems: false,
    hasEcosystems: false,
    firstEcosystem: undefined,
  });

  const { user } = useAuthUser();

  function buildEcosystem() {
    if (!user?.ecosystems?.length) {
      return {
        loading: false,
        hasMultipleEcosystems: false,
        hasEcosystems: false,
        firstEcosystem: undefined,
      };
    }

    if (user?.ecosystems?.length === 1) {
      return {
        loading: false,
        hasMultipleEcosystems: false,
        hasEcosystems: true,
        firstEcosystem: user?.ecosystems[0].id,
      };
    }

    return {
      loading: false,
      hasMultipleEcosystems: true,
      hasEcosystems: true,
      firstEcosystem: undefined,
    };
  }

  useEffect(() => {
    if (user) {
      setEcosystem(buildEcosystem());
    }
  }, [user]);

  return [ecosystem, buildEcosystem];
};
