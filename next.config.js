const basePath = process.env.BASE_PATH || '';

module.exports = {
  basePath,
  env: {
    BASE_PATH: basePath,
    ACTIVE_CHAIN_ID: process.env.ACTIVE_CHAIN_ID,
    LIDO_CONTRACT_ADDRESS: process.env.LIDO_CONTRACT_ADDRESS,
    SUBMIT_GAS_LIMIT: process.env.SUBMIT_GAS_LIMIT,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
