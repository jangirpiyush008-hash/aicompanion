import path from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the file-tracing root so Next doesn't pick up a stray lockfile up-tree.
  outputFileTracingRoot: __dirname,
  images: { formats: ['image/webp'] },
  compress: true,
  // Trailing slash on directory routes — matches SEO best practice for /characters/karley/
  trailingSlash: true,
}
export default nextConfig
