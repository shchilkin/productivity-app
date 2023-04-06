/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['bcrypt'],
    swcPlugins: [['next-superjson-plugin', {}]],
  },
};

module.exports = nextConfig;
