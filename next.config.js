/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "images.ctfassets.net" }],
  },
  async redirects() {
    return [
      {
        source: "/:locale/projects",
        destination: "/:locale",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
