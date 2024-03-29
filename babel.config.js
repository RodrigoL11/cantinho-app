module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@components': './src/components',
            '@screens': './src/screens',
            '@hooks': './src/hooks',
            '@services': './src/services',
            '@routes': './src/routes',
            '@config': './src/config',
            '@interfaces': './src/interfaces',
            '@utils': './src/utils',
          }
        }
      ],
    ]
  };
};
