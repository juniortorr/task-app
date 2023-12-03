// const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { minify } = require('html-minifier-terser')
// const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

// module.exports = {
//   mode: 'development',
//   entry: {
//     index: './src/app.js'
//   }, 
//   devtool: 'inline-source-map',
//   devServer: {
//     static: './dist',
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/i,
//         use: ['style-loader', 'css-loader']
//       },
//       {
//         test: /\.(plug|svg|jpg|jpeg|gif|png)$/i,
//         type: 'asset/resource',
//       },
//       {
//         test: /\.(woff|woff2|eot|tff|otf)$/i,
//         type: 'asset/resource'
//       },
//     ]
//   }, optimization: {
//     minimizer: [
//       "...",
//       new ImageMinimizerPlugin({
//         minimizer: {
//           implementation: ImageMinimizerPlugin.imageminMinify,
//           options: {
//             plugins: [
//               ["gifsicle", { interlaced: true }],
//               ["jpegtran", { progressive: true }],
//               ["optipng", { optimizationLevel: 5 }],
//             ],
//           },
//         },
//       }),
//     ],
//   },

//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './src/index.html'
//   })
// ],
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     clean: true,
//     filename: 'main.js',
//     assetModuleFilename: 'images/[name]'
//   }
// };

const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
    output: {
      clean: true
    },
  plugins: [
    new HtmlBundlerPlugin({
      // define a relative or absolute path to template pages

      entry: {
        index: './src/views/home.eta',
      },
      js: {
        // output filename of JS
        filename: 'assets/js/[name].bundle.js',
      },
      css: {
        // output filename of CSS
        filename: 'assets/css/[name].bundle.css',
      }, 

      minify: true,
      preprocessor: 'eta',
      preprocessorOptions: {
        async: false, // defaults 'false', wenn is 'true' then must be used `await includeAsync()`
        useWith: true, // defaults 'true', use variables in template without `it.` scope
        views: 'src/views', // relative path to directory that contains templates
        // views: path.join(__dirname, 'src/views'), // absolute path to directory that contains templates
      },
      
    }),
  ],
 
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: ['css-loader']
      },
      {
        test: /\.(ico|png|jp?g|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name].[hash:8][ext][query]',
        },
      },
    ],
  },

};