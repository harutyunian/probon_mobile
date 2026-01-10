// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// SVG transformer support (required by Instagram stories)
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== 'svg');
config.resolver.sourceExts = [...config.resolver.sourceExts, 'svg'];

// Basic platform configuration
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Hermes optimization
config.transformer.enableBabelRCLookup = false;

// Resolver optimizations
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

// Transformer optimizations
config.transformer.getTransformOptions = async () => ({
    transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
    },
});

// Only add minifier config for production builds
if (process.env.NODE_ENV === 'production') {
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
}

module.exports = config;
