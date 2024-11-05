import { useState } from "react";

export function useManageRewardsModal() {
  const [isOpen, setIsOpen] = useState(false);

  return { isOpen, setIsOpen };
}
