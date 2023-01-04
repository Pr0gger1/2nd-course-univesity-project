const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, 'frontend', 'src', 'index.js'),
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
        clean: true,
        publicPath: "/"
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.css']
    },
    module: {
        rules:  [
            {
                test: /\.js|\.jsx$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ['@babel/env', '@babel/preset-react']
                }
            },
            {
                test: /\.svg|\.ico$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'src/assets',
                    name: "[name].[hash].[ext]"
                }

            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "Productify App",
            favicon: "./frontend/public/favicon.ico",
            template: "./frontend/public/index.html"
        }),
    ],
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, 'frontend/src/assets'),
            watch: true
        },
        port: 3000,
        hot: true,
        open: true
    },
    mode: "development"
}