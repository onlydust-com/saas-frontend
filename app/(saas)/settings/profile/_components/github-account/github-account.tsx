import { useQueryClient } from "@tanstack/react-query";
import { Github, Link, RefreshCcw } from "lucide-react";
import { useState } from "react";

import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";
import { bootstrap } from "@/core/bootstrap";

import { Icon } from "@/design-system/atoms/icon";

import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { Button } from "@/shared/ui/button";
import { CardDescription } from "@/shared/ui/card";
import { CardTitle } from "@/shared/ui/card";

export function GithubAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthUser();
  const queryClient = useQueryClient();

  const { refetch } = MeReactQueryAdapter.client.useGetUpdateGithubProfile({
    options: { enabled: false, retry: 0 },
  });
  const meStoragePort = bootstrap.getMeStoragePortForClient();

  async function onTriggerResync() {
    try {
      setIsLoading(true);
      refetch();
      queryClient.invalidateQueries({ queryKey: meStoragePort.getUpdateGithubProfile({}).tag });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex gap-4">
      <div className="flex flex-1 flex-col gap-2">
        <CardTitle>Github account</CardTitle>
        <CardDescription>
          To change your username or email, edit your account on Github, then resync your account.
        </CardDescription>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={onTriggerResync} disabled={isLoading} loading={isLoading}>
          <Icon component={RefreshCcw} />
          Resync
        </Button>

        <Button variant="outline" asChild>
          <a href="https://github.com/settings/emails" target="_blank" rel="noopener noreferrer">
            <Icon component={Github} />
            Edit
          </a>
        </Button>
      </div>
    </div>
  );
}
