export function useStatDiffFormatter() {
  function formatDiff(diff?: number) {
    if (diff === undefined) return null;
    const formatted = Intl.NumberFormat().format(Math.abs(diff));
    return diff === 0 ? formatted : `${diff < 0 ? "-" : "+"}${formatted}`;
  }

  function getBadgeColor(diff?: number) {
    if (diff === undefined || diff === 0) return "grey";
    return diff < 0 ? "error" : "success";
  }

  return {
    formatDiff,
    getBadgeColor,
  };
}
