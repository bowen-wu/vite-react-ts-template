import { Method } from './fetch';
import { instance } from './api';

export const getCameraNameList = () =>
  instance({ api: `/api/monkey/camera/getCameraNameList`, method: Method.GET });
