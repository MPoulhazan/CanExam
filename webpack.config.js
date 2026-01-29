const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
    const config = await createExpoWebpackConfigAsync(env, argv);

    // Exclude .flow.js files from Terser minification
    config.module.rules.push({
        test: /\.flow\.js$/,
        loader: 'ignore-loader',
    });

    return config;
};
