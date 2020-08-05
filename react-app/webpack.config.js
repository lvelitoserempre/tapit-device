const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

const extractLess = new ExtractTextPlugin({
  filename: (getPath) => {
    return getPath('css/[name].css').replace('css/js', 'css');
  }
});

const copyLibs = new CopyWebpackPlugin([
  {from: './src/shared/scripts/', to: 'scripts/'},
  {from: './src/shared/libs/', to: 'libs/'},
  {from: './src/assets/', to: 'assets/'},
  {from: './src/404.html', to: './'}
], {copyUnmodified: true})

module.exports = {
  entry: {
    index: './src/layouts/index.js'
  },
  output: {
    path: path.resolve('../dist'),
    filename: 'scripts/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.less$/,
        use: extractLess.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false,
                minimize: true,
                sourceMap: true
              }
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    htmlPlugin,
    extractLess,
    copyLibs
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};
