// 加载js
const loadJs = (sid, jsurl, callback) => {
    var doc = document
    var nodeHead = doc.getElementsByTagName('head')[0];
    var nodeScript = null;
    if (doc.getElementById(sid) == null) {
        nodeScript = doc.createElement('script');
        nodeScript.setAttribute('type', 'text/javascript');
        nodeScript.setAttribute('src', jsurl);
        nodeScript.setAttribute('id', sid);
        if (callback != null) {
            nodeScript.onload = nodeScript.onreadystatechange = function () {
                if (nodeScript.ready) {
                    return false;
                }
                if (!nodeScript.readyState || nodeScript.readyState == "loaded" || nodeScript.readyState == 'complete') {
                    nodeScript.ready = true;
                    callback();
                }
            };
        }
        nodeHead.appendChild(nodeScript);
    } else {
        if (callback != null) {
            callback();
        }
    }
}

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
    return  params.join('&')
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

// loading-show
const loadingShow = () => {
    var doc = document;
    var loading = doc.createElement('div');
    var loadingContent = doc.createElement('div');
    var icon = document.createElement('div');
    loading.setAttribute('class', 'lxn-loading-mask')
    loading.setAttribute('id', 'lxn-loading');
    loadingContent.setAttribute('class', 'lxn-loading');
    icon.setAttribute('class', 'lxn-loading-icon');
    loadingContent.appendChild(icon);
    loading.appendChild(loadingContent);
    doc.body.appendChild(loading);
    pageScroll.lock(loading)
}
// loading-hide
const loadingHide = () => {
    var doc = document;
    var loading = doc.getElementById('lxn-loading');
    doc.body.removeChild(loading);
    pageScroll.unlock(loading);
}
// 页面滚动
var pageScroll = (function () {
    var fn = function (e) {
        e.preventDefault();
        e.stopPropagation();
    };
    var islock = false;

    return {
        lock: function (el) {
            if (islock) return;
            islock = true;
            (el || document).addEventListener('touchmove', fn);
        },
        unlock: function (el) {
            islock = false;
            (el || document).removeEventListener('touchmove', fn);
        }
    };
})();


// 


export default ({
    // 线上调试工具
    vsConsole: function () {
        loadJs('vConsole', 'https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/vconsole/3.0.0/vconsole.min.js', function () {
            window.vConsole = new window.VConsole();
        })
    },
    setUrlParam: setUrlParam,
    getRequest: getRequest,
    loadingHide: loadingHide,
    loadingShow: loadingShow,
    https: function (url, fun) {
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'jsonp',
            jsonp: "callback",
            success: function (response) {
                fun(response)
            },
            error: function (e) {
                console.log(e)
            }
        })
    }
})