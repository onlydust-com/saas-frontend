import githubPermissionImage from "@/public/images/github/github-permission.png";
import { Github, SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";
import { Modal } from "@/design-system/molecules/modal";

import { GithubPermissionModalProps } from "@/shared/features/github-permissions/_components/github-permission-modal/github-permission-modal.types";

import { useGithubPermissionsContext } from "../../github-permissions.context";

export function GithubPermissionModal({ isOpen, onOpenChange, onRedirect }: GithubPermissionModalProps) {
  const { setIsGithubPermissionModalOpen } = useGithubPermissionsContext();

  function handleGrantPermissions() {
    setIsGithubPermissionModalOpen(true);
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      titleProps={{
        translate: { token: "modals:githubPermission.title" },
      }}
      footer={{
        endContent: (
          <Button
            translate={{ token: "modals:githubPermission.grantWritePermissions" }}
            startIcon={{ component: Github }}
            endIcon={{ component: SquareArrowOutUpRight }}
            onClick={onRedirect}
          />
        ),
      }}
      size="xl"
      background="gradient"
    >
      <div className="flex flex-col gap-lg">
        <Image
          src={githubPermissionImage}
          alt="github permission"
          className="h-full w-full object-cover object-center"
          loading={"lazy"}
          width={320}
          height={50}
          quality={100}
        />
        <Typo size="xs" color="primary" translate={{ token: "modals:githubPermission.description" }} />
        <Typo size="xs" color="tertiary" translate={{ token: "modals:githubPermission.moreInfo" }} />
      </div>
    </Modal>
  );
}
