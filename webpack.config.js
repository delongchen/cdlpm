const path = require('path')
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin')
const { ZipWebpackPlugin } = require('./zip-webpack-plugin.js')

const webpackConfig = {
  entry: './src/index.ts',
  mode: "production",
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        './exec-child.js'
      ]
    }),
    new ZipWebpackPlugin([
      'src/templates'
    ]),
    new CleanWebpackPlugin
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, 'lib')
  }
}

module.exports = webpackConfig
