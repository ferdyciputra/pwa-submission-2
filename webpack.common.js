const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest')

module.exports = {
    entry: {
        app: './src/app.js',
        detailTeam: './src/detail.js',
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name]/[name].bundle.js"
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true, // webpack@1.x
                            disable: true, // webpack@2.x and newer
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new WebpackPwaManifest({
            "name": "Football Apps",
            "short_name": "Football Apps",
            "description": "Aplikasi Informasi tentang Sepak Bola",
            "display": "standalone",
            "background_color": "#5c6bc0",
            "theme_color": "#5c6bc0",
            "icons": [{
                    src: path.resolve("src/img/icons/icon-72x72.png"),
                    sizes: "72x72",
                },
                {
                    src: path.resolve("src/img/icons/icon-96x96.png"),
                    sizes: "96x96",
                },
                {
                    src: path.resolve("src/img/icons/icon-128x128.png"),
                    sizes: "128x128",
                },
                {
                    src: path.resolve("src/img/icons/icon-144x144.png"),
                    sizes: "144x144",
                },
                {
                    src: path.resolve("src/img/icons/icon-152x152.png"),
                    sizes: "152x152",
                },
                {
                    src: path.resolve("src/img/icons/icon-192x192.png"),
                    sizes: "192x192",
                },
                {
                    src: path.resolve("src/img/icons/icon-384x384.png"),
                    sizes: "512x512",
                },
            ]
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            chunks: ["app"],
            filename: "index.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/nav.html",
            filename: "nav.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/detail-team.html",
            chunks: ["detailTeam"],
            filename: "detail-team.html"
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/pages', to: 'src/pages' },
                { from: 'src/img', to: 'src/img' }
            ],
        }),
        new WorkboxPlugin.InjectManifest({
            swSrc: './src/service-worker.js'
        })
    ]
}