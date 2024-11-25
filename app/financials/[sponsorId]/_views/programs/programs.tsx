import { ProgramsTable } from "@/app/financials/[sponsorId]/_views/programs/programs-table/programs-table";
import { ProgramsProps } from "@/app/financials/[sponsorId]/_views/programs/programs.types";

export function Programs({ sponsorId }: ProgramsProps) {
  return <ProgramsTable sponsorId={sponsorId} />;
}
