/** @type {import('next').NextConfig} */
const nextConfig = {
  // 禁用缓存
  generateEtags: false,
  // 禁用静态优化
  unstable_runtimeJS: true,
  // 强制动态渲染
  unstable_runtimeJS: true,
  // 禁用页面缓存
  unstable_revalidate: 0,
}

module.exports = nextConfig
