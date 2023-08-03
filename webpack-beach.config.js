/* eslint-disable */
const path = require("path");
const { EnvironmentPlugin } = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const marked = require("marked");

const appPath = path.resolve(__dirname, "src");
const buildPath = path.resolve(__dirname, "dist-beach");
const markdownRenderer = new marked.Renderer();

markdownRenderer.heading = function (text, level, raw, slugger)
{
  const escapedText = text
    .toLowerCase()
    .replace(/,|\s*\(.*\)|[“„]/g, '')
    .replace(/\s/g, '-');

  return `<h${level} id="${escapedText}">${text}</h${level}>`;
};

const config = {
  context: appPath,
  entry: './beach/app.tsx',
  mode: 'production',
  output: {
    path: buildPath,
    filename: "js/[name].[chunkhash].js",
    chunkFilename: "js/[name].[chunkhash].js",
    publicPath: "/referee-quiz/",
  },
  target: 'web',
  resolve: {
    extensions: [".js", ".ts", ".json", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        include: [/src/, /node_modules\/idb/],
        exclude: ["/node_modules/", "/src/indoor/"],
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          "postcss-loader"
        ],
        exclude: ["/src/indoor/"],
      },
      {
        test: /\.md$/,
        use: [
          "html-loader",
          {
            loader: "markdown-loader",
            options: {
              renderer: markdownRenderer
            }
          }
        ],
        exclude: ["/src/indoor/"],
      },
      {
        test: /\.png|\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/[hash][ext][query]'
        },
        exclude: ["/src/indoor/"],
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
    new EnvironmentPlugin({
      SENTRY_DSN: '',
      SENTRY_ENV: '',
      GA_TRACKING_ID: ''
    }),
    new HtmlWebpackPlugin({
      template: "beach/index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "data/questions/*",
          context: path.resolve(__dirname, 'src', 'beach'),
        },
        {
          from: "beach/static/*",
          to: "static"
        },
        {
          from: "beach/favicon.ico",
        },
      ]
    }),
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      cacheId: "handball",
      exclude: ["CNAME"],
      offlineGoogleAnalytics: true,
    }),
    new LoadablePlugin(),
    /* new BundleAnalyzerPlugin({
      analyzerMode: "static",
      generateStatsFile: true,
    }) */
  ],
  devServer: {
    historyApiFallback: {
      index: '/referee-quiz/index.html',
      rewrites: [
        { from: /./, to: './beach/app.tsx' }
      ]
    },
    host: '0.0.0.0',
    port: '8081',
    client: {
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: true,
      }
    }
  },
  devtool: 'source-map'
};

module.exports = config;
