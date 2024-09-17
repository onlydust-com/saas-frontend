import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type BiWorldMapResponse = components["schemas"]["BiWorldMapItemResponse"];

export interface BiWorldMapInterface extends BiWorldMapResponse {
  getChartFormattedData(item: BiWorldMapResponse): { "iso-a2": string; value: number; color: string };
}

export class BiWorldMap implements BiWorldMapInterface {
  countryCode!: BiWorldMapResponse["countryCode"];
  value!: BiWorldMapResponse["value"];

  constructor(props: BiWorldMapResponse) {
    Object.assign(this, props);
  }

  private getColor(value: number): string {
    if (value < 5000) return "#510077"; // < 5000
    if (value < 10000) return "#7A0EBB"; // 5000 - 10000
    if (value < 20000) return "#A03AE9"; // 10000 - 20000
    return "#CA75FF"; // > 20000
  }

  getChartFormattedData(item: BiWorldMapResponse) {
    return {
      "iso-a2": item.countryCode,
      value: item.value,
      color: this.getColor(item.value),
    };
  }
}
