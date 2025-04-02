import { ArrowDown, ArrowRight, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Progress } from "@/shared/ui/progress";

export function AssignIssuePanel() {
  return (
    <div className="flex h-full w-full flex-col bg-background text-foreground">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <span className="font-medium">Public profile</span>
          <ExternalLink className="h-4 w-4" />
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon">
            <ChevronUp className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Contribution Item */}
      <Card className="mx-4 my-4 border-none bg-card/20 p-3">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/20">
            <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
          </div>
          <span className="font-medium">Improve the performance of algorithm</span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>vercel/next.js</span>
          <span>10 days ago</span>
        </div>
      </Card>

      {/* Contributor Profile */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10">
            <Image src="/images/avatar-placeholder.png" alt="Alexbeno" fill className="rounded-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold">Alexbeno</span>
              <span className="font-medium text-purple-500">4th</span>
            </div>
            <span className="text-sm text-muted-foreground">Diamond Contributor</span>
          </div>
        </div>
        <Badge variant="outline" className="bg-neutral-800">
          Starknet
        </Badge>
      </div>

      {/* Badges */}
      <div className="flex gap-2 px-4 py-2">
        <div className="h-5 w-5 rounded-full bg-orange-600"></div>
        <div className="h-5 w-5 rounded-full bg-blue-500"></div>
        <div className="h-5 w-5 rounded-full bg-yellow-500"></div>
        <div className="h-5 w-5 rounded-full bg-red-500"></div>
      </div>

      {/* Github Comment */}
      <div className="mx-4 mb-4 mt-2">
        <h4 className="mb-1 font-medium">Github comment</h4>
        <div className="text-sm text-muted-foreground">Can I take this one?</div>
      </div>

      {/* Metrics Overview */}
      <div className="mb-2 px-4">
        <h3 className="mb-1 font-medium">Metrics overview</h3>
        <p className="text-sm text-muted-foreground">Performance metrics at a glance.</p>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <Card className="flex items-center gap-2 border-none bg-card/20 p-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20">
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <span>6 rewards</span>
          </Card>
          <Card className="flex items-center gap-2 border-none bg-card/20 p-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-500/20">
              <div className="h-3 w-3 rounded-full bg-pink-500" />
            </div>
            <span>11 projects</span>
          </Card>
          <Card className="flex items-center gap-2 border-none bg-card/20 p-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20">
              <div className="h-3 w-3 rounded-full bg-blue-500" />
            </div>
            <span>1 issue in progress</span>
          </Card>
          <Card className="flex items-center gap-2 border-none bg-card/20 p-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/20">
              <div className="h-3 w-3 rounded-full bg-purple-500" />
            </div>
            <span>13 merged PRs</span>
          </Card>
        </div>
      </div>

      {/* Completed Issues */}
      <div className="mb-2 px-4">
        <h3 className="mb-1 font-medium">Completed issues</h3>
        <p className="text-sm text-muted-foreground">Completion ratio: issues resolved vs. assigned.</p>

        <div className="mt-3">
          <Progress value={65} className="h-10 bg-cyan-700/30" progressBarClassName="bg-cyan-500" />
        </div>

        <div className="mt-4 flex text-sm">
          <div className="flex flex-1 items-center gap-1">
            <ArrowRight className="h-4 w-4 text-blue-400" />
            <span>10 issues</span>
          </div>
          <div className="flex flex-1 items-center gap-1">
            <ArrowRight className="h-4 w-4 text-blue-400" />
            <span>5 issues</span>
          </div>
          <div className="flex flex-1 items-center gap-1">
            <ArrowDown className="h-4 w-4 text-pink-400" />
            <span>-5 issues (-50%)</span>
          </div>
        </div>
      </div>

      {/* Key Projects */}
      <div className="mt-2 px-4">
        <h3 className="mb-2 text-sm text-muted-foreground">Key projects with contributions.</h3>

        {[1, 2, 3].map(i => (
          <Card key={i} className="mb-2 flex items-center gap-3 border-none p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-green-900">
              <div className="h-5 w-5 bg-amber-500" />
            </div>
            <span className="text-muted-foreground">Kakarot is a provable EVM</span>
          </Card>
        ))}
      </div>

      {/* Assign Button */}
      <div className="mt-auto p-4">
        <Button className="w-full" size="lg">
          Assign
        </Button>
      </div>
    </div>
  );
}
