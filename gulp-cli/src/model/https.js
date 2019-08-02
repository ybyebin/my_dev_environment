layui.define([], function (exports) {
    // var $ = layui.jquery
    var layer = layerInit();
    var loadingFlag;
    var MOD_NAME = 'https';
    var noPermission = '无权限';


    var https = {
        // api: 'https://vending.ifengniao.com',

        // api: 'http://192.168.1.214:8083',
        api: 'http://101.201.252.206:8083',
        // api:'',

        url: {
           

        },
        httpGet: httpGet,
        httpPost: httpPost,
        httpPut: httpPut,
        httpDelete: httpDelete,
        getHeader: getHeader,
        layer: layer
    };


    function getHeader() {
        return {
            Authorization: 'Basic ' + localStorage.getItem('base64'),
            Client: true
        }
    }


    /**
     * get 请求
     * @param {data:"",url:"",success:'',error:'',hideLoading} parma 
     */
    function httpGet(parma) {
        $.ajax({
            url: https.api + parma.url,
            headers: getHeader(),
            type: 'get',
            dataType: 'json',
            data: parma.data,
            beforeSend: function () {
                if (!parma.hideLoading) {
                    showLoading();
                }
            },
            complete: function () {
                if (!parma.hideLoading) {
                    hideLoading();
                }
            },
            success: function (res) {
                if (res.code == '0000') {
                    console.log(JSON.stringify(res, null, 2))
                    parma.success(res);
                } else if (res.userId && res.userName) {
                    // 获取用户信息判断
                    parma.success(res);
                } else {
                    msg(res.msg);
                }
            },
            error: function (xhr) {
                if (xhr.status == 401) {
                    msg(noPermission);
                    if (parma.error) {
                        parma.error();
                    }
                }
            }
        })
    }

    /**
     * post 请求
     * @param {data:"",url:"",func:''} parma 
     */
    function httpPost(parma) {
        console.log(JSON.stringify(parma.data, null, 2))
        $.ajax({
            url: https.api + parma.url,
            headers: getHeader(),
            type: 'post',
            dataType: 'json',
            data: parma.data ? JSON.stringify(parma.data) : '{}',
            contentType: 'application/json;charset=utf-8',
            beforeSend: function () {
                if (!parma.hideLoading) {
                    showLoading();
                }
            },
            complete: function () {
                if (!parma.hideLoading) {
                    hideLoading();
                }
            },
            success: function (res) {
                if (res.code == '0000') {
                    parma.success(res);
                } else {
                    msg(res.msg)
                }
            },
            error: function (xhr) {
                if (xhr.status == 401) {
                    msg(noPermission);
                    if (parma.error) {
                        parma.error();
                    }
                }
            }
        })
    }
    /**
     * put 请求
     * @param {data:"",url:"",func:''} parma 
     */
    function httpPut(parma) {
        $.ajax({
            url: https.api + parma.url,
            headers: getHeader(),
            type: 'put',
            dataType: 'json',
            data: JSON.stringify(parma.data),
            contentType: 'application/json;charset=utf-8',
            beforeSend: function () {
                if (!parma.hideLoading) {
                    showLoading();
                }
            },
            complete: function () {
                if (!parma.hideLoading) {
                    hideLoading();
                }
            },
            success: function (res) {
                if (res.code == '0000') {
                    parma.success(res);
                } else {
                    msg(res.msg)
                }
            },
            error: function (xhr) {
                if (xhr.status == 401) {
                    msg(noPermission);
                    if (parma.error) {
                        parma.error();
                    }
                }
            }
        })
    }
    /**
     * delete 请求
     * @param {data:"",url:"",func:''} parma 
     */
    function httpDelete(parma) {

    }

    /**
     * 显示loading
     */
    function showLoading() {
        if (!loadingFlag) {
            loadingFlag = layer.open({ type: 2 });;
        }
    }
    /**
     * 隐藏 loading
     */
    function hideLoading() {
        layer.close(loadingFlag);
        loadingFlag = null;
    }

    // 弹窗提示
    function msg(msg) {
        layer.open({
            content: msg
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
    }




    function layerInit() {
        var doc = document,
            query = 'querySelectorAll',
            claname = 'getElementsByClassName',
            S = function (s) {
                return doc[query](s);
            };
        //默认配置
        var config = {
            type: 0
            , shade: false
            , shadeClose: true
            , fixed: true
            , anim: 'scale' //默认动画类型
        };
        var ready = {
            extend: function (obj) {
                var newobj = JSON.parse(JSON.stringify(config));
                for (var i in obj) {
                    newobj[i] = obj[i];
                }
                return newobj;
            },
            timer: {},
            end: {}
        };
        var index = 0,
            classs = ['layui-m-layer'],
            Layer = function (options) {
                var that = this;
                that.config = ready.extend(options);
                that.view();
            };
        Layer.prototype.view = function () {
            var that = this, config = that.config, layerbox = doc.createElement('div');

            that.id = layerbox.id = classs[0] + index;
            layerbox.setAttribute('class', classs[0] + ' ' + classs[0] + (config.type || 0));
            layerbox.setAttribute('index', index);

            if (config.type === 2) {
                config.content = '<div class="layui-layer-loading1"></div>';
            }

            // if (config.skin) config.anim = 'scale';
            // if (config.skin === 'msg') config.shade = false;

            layerbox.innerHTML = ''
                + '<div class="layui-m-layermain">'
                + '<div class="layui-m-layersection">'
                + '<div class="layui-m-layerchild ' + (config.skin ? 'layui-m-layer-' + config.skin + ' ' : '') + ' ' + (config.anim ? 'layui-m-anim-' + config.anim : '') + '" ' + '>'
                + '<div class="layui-m-layercont">' + config.content + '</div>'
                + '</div>'
                + '</div>'
                + '</div>';

            if (!config.type || config.type === 2) {
                var dialogs = doc[claname](classs[0] + config.type), dialen = dialogs.length;
                if (dialen >= 1) {
                    layer.close(dialogs[0].getAttribute('index'))
                }
            }

            document.body.appendChild(layerbox);
            var elem = that.elem = S('#' + that.id)[0];
            config.success && config.success(elem);

            that.index = index++;
            that.action(config, elem);
        };

        Layer.prototype.action = function (config, elem) {
            var that = this;

            //自动关闭
            if (config.time) {
                ready.timer[that.index] = setTimeout(function () {
                    layer.close(that.index);
                }, config.time * 1000);
            }

            config.end && (ready.end[that.index] = config.end);


        };

        var layer = {
            index: index,
            //核心方法
            open: function (options) {
                var o = new Layer(options || {});
                return o.index;
            },

            close: function (index) {
                var ibox = S('#' + classs[0] + index)[0];
                if (!ibox) return;
                ibox.innerHTML = '';
                doc.body.removeChild(ibox);
                clearTimeout(ready.timer[index]);
                delete ready.timer[index];
                typeof ready.end[index] === 'function' && ready.end[index]();
                delete ready.end[index];
            },

            //关闭所有layer层
            closeAll: function () {
                var boxs = doc[claname](classs[0]);
                for (var i = 0, len = boxs.length; i < len; i++) {
                    layer.close((boxs[0].getAttribute('index') | 0));
                }
            }
        };

        return layer;

    }




    // console.log(layers)
    // //提示




    exports(MOD_NAME, https);
});