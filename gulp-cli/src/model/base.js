layui.define(['https'], function (exports) {
    var MOD_NAME = 'base';
    var base = {
        setUrlParam: setUrlParam,
        getRequest: getRequest,
        timeformat: timeformat,
        debounce: debounce,
        deepClone: deepClone,
        getPermissions: getPermissions,
        concatJSON: concatJSON ,
        setTableMaxHeight:setTableMaxHeight 
    };
    // 获取参数
    function getRequest() {
        var url = location.href
        console.log('查看url:' + url)
        var theRequest = {}
        var index = url.indexOf('?')
        if (index !== -1) {
            var str = url.substr(index + 1)
            var strs = str.split('&')
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1])
            }
            return theRequest;
        } else {
            return theRequest;
        }
    }

    // 拼接字符串
    function setUrlParam(obj) {
        var params = []
        Object.keys(obj).forEach(function (key) {
            var value = obj[key]
            // 如果值为undefined我们将其置空
            if (typeof value === 'undefined') {
                value = ''
            }
            params.push([key, encodeURIComponent(value)].join('='))
        })
        return params.join('&')
    }

    // 时间格式化
    function timeformat(date, format, week) {
        // 全局时间格式化输出    .format('yyyy-MM-dd hh:mm:ss')
            console.log(date)
        var args = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
            S: date.getMilliseconds()
        };
        console.log(args)
        if (/(y+)/.test(format)) {
            format = format.replace(
                RegExp.$1,
                (date.getFullYear() + "").substr(4 - RegExp.$1.length)
            );
        }
        for (var i in args) {
            var n = args[i];
            if (new RegExp("(" + i + ")").test(format)) {
                format = format.replace(
                    RegExp.$1,
                    RegExp.$1.length === 1 ? n : ("00" + n).substr(("" + n).length)
                );
            }
        }
        console.log(format)

        if (week) {
            var day = date.getDay();
            console.log('查看' + day)
            var show_day = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][day];
            format = show_day + format;
        }

        return format;
    }
    // 防抖
    function debounce(func, wait, immediate) {
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
                }, wait)
                if (callNow) result = func.apply(context, args)
            } else {
                timeout = setTimeout(function () {
                    func.apply(context, args)
                }, wait);
            }
            return result;
        };

        debounced.cancel = function () {
            clearTimeout(timeout);
            timeout = null;
        };
        return debounced;
    }

    // 深拷贝
    function deepClone(obj) {
        if (obj == null || typeof obj !== 'object') {
            return obj;
        }
        switch (Object.prototype.toString.call(obj)) {
            case '[object Array]': {
                var result = new Array(obj.length);
                for (var i = 0; i < result.length; ++i) {
                    result[i] = deepClone(obj[i]);
                }
                return result;
            }

            case '[object Error]': {
                var result = new obj.constructor(obj.message);
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
                var keys = Object.keys(obj);
                var result = {};
                for (var i = 0; i < keys.length; ++i) {
                    var key = keys[i];
                    result[key] = deepClone(obj[key]);
                }
                return result;
            }

            default: {
                throw new Error("Unable to copy obj! Its type isn't supported.");
            }
        }
    }

    // 获取当前存储的权限
    function getPermissions() {
        return JSON.parse(localStorage.getItem('permissions'));
    }

    // 合并json 用于搜索拼接条件
    function concatJSON(obj1, obj2) {
        for (var key in obj2) {
            if (obj2.hasOwnProperty(key)) {
                obj1[key] = obj2[key];
            }
        }
        return obj1;
    }

    // 根据屏幕高度设置当前表格高度
    function setTableMaxHeight(clas){
        return $('.'+clas)[0].getBoundingClientRect().height - 50;
    }
    exports(MOD_NAME, base);
});