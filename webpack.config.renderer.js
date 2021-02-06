const HtmlWebpackPlugin = require('html-webpack-plugin');

const pathparts = (fullPath = false) => (...args) => ['.', ...args].join('/');

export const dirmap = {
    rendererEntry: pathparts()('src', 'react.tsx'),
    outputDirectory: pathparts(true)('dist'),
    htmlTemplate: pathparts()('src', 'index.html')
}
module.exports = {
    mode: 'development',
    entry: dirmap.rendererEntry,
    target: 'electron-renderer',
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.scss', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.s(a|c)ss$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' },
                ],
            },
            {
                test: /\.ts(x?)$/,
                use: [{ loader: 'ts-loader' }],
            },
        ],
    },
    output: {
        path: dirmap.outputDirectory,
        filename: 'react.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: dirmap.htmlTemplate,
        }),
    ],
};
