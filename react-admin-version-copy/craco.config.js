const path = require('path')
const CracoLessPlugin = require('craco-less')
const packageName = require('./package.json').name;

module.exports = {
    webpack: {
        configure: (config, { paths }) => {
            if (process.env.REACT_APP_INJECTABLE === 'true') {
                console.log('生成微应用版本');
                config.entry = `./src/index.tsx`;
                config.output.path = path.resolve(__dirname, '../dist');
                config.output.publicPath = '/';
                config.output.filename = 'assets/js/[name].[hash].js';
                config.output.library = `${packageName}-[name]`;
                config.output.libraryTarget = 'umd';

            } else {
                console.log('生成独立运行版本');
            }

            return config;
        },
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { "@primary-color": "#1DA57A" },
                        javascriptEnabled: true
                    }
                }
            }
        }
    ]
}