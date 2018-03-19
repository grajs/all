const {resolve} = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    bundle: resolve(__dirname, '../main')
  },
  output: {
    path: resolve(__dirname, '../dist'),
    filename: "[name].js?[chunkhash:8]",
    chunkFilename: "[name].js?[chunkhash:8]",
  },
  module: {
    rules: [
      {test: /\.css$/, loader: ['style-loader', 'css-loader']},
      {test: /\.js$/, loader: ['babel-loader'], exclude: /node_modules/},
      {test: /\.scss$/, loader: ['style-loader', 'css-loader', 'sass-loader']},
      {test: /\.vue$/, loader: ['vue-loader']},
      {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
      {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"},
      {
        test: /favicon\.png$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        }]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: 'assets/[name].[hash].[ext]',
            limit: 5000
          }
        }]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: resolve(__dirname, '../index.html')
    })
  ],
  resolve: {
    extensions: ['.js', '.json', '.css', '.vue'],
    alias: {
      '~': resolve(__dirname, '../')
    }
  },
  devtool: "source-map"
}
