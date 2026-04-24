/** @type {import('next').NextConfig} */
const nextConfig = {
  // Wyłączamy sprawdzanie błędów tekstowych przez Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig