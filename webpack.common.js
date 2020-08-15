const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest')
const webpack = require("webpack");
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app.js',
        detailTeam: './src/detail.js',
    },
    output: {
        path: path.resolve(__dirname, "public"),
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
            "gcm_sender_id": "188027761654",
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
                {
                    src: path.resolve('src/img/icons/maskable_icon.png'),
                    size: '1024x1024',
                    purpose: 'any maskable'
                }
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
                { from: 'src/img', to: 'src/img' },
                { from: 'src/push.js', to: 'push.js' }
            ],
        }),
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, 'src/service-worker.js'),
        }),
        new WorkboxPlugin.InjectManifest({
            swSrc: "./src/service-worker.js",
            swDest: "sw.js"
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        })
    ]
}