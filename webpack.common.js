const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const workbox = require('workbox-webpack-plugin');

module.exports = (env, argv) => {
  const configPath =
    path.join(
      __dirname,
      'config',
      (process.env.NODE_ENV || 'development') + '.js');

  console.log('Config: ', configPath);

  return {
    entry: './js/app.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|webmanifest)$/i,
          type: 'asset/resource',
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]'
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource'
        },
        {
          test: /\.html$/i,
          loader: 'html-loader',
          options: {
            sources: false
          }
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false
      }),
      new HtmlWebpackPlugin({
        favicon: './favicon.ico',
        template: './index.html'
      }),
      new workbox.GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            urlPattern: 'https://api.avalanche.org/v2/public/products/map-layer/NWAC',
            handler: 'NetworkFirst'
          }
        ]
      })
    ],
    resolve: {
      alias: {
        config: configPath
      }
    }
  };
};
