const webpack = require('webpack');
const path = require('path');

const isDebug = process.env.NODE_ENV !== 'production';

module.exports = (watch = false) => ({
  entry: path.resolve('./app/scripts/app.js'),
  output: {
    publicPath: '/assets/scripts/',
    filename: 'app.min.js',
    path: path.resolve('./dist/assets/scripts/'),
  },
  watch: isDebug,
  mode: isDebug ? 'development' : 'production',
  module: {

    // {
    //   test: new RegExp('scrollmagic/scrollmagic/uncompressed'),
    //   use: [
    //     {
    //       loader: 'imports-loader',
    //       options: {
    //         additionalCode:
    //       'var define = false; /* Disable AMD for misbehaving libraries */',
    //       },
    //     },
    //   ],
    // },
    rules: [{
      test: /\.glsl$/,
      use: 'raw-loader',
    },
    {
      test: new RegExp('scrollmagic/scrollmagic/uncompressed'),
      use: [
        {
          loader: 'imports-loader',
          options: {
            additionalCode:
          'var define = false; /* Disable AMD for misbehaving libraries */',
          },
        },
      ],
    }, {
      enforce: 'pre',
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'eslint-loader',
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    },
    ],
  },
});
