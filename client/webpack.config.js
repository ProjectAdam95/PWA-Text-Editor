const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development', // Can change to 'production' for the final build
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Generates an HTML file that includes your bundles
      new HtmlWebpackPlugin({
        template: './index.html', // Path to your HTML template
        title: 'Text Editor PWA',
      }),

      // Injects the custom service worker file
      new InjectManifest({
        swSrc: './src-sw.js', // Path to the custom service worker
        swDest: 'service-worker.js', // Output path for the service worker
      }),

      // Generates a manifest.json file for your PWA
      new WebpackPwaManifest({
        fingerprints: false, // Optional: removes hashing of file names
        inject: true, // Automatically links manifest.json in HTML
        name: 'Text Editor',
        short_name: 'TextEditor',
        description: 'A simple text editor PWA!',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'), // Path to your icon
            sizes: [96, 128, 192, 256, 384, 512], // Icon sizes
            destination: path.join('assets', 'icons'), // Output folder
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
              presets: ['@babel/preset-env'], // Transpiles modern JS
              plugins: ['@babel/plugin-transform-runtime'], // Enables async/await
            },
          },
        },
      ],
    },
  };
};
