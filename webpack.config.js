const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const BrowserReloadPlugin = require('browser-reload-plugin');

const commonSettings = {
  watch: true,
  output: {
    path: path.resolve(__dirname, './dist/test'),
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
      options: {
        compilerOptions: {
          noEmit: false,
        },
      },
    }],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  stats: {
    assets: false,
    builtAt: true,
    cached: false,
    cachedAssets: false,
    children: false,
    chunks: false,
    chunkGroups: false,
    chunkModules: false,
    chunkOrigins: false,
    colors: true,
    depth: false,
    entrypoints: false,
    env: false,
    errors: true,
    errorDetails: true,
    hash: false,
    logging: 'error',
    modules: false,
    outputPath: false,
    performance: true,
    providedExports: false,
    publicPath: false,
    reasons: false,
    source: false,
    timings: true,
    usedExports: false,
    version: false,
    warnings: false,
  },
};

module.exports = [{
  ...commonSettings,
  entry: {
    client: './test/client/app.ts',
  },
  target: 'web',
  resolve: {
    ...commonSettings.resolve,
    fallback: {
      //   os: false,
      //   http: false,
      //   https: false,
      //   zlib: false,
      //   path: false,
      //   fs: false,
      //   util: false,
      //   buffer: false,
      //   crypto: false,
      //   stream: false,
      //   assert: false,
      //   net: false,
      //   constants: false,
      xmldom: false,
    },
  },
  plugins: [
    new BrowserReloadPlugin(),
    // new webpack.ProvidePlugin({
    //   process: require.resolve('process'),
    // }),
  ],
}, {
  ...commonSettings,
  entry: {
    server: './test/server/index.ts',
  },
  target: 'node',
  plugins: [
    new NodemonPlugin(),
    new CopyPlugin({
      patterns: [
        { from: './test/server/views', to: './views' },
        // { from: './src/server/assets', to: './assets' },
      ],
    }),
  ],
  externals: [
    nodeExternals(),
  ],
}];
