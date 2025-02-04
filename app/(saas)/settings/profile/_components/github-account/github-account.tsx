import { useQueryClient } from "@tanstack/react-query";
import { Github, RefreshCcw } from "lucide-react";
import { useState } from "react";

import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";
import { bootstrap } from "@/core/bootstrap";

import { Icon } from "@/design-system/atoms/icon";

import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { Button } from "@/shared/ui/button";
import { CardDescription } from "@/shared/ui/card";
import { CardTitle } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";

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
      await refetch();
      await queryClient.invalidateQueries({ queryKey: meStoragePort.getUpdateGithubProfile({}).tag });
      toast.success('GitHub account synced successfully');
    } catch (error) {
      console.error('Failed to sync GitHub account:', error);
      toast.error('Failed to sync GitHub account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="flex flex-1 flex-col gap-2">
        <CardTitle>Github account</CardTitle>
        <CardDescription>
          To change your username or email, edit your account on Github, then resync your account.
        </CardDescription>
      </div>
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Input
              value={`${user?.login} / ${user?.email}`}
              readOnly
              disabled
              className="line-clamp-1 w-full text-ellipsis"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {user?.login} / {user?.email}
            </p>
          </TooltipContent>
        </Tooltip>

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
