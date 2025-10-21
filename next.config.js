// next.config.js
module.exports = {
  webpack(config, { nextRuntime }) {
    if (nextRuntime === "nodejs") {
      config.resolve.alias.canvas = false;
    }

    return config;
  },
};
