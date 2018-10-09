const path = require('path');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

// This helper function is not strictly necessary.
// I just don't like repeating the path.join a dozen times.
function srcPath(subdir) {
    return path.join(__dirname, "src", subdir);
}

module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist/assets')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                            namedExport: true,
                            camelCase: true,
                        }
                    }
                ]
            },{
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },{
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            actions: srcPath("actions"),
            components: srcPath("components"),
            compositions: srcPath("compositions"),
        }
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
