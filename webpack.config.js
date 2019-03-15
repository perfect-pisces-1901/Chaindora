module.exports = {
  entry: './client/index.js',
  mode: 'development',
  output: {
    path: __dirname, // assumes your bundle.js will also be in the root of your project folder
    filename: './public/bundle.js'
  },
  devtool: 'source-maps',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
