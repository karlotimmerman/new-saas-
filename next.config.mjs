/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'your-production-domain.com'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      }
    }
    
    // Add support for importing and parsing CSV files
    config.module.rules.push({
      test: /\.csv$/,
      loader: 'csv-loader',
      options: {
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true
      }
    });

    // Required for chart.js
    config.externals = [...(config.externals || []), { canvas: 'canvas' }];

    return config;
  },
  experimental: {
    appDir: true,
    serverActions: true,
  },
};

export default nextConfig;
