/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        domains: '*',
      },
    ],
    // https://lh3.googleusercontent.com/a/AEdFTp6dDN_KjlZSWTSYpoiilWpZZAQ0EX2FaIvfpWtA=s96-c"


    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: '**',
    //     port: '',
    //     pathname: '**',
    //   },
    // ],
  },
}

module.exports = nextConfig;
