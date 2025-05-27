/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configuração para SVG
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== 'svg');
config.resolver.sourceExts = [...config.resolver.sourceExts, 'svg', 'cjs'];

// Workaround para o erro de Surface Registry
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  'react-native-screens': require.resolve('react-native-screens'),
};

module.exports = config;
