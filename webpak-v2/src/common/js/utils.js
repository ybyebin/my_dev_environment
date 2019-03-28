// rem适配
function setRemFont() {
    let docWidth = 750;
    let doc = window.document,
        docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

    let recalc = (function refreshRem() {
        let clientWidth = docEl.getBoundingClientRect().width;

        /* 8.55：小于320px不再缩小，11.2：大于420px不再放大 */
        docEl.style.fontSize = Math.max(Math.min(20 * (clientWidth / docWidth), 11.2), 8.55) * 5 + 'px';

        return refreshRem;
    })();

    /* 添加倍屏标识，安卓为1 */
    docEl.setAttribute('data-dpr', window.navigator.appVersion.match(/iphone/gi) ? window.devicePixelRatio : 1);

    if (/iP(hone|od|ad)/.test(window.navigator.userAgent)) {
        /* 添加IOS标识 */
        doc.documentElement.classList.add('ios');
        /* IOS8以上给html添加hairline样式，以便特殊处理 */
        if (parseInt(window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8)
            doc.documentElement.classList.add('hairline');
    }

    if (!doc.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
}
// 加载js
function loadJs(sid, jsurl, callback) {
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
// 移动端调试工具
function vsConsole() {
    loadJs('vConsole', 'https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/vconsole/3.0.0/vconsole.min.js', function () {
        window.vConsole = new window.VConsole();
    })
}
// 判断是否是微信
function isWeixin(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=='micromessenger'){
        return true;
    }else{
        return false;
    }
}
// 获取url中"?"符后的字串
function getRequest() {
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
// 拼接url字符串
function setUrlParam(obj) {
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
    return params.join('&')
}

// loading-show
function loadingShow() {
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
function loadingHide() {
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

export {
    setRemFont,
    loadJs,
    vsConsole,
    getRequest,
    setUrlParam,
    loadingShow,
    loadingHide,
    isWeixin
};