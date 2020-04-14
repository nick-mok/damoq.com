const Dotenv = require('dotenv-webpack');

module.exports = {
webpack: (config, { isServer }) => {
        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
            config.node = {
                fs: 'empty'
            }
        }

        // Add the new plugin to the existing webpack plugins
        config.plugins.push(new Dotenv({ silent: true }));

        return config
    }
}