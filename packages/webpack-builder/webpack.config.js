import HtmlBundlerPlugin from 'html-bundler-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const {srcDir, entryDir, dirs} = JSON.parse(process.env.TINI_PROJECT_DIRS);
const {sourcemap} = JSON.parse(process.env.TINI_BUILD_OPTIONS);

export default {
  devtool: sourcemap,
  resolve: {
    extensions: ['.ts', '.js'],
    extensionAlias: {
      '.js': ['.js', '.ts'],
    },
  },
  module: {
    rules: [
      {
        test: /\.([cm]?ts)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                declaration: false,
              },
            },
          },
        ],
      },
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
  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        index: `${entryDir}/index.html`,
      },
      js: {
        filename: 'js/[name].[contenthash:8].js',
      },
      css: {
        filename: 'css/[name].[contenthash:8].css',
      },
    }),
    new CopyPlugin({
      patterns: [{from: `${srcDir}/${dirs.public}`, to: ''}],
    }),
  ],
};
