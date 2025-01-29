import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["lucide-react"],
  async redirects() {
    return [
      // HOME
      {
        source: "/",
        destination: "/my-dashboard",
        permanent: true,
      },
      // DATA
      {
        source: "/data",
        destination: "/data/overview",
        permanent: true,
      },
      // PROGRAMS
      {
        source: "/programs/:programId",
        destination: "/programs/:programId/projects",
        permanent: true,
      },
      // MANAGE PROJECTS
      {
        source: "/manage-projects/:projectSlug",
        destination: "/manage-projects/:projectSlug/contributors",
        permanent: true,
      },
      // MY DASHBOARD
      {
        source: "/my-dashboard",
        destination: "/my-dashboard/contributions",
        permanent: true,
      },
      // PROJECTS
      {
        source: "/projects/:projectSlug",
        destination: "/projects/:projectSlug/overview",
        permanent: true,
      },
      // HACKATHONS
      {
        source: "/hackathons/:hackathonSlug",
        destination: "/hackathons/:hackathonSlug/overview",
        permanent: true,
      },
      // ECOSYSTEMS
      {
        source: "/ecosystems/:ecosystemSlug",
        destination: "/ecosystems/:ecosystemSlug/overview",
        permanent: true,
      },
      // USERS
      {
        source: "/users/:userSlug",
        destination: "/users/:userSlug/overview",
        permanent: true,
      },
    ];
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
