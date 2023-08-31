/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  webpack(config, { buildId, isServer, webpack }) {
    config.plugins.push(
      new webpack.DefinePlugin({
        // Define the build id so that it can be accessed in the client when reporting errors
        'process.env.NEXT_BUILD_ID': JSON.stringify(buildId),
        'process.env.NEXT_IS_SERVER': JSON.stringify(isServer),
      })
    );
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = nextConfig;
