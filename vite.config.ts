import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import DevConfig from './config/vite.config.dev';
import ProdConfig from './config/vite.config.prod';

export default ({ command, mode }: { mode: string, command: string; }) => {
  console.log(command);
  console.log(mode);

  const config = mode === 'production' ? ProdConfig : DevConfig;

  return defineConfig({
    plugins: [ reactRefresh() ],
    define: {
      __PRODUCT_SUGGEST_URL__: JSON.stringify(''),
      ...config.define
    }
  });
}
