const path = require("path");
//const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = (env) => {
  return {
    mode: "none",
    entry: "./src/index.js",
    output: {
      path: __dirname + "/public",
      filename: "bundle.js",
    },
    devServer: {
      static: {
        directory: path.join(__dirname, "public"),
      },
      compress: true,
      port: 9000,
      open: true,
    },
    ...(env.WEBPACK_SERVE === true && { devtool: "eval-cheap-source-map" }),
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
    //...(env.WEBPACK_SERVE === true && { plugins: [new ESLintPlugin()] }),
  };
};
