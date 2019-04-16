/* eslint-disable */
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CnameWebpackPlugin = require("cname-webpack-plugin");
const { DefinePlugin } = require("webpack");

const appPath = path.resolve(__dirname, "src");
const buildPath = path.resolve(__dirname, "dist");

const config = {
  context: appPath,
  entry: "./app.tsx",
  output: {
    path: buildPath,
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
    publicPath: "/",
  },
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
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "fonts/[name].[ext]",
        },
      },
    ],
  },
  optimization: {
    runtimeChunk: {
      name: "manifest",
    },
    splitChunks: {
      chunks: "initial",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new DefinePlugin({
      AWS_REGION: JSON.stringify(process.env.AWS_REGION),
      IDENTITY_POOL_ID: JSON.stringify(process.env.IDENTITY_POOL_ID),
      USER_POOL_ID: JSON.stringify(process.env.USER_POOL_ID),
      WEB_CLIENT_ID: JSON.stringify(process.env.WEB_CLIENT_ID),
    }),
    new GenerateSW({
      swDest: "sw.js",
      cacheId: "handball",
      exclude: [/\.woff2?$/],
      runtimeCaching: [
        {
          urlPattern: /data/,
          handler: "NetworkFirst",
        },
      ],
    }),
    new LoadablePlugin(),
    new CopyPlugin([
      {
        from: "manifest.json",
      },
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
    new CnameWebpackPlugin({
      domain: "referee.app",
    }),
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
