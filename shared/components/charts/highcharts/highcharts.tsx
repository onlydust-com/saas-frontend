import HighchartsReact from "highcharts-react-official";

import { HighchartsProps } from "@/shared/components/charts/highcharts/highcharts.types";

export function Highcharts({ options }: HighchartsProps) {
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
