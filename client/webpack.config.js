const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development', // Can change to 'production' for the final build
    
    // Set context to ensure the correct base directory is used
    context: path.resolve(__dirname, 'client'),  // Set client directory as context

    entry: {
      main: './src/js/index.js',     // Path relative to 'client/'
      install: './src/js/install.js' // Path relative to 'client/'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'client/dist'),
    },
    plugins: [
      // Generates an HTML file that includes your bundles
      new HtmlWebpackPlugin({
        template: './index.html', // Path relative to 'client/'
        title: 'Text Editor PWA',
      }),

      // Injects the custom service worker file
      new InjectManifest({
        swSrc: './src-sw.js', // Path relative to 'client/'
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
            src: path.resolve('src/images/logo.png'), // Path relative to 'client/'
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
