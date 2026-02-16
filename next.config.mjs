/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com', // Google User Images
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com', // GitHub User Images
            },
        ],
    },
};

export default nextConfig;
