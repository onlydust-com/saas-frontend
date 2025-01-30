/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'www.cairo-lang.org',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'od-languages-develop.s3.eu-west-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'develop-onlydust-app-images.s3.eu-west-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      }
    ],
  },
}

module.exports = nextConfig 