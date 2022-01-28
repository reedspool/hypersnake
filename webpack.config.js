const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
    const DEV_MODE = argv.mode === "development";
    const outputDir = DEV_MODE ? 'dev-dist' : 'dist';

    console.log("Running in mode: ", DEV_MODE ? "development" : "production");
    console.log("Output Dir: ", outputDir);
    return {
        mode: DEV_MODE ? "development" : "production",
        entry: {
            index: {
                import: './src/index.js',
                // dependOn: ['css', 'htmx', 'hyperscript']
            },
            // css: { import: './src/index.css' },
            // htmx: { import: 'htmx.org' },
            // hyperscript: { import: 'hyperscript.org' },
        },
        // devtool: 'inline-source-map',
        devServer: {
            static: `/${outputDir}`
        },
        output: {
            path: path.resolve(__dirname, outputDir),
            filename: "[name].bundle.js",
            clean: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.(scss|css)$/,
                    use: [DEV_MODE ? "style-loader" : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.html$/,
                    loader: "raw-loader"
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: `${DEV_MODE ? '[DEV] ' : ''}Snake!`,
                minify: DEV_MODE ? false : true,
                template: "./src/index.html"
            }),
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css",
                ignoreOrder: false
            }),
        ],
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all'
            },
            minimizer: [
                '...',
                new CssMinimizerPlugin(),
            ]
        }
    }
}
