"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const options = {
  title: {
    text: "My chart",
  },
  series: [
    {
      data: [1, 2, 3],
    },
  ],
};

export function Chart() {
  if (typeof Highcharts !== "object") return <div />;

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
