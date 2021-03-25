
const HtmlWebpackPlugin = require("html-webpack-plugin"); 
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require("path");
module.exports = {
    entry: {"index": "./src/index.js",
},
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].bundle.js"
    }
}

module.exports = {
    entry: {
        index: "./src/index.js",
},
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 9000,
        watchContentBase: true
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: "./src/index.html"
        }),
        new HtmlWebpackPlugin({
            template: './src/contact.html',
            inject: true,
            chunks: ['index'],
            filename: 'contact.html'
            }),
            new HtmlWebpackPlugin({
                template: './src/about.html',
                inject: true,
                chunks: ['index'],
                filename: 'about.html'
                }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
            }),
           new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/
           }),
        new CleanWebpackPlugin(),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 9100,
            proxy: 'http://localhost:9000'
            }, {
            reload: false
            }),
            new webpack.LoaderOptionsPlugin({
                options: {
                postcss: [
                autoprefixer()
                ]
                }
               }),
               new CopyWebpackPlugin([{
                from: './src/assets',
                to: './dest/assets'
                }]),
        ],
    
    module: {
        rules: [{
                test: /\.scss$/, 
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                    "postcss-loader"
                ] 
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(mp4|svg|png|jpe?g|gif)$/,
                use: {
                  loader: "file-loader",
                  options: {
                    name: "[name].[ext]"
                  }
                }
              },
               
            
                {
                    test: /\.html$/,
                    use: {
                      loader: "html-loader",
                      options: {
                        attrs: [":src"]
                      }
                    }
                  },
          
               
        ]
    }
}