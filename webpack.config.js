const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'client/dist');

const APP_DIR = path.resolve(__dirname, 'client/src');

const common = {
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react'],
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.jpg$/,
        loader: ['file-loader'],
      },
    ],
  },
};

const client = {
  entry: `${APP_DIR}/index.jsx`,
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
};

const server = {
  entry: `${APP_DIR}/server-index.jsx`,
  target: 'node',
  output: {
    path: BUILD_DIR,
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs-module',
  },
};

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server),
];

// const config = {
//   entry: APP_DIR + '/index.jsx',
//   output: {
//     path: BUILD_DIR,
//     filename: 'bundle.js',
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.jsx?/,
//         include: APP_DIR,
//         loader: 'babel-loader',
//         query: {
//           presets: ['env', 'react'],
//         },
//       },
//       {
//         test: /\.css$/,
//         loader: 'style-loader!css-loader',
//       },
//       {
//         test: /\.jpg$/,
//         loader: ['file-loader'],
//       },
//     ],
//   },
// };

// module.exports = config;
