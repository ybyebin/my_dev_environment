const hostMap = require('./hostMap');

module.exports = {
  port: 8081,
  proxy: {
    '/mock/1337': {
      target: hostMap.dev,
      changeOrigin: true,
    },
  },
};
