module.exports = {
  components: 'src/*.vue',
  ribbon: {
    url: 'https://github.com/FEMessage/el-data-table'
  },
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
          use: ['style-loader', 'css-loader', 'stylus-loader']
        }
      ]
    }
  },
  showUsage: true,
  showCode: true,
  styleguideDir: 'docs'
}
