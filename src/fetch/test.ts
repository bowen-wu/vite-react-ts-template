import { Method } from './fetch';
import { instance } from './api';

export const getHomeData = () => instance({api: `platform/home`, method: Method.GET});

export const signalFetch = (abortController: AbortController) => instance({api: `platform/home`, method: Method.GET, abortController});
