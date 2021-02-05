import axios from 'axios';
import Loading from '@common/Loading';

// 存在跨域时，根据环境变量返回不同请求域名
const domainMap = {
  trunk: 'http://platform-usertouch.trunk.koolearn.com',
  neibu: 'http://platform-usertouch.neibu.koolearn.com',
  test: 'http://platform-usertouchtest.koolearn.com',
  prod: 'https://platform-usertouch.koolearn.com',
};
const getDomain = () => {
  if (window.isDev === 'false') {
    return domainMap[window.env]
  }

  return '';
};
const responseChecker = resp => resp.status === 200;
const request = axios.create({
  des: '',
  timeout: 10000,
  rejectWhenError: true, // 接口报错时是否在interceptor中返回promise.reject
  ajaxStart: 0,
  ajaxEnd: 0,
  networkCode: 0,
  baseURL: getDomain() // 当不存在跨域时，可以删除此行代码
});

const handlerLoading = isShow => {
  if (isShow) {
    Loading.show();
  } else {
    Loading.hide();
  }
};

const onSuccess = resp => {
  const { config, data } = resp;

  handlerLoading(false);
  if (responseChecker(resp)) {
    console.log(`[接口成功]：${config.des}`);
    return data;
  } else {
    // const { message, code } = data.error;
    console.error(`[接口错误]：${config.des}`);

    // return config.rejectWhenError ? Promise.reject(resp) : data;
    return data;
  }
};

const onError = err => {
  handlerLoading(false);
  return Promise.reject(err);
};

request.interceptors.request.use(config => {
  handlerLoading(true);
  return config;
});

request.interceptors.response.use(onSuccess, onError);

export default request;
export { axios };
