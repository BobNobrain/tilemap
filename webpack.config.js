// @ts-check
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/** @type {import('webpack').Configuration} */
const config = {
    mode: 'development',
    entry: {
        single: './src/entries/single.ts',
        map: './src/entries/map.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './html/index.html',
            filename: 'single.html',
            excludeChunks: ['map'],
        }),
        new HtmlWebpackPlugin({
            template: './html/index.html',
            filename: 'map.html',
            excludeChunks: ['single'],
        }),
    ],
    optimization: {
        splitChunks: false,
    },
};

module.exports = config;
