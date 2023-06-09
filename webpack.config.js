const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const { Chunk } = require('webpack');

module.exports = {
    output: {
        path: path.join(__dirname, 'dist-react'),
        filename: 'index.bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename: "[name].css"
    }),
    new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        Chunks: ['index']
    })
],
devServer: {
    port: 3000,
},

    module: {
      rules: [
        { 
          test: /\.js$/, 
          exclude: /node_modules/, 
          use: {
            loader: "babel-loader",
          },
          
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              {
                loader: 'file-loader',
              },
            ],
          },
          {
            test: /\.(sa|sc|c)ss$/, 
            use: ["style-loader", "css-loader", "sass-loader"],
          }
      ]
    }
  }