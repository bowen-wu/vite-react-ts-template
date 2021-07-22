import { Method } from './fetch';
import { instance } from './api';

export const getHomeData = () => instance({api: `platform/home`, method: Method.GET});
