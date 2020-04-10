/* eslint-disable */
const path = require("path");
const {EnvironmentPlugin} = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const appPath = path.resolve(__dirname, "src");
const buildPath = path.resolve(__dirname, "dist");

const config = {
  context: appPath,
  entry: {
    client: './app.tsx',
  },
  output: {
    path: buildPath,
    filename: "js/[name].[chunkhash].js",
    chunkFilename: "js/[name].[chunkhash].js",
    publicPath: "/",
  },
  target: 'web',
  resolve: {
    extensions: [".js", ".ts", ".json", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.md$/,
        use: "raw-loader",
      },
      {
        test: /\.png$/,
        loader: "file-loader",
      },
    ],
  },
  optimization: {
    runtimeChunk: {
      name: "manifest",
    },
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new EnvironmentPlugin(['SENTRY_DSN', 'SENTRY_ENV']),
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new CopyPlugin([
      {
        from: "data/diagrams/*",
      },
      {
        from: "data/questions/*",
      },
      {
        from: "static/*",
      },
      {
        from: "favicon.ico",
      },
    ]),
    new GenerateSW({
      swDest: "sw/sw.js",
      clientsClaim: true,
      skipWaiting: true,
      precacheManifestFilename: 'js/precache-manifest.[manifestHash].js',
      cacheId: "handball",
      runtimeCaching: [
        {
          urlPattern: /.*/,
          handler: "NetworkFirst",
        },
      ],
    }),
    new LoadablePlugin(),
    /* new BundleAnalyzerPlugin({
      analyzerMode: "static",
      generateStatsFile: true,
    }) */
  ],
  devServer: {
    historyApiFallback: true,
  },
};

module.exports = config;
