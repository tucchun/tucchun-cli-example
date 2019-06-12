module.exports = function(babel, { env }) {
    babel.plugins.push([
      require.resolve('babel-plugin-import'),
      { libraryName: "antd", libraryDirectory: "es", style: 'css' }
    ]);
  };