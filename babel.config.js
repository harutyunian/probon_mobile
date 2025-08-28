module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            'babel-preset-expo',
            '@babel/preset-typescript',
        ],
        plugins: [
            // 'transform-remove-console',
            'react-native-reanimated/plugin',
        ],
    };
};
