import { useState } from "react";

export function useGithubPublicScopePermissionModal() {
  const [isOpen, setIsOpen] = useState(false);

  return { isOpen, setIsOpen };
}
