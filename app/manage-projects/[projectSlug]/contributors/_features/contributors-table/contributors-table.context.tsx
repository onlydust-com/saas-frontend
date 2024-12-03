"use client";

import { OnChangeFn, RowSelectionState } from "@tanstack/react-table";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

import { ContributorsBulkSidepanel } from "@/app/manage-projects/[projectSlug]/contributors/_features/contributors-table/_features/contributors-bulk-sidepanel/contributors-bulk-sidepanel";
import { useContributorsBulkSidePanel } from "@/app/manage-projects/[projectSlug]/contributors/_features/contributors-table/_features/contributors-bulk-sidepanel/contributors-bulk-sidepanel.hooks";

import { BiContributorInterface } from "@/core/domain/bi/models/bi-contributor-model";

interface ContributorsTableContextInterface {
  rowSelection: RowSelectionState;
  userSelected: BiContributorInterface[];
  setRowSelection: OnChangeFn<RowSelectionState>;
  setUserSelected: (userSelected: BiContributorInterface[]) => void;
  onRemoveSelection: (id: number) => void;
}

export const ContributorsTableContext = createContext<ContributorsTableContextInterface>({
  rowSelection: {},
  userSelected: [],
  setRowSelection: () => {},
  setUserSelected: () => {},
  onRemoveSelection: () => {},
});

export function ContributorsTableProvider({ children, projectSlug }: PropsWithChildren & { projectSlug: string }) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [userSelected, setUserSelected] = useState<BiContributorInterface[]>([]);
  const { open, close } = useContributorsBulkSidePanel();

  useEffect(() => {
    if (userSelected?.length > 0) {
      open({ projectSlug });
    } else {
      close();
    }
  }, [userSelected]);

  function onRemoveSelection(id: number) {
    setRowSelection(prev => {
      const newSelection = { ...prev };
      delete newSelection[id];
      return newSelection;
    });
    setUserSelected(prev => prev.filter(user => user.contributor.githubUserId !== id));
  }

  return (
    <ContributorsTableContext.Provider
      value={{ userSelected, rowSelection, setRowSelection, setUserSelected, onRemoveSelection }}
    >
      {children}
      <ContributorsBulkSidepanel />
    </ContributorsTableContext.Provider>
  );
}

export function useContributorsTable() {
  return useContext(ContributorsTableContext);
}
