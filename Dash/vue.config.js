require("webpack-chain");
const argv = require("yargs").argv;

process.env.VUE_APP_MODEL = argv.app;

const getFile = function () {
  const data = `
      @import "@/assets/styles/common/variables.scss";
      `;
  return data;
};
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: getFile()
      }
    }
  },
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "/products/base/languages",
      enableInSFC: false
    }
  },
  chainWebpack: config => {
    // If you wish to remove the standard entry point
    config.entryPoints.delete("app");

    // then add your own
    argv.app && argv.app !== ""
      ? config
        .entry(argv.app)
        .add("./src/main.js")
        .end()
      : config
        .entry("base")
        .add("./src/main.js")
        .end();
  },
  devServer: {
    disableHostCheck: true
  }
};
