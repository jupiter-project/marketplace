
module.exports = {
  env: {
    NETWORK: process.env.NETWORK,
    EUROPA_ID: process.env.EUROPA_ID,
  },
  images: {
    domains: [
      'res.cloudinary.com'
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.module.rules.push({
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      });
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    return config;
  }
};