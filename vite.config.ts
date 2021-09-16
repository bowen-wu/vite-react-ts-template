import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import DevConfig from './config/vite.config.dev';
import ProdConfig from './config/vite.config.prod';
import TestConfig from './config/vite.config.test';

export default ({ mode }: { mode: string; command: string }) => {
  const config = (() => {
    switch (mode) {
      case 'production':
        return ProdConfig;
      case 'develop':
        return DevConfig;
      case 'test':
      default:
        return TestConfig;
    }
  })();

  return defineConfig({
    plugins: [reactRefresh()],
    define: {
      __PRODUCT_SUGGEST_URL__: JSON.stringify(''),
      __RESPONSE_DATA_CODE__: 200,
      __TITLE__: JSON.stringify('智能矿灯预警查询管理平台'),
      ...config.define
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
    }
  });
};
