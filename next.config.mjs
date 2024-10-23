/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "your-image-domain.com",
      "supabase.co", // Add if you're using Supabase Storage
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "your-production-domain.com"],
      bodySizeLimit: "2mb",
    },
    scrollRestoration: true,
    typedRoutes: true,
  },
  typescript: {
    // Enable type checking in production
    ignoreBuildErrors: false,
  },
  eslint: {
    // Enable linting in production
    ignoreDuringBuilds: false,
  },
  // Supabase specific optimizations
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
  // Optional: Add environment variables to be available at build time
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
};

export default nextConfig;
