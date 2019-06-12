const path = require("path");
module.exports = function(webpack, { env }) {
  // const isDevelop = env === 'development';
  let rules = webpack.module.rules;
  const oneOfRules = rules.find(rule => rule.oneOf);
  oneOfRules.oneOf.splice(
    oneOfRules.oneOf.length - 1,
    0,
    {
      test: /\.less$/,
      use: [
        // isDevelop ? "style-loader" : MiniCssExtractPlugin.loader,
        "style-loader",
        {
          loader: "css-loader",
          options: {
            sourceMap: true,
            modules: true,
            localIdentName: "[name]_[local]-[hash:base64]"
          }
        },
        {
          loader: "less-loader",
          options: {
            sourceMap: true,
            javascriptEnabled: true
            // modifyVars: theme
          }
        }
      ],
      include: /src/
    },
    {
      test: /\.less$/,
      use: [
        // isDevelop ? "style-loader" : MiniCssExtractPlugin.loader,
        "style-loader",
        "css-loader",
        {
          loader: "less-loader",
          options: {
            modifyVars: {
              "primary-color": "#ccc",
              "link-color": "#ccc",
              "border-radius-base": "2px"
            },
            javascriptEnabled: true
          }
        }
      ],
      exclude: /src/
    }
  );
};