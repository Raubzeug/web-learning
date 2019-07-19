    
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        registration: __dirname + "/js/registration.js",
        index: __dirname + "/js/index.js",
    },
    output: {
        path: path.resolve(__dirname, 'output'),
        filename: '[name].min.js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['babel-preset-env']
                }
            }
        },
        {
            test: /\.less$/,
            exclude: /node_modules/,
            // use: 
            // ExtractTextPlugin.extract(
            //     {
            //       fallback: 'style-loader',
            //       use: ['css-loader', 'less-loader']
            //     })  
            use: [
                {
                loader: 'style-loader', // creates style nodes from JS strings
                },
                {
                loader: 'css-loader', // translates CSS into CommonJS
                },
                {
                loader: 'less-loader', // compiles Less to CSS
                }]
        }]
    },
    devtool: 'inline-source-map',
    devServer: {
        port: '3001',
        host: '0.0.0.0',
        proxy: {
            '/api': 'http://localhost:3000'
        }
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template:  __dirname + "/html/registration.html",
                filename: 'registration.html'
            }
        ),
        new HtmlWebpackPlugin(
            {
                template:  __dirname + "/html/index.html",
                filename: 'index.html'
            }
        ),
        // new ExtractTextPlugin({filename:'style.css'}),
    ]
};