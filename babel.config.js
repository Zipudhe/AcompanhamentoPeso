module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extension: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: { "@components": "./src/components" }
        }
      ],
      [
        'module:react-native-dotenv',
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env",
          safe: false,
          allowUndefined: true,
          verbose: false
        }
      ]
    ]
  };
};
