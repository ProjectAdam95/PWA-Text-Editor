const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'production',

    // Entry points, pointing to the correct JS files
    entry: {
      main: './src/js/index.js', // Ensure the path is correct (relative to client folder)
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'), // Output folder should match the client/dist
    },
    plugins: [
      // Generates HTML file that includes the bundled scripts
      new HtmlWebpackPlugin({
        template: './index.html', // Correct relative path to the HTML file
        title: 'Text Editor PWA',
      }),

      // Injecting custom service worker
      new InjectManifest({
        swSrc: './src-sw.js', // Correct relative path to the service worker
        swDest: 'service-worker.js',
      }),

      // Manifest for PWA with correct path to the logo
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
            src: path.resolve('src/images/logo.png'), // Correct path to the logo
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],
    module: {
      rules: [
        // CSS loaders for handling CSS files
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'], // Add CSS and Style loaders here
        },
        // Babel loader for transpiling JS
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
