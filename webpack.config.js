const path = require('path')
module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    filename: 'index.bundle.js',
    path: path.resolve(__dirname, 'lib'),
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader?plugins=rewire',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    fallback: {
      'fs': false,
      'node-gyp': false,
      'npm': false,
      'path': false,
      'os': false,
      'util': false,
      'url': false,
      'child_process': false,
      'crypto': false,
      'assert': false,
      'buffer': false,
      'stream': false,
      'zlib': false,
      'tls': false,
      'net': false,
      'nock': false,
      'aws-sdk': false,
      'mock-aws-s3': false,
    },
  },
}
