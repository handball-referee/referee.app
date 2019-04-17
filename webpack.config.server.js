/* eslint-disable */
const { resolve } = require("path");
const nodeExternals = require("webpack-node-externals");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer");
const clientConfig = require("./webpack.config");

const appPath = resolve(__dirname, "src");
const buildPath = resolve(__dirname, "dist");

const serverConfig = {
  context: appPath,
  entry: {
    server: "./server.tsx",
  },
  output: {
    path: buildPath,
    filename: "[name].js",
    publicPath: "/",
  },
  target: "node",
  externals: nodeExternals(),
  resolve: {
    extensions: [".js", ".ts", ".json", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader",
      },
      {
        test: /\.md$/,
        use: "raw-loader",
      },
      {
        test: /\.(png|jpg)$/,
        use: {
          loader: "file-loader",
          options: {
            emitFile: false,
            outputPath: "img",
          },
        },
      },
      {
        test: /\.css$/,
        use: "null-loader",
      },
    ],
  },
  plugins: [
    /* new BundleAnalyzerPlugin.BundleAnalyzerPlugin({
      analyzerMode: "static",
      generateStatsFile: true,
    }), */
  ],
  mode: "development",
};

module.exports = [serverConfig, clientConfig];
