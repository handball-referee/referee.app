import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { GenerateSW } from 'workbox-webpack-plugin';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CnameWebpackPlugin from 'cname-webpack-plugin';
import { DefinePlugin } from 'webpack';

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
    new DefinePlugin({
      AWS_REGION: JSON.stringify(process.env.AWS_REGION),
      IDENTITY_POOL_ID: JSON.stringify(process.env.IDENTITY_POOL_ID),
      USER_POOL_ID: JSON.stringify(process.env.USER_POOL_ID),
      WEB_CLIENT_ID: JSON.stringify(process.env.WEB_CLIENT_ID),
    }),
    new GenerateSW({
      swDest: "sw.js",
      cacheId: 'handball',
      exclude: [/\.woff2?$/],
      runtimeCaching: [
        {
          urlPattern: /data/,
          handler: "NetworkFirst",
        },
      ],
    }),
    new CopyPlugin([
      {
        from: 'manifest.json',
      },
      {
        from: 'data/diagrams/*',
      },
      {
        from: 'data/questions/*',
      },
      {
        from: 'static/*',
      },
      {
        from: 'favicon.ico',
      },
    ]),
    new CnameWebpackPlugin({
      domain: 'referee.app',
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
