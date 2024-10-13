const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'production', // Change to production for deployment

    // Ensure paths are correctly referencing the client/src folder
    entry: {
      main: './client/src/js/index.js', // Correct path
      install: './client/src/js/install.js', // Correct path
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'client/dist'), // Output to client/dist
    },
    plugins: [
      // Generates an HTML file that includes your bundles
      new HtmlWebpackPlugin({
        template: './client/index.html', // Correct path to HTML template
        title: 'Text Editor PWA',
      }),

      // Injects the custom service worker file
      new InjectManifest({
        swSrc: './client/src-sw.js', // Correct path to the service worker
        swDest: 'service-worker.js',
      }),

      // Generates a manifest.json file for your PWA
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Text Editor',
        short_name: 'TextEditor',
        description: 'A simple text editor PWA!',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('client/src/images/logo.png'), // Correct path to logo
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        // CSS loaders
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        // Babel loader to transpile ES6+ to ES5
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
