module.exports = {
  chainWebpack: (config) => {
    /**
     * Output JS to bundle.js file
     */
    config.output.filename("bundle.js");

    /**
     * Disable chunks splitting
     *
     * See https://stackoverflow.com/a/56272461/11780994
     */
    config.optimization.splitChunks(undefined);

    config.module
      .rule("i18n")
      .resourceQuery(/blockType=i18n/)
      .type("javascript/auto")
      .use("i18n")
      .loader("@intlify/vue-i18n-loader");

    /**
     * Inline CSS
     */
    config.plugin("preload").tap((args) => {
      args[0].fileBlacklist.push(/\.css/, /app\.js/);
      return args;
    });
    config
      .plugin("inline-source")
      .use(require("html-webpack-inline-source-plugin"));
    config.plugin("html").tap((args) => {
      args[0].inlineSource = "(.css|app.js$)";
      return args;
    });
  },
};
