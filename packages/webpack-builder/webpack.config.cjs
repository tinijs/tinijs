const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const {TINI_SRC_DIR, TINI_ENTRY_DIR, TINI_DIRS_PUBLIC} = process.env;

module.exports = {
  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        index: `${TINI_ENTRY_DIR}/index.html`,
      },
      js: {
        filename: 'js/[name].[contenthash:8].js'
      },
      css: {
        filename: 'css/[name].[contenthash:8].css'
      },
    }),
    new CopyPlugin({
      patterns: [
        { from: `${TINI_SRC_DIR}/${TINI_DIRS_PUBLIC}`, to: '' },
      ],
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    extensionAlias: {
     '.js': ['.js', '.ts']
    }
  },
  module: {
    rules: [
      { test: /\.([cm]?ts)$/, loader: 'ts-loader' },
      {
        test: /\.(css|sass|scss)$/,
        use: ['css-loader', 'sass-loader'],
      },
      {
        test: /\.(ico|png|jpe?g|webp|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash:8][ext][query]',
        },
      },
    ],
  },
};
