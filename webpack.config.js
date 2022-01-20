const path = require('path')

module.exports = {
    entry: "./src/app.js",
    output: {
        filename: "bundle.min.js",
        path: path.resolve(__dirname, 'dist', 'js')
    },
    devServer: {
        port: 8080,
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        historyApiFallback: true,
        compress: true,
        hot: true,
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, 'src'),
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
        ],
    },
}