module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "/v2": {
        target: "https://www.mocky.io",
        secure: false,
        changeOrigin: true,
        logLevel: "debug",
      },
    },
  },
};
