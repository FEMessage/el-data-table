const {VueLoaderPlugin} = require('vue-loader')
const path = require('path')
const glob = require('glob')

const demos = ['docs/basic.md', ...glob.sync('docs/!(basic).md')].map(
  filePath => ({
    name: path.basename(filePath, '.md'),
    content: filePath
  })
)

const faqs = glob.sync('docs/faq/*.md').map(filePath => ({
  name: path.basename(filePath, '.md'),
  content: filePath
}))

module.exports = {
  styleguideDir: 'docs',
  pagePerSection: true,
  ribbon: {
    url: 'https://github.com/FEMessage/el-data-table'
  },
  require: [
    './styleguide/element.js',
    './styleguide/axios.js',
    './styleguide/el-form-renderer.js'
  ],
  sections: [
    {
      name: 'Components',
      components: 'src/el-data-table.vue',
      usageMode: 'expand'
    },
    {
      name: 'Demo',
      sections: demos
    },
    {
      name: 'FAQ',
      sections: faqs
    }
  ],
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader']
        },
        {
          test: /\.styl(us)?$/,
          loaders: ['vue-style-loader', 'css-loader', 'stylus-loader']
        },
        {
          test: /\.(woff2?|eot|[ot]tf)(\?.*)?$/,
          loader: 'file-loader'
        }
      ]
    },
    plugins: [new VueLoaderPlugin()]
  }
}
