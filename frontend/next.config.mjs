const nextConfig = {
    output: 'standalone',
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://gateway-service:8080/:path*' // Docker Internal Alias preferred for prod?
                // Actually, client-side browser calls hit localhost:3000/api -> NextJS Server -> Gateway.
                // If NextJS runs in docker, it must reach 'gateway-service' host, NOT localhost.
                // But browser needs to reach localhost? No, browser hits NextJS, NextJS proxies.
                // So valid destination is http://gateway-service:8080
            }
        ];
    }
};

export default nextConfig;
