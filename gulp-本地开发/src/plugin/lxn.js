/*
 * @Author: yb 
 * @Date: 2018-07-17 17:39:29 
 * @Last Modified by: yb
 * @Last Modified time: 2018-10-17 16:59:14
 */
layui.define(['zepto'],function (exports) {

    var $ = layui.zepto
    var MOD_NAME = 'lxn';
    var doc = document;
    var lxn = {
        data: {
            // url:'/api'
            url: 'http://openapi.lanxiniu.com'
        },

        init: function () {
            document.addEventListener('click', addRippleEffect, false);
            // loadJs('vConsole','https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/vconsole/3.0.0/vconsole.min.js',function(){
            //     window.vConsole = new window.VConsole();
            // })
        },
        https:https,
        loadJs: loadJs,
        setUrlParam: setUrlParam,
        getRequest: getRequest,
        log: function (obj) {
            console.log(JSON.stringify(obj, null, 2));
        },
        getEle: function (id) {
            return doc.getElementById(id)
        },
        loadingShow: loadingShow,
        loadingHide: loadingHide
    };
    /**
     * @description 动态加载  js
     * 
     * @param [string]  给js设置id
     * @param [string]   地址
     * @param [function] 回调函数
     */
    function loadJs(sid, jsurl, callback) {
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
    // 获取url中"?"符后的字串
    function getRequest() {
        var url = location.search
        var theRequest = {}
        if (url.indexOf('?') !== -1) {
            var str = url.substr(1)
            var strs = str.split('&')
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1]
            }
        }
        return theRequest
    }
    //按钮波纹
    function addRippleEffect(e) {
        var target = e.target;
        if (target.className.indexOf('btn-ripple') > -1) {
            var rect = target.getBoundingClientRect();
            var ripple = target.querySelector('.ripple');
            if (!ripple) {
                ripple = document.createElement('span');
                ripple.className = 'ripple'
                ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px'
                target.appendChild(ripple);
            }
            ripple.classList.remove('show');
            var top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
            var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
            ripple.style.top = top + 'px'
            ripple.style.left = left + 'px'
            ripple.classList.add('show');
            return false;
        }
    }
    /**
     * loading-show
     */
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
    /**
     * loading-hide
     */
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
            lock:function(el){
                if (islock) return;
                islock = true;
                (el || document).addEventListener('touchmove', fn);
            },
            unlock:function(el) {
                islock = false;
                (el || document).removeEventListener('touchmove', fn);
            }
        };
    })();

    function https(url,fun){
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
    exports(MOD_NAME, lxn);
});