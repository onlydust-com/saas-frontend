import { ColumnChart } from "@/shared/components/charts/highcharts/column-chart/column-chart";
import { useColumnChartOptions } from "@/shared/components/charts/highcharts/column-chart/column-chart.hooks";

export function FinancialColumnChart() {
  const statsMock = [
    {
      date: "August 2024",
      totalAvailable: {
        totalUsdEquivalent: 100,
        totalPerCurrency: [
          {
            amount: 100,
            prettyAmount: 0,
            currency: {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              code: "USDC",
              name: "USD Coin",
              logoUrl: "string",
              decimals: 0,
            },
            usdEquivalent: 100,
            usdConversionRate: 1.5,
          },
        ],
      },
      totalGranted: {
        totalUsdEquivalent: 100,
        totalPerCurrency: [
          {
            amount: 100,
            prettyAmount: 0,
            currency: {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              code: "USDC",
              name: "USD Coin",
              logoUrl: "string",
              decimals: 0,
            },
            usdEquivalent: 100,
            usdConversionRate: 1.5,
          },
        ],
      },
      totalRewarded: {
        totalUsdEquivalent: 100,
        totalPerCurrency: [
          {
            amount: 100,
            prettyAmount: 0,
            currency: {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              code: "USDC",
              name: "USD Coin",
              logoUrl: "string",
              decimals: 0,
            },
            usdEquivalent: 100,
            usdConversionRate: 1.5,
          },
        ],
      },
      transactionCount: 42,
    },
    {
      date: "September 2024",
      totalAvailable: {
        totalUsdEquivalent: 100,
        totalPerCurrency: [
          {
            amount: 100,
            prettyAmount: 0,
            currency: {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              code: "USDC",
              name: "USD Coin",
              logoUrl: "string",
              decimals: 0,
            },
            usdEquivalent: 100,
            usdConversionRate: 1.5,
          },
        ],
      },
      totalGranted: {
        totalUsdEquivalent: 100,
        totalPerCurrency: [
          {
            amount: 100,
            prettyAmount: 0,
            currency: {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              code: "USDC",
              name: "USD Coin",
              logoUrl: "string",
              decimals: 0,
            },
            usdEquivalent: 100,
            usdConversionRate: 1.5,
          },
        ],
      },
      totalRewarded: {
        totalUsdEquivalent: 100,
        totalPerCurrency: [
          {
            amount: 100,
            prettyAmount: 0,
            currency: {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              code: "USDC",
              name: "USD Coin",
              logoUrl: "string",
              decimals: 0,
            },
            usdEquivalent: 100,
            usdConversionRate: 1.5,
          },
        ],
      },
      transactionCount: 42,
    },
    {
      date: "October 2024",
      totalAvailable: {
        totalUsdEquivalent: 100,
        totalPerCurrency: [
          {
            amount: 100,
            prettyAmount: 0,
            currency: {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              code: "USDC",
              name: "USD Coin",
              logoUrl: "string",
              decimals: 0,
            },
            usdEquivalent: 100,
            usdConversionRate: 1.5,
          },
        ],
      },
      totalGranted: {
        totalUsdEquivalent: 100,
        totalPerCurrency: [
          {
            amount: 100,
            prettyAmount: 0,
            currency: {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              code: "USDC",
              name: "USD Coin",
              logoUrl: "string",
              decimals: 0,
            },
            usdEquivalent: 100,
            usdConversionRate: 1.5,
          },
        ],
      },
      totalRewarded: {
        totalUsdEquivalent: 100,
        totalPerCurrency: [
          {
            amount: 100,
            prettyAmount: 0,
            currency: {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              code: "USDC",
              name: "USD Coin",
              logoUrl: "string",
              decimals: 0,
            },
            usdEquivalent: 100,
            usdConversionRate: 1.5,
          },
        ],
      },
    },
  ];

  const categories = statsMock.map(stat => stat.date);

  const receivedSeries = statsMock.map(stat => stat.totalAvailable.totalUsdEquivalent);
  const grantedSeries = statsMock.map(stat => stat.totalGranted.totalUsdEquivalent);
  const rewardedSeries = statsMock.map(stat => stat.totalRewarded.totalUsdEquivalent);

  const { options } = useColumnChartOptions({
    categories,
    series: [
      {
        name: "Received",
        data: receivedSeries,
      },
      {
        name: "Granted",
        data: grantedSeries,
      },
      {
        name: "Rewarded",
        data: rewardedSeries,
      },
    ],
  });
  return <ColumnChart options={options} />;
}
