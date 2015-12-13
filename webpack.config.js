const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './index',

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },

    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader',
              query: {
                  presets: ['es2015', 'react'],
              },
            }, // to transform JSX into JS
        ],
    },

    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx'],
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],

    eslint: {
        configFile: path.resolve('./.eslintrc'),
    },

};
