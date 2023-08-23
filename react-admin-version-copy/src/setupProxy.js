const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(
        createProxyMiddleware('/postgrest', {
            target: 'http://localhost:4001/',
            changeOrigin: true,
            pathRewrite: {
                '^/postgrest': ''
            }
        })
    )
}

    