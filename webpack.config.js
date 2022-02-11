const path = require('path')
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { ZipWebpackPlugin } = require('./zip-webpack-plugin.js')

const copyFromSrc = path => {
  const outPath = `src/${path}`
  return { from: outPath, to: outPath }
}

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
    ],
  },
  plugins: [
    new CleanWebpackPlugin,
    new ZipWebpackPlugin([
      'src/assets',
      'src/templates'
    ])
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
