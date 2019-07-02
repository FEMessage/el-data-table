module.exports = api => ({
  presets: [
    ['@babel/preset-env', {modules: api.env('test') ? 'commonjs' : false}]
  ],
  plugins: [
    [
      '@babel/transform-runtime',
      {
        regenerator: true
      }
    ]
  ]
})
