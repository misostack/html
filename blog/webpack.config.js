const path = require("path");
const webpack = require("webpack");
const isProductionMode = process.env.NODE_ENV === "production";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const outputPath = path.resolve(__dirname, "docs");

const entry = {
  main: ["./src/js/main.js", "./src/styles/main.scss"],
  home: ["./src/js/home.js", "./src/styles/home.scss"],
  page: ["./src/styles/page.scss"],
  plugins: ["./src/js/ResizeSensor.js", "./src/js/theia-sticky-sidebar.js"],
  // account: ['./js/account.js', './styles/account.scss'],
};

const rules = [
  {
    test: /\.(css|scss)$/i,
    use: [
      isProductionMode
        ? {
            loader: MiniCssExtractPlugin.loader,
          }
        : { loader: "style-loader" },
      { loader: "css-loader" },
      {
        loader: "postcss-loader",
        options: { implementation: require("postcss") },
      },
      { loader: "sass-loader" },
    ],
  },
  // images
  {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  },
];

const plugins = [];
if (isProductionMode) {
  plugins.push(
    new CleanWebpackPlugin({
      dry: false,
      verbose: true,
      cleanOnceBeforeBuildPatterns: [
        "**/*",
        "!favicon.ico",
        // "!directoryToExclude/**",
      ],
    })
  );
  plugins.push(
    new MiniCssExtractPlugin({
      filename: "[name].css",
    })
  );
}
plugins.push(
  new CopyPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, "src/assets/images"),
        to: path.resolve(__dirname, "docs/assets/images"),
      },
    ],
    options: {
      concurrency: 100,
    },
  })
);
const optimization = isProductionMode
  ? {
      minimizer: [
        // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
        `...`,
        new CssMinimizerPlugin(),
      ],
    }
  : {};
// HTML pages
plugins.push(
  new HtmlWebpackPlugin({
    title: "Home",
    filename: "index.html",
    template: "./src/index.html",
    chunks: ["main", "plugins", "home"],
  }),
  new HtmlWebpackPlugin({
    title: "Page Content",
    filename: "page.html",
    template: "./src/page.html",
    chunks: ["main", "page"],
  }),
  new HtmlWebpackPlugin({
    title: "Post Content",
    filename: "post.html",
    template: "./src/post.html",
    chunks: ["main", "page"],
  }),
  new HtmlWebpackPlugin({
    title: "Category",
    filename: "category.html",
    template: "./src/category.html",
    chunks: ["main"],
  })
);
// External JS Libs
plugins.push(
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
  })
);

// Dev server
const devServer = {
  static: {
    directory: path.join(__dirname, "dist"),
  },
  hot: false,
  compress: true,
  // port: 9000,
};
const resolve = {
  alias: {
    "@": path.resolve(__dirname, "src/"),
  },
};

module.exports = {
  entry,
  output: {
    path: outputPath,
    assetModuleFilename: "assets/images/[name][ext][query]",
  },
  module: {
    rules,
  },
  plugins,
  devServer,
  resolve,
  optimization,
};
