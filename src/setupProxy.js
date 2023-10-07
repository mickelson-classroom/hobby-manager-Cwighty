const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    console.log('Proxy middleware is initializing...'); 
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://wightman.duckdns.org:3002',
            changeOrigin: true,
        })
    );
    console.log('Proxy middleware is ready.'); 
};