import { Calculator, HelpCircle } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

export function CalculationHelper() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-h-[500px] w-[450px] overflow-y-auto">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            <h3 className="font-semibold">🏆 How Your Score is Calculated</h3>
          </div>

          <div>
            <p className="mb-2 font-medium">
              🔹 Final Score = 🎯 Work Score × 📊 Project Coefficient + 🔄 Fidelity Bonus - ⏳ Inactivity Penalty
            </p>
          </div>

          <div className="my-4 border-t border-blue-200" />

          <div className="space-y-4">
            <div>
              <h4 className="font-medium">🔨 Work Score:</h4>
              <ul className="list-disc pl-6">
                <li>More PRs + higher complexity = higher base score!</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium">📊 Project Coefficient:</h4>
              <ul className="list-disc pl-6">
                <li>
                  Projects with more contributors, GitHub stars, and forks have a higher coefficient, multiplying your
                  work score.
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium">🔄 Fidelity Bonus:</h4>
              <p>The more you contribute to a single project, the more you earn!</p>
              <ul className="list-disc pl-6">
                <li>Starting from your 3rd PR on the same project, you gain an extra bonus (up to +20%).</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium">⏳ Inactivity Penalty (Stay Active!)</h4>
              <p>Your score decreases based on the number of consecutive weeks without PRs.</p>
            </div>

            <div className="border-t border-blue-200 pt-4">
              <h4 className="font-medium">🎮 How to Rank Up Faster</h4>
              <ul className="list-none space-y-1">
                <li>✅ Submit high-quality PRs (complexity matters!)</li>
                <li>✅ Contribute to large, popular projects to boost your multiplier</li>
                <li>✅ Stay consistent on a project to unlock up to +20% Fidelity Bonus</li>
                <li>✅ Avoid long inactivity streaks to minimize penalties</li>
              </ul>
            </div>

            <p className="font-medium">Climb the leaderboard, grow your impact, and become an OnlyDust legend! 🚀🔥</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
