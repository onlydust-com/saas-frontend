"use client";

import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Input } from "@/shared/ui/input";

export function LeaderboardFilters() {
  const [search, setSearch] = useState("");
  const [currentSeason, setCurrentSeason] = useState("Current Season");
  return (
    <div className="flex flex-col items-center justify-start gap-4 xl:flex-row xl:justify-between">
      <div className="w-full xl:w-fit">
        <Input placeholder="Search" className="w-full" value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {currentSeason}
              <ChevronDownIcon className="ml-auto" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-48" align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setCurrentSeason("Current Season")}>Current Season</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
