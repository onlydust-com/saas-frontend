import { useState } from "react";

export function useGithubPermissionModal() {
  const [isOpen, setIsOpen] = useState(false);

  return { isOpen, setIsOpen };
}
