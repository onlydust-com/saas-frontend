/*
 * Breakpoints and their corresponding user percentages, grouped by device category:
 *
 * Total Users: 4,405
 *
 * // Mobile - min-width: 320px
 * 1. 320px – 800px    ->  988 users  (22.4%)
 *
 * // Tablet - min-width: 800px
 * 2. 800px – 1280px   ->  252 users  (5.7%)
 *
 * // Laptop - min-width: 1280px
 * 3. 1280px – 1760px  ->  1,872 users (42.5%)
 *
 * // Desktop - min-width: 1440px
 * 4. 1760px – 2240px  ->  1,002 users (22.7%)
 *
 * // Wide - min-width: 2560px
 * 5. 2240px – 2720px  ->  176 users  (4.0%)
 * 6. 2720px – 3200px  ->  18 users   (0.4%)
 * 7. 3200px – 3680px  ->  64 users   (1.5%)
 * 8. 3680px – 4160px  ->  24 users   (0.5%)
 * 9. 4160px – 4640px  ->  1 user     (0.02%)
 * 10. 4640px – 5120px ->  8 users    (0.2%)
 */

export const BREAKPOINTS = {
  mobile: 320,
  tablet: 800,
  laptop: 1280,
  desktop: 1440,
  wide: 2560,
} as const;
