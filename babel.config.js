module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',
      ["module-resolver", {
        "alias": {
          "@Navigation": "./src/navigation",
          "@Components": "./src/components",
          "@Screens": "./src/screens",
          "@Stores": "./src/stores",
          "@Assets": "./assets"
        },
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
        ]
      }],
    ],

  };
};
