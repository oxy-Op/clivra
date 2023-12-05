/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'img.clerk.com',
            port: '',
            pathname: '/**',
        }, {
            protocol: 'https',
            hostname: 'utfs.io',
            port: '',
            pathname: '/**',
        }],
    }
}

module.exports = nextConfig
