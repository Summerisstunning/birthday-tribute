/** @type {import('next').NextConfig} */
const nextConfig = {
  // 禁用缓存
  generateEtags: false,
  // 配置缓存策略
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
