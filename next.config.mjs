import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['lucide-react'],
  async redirects() {
    return [
      {
        source: "/",
        destination: "/programs",
        permanent: false,
      },
      // DATA
      {
        source: '/data',
        destination: '/data/overview',
        permanent: true,
      },
      // PROGRAMS
      {
        source: '/programs/:programId',
        destination: '/programs/:programId/projects',
        permanent: true,
      },
      // MANAGE PROJECTS
      {
        source: '/manage-projects/:projectSlug',
        destination: '/manage-projects/:projectSlug/contributors',
        permanent: true,
      },
    ];
  },
}

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
