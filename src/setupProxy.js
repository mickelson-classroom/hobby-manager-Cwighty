/* eslint-disable no-undef */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://wightman.duckdns.org:3002',
            changeOrigin: true,
        })
    );
};