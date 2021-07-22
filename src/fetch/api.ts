import FetchData, { FetchConfigBasic, Method } from './fetch';
import queryString from 'query-string';

export interface ObjectInterface {
    [propsName: string]: any;
}

export interface InstanceParamsInterface extends FetchConfigBasic {
    api: string;
    params?: ObjectInterface;
    data?: ObjectInterface;
}

export const instance = async (fetchDataParams: InstanceParamsInterface) => {
    const {api, method, data = {}, headers = undefined, params} = fetchDataParams;
    try {
        const fetchUrl = method === Method.GET && params ? `${__BASE_URL__}${api}?${queryString.stringify(params)}` : `${__BASE_URL__}${api}`;
        return await FetchData({url: fetchUrl, method, data: JSON.stringify(data), headers});
    } catch (error) {
        console.error('api error', error);
    }
};

