import { useEffect, useState } from "react";

import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";

interface Sponsor {
  firstSponsor?: string;
  hasMultipleSponsors?: boolean;
  hasSponsor?: boolean;
  loading?: boolean;
}

export const useShowSponsorList = (): [Sponsor, () => Sponsor] => {
  const [sponsor, setSponsor] = useState<Sponsor>({
    loading: true,
    hasMultipleSponsors: false,
    hasSponsor: false,
    firstSponsor: undefined,
  });

  const { user } = useAuthUser();

  function buildSponsor() {
    if (!user?.sponsors?.length) {
      return {
        loading: false,
        hasMultipleSponsors: false,
        hasSponsor: false,
        firstSponsor: undefined,
      };
    }

    if (user?.sponsors?.length === 1) {
      return {
        loading: false,
        hasMultipleSponsors: false,
        hasSponsor: true,
        firstSponsor: user?.sponsors[0].id,
      };
    }

    return {
      loading: false,
      hasMultipleSponsors: true,
      hasSponsor: true,
      firstSponsor: undefined,
    };
  }

  useEffect(() => {
    if (user) {
      setSponsor(buildSponsor());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return [sponsor, buildSponsor];
};
