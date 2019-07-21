    
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const fs = require('fs')
function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles.map(item => {
      const parts = item.split('.');
      const name = parts[0];
      const extension = parts[1];
      return new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
        inject: false, //not to plug scrypts and styles automatically
      })
    })
  }
  
  const htmlPlugins = generateHtmlPlugins('./input/html')


module.exports = {
    entry: {
        styles: __dirname + '/input/styles/app.less',
        courses: __dirname + "/input/js/courses.js",
        registration: __dirname + "/input/js/registration.js",
        schedule: __dirname + "/input/js/schedule.js",
        }
    ,
    output: {
        path: path.resolve(__dirname, 'output'),
        filename: 'js/[name].min.js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            include: path.resolve(__dirname, 'js'),
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['babel-preset-env']
                },
            }
        },
        {
            test: /\.less$/,
            exclude: /node_modules/,
            include: path.resolve(__dirname, 'input/styles'),
            use: [{
                loader: MiniCssExtractPlugin.loader,

            },
            'css-loader',
            'less-loader',]
        }]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'output'),
        port: '3001',
        proxy: {
            '/api': 'http://localhost:8000'
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename:'./css/styles.bundle.css',
        }),
        new CopyPlugin([
            { from: 'input/images', to: 'images' },
          ]),
    ].concat(htmlPlugins)
};