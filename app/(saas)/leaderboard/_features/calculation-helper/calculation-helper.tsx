import { Calculator, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";

export function CalculationHelper() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Alert variant="default" className="mb-4">
      <Calculator className="h-4 w-4" />
      <AlertTitle>How Your Score is Calculated 🏆</AlertTitle>
      <AlertDescription>
        <p className="mb-2">
          Your Final Score determines your rank on the leaderboard. It&apos;s built from four key factors:
        </p>
        <p className="mb-2 font-medium">
          🔹 Final Score = 🎯 Work Score + 🚀 Project Bonus + 🔄 Fidelity Bonus - ⏳ Inactivity Penalty
        </p>

        {isExpanded && (
          <>
            <div className="my-4 border-t border-blue-200" />

            <div className="space-y-4">
              <div>
                <h4 className="font-medium">🔨 Work Score (Core of Your Rank)</h4>
                <p>
                  Your score is mainly based on the number of PRs you submit and their complexity. Bigger and more
                  meaningful contributions = higher score!
                </p>
              </div>

              <div>
                <h4 className="font-medium">🌟 Project Bonus (Impact Matters)</h4>
                <p>Contributing to larger, high-impact projects gives you extra points!</p>
                <p>Projects with many contributors and GitHub stars are valued higher.</p>
              </div>

              <div>
                <h4 className="font-medium">🔄 Fidelity Bonus (Loyalty Pays Off)</h4>
                <p>The more you contribute to a single project, the more you earn!</p>
                <ul className="list-disc pl-6">
                  <li>Starting from your 3rd PR on the same project, you gain an extra bonus (up to +20%).</li>
                  <li>This rewards consistent and meaningful contributions over time.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium">⏳ Inactivity Penalty (Stay Active!)</h4>
                <p>
                  If you go multiple days without making any PRs on OnlyDust projects, you&apos;ll get a small score
                  penalty.
                </p>
                <ul className="list-disc pl-6">
                  <li>The longer the inactivity streak, the bigger the penalty.</li>
                  <li>Stay engaged to keep your rank high!</li>
                </ul>
              </div>

              <div className="border-t border-blue-200 pt-4">
                <h4 className="font-medium">🎮 How to Rank Up Faster</h4>
                <ul className="list-none space-y-1">
                  <li>✅ Submit high-quality PRs (complexity matters!)</li>
                  <li>✅ Contribute to popular projects with lots of contributors & stars</li>
                  <li>✅ Stay consistent on a project to unlock up to +20% Fidelity Bonus</li>
                  <li>✅ Avoid long inactivity streaks to minimize penalties</li>
                </ul>
              </div>

              <p className="font-medium">
                Climb the leaderboard, boost your impact, and become an OnlyDust legend! 🚀🔥
              </p>
            </div>
          </>
        )}

        <Button variant="ghost" size="sm" className="mt-2 w-full" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? (
            <>
              Show Less <ChevronUp className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Show More <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </AlertDescription>
    </Alert>
  );
}
