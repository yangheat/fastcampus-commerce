/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    emotion: true
  },
  images: {
    domains: ['picsum.photos']
  }
}

export default nextConfig
