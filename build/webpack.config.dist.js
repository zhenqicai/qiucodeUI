
const path = require("path");
const webpack = require("webpack");
const utils = require('./utils')
const uglify = require("uglifyjs-webpack-plugin");

const ExtractTextPlugin = require("extract-text-webpack-plugin")
const extractScss = new ExtractTextPlugin('/qiucode-ui.min.css')

module.exports = {
    devtool: 'source-map',
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: 'qiucodeUI.min.js',
        libraryTarget: 'umd',
        library: 'qiucodeUI',
        umdNamedDefine: true
    },
    module: {
        // noParse: /es6-promise\.js$/,
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                  loaders: {
                    scss: 'vue-style-loader!css-loader!sass-loader'
                  }
                }
                //分离css 打包 start
                /*options:{
                    transformToRequire: {
                        img: 'src',
                        image: 'xlink:href',
                        'source': 'src',
                    },
                    loaders: {
                         css: ExtractTextPlugin.extract({
                             use: 'css-loader',
                             fallback: 'vue-style-loader'
                        })
                    }
                }*///分离css 打包 end
            },
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "less-loader" }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif|svg)|((eot|woff|woff2|ttf|svg)[\?]?.*)$/,
                loader: 'url-loader',
                query: {
                  limit: 10000,
                  //name: '[name].[ext]'
                  name: utils.assetsPath('fonts/[name].[ext]')
                }
            },
            //下面是添加的 css 的 loader，也即是 css 模块化的配置方法，大家可以拷贝过去直接使用
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                     loader: 'css-loader',
                     options: {
                        minimize: true
                      }
                    },
                    'sass-loader'
                ]
                })
            },
            /*{
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style", 'css!sass') //这里用了样式分离出来的插件，如果不想分离出来，可以直接这样写 loader:'style!css!sass'
            }*/
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new uglify(
            {
                uglifyOptions: {
                    output: {
                        beautify: false,
                        comments: false
                    },
                    compress: {
                        warnings: false,
                        drop_console: true,
                        drop_debugger: true
                    },
                }
            }
        ),
        //分离css 打包 start
        new ExtractTextPlugin("qiucodeUI.css")
    ]
};