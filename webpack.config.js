const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        clean: true,
        filename: '[name].js',
    },      
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),

    ],
    module: {
      rules: [{ //загрузка js
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'//исключаем загрузку модулей
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        exclude: '/node_modules/'
      },
      {
        test: /\.(jpe?g|png|webp|gif|svg)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              },
            }
          }
        ],
        type: 'asset/resource',
      },
      ],
    },
    // Конфигурация для нашего сервера
    devServer: {    	// Здесь указывается вся статика, которая будет на нашем сервере
      static: {
        directory: path.join(__dirname, 'public'),
      },    	// Сжимать ли бандл при компиляции
      
      compress: true,   	// Порт на котором будет наш сервер
      port: 9000,
    },
      cache: {  
          type: 'filesystem', // По умолчанию 'memory'
          // Устанавливаем диреторию для кэша
          cacheDirectory: path.resolve(__dirname, '.temporary_cache')
        },
}