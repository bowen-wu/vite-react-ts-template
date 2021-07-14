import FetchData, {FetchConfigInit, Method} from './fetch';
import queryString from 'query-string';
const baseUrl = __BASE_URL__;

export interface ObjectInterface {
    [propsName: string]: any;
}

export interface InstanceParamsInterface extends FetchConfigInit {
    params?: ObjectInterface;
    data?: ObjectInterface;
}

const instance = async (fetchDataParams: InstanceParamsInterface) => {
    const {url, method, data = {}, headers = undefined, params} = fetchDataParams;
    try {
        const fetchUrl = method === Method.GET && params ? `${url}?${queryString.stringify(params)}` : url;
        return await FetchData({url: fetchUrl, method, data: JSON.stringify(data), headers});
    } catch (error) {
        console.error('api error', error);
    }
};

export const getHomeData = () => instance({url: `${baseUrl}/platform/home`, method: Method.GET});
