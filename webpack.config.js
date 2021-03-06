/**
 * @fileoverview webpack.config
 * @author burning <www.cafeinit.com>
 * @version 2018.03.06
 */

const path = require('path')

const config = {
  mode: 'production',   // 'development' or 'production'
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ci-audio-player.js',
    // library: {
    //   root: 'CIAudioPlayer',
    //   amd: 'ci-audio-player',
    //   commonjs: 'ci-common-audio-player'
    // },
    library: 'CIAudioPlayer',
    libraryTarget: 'umd'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
    ]
  }
}

module.exports = config
