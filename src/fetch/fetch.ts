export enum Method {
    POST = 'post',
    GET = 'get',
}

export interface FetchConfigHeaders {
    'content-type'?: string;
}

export interface FetchConfigData {
    data?: string;
}

export interface FetchConfigBasic {
    method: Method;
    headers?: FetchConfigHeaders;
}

export interface FetchConfigInit extends FetchConfigBasic{
    url: string;
}

export interface FetchConfig extends FetchConfigData, FetchConfigInit {}

const fetchConfigHeaders: FetchConfigHeaders = {
    'content-type': 'application/x-www-form-urlencoded'
};

const initFetchConfig = {
    mode: 'cors',  // 请求模式 'cors' 'no-cors' 'same-origin'
    credentials: 'same-origin',  // 请求的凭证
    cache: 'no-cache',
    redirect: 'follow',  // 可用的 redirect (重定向) 模式: 'follow'(自动重定向)
    referrer: 'no-referrer',
};

const FetchData = async (fetchDataParams: FetchConfig) => {
    const {url, method, data: body, headers} = fetchDataParams;
    try {
        let fetchConfig = JSON.parse(JSON.stringify(initFetchConfig));
        fetchConfig.method = method;
        fetchConfig.headers = headers || fetchConfigHeaders;
        if (method === Method.POST) {
            fetchConfig.body = body
        }

        const res = await fetch(url, fetchConfig);
        if (res.status === 200) {
            const result = await res.json();
            if (result.code !== __RESPONSE_DATA_CODE__) {
                // Toast.info(result.msg, 1);
                throw new Error(result.error);
            }
            return result;
        }
        // TODO: 定制 401 + 5XX 页面
    } catch (error) {
        console.error(error);
    }
};

export default FetchData;
