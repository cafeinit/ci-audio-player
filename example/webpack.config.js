/**
 * @fileoverview webpack.config
 * @author burning <www.cafeinit.com>
 * @version 2018.03.06
 */

const path = require('path')

const config = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'less-loader' // compiles Less to CSS
          }
        ]
      },
    ]
  },

  devtool: 'inline-source-map',
}

module.exports = config
