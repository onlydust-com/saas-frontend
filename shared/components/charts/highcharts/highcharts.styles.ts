const titleStyle = {
  fontSize: "12px",
  color: "var(--typography-primary)",
  fontFamily: "Inter 24pt",
};

const xAxisStyle = {
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "16px",
  letterSpacing: "-0.12px",
  color: "var(--typography-quaternary)",
  fontFamily: "Inter 24pt",
};

const yAxisStyle = {
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "16px",
  letterSpacing: "-0.12px",
  color: "var(--typography-primary)",
  fontFamily: "Inter 24pt",
};

const yAxisPrimaryStyle = {
  ...yAxisStyle,
  color: "var(--typography-primary)",
};

const yAxisQuaternaryStyle = {
  ...yAxisStyle,
  color: "var(--typography-quaternary)",
};

const legendStyle = {
  color: "var(--typography-primary)",
};

const tooltipWrapperStyle = {
  backgroundColor: "var(--background-tertiary)",
  padding: 16,
  borderWidth: 1,
  borderColor: "var(--border-primary)",
  borderRadius: 8,
  shadow: false,
};

const tooltipInnerStyle = {
  color: "var(--typography-primary)",
  fontSize: "12px",
  lineHeight: "18px",
  fontFamily: "Inter 24pt",
};

const PieChartSubtitlePrimaryStyle = {
  color: "#FFF",
  fontSize: "24px",
  fontFamily: "Inter",
  fontWeight: "semi-bold",
};

export {
  titleStyle,
  xAxisStyle,
  yAxisPrimaryStyle,
  legendStyle,
  tooltipWrapperStyle,
  tooltipInnerStyle,
  yAxisQuaternaryStyle,
  PieChartSubtitlePrimaryStyle,
};
