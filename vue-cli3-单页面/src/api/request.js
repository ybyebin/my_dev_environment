import axios from 'axios'
import { Message, Spin } from 'view-design';
import { getToken, systemLogin,reLogin } from '../assets/js/publicMethod'



// 提示框
const toast = msg => {
    Message.error(msg);
}
// 打开加载loading
const openLoading = msg => {
    Spin.show({
        render: (h) => {
            return h('div', [
                h('div', {
                    'class': 'demo-spin-icon-load ivu-icon ivu-icon-ios-loading',

                }),
                h('div', 'Loading')
            ])
        }
    });
}

// 关闭加载loading
const closeLoading = () => {
    Spin.hide();
}

const publicLoading = {
    loadingFlag: param => {
        let flag = true;
        if (param && !param.loading && Object.prototype.toString.call(param.loading) === "[object Boolean]") {
            flag = false;
        }

        publicLoading.showLoading(flag);

        return flag;
    },
    showLoading: param => {
        let loadingFlag = param ? true : false;
        // 是否有loading
        if (loadingFlag) {
            openLoading();
        }
    },
    hideLoading: param => {
        let loadingFlag = param ? true : false;
        if (loadingFlag) {
            closeLoading();
        }
    }
}

// 开始设置请求 发起的拦截处理
// config 代表发起请求的参数的实体
axios.interceptors.request.use(config => {
    let token = getToken();
    let flag = systemLogin.getFlag();
    let contenTypeKey = 'Content-Type';
    let contenTypeVal = 'application/json;charset=utf-8';


    if (token && flag) {
        config.headers['Authorization'] = token;
    }

    config.headers['Client'] = true;
    config.timeout = 20000;
    config.headers.post[contenTypeKey] = contenTypeVal;
    config.headers.delete[contenTypeKey] = contenTypeVal;
    config.headers.put[contenTypeKey] = contenTypeVal;

    return config;
}, error => {
    return Promise.reject(error)
})

// 请求到结果的拦截处理
axios.interceptors.response.use(config => {
    let data = config.data;
    let res = {
        status: true,
        data: data.detail
    }
    let code = data.code;
    if (code !== '0000') {
        res.status = false;
        toast(data.msg);

        let rlArray = ['RL0001', 'RL0002', 'RL0003'];//需要重新登录的标志
        if (rlArray.indexOf(code) > -1) {
            setTimeout(() => {
                reLogin();
            }, 1000)
        }
    }
    // 返回请求正确的结果
    return res;

}, error => {
    console.log(error)
    // 错误的请求结果处理，这里的代码根据后台的状态码来决定错误的输出信息
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                error.message = '错误请求'
                break
            case 401:
                error.message = '未授权，请重新登录'
                break
            case 403:
                error.message = '拒绝访问'
                break
            case 404:
                error.message = '请求错误,未找到该资源'
                break
            case 405:
                error.message = '请求方法未允许'
                break
            case 408:
                error.message = '请求超时'
                break
            case 500:
                error.message = '服务器端出错'
                break
            case 501:
                error.message = '网络未实现'
                break
            case 502:
                error.message = '网络错误'
                break
            case 503:
                error.message = '服务不可用'
                break
            case 504:
                error.message = '网络超时'
                break
            case 505:
                error.message = 'http版本不支持该请求'
                break
            case 302:

                break;
            default:
                error.message = `连接错误${error.response.status}`
        }
    } else {
        error.message = "连接到服务器失败"
    }
    toast(error.message)
    publicLoading.hideLoading(true);

    return Promise.reject(error.message)
});

/**
  * get方法，对应get请求
  * @param {String} url [请求的url地址]
  * @param {Object} param [请求时携带的参数]
  */
export function get(url, param) {
    return new Promise((resolve, reject) => {

        let loadingFlag = publicLoading.loadingFlag(param);
        let paramsData = param && param.data ? param.data : {};

        console.log(paramsData)
        axios.get(url, {
            params: paramsData
        }).then(res => {
            publicLoading.hideLoading(loadingFlag);
            if (res.status) {
                resolve(res.data);
            }
        }).catch(err => {
            reject(err.data)
        });

    });
}
/**
  * post方法，对应post请求
  * @param {String} url [请求的url地址]
  * @param {Object} param [请求时携带的参数]
  */
export function post(url, param) {
    return new Promise((resolve, reject) => {
        let loadingFlag = publicLoading.loadingFlag(param);
        let paramsData = param && param.data ? param.data : {};

        axios.post(url, paramsData)
            .then(res => {
                publicLoading.hideLoading(loadingFlag);
                if (res.status) {
                    resolve(res.data);
                }
            })
            .catch(err => {
                reject(err.data)
            });
    });
}

/**
  * put方法，对应put请求
  * @param {String} url [请求的url地址]
  * @param {Object} param [请求时携带的参数]
  */
export function put(url, param) {
    return new Promise((resolve, reject) => {
        let loadingFlag = publicLoading.loadingFlag(param);
        let paramsData = param && param.data ? param.data : {};

        axios.put(url, paramsData)
            .then(res => {
                publicLoading.hideLoading(loadingFlag);
                if (res.status) {
                    resolve(res.data);
                }
            })
            .catch(err => {
                reject(err.data)
            });
    });
}

/**
  * delete方法，对应delete请求
  * @param {String} url [请求的url地址]
  * @param {Object} param [请求时携带的参数]
  */
export function deletes(url, param) {
    // console.log('')
    console.log('删除参数', JSON.stringify(param, null, 2));

    return new Promise((resolve, reject) => {
        let loadingFlag = publicLoading.loadingFlag(param);
        let paramsData = param && param.data ? param.data : {};
        axios.delete(url, { data: JSON.stringify(paramsData) })
            .then(res => {
                publicLoading.hideLoading(loadingFlag);
                if (res.status) {
                    resolve(res.data);
                }
            })
            .catch(err => {
                reject(err.data);
            });
    });
}
