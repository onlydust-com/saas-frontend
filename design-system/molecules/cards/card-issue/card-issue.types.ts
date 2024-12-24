import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import {
  ContributionGithubStatusUnion,
  ContributionTypeUnion,
} from "@/core/domain/contribution/models/contribution.types";
import { AnyType } from "@/core/kernel/types";

import { BadgePort } from "@/design-system/atoms/badge";
import { TypoPort } from "@/design-system/atoms/typo";

import { AvatarGroupPort } from "../../avatar-group";
import { ContributionBadgePort } from "../../contribution-badge";

interface Variants {}

interface ClassNames {
  base: string;
}

interface ExtendedProps {
  usersAvatarsProps: AvatarGroupPort<AnyType>;
  titleProps: TypoPort<AnyType>;
  contributionBadgeProps: ContributionBadgePort<AnyType>;
  githubLabelsProps: BadgePort<AnyType>;
}

export interface CardIssuePort<C extends ElementType> extends Partial<Variants>, Partial<ExtendedProps> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  repo?: {
    name?: string;
    url?: string;
  };
  title?: string;
  contribution?: {
    type: ContributionTypeUnion;
    githubStatus: ContributionGithubStatusUnion;
    number: ReactNode;
  };
  issueUrl?: string;
  createdBy?: {
    login?: string;
    avatarUrl?: string;
  };
  createdAt?: string;
  users?: {
    login?: string;
    avatarUrl?: string;
  }[];
  githubLabels?: {
    label: string;
    description?: string;
    onClick?: () => void;
  }[];
  selectedLabels?: string[];
}
