const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs')

const PATHS = {
    src: path.join(__dirname, 'src'),
    output: path.join(__dirname, 'output'),
  }

const PAGES_DIR = PATHS.src + '/html/'
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.html'))

module.exports = {
  
    entry: {
        styles: PATHS.src + '/styles/app.less',
        courses: PATHS.src + "/js/courses.js",
        registration: PATHS.src + "/js/registration.js",
        schedule: PATHS.src + "/js/schedule.js",
        login: PATHS.src + "/js/login.js",
        }
    ,
    output: {
        path: PATHS.output,
        filename: 'js/[name].min.js',
        publicPath: 'output', //for dev-server
        library: '[name]'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /\/node_modules\//,
            include: path.resolve(__dirname, 'js'),
            use: {
                loader: 'babel-loader?optional[]=runtime',
                options: {
                    presets: ['babel-preset-env']
                },
            }
        },
        {
            test: /\.less$/,
            exclude: /\/node_modules\//,
            include: path.resolve(__dirname, 'src/styles'),
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
            { from: 'src/images', to: 'images' },
          ]),
        new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
        }),
        ...PAGES.map(page => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            filename: `./${page}`,
            inject: false
          }))
    ],

    resolve: {
        extensions: ['.js', '.jsx', '.json', '.css', '.less']
    },
    optimization: {
        namedModules: true,
        namedChunks: true
    }
};