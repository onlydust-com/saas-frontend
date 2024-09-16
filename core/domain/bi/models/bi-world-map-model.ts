import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type BiWorldMapResponse = components["schemas"]["BiWorldMapItemResponse"];

export interface BiWorldMapInterface extends BiWorldMapResponse {
  getChartFormattedData(item: BiWorldMapResponse): { "iso-a2": string; value: number };
}

export class BiWorldMap implements BiWorldMapInterface {
  countryCode!: BiWorldMapResponse["countryCode"];
  value!: BiWorldMapResponse["value"];

  constructor(props: BiWorldMapResponse) {
    Object.assign(this, props);
  }

  getChartFormattedData(item: BiWorldMapResponse) {
    return {
      "iso-a2": item.countryCode,
      value: item.value,
    };
  }
}
