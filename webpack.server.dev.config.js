const nodeExternals = require('webpack-node-externals');

module.exports = [
    {
        name: 'server',
        entry: [
            '@babel/polyfill',
            './src/server/index.js'
        ],
        output: {
            filename: './dist/server.bundle.js',
            path: __dirname + '/'
        },
        mode: 'development',
        target: 'node',
        // used this because of errors that consolidate throws
        externals: [nodeExternals()],
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx'],
        },
        watchOptions: {
            aggregateTimeout: 200,
            poll: 1000
        }
    }];