// @ts-check
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entries = [
    'single',
    'noise',
    'space',
    'map',
];

/** @type {import('webpack').Configuration} */
const config = {
    mode: 'development',
    entry: Object.fromEntries(entries.map((name) => [name, `./src/entries/${name}.ts`])),
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
        ...entries.map((name) => new HtmlWebpackPlugin({
            template: './html/index.html',
            filename: `${name}.html`,
            excludeChunks: entries.filter((other) => other !== name),
        })),
    ],
    optimization: {
        splitChunks: false,
    },
};

module.exports = config;
