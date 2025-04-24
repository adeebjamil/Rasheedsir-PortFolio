const nextConfig = {
  reactStrictMode: true,
  // Add this to ensure proper React version handling
  experimental: {
    esmExternals: 'loose',
  },
}

export default nextConfig;
