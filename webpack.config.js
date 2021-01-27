module.exports = {
    mode: 'development',
    entry: './src/electron.ts',
    target: 'electron-main',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [ { loader: 'ts-loader' }]
            }
        ]
    },
    output: {
        path: `${__dirname}/src`,
        filename: 'electron.js'
    }
}