const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'production', // Change to production for final builds

    entry: {
      main: './src/js/index.js',  // Correct path relative to 'client'
      install: './src/js/install.js',  // Correct path relative to 'client'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),  // Ensure correct output path
    },
    plugins: [
      // Generates an HTML file that includes your bundles
      new HtmlWebpackPlugin({
        template: './index.html',  // Path relative to 'client'
        title: 'Text Editor PWA',
      }),

      // Injects the custom service worker file
      new InjectManifest({
        swSrc: './src-sw.js',  // Correct path relative to 'client'
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
            src: path.resolve(__dirname, 'src/images/logo.png'),  // Corrected path
            sizes: [96, 128, 192, 256, 384, 512],  // Icon sizes
            destination: path.join('assets', 'icons'),  // Output folder
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
