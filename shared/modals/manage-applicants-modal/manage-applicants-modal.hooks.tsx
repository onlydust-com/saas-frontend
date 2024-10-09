import { useState } from "react";

export function useManageApplicantsModal() {
  const [isOpen, setIsOpen] = useState(false);

  return { isOpen, setIsOpen };
}
