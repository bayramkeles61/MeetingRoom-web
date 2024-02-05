const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/api',{
            target: 'https://screenapi.mintyfi.com',
            // target: 'http://localhost:8082',
            changeOrigin: true,
        })
    );
};
