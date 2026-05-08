/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: ['@tianshu/shared', 'antd'],
};

module.exports = nextConfig;
