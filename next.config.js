
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['demo.vercel.pub'],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'raw.githubusercontent.com',
            port: '',
            pathname: '/Btpatil/mdx-blogs-store/main/**'
          }
        ]
      },
}

module.exports = nextConfig
