const path = require('path');
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {

    // bundling mode
    mode: 'production',

    devtool: "source-map",

    // entry point for app
    entry: './src/app.ts',

    // exclude node_modules
    externals: [nodeExternals()],
    externalsPresets: {
        node: true
    },

    // output bundles (location)
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },

    optimization: {
        minimize: false
    },

    // file resolutions
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            "@contract": path.resolve(__dirname, '../contract'),
            "logger": path.resolve(__dirname, "./src/helpers/logger") 
        }
    },

    // loaders
    module: {
        rules: [
            {
                test: /\.ts/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            'Logger': ['logger', 'Logger']
          }),
        new NodemonPlugin({
            nodeArgs: ["--enable-source-maps", "--inspect"]
        })
    ]
};