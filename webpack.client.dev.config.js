const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [{
    name: 'client',
    entry: './src/client/index.js',
    output: {
        filename: './client.bundle.js',
        path: __dirname + '/public'
    },
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    target: 'web',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    watchOptions: {
        aggregateTimeout: 200,
        poll: 1000
    },
    plugins: [
        new MiniCssExtractPlugin({filename: 'app.css'})
    ],
}];