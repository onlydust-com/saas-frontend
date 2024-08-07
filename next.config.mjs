import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {}

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
