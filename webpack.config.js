const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

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
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ['@babel/env', '@babel/preset-react']
                }
            },
            {
                test: /\.svg$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets/images',
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
            template: "./frontend/public/index.html"
        })
    ],
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, './'),
            watch: true
        },
        port: 3000,
        hot: true,
    },
    mode: "development"
}