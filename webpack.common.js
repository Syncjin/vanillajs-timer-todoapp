const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: {
      import: "./src/index.js",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "TimerTodoList",
      template: "./public/index.html",
    }),
  ],
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    globalObject: "this",
    library: {
      name: "TimerTodoList",
      type: "umd",
    },
    clean: true,
  },
  stats: "normal",
  optimization: {
    moduleIds: "deterministic",
    runtimeChunk: "single",
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"], // 체인은 역순으로 실행
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // 이미지 파일 처리
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // 폰트 파일 처리
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@store": path.resolve(__dirname, "src/store"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
};
