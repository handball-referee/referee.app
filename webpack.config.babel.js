import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CnameWebpackPlugin from 'cname-webpack-plugin';

const appPath = path.resolve(__dirname, 'src');
const buildPath = path.resolve(__dirname, 'dist');

const config = {
  context: appPath,
  entry: './app.jsx',
  output: {
    path: buildPath,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.md$/,
        use: 'raw-loader',
      },
      {
        test: /\.png$/,
        loader: 'file-loader',
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      },
    ],
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      chunks: 'initial',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new SWPrecacheWebpackPlugin({
      cacheId: 'handball',
      filename: 'sw.js',
      minify: true,
      staticFileGlobsIgnorePatterns: [/\.map$/, /CNAME/, /\.woff2?$/, /logo[0-9]{3}\.png$/],
    }),
    new CopyPlugin([
      {
        from: 'manifest.json',
      },
      {
        from: 'data/diagrams/*',
      },
      {
        from: 'static/*',
      },
    ]),
    new CnameWebpackPlugin({
      domain: 'handball.kraemer.io',
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

export default config;
