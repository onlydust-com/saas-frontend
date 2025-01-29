import { Link } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { RewardReactQueryAdapter } from "@/core/application/react-query-adapter/reward";
import { bootstrap } from "@/core/bootstrap";
import { RewardableItemInterface } from "@/core/domain/reward/models/rewardable-item-model";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";
import { Input } from "@/design-system/atoms/input";
import { Tag } from "@/design-system/atoms/tag";
import { Typo } from "@/design-system/atoms/typo";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { useLinkContributionSidepanel } from "@/shared/panels/_flows/reward-flow/_panels/link-contribution-sidepanel/link-contribution-sidepanel.hooks";
import {
  ContributionType,
  LinkContributionSidePanelData,
} from "@/shared/panels/_flows/reward-flow/_panels/link-contribution-sidepanel/link-contribution-sidepanel.types";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";
import { Translate } from "@/shared/translation/components/translate/translate";

export function LinkContributionSidepanel() {
  const { t } = useTranslation("panels");

  const [type, setType] = useState<ContributionType>(ContributionType.ISSUE);
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const { name } = useLinkContributionSidepanel();
  const { Panel, back } = useSidePanel({ name });
  const { githubUserId } = useSinglePanelData<LinkContributionSidePanelData>(name) ?? {
    githubUserId: 0,
  };

  const { projectId, addOtherWorks } = useRewardFlow();

  const urlKernelPort = bootstrap.getUrlKernelPort();

  const { mutateAsync: addOtherIssue, isPending: isOtherIssuePending } =
    RewardReactQueryAdapter.client.useAddOtherIssue({
      pathParams: {
        projectId: projectId || "",
      },
      options: {
        onSuccess(data) {
          handleAddContribution(data);
          handleReset();
          back();
        },
        onError: () => {
          toast.error(<Translate token={"panels:linkContribution.toasters.issue.error"} />);
        },
      },
    });

  const { mutateAsync: addOtherPullRequest, isPending: isOtherPullRequestPending } =
    RewardReactQueryAdapter.client.useAddOtherPullRequest({
      pathParams: {
        projectId: projectId || "",
      },
      options: {
        onSuccess(data) {
          handleAddContribution(data);
          handleReset();
          back();
        },
        onError: () => {
          toast.error(<Translate token={"panels:linkContribution.toasters.pullRequest.error"} />);
        },
      },
    });

  function handleAddContribution(data: RewardableItemInterface) {
    addOtherWorks([data], githubUserId);
  }

  function handleSubmit() {
    if (type === ContributionType.ISSUE) {
      addOtherIssue({
        githubIssueHtmlUrl: url,
      });
    }

    if (type === ContributionType.PULL_REQUEST) {
      addOtherPullRequest({
        githubPullRequestHtmlUrl: url,
      });
    }
  }

  function handleUrl(value: string) {
    setUrl(value);
  }

  function handleError() {
    if (url) {
      if (type === ContributionType.ISSUE) {
        setError(!urlKernelPort.validateGithubIssueUrl(url));
      } else if (type === ContributionType.PULL_REQUEST) {
        setError(!urlKernelPort.validateGithubPullRequestUrl(url));
      } else {
        setError(false);
      }
    } else {
      setError(false);
    }
  }

  function handleReset() {
    setType(ContributionType.ISSUE);
    setUrl("");
    setError(false);
  }

  useEffect(() => {
    handleError();
  }, [url, type]);

  return (
    <Panel>
      <SidePanelHeader
        canGoBack
        canClose
        onClose={handleReset}
        onBack={handleReset}
        title={{ translate: { token: "panels:linkContribution.header.title" } }}
      />

      <SidePanelBody>
        <ScrollView>
          <div className="flex flex-col gap-lg">
            <div className="flex flex-col gap-lg">
              <Typo
                size="xs"
                color="secondary"
                translate={{
                  token: "panels:linkContribution.content.select.label",
                }}
              />

              <div className="flex flex-wrap gap-md">
                <Tag
                  size="xs"
                  isSelected={type === ContributionType.ISSUE}
                  onSelect={() => setType(ContributionType.ISSUE)}
                  translate={{
                    token: "panels:linkContribution.content.select.items.issue",
                  }}
                />

                <Tag
                  size="xs"
                  isSelected={type === ContributionType.PULL_REQUEST}
                  onSelect={() => setType(ContributionType.PULL_REQUEST)}
                  translate={{
                    token: "panels:linkContribution.content.select.items.pullRequest",
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-lg">
              <Typo
                size="xs"
                color="secondary"
                translate={{
                  token: `panels:linkContribution.content.url.${type}.label`,
                }}
              />

              <Input
                name="url"
                value={url}
                size="sm"
                onChange={e => handleUrl(e.target.value)}
                endContent={<Icon component={Link} classNames={{ base: "text-foreground-quinary" }} />}
                placeholder={t(`linkContribution.content.url.${type}.placeholder`)}
                isError={error}
                error={{
                  text: t(`linkContribution.content.url.${type}.error`),
                }}
              />
            </div>
          </div>
        </ScrollView>
      </SidePanelBody>

      <SidePanelFooter>
        <Button
          variant="primary"
          size="md"
          translate={{
            token: "panels:linkContribution.footer.button",
          }}
          isDisabled={error || !url}
          isLoading={isOtherIssuePending || isOtherPullRequestPending}
          onClick={handleSubmit}
        />
      </SidePanelFooter>
    </Panel>
  );
}
