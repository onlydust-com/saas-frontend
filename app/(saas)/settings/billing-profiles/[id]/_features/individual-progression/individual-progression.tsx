import { Progress } from "@/shared/ui/progress";
import { TypographySmall } from "@/shared/ui/typography";

export function IndividualProgression({ amount, limit }: { amount?: number; limit?: number }) {
  if (!amount || !limit) {
    return null;
  }

  const amountLeft = (limit - amount).toFixed(2).toString();
  const isLimitReached = amount >= limit;

  const renderValue = () => {
    if (isLimitReached) {
      return <TypographySmall className="whitespace-nowrap">Maximum amount of {limit} USD reached</TypographySmall>;
    }

    return <TypographySmall className="whitespace-nowrap">{amountLeft} USD left</TypographySmall>;
  };

  return (
    <div className="flex flex-col items-end gap-3">
      <Progress value={amount} max={limit} />
      {renderValue()}
    </div>
  );
}
