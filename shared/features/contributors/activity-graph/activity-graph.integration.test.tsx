import { describe, expect, it, beforeEach } from '@jest/globals';
import { bootstrap } from "@/core/bootstrap";
import { BiClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/bi-client-adapter";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { ActivityGraphConfig } from "@/shared/features/contributors/activity-graph/activity-graph.constants";
import type { BiContributorActivityInterface } from "@/core/domain/bi/models/bi-contributor-activity-model";

interface ActivityDay {
  date: string | Date;
  count: number;
  hasReward: boolean;
  rewardCount?: number;
  codeReviewCount?: number;
  issueCount?: number;
  pullRequestCount?: number;
}

describe("Activity Graph Integration Tests", () => {
  let biClientAdapter: BiClientAdapter;
  let dateKernel: ReturnType<typeof bootstrap.getDateKernelPort>;

  beforeEach(() => {
    const httpClient = new HttpClient();
    biClientAdapter = new BiClientAdapter(httpClient);
    dateKernel = bootstrap.getDateKernelPort();
  });

  describe("getBiContributorActivityById", () => {
    const contributorId = "test-contributor-id";

    it("should fetch activity data with default date range when no dates provided", async () => {
      // Arrange
      const expectedFrom = dateKernel.subYears(dateKernel.subDays(new Date(), 1), ActivityGraphConfig.number_of_years);
      const expectedTo = new Date();

      // Act
      const result: BiContributorActivityInterface = await biClientAdapter
        .getBiContributorActivityById({
          pathParams: { contributorId },
        })
        .request();

      // Assert
      expect(result).toBeDefined();
      const firstDate = new Date(result.days[0].date);
      const lastDate = new Date(result.days[result.days.length - 1].date);
      
      // Allow for small time differences due to test execution
      expect(Math.abs(firstDate.getTime() - expectedFrom.getTime())).toBeLessThan(24 * 60 * 60 * 1000);
      expect(Math.abs(lastDate.getTime() - expectedTo.getTime())).toBeLessThan(24 * 60 * 60 * 1000);
    });

    it("should fetch activity data within specified date range", async () => {
      // Arrange
      const fromDate = "2023-01-01T00:00:00Z";
      const toDate = "2023-12-31T23:59:59Z";

      // Act
      const result: BiContributorActivityInterface = await biClientAdapter
        .getBiContributorActivityById({
          pathParams: { contributorId },
          queryParams: { fromDate, toDate },
        })
        .request();

      // Assert
      expect(result).toBeDefined();
      result.days.forEach((day: ActivityDay) => {
        const date = new Date(day.date);
        expect(date.getTime()).toBeGreaterThanOrEqual(new Date(fromDate).getTime());
        expect(date.getTime()).toBeLessThanOrEqual(new Date(toDate).getTime());
      });
    });

    it("should handle invalid date formats gracefully", async () => {
      // Arrange
      const invalidFromDate = "invalid-date";
      const invalidToDate = "also-invalid";

      // Act & Assert
      await expect(
        biClientAdapter
          .getBiContributorActivityById({
            pathParams: { contributorId },
            queryParams: { fromDate: invalidFromDate, toDate: invalidToDate },
          })
          .request()
      ).rejects.toThrow();
    });

    it("should handle partial date range (only fromDate)", async () => {
      // Arrange
      const fromDate = "2023-06-01T00:00:00Z";

      // Act
      const result = await biClientAdapter
        .getBiContributorActivityById({
          pathParams: { contributorId },
          queryParams: { fromDate },
        })
        .request();

      // Assert
      expect(result).toBeDefined();
      result.days.forEach((day: ActivityDay) => {
        const date = new Date(day.date);
        expect(date.getTime()).toBeGreaterThanOrEqual(new Date(fromDate).getTime());
      });
    });

    it("should handle partial date range (only toDate)", async () => {
      // Arrange
      const toDate = "2023-12-31T23:59:59Z";

      // Act
      const result = await biClientAdapter
        .getBiContributorActivityById({
          pathParams: { contributorId },
          queryParams: { toDate },
        })
        .request();

      // Assert
      expect(result).toBeDefined();
      result.days.forEach((day: ActivityDay) => {
        const date = new Date(day.date);
        expect(date.getTime()).toBeLessThanOrEqual(new Date(toDate).getTime());
      });
    });
  });
});
