import { CornerDownLeft } from "lucide-react";
import { useMemo } from "react";

import { EcosystemReactQueryAdapter } from "@/core/application/react-query-adapter/ecosystem";

import { Icon } from "@/design-system/atoms/icon";
import { PaperLoading } from "@/design-system/atoms/paper/paper.loading";
import { Paper } from "@/design-system/atoms/paper/variants/paper-default";
import { Typo } from "@/design-system/atoms/typo/variants/typo-default";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { ErrorState } from "@/shared/components/error-state/error-state";

import { DocumentationProps } from "./documentation.types";

export function Documentation({ ecosystemSlug }: DocumentationProps) {
  const {
    data: ecosystem,
    isLoading,
    isError,
  } = EcosystemReactQueryAdapter.client.useGetEcosystemBySlug({
    pathParams: {
      slug: ecosystemSlug,
    },
    options: {
      enabled: Boolean(ecosystemSlug),
    },
  });

  const renderDocumentations = useMemo(() => {
    if (isLoading) {
      return <PaperLoading classNames={{ base: "h-[200px]" }} />;
    }

    if (isError) {
      return <ErrorState />;
    }

    return ecosystem?.documentations.map(documentation => (
      <Paper
        as={BaseLink}
        key={documentation.name}
        background="secondary"
        border="primary"
        classNames={{ base: "flex gap-md p-xl justify-between" }}
        htmlProps={{ href: documentation.url, target: "_blank" }}
      >
        <div className="flex flex-col gap-sm">
          <Typo size="sm" weight="medium" color="primary" classNames={{ base: "truncate" }}>
            {documentation.name}
          </Typo>
          <Typo size="xs" color="tertiary" classNames={{ base: "line-clamp-3" }}>
            {documentation.description}
          </Typo>
        </div>
        <Icon component={CornerDownLeft} size="sm" />
      </Paper>
    ));
  }, [isLoading, isError, ecosystem]);

  if (!ecosystem?.documentations.length) {
    return null;
  }

  return (
    <Paper
      background="glass"
      border="primary"
      classNames={{ base: "flex flex-col divide-y divide-border-primary" }}
      size="none"
    >
      <div className="flex flex-col p-xl">
        <Typo
          variant="heading"
          size="xs"
          weight="medium"
          classNames={{ base: "text-sm" }}
          translate={{ token: "ecosystems:details.documentation.title" }}
        />
      </div>
      <div className="flex flex-col gap-md p-xl">{renderDocumentations}</div>
    </Paper>
  );
}
