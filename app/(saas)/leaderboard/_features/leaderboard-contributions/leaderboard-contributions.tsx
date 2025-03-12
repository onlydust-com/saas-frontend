"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/shared/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";

export function LeaderboardContributions() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Merged PR</TableHead>
          <TableHead>Amount of work score</TableHead>
          <TableHead>Fidelity bonus</TableHead>
          <TableHead>Project bonus</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <Link
              href="https://github.com/example/repo/pull/123"
              target="_blank"
              className="flex w-fit items-center gap-2"
            >
              Fix documentation typos
              <ExternalLink className="h-4 w-4" />
            </Link>
          </TableCell>
          <TableCell>
            <Badge variant="outline">75</Badge>
          </TableCell>
          <TableCell>
            <Badge variant="outline">25</Badge>
          </TableCell>
          <TableCell>
            <Badge variant="outline">50</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
