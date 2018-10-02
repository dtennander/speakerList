const path = require('path');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist/assets')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    devtool: 'cheap-module-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        publicPath: '/assets',
        proxy: {
            '/api': {
                target: 'http://localhost:8000',
                secure: false,
                changeOrigin: true,
                logLevel: "debug"
            }
        }
    },
    plugins: [new ErrorOverlayPlugin()],
};
