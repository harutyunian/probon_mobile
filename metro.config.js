// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// ✅ OPTIMIZATION #12: SVG transformer support (required by Instagram stories)
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== 'svg');
config.resolver.sourceExts = [...config.resolver.sourceExts, 'svg'];

// ✅ OPTIMIZATION #12: Basic performance optimizations
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// ✅ OPTIMIZATION #12: Enable Hermes optimizations
config.transformer.enableBabelRCLookup = false;

// ✅ OPTIMIZATION #12: Enable tree shaking and dead code elimination
config.transformer.minifierConfig = {
    mangle: {
        keep_fnames: true,
        toplevel: true,
    },
    output: {
        ascii_only: true,
        quote_style: 3,
        wrap_iife: true,
        comments: false,
    },
    compress: {
        reduce_funcs: false,
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 3,
    },
    ecma: 2020,
    module: true,
};

// ✅ OPTIMIZATION #12: Bundle splitting and optimization
config.transformer.assetPlugins = ['expo-asset/tools/hashAssetFiles'];

// ✅ OPTIMIZATION #12: Resolver optimizations
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];
config.resolver.alias = {
    'react-native$': 'react-native',
};

// ✅ OPTIMIZATION #12: Transformer optimizations
config.transformer.getTransformOptions = async () => ({
    transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
    },
});

module.exports = config;
