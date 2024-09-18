import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMap from "highcharts/modules/map";

import { HighchartsProps } from "@/shared/components/charts/highcharts/highcharts.types";

if (typeof Highcharts === "object") {
  HighchartsMap(Highcharts);
}

export function HighchartsDefault({ options, constructorType }: HighchartsProps) {
  return <HighchartsReact highcharts={Highcharts} options={options} constructorType={constructorType} />;
}
