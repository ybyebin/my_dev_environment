
// 拼接字符串
const setUrlParam = (obj) => {
    let params = []
    Object.keys(obj).forEach((key) => {
        let value = obj[key]
        // 如果值为undefined我们将其置空
        if (typeof value === 'undefined') {
            value = ''
        }
        // 对于需要编码的文本（比如说中文）我们要进行编码
        params.push([key, encodeURIComponent(value)].join('='))
    })
    return '?' + params.join('&')
}
// 获取url中"?"符后的字串
const getRequest = () => {
    let url = location.href
    console.log('查看url:' + url)
    let theRequest = {}
    let index = url.indexOf('?')
    if (index !== -1) {
        let str = url.substr(index + 1)
        let strs = str.split('&')
        for (let i = 0; i < strs.length; i++) {
            theRequest[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1])
        }
        return theRequest
    } else {
        return theRequest
    }
}

// 深拷贝
const deepClone = (obj) => {
    if (obj == null || typeof obj !== 'object') {
        return obj;
    }
    switch (Object.prototype.toString.call(obj)) {
        case '[object Array]': {
            let result = new Array(obj.length);
            for (let i = 0; i < result.length; ++i) {
                result[i] = deepClone(obj[i]);
            }
            return result;
        }

        case '[object Error]': {
            let result = new obj.constructor(obj.message);
            result.stack = obj.stack; // hack...
            return result;
        }

        case '[object Date]':
        case '[object RegExp]':
        case '[object Int8Array]':
        case '[object Uint8Array]':
        case '[object Uint8ClampedArray]':
        case '[object Int16Array]':
        case '[object Uint16Array]':
        case '[object Int32Array]':
        case '[object Uint32Array]':
        case '[object Float32Array]':
        case '[object Float64Array]':
        case '[object Map]':
        case '[object Set]':
            return new obj.constructor(obj);

        case '[object Object]': {
            let keys = Object.keys(obj);
            let result = {};
            for (let i = 0; i < keys.length; ++i) {
                let key = keys[i];
                result[key] = deepClone(obj[key]);
            }
            return result;
        }

        default: {
            throw new Error("Unable to copy obj! Its type isn't supported.");
        }
    }
}
// 时间格式化
const timeformat = (parmas) => {
    // 全局时间格式化输出    .format('yyyy-MM-dd hh:mm:ss')
    let date = new Date();
    let format = 'yyyy-MM-dd'
    if (parmas) {
        console.log(parmas.date)
        date = parmas.date ? new Date(parmas.date) : date;

        format = parmas.format ? parmas.format : format;
    }

    let args = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
        S: date.getMilliseconds()
    };
    if (/(y+)/.test(format)) {
        format = format.replace(
            RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    }
    for (let i in args) {
        let n = args[i];
        if (new RegExp("(" + i + ")").test(format)) {
            format = format.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? n : ("00" + n).substr(("" + n).length)
            );
        }
    }



    return format;
}

// 防抖
const debouce = (func, wait, immediate) => {
    // 防抖
    var timeout, result;
    var wait = wait || 200;
    var debounced = function () {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout;
            timeout = setTimeout(function () {
                timeout = null;
            }, wait);
            if (callNow) result = func.apply(context, args);
        } else {
            timeout = setTimeout(function () {
                func.apply(context, args);
            }, wait);
        }
        return result;
    }

    debounced.cancel = function () {
        clearTimeout(timeout);
        timeout = null;
    };
    return debounced;
}


export { setUrlParam, debouce, getRequest, timeformat }








