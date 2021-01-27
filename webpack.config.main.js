module.exports = {
  mode: "development",
  target: "electron-main",
  entry: "./src/electron.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{ loader: "ts-loader" }],
      },
    ],
  },
  output: {
    path: `${__dirname}/dist`,
    filename: "electron.js",
  },
};
