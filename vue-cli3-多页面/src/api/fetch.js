import { Toast, Loading } from 'vue-ydui/dist/lib.rem/dialog';

import { setUrlParam } from '../assets/js/units'

// 提示框
const toast = msg => {
    Toast({
        mes: msg,
        timeout: 1500
    });
}
// 打开加载loading
const openLoading = msg => {
    Loading.open(msg)
}

// 关闭加载loading
const closeLoading = () => {
    Loading.close()
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


/**
  * get方法，对应get请求
  * @param {String} url [请求的url地址]
  * @param {Object} param [请求时携带的参数]
  */
export function get(url, param) {
    console.log(url)

    let loadingFlag = publicLoading.loadingFlag(param);
    let paramsData = param && param.data ? setUrlParam(param.data) : '';
    return new Promise((resolve, reject) => {

        fetch(url + paramsData)
            .then(res => {
                console.log(res)
                publicLoading.hideLoading(loadingFlag);
                if (res.ok) {
                    return res.json();
                } else {
                    return false;
                }

            })
            .then(res => {
                // console.log(JSON.stringify(res, null, 2));
                if (res) {
                    resolve(res);
                }

            })
            .catch(error => {
                console.warn('error:', error);
                publicLoading.hideLoading(loadingFlag);
                reject(error.data)
            });

    });
}
/**
  * post方法，对应post请求
  * @param {String} url [请求的url地址]
  * @param {Object} param [请求时携带的参数]
  */
export function post(url, param) {
    let loadingFlag = publicLoading.loadingFlag(param);
    let paramsData = param && param.data ? param.data : '';
    return new Promise((resolve, reject) => {

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(paramsData)
        })
            .then(res => {
                console.log(res)
                publicLoading.hideLoading(loadingFlag);
                if (res.ok) {
                    return res.json();
                } else {
                    
                    return false;
                }

            })
            .then(res => {
                if (res) {
                    resolve(res);
                }

            })
            .catch(error => {
                console.warn('error:', error);
                publicLoading.hideLoading(loadingFlag);
                reject(error.data)
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
        console.log('2')
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

    });
}