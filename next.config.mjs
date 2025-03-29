/** @type {import("next").NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXTAUTH_URL_IAM: process.env.NEXTAUTH_URL_IAM,
        NEXTAUTH_REALM_IAM: process.env.NEXTAUTH_REALM_IAM,
        NEXTAUTH_REDIRECT_URI: process.env.NEXTAUTH_REDIRECT_URI,
    },
};

export default nextConfig;
