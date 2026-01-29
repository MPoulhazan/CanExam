const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
    const config = await createExpoWebpackConfigAsync(env, argv);

    // Exclude .flow.js files from Terser minification
    if (config.optimization && config.optimization.minimizer) {
        config.optimization.minimizer.forEach((plugin) => {
            if (plugin.constructor.name === 'TerserPlugin') {
                plugin.options.exclude = /\.flow\.js$/;
            }
        });
    }

    return config;
};
