const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const {srcDir, entryDir, dirs} = JSON.parse(process.env.TINI_PROJECT_DIRS);

module.exports = {
  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        index: `${entryDir}/index.html`,
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
        { from: `${srcDir}/${dirs.public}`, to: '' },
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
