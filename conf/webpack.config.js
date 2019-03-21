const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const resolve = function (way) {
  return path.resolve(__dirname, '../', way)
}

module.exports = {
  mode: 'development',
  entry: './src/script/index.ts',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: resolve('dist'),
    port: 9090
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      '@mixins': resolve('src/script/mixins/'),
      '@games': resolve('src/script/games/'),
      '@style': resolve('src/style/'),
      '@': resolve('src/')
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  output: {
    filename: 'main.js',
    path: resolve('dist')
  }
};
