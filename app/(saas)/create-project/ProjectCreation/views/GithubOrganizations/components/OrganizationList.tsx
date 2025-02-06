import { PenLine, Plus } from "lucide-react";

import { GetMyOrganizationsResponse } from "@/core/domain/github/github-contract.types";

import { Link } from "@/design-system/atoms/link";
import { Skeleton } from "@/design-system/atoms/skeleton";

import { getGithubSetupLink } from "../../../utils/githubSetupLink";
import HorizontalListItemCard from "./HorizontalListItemCard";

interface OrganizationListProps {
  organizations: GetMyOrganizationsResponse;
  emptyListFallBackText: string;
  loading?: boolean;
  disabledTooltip?: string;
}

export default function OrganizationList({
  organizations,
  emptyListFallBackText,
  loading,
  disabledTooltip,
}: OrganizationListProps) {
  if (loading || organizations.length) {
    return (
      <ul className="flex flex-col gap-3 py-4 pb-6">
        {organizations.map((org, index) => {
          const linkUrl = getGithubSetupLink({
            id: org.githubUserId,
            login: org.login,
            installationId: org.installationId,
            installed: org.installationStatus !== "NOT_INSTALLED",
            isAPersonalOrganization: org.isPersonal,
          });

          return (
            <HorizontalListItemCard
              disabled={!org.isCurrentUserAdmin}
              key={`${org.login}+${index}`}
              avatarUrl={org.avatarUrl ?? ""}
              title={org.name || org.login || ""}
              linkUrl={linkUrl}
              linkIcon={org.installationStatus !== "NOT_INSTALLED" ? <PenLine /> : <Plus />}
              isExternalFlow={org.installationStatus !== "NOT_INSTALLED"}
              tooltip={disabledTooltip}
              TitleComponent={
                <Link
                  href={org.htmlUrl ?? `https://github.com/${org.login}`}
                  target="_blank"
                  className="flex items-center gap-2"
                  rel="noreferrer"
                >
                  {org.name || org.login}
                </Link>
              }
            />
          );
        })}
        {loading ? (
          <>
            <Skeleton />
            <Skeleton />
          </>
        ) : null}
      </ul>
    );
  }

  return <p className="mt-3 text-gray-500">{emptyListFallBackText}</p>;
}
