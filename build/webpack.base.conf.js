'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
//const markdownRender = require('markdown-it')();
const MarkdownItContainer = require('markdown-it-container')

const ExtractTextPlugin = require("extract-text-webpack-plugin")
const extractScss = new ExtractTextPlugin('/qiucode-ui.css')

const striptags = require('./strip-tags')

const vueMarkdown = {
  preprocess: (MarkdownIt, source) => {
    MarkdownIt.renderer.rules.table_open = function () {
      return '<table class="table">'
    }
    MarkdownIt.renderer.rules.fence = utils.wrapCustomClass(MarkdownIt.renderer.rules.fence)

    // ```html `` 给这种样式加个class hljs
    //  但是markdown-it 有个bug fence整合attr的时候直接加载class数组上而不是class的值上
    //  markdown-it\lib\renderer.js 71行 这么修改可以修复bug
    //  tmpAttrs[i] += ' ' + options.langPrefix + langName; --> tmpAttrs[i][1] += ' ' + options.langPrefix + langName;
    // const fence = MarkdownIt.renderer.rules.fence 
    // MarkdownIt.renderer.rules.fence = function(...args){
    //   args[0][args[1]].attrJoin('class', 'hljs')
    //   var a = fence(...args)
    //   return a
    // }

    // ```code`` 给这种样式加个class code_inline
    const code_inline = MarkdownIt.renderer.rules.code_inline
    MarkdownIt.renderer.rules.code_inline = function(...args){
      args[0][args[1]].attrJoin('class', 'code_inline')
      return code_inline(...args)
    }
    return source
  },
  use: [
    [MarkdownItContainer, 'demo', {
      validate: params => params.trim().match(/^demo\s*(.*)$/),
      render: function(tokens, idx) {

        var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);

        if (tokens[idx].nesting === 1) {
          var desc = tokens[idx + 2].content;
          const html = utils.convertHtml(striptags(tokens[idx + 1].content, 'script'))
          // 移除描述，防止被添加到代码块
          tokens[idx + 2].children = [];

          return `<demo-block>
                        <div slot="desc">${html}</div>
                        <div slot="highlight">`;
        }
        return '</div></demo-block>\n';
      }
    }]
  ]
}


function resolve (dir) {
  return path.join(__dirname, '..', dir)
}



module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    //app: './src/main.js'
	app: './examples/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },

    /*devtool: 'source-map',
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: 'qiucodeUI.min.js',
        libraryTarget: 'umd',
        library: 'qiucodeUI',
        umdNamedDefine: true
    },*/




  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('examples'), resolve('src'), resolve('test') ]
      },
      
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
       /*{
        test: /\.(woff|woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },*/


      {
        test: /\.(woff|woff2|svg|ttf|eot)$/,
        use:[
          {
            loader:'file-loader',
            options:{
               name:'fonts/[name].[ext]'
              }
          }//项目设置打包到dist下的fonts文件夹下
        ]
      },
     /*
      {
        test: /\.css$/,
        use:ExtractTextPlugin.extract({
          fallback:'style-loader',
          publicPath:'../',
          use:[
            {loader:'css-loader',options:{importLoaders:1}},
            {loader:'postcss-loader',options:{ident:"postcss",plugins:[require("autoprefixers") ("last 100 versios")]}}
          ]
        })
        
      },

      {
        test: /\.scss$/,
        use:ExtractTextPlugin.extract({
          fallback:'style-loader',
          publicPath:'../',
          use:[
            {loader:'css-loader',options:{importLoaders:2,minimize:true}},
            {loader:'postcss-loader',options:{ident:"postcss",plugins:[require("autoprefixers") ("last 100 versios")]}},
            'sass-loader'
          ]
        })
      },*/
	  //start
	  {
        test: /\.md$/,
        loader: 'vue-markdown-loader',
		    options: vueMarkdown 
        /*options: {
          preventExtract: true,
          use: [
            [require('markdown-it-container'), 'demo', {

              validate: function (params) {
                return params.trim().match(/^demo\s+(.*)$/);
              },

              render: function (tokens, idx) {
                if (tokens[idx].nesting === 1) {
                  // 1.获取第一行的内容使用markdown渲染html作为组件的描述
                  let qiuInfo = tokens[idx].info.trim().match(/^demo\s+(.*)$/);
                  let description = (qiuInfo && qiuInfo.length > 1) ? qiuInfo[1] : '';
                  let descriptionHTML = description ? markdownRender.render(description) : '';
                  // 2.获取代码块内的html和js代码
                  let content = tokens[idx + 1].content;
                  // 3.使用自定义开发组件【DemoBlock】来包裹内容并且渲染成案例和代码示例
                  return `<demo-block>
                  <div class="source" slot="source">${content}</div>
                  ${descriptionHTML}
                  <div class="highlight" slot="highlight">`;
                } else {
                  return '</div></demo-block>\n';
                }
              }
            }]
          ]

        }*/
      }
	  //end
	  
    ]
  },
  /*plugins: [
     extractScss
  ],*/
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
