import { defineConfig, UserConfigExport } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

export default (): UserConfigExport => {
  return defineConfig({
    plugins: [reactRefresh()],
    define: {
      __PRODUCT_SUGGEST_URL__: JSON.stringify(''),
      __RESPONSE_DATA_CODE__: 200,
      __TITLE__: JSON.stringify('讯飞煤炭安全监测平台'),
      __BASE_URL__: JSON.stringify('')
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@import "./src/assets/styles/_variable.scss"; @import "./src/assets/styles/_mixin.scss"; @import "./src/assets/styles/_zIndex.scss"; @import "./src/assets/styles/_function.scss";'
        },
        less: {
          javascriptEnabled: true,
          modifyVars: {
            'primary-color': '#6680FF',
            'error-color': '#FF80BF'
          }
        }
      }
    },
    resolve: {
      alias: [{ find: /^~/, replacement: '' }]
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://10.40.96.166:48080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/api')
        }
      }
    }
  });
};
