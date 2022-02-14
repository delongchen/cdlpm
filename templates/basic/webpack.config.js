const path = require('path')
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CONST = require('./const.json')

const webpackConfig = {
  entry: './src/index.ts',
  mode: "production",
  target: 'node',
  //optimization: { minimize: false, usedExports: true },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin,
    new CopyPlugin({
      patterns: [
        CONST.config_yaml
      ]
    })
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, 'lib')
  }
}

module.exports = webpackConfig
