/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['zerocarbon.sgp1.digitaloceanspaces.com', 'zerocarbon.sgp1.cdn.digitaloceanspaces.com', 'nft-world.blr1.digitaloceanspaces.com', 'nft-world.blr1.cdn.digitaloceanspaces.com', 'logo.uplead.com', 'blr1.digitaloceanspaces.com'],
  },
}

module.exports = nextConfig
