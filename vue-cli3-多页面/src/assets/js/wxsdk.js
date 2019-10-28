import wx from 'weixin-js-sdk'			//微信sdk依赖
import http from '../lib/featch'		// 封装的axios
const jsApiList = ['updateAppMessageShareData', 'updateTimelineShareData',]
//要用到微信API

function getJSSDK(url, dataForWeixin) {
    http.get('/OAutho/JsSdkConfig?url=' + encodeURIComponent(url)).then(res => {
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wx9d399xxxxxxxxx14', // 必填，公众号的唯一标识
            timestamp: res.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.noncestr, // 必填，生成签名的随机串
            signature: res.data.signature, // 必填，签名
            jsApiList: jsApiList // 必填，需要使用的JS接口列表
        })
        wx.ready(function () {
            // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
            wx.updateAppMessageShareData({
                title: dataForWeixin.title,
                desc: dataForWeixin.desc,
                link: dataForWeixin.linkurl,
                imgUrl: dataForWeixin.img,
                trigger: function trigger(res) { },
                success: function success(res) {
                    console.log('已分享');
                },
                cancel: function cancel(res) {
                    console.log('已取消');
                },
                fail: function fail(res) {
                    alert(JSON.stringify(res));
                }
            });
            // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
            wx.updateTimelineShareData({
                title: dataForWeixin.title,
                link: dataForWeixin.linkurl,
                imgUrl: dataForWeixin.img,
                trigger: function trigger(res) {
                    // alert('用户点击分享到朋友圈');
                },
                success: function success(res) {
                    //alert('已分享');
                },
                cancel: function cancel(res) {
                    //alert('已取消');
                },
                fail: function fail(res) {
                    alert(JSON.stringify(res));
                }
            });

        })
        wx.error(function (res) {
            alert("微信验证失败");
        });
    })
}
export {
    getJSSDK
}

// import sdk from '../../assets/sdk/sdk' //引入sdk.js
// var url = window.location.href.split('#')[0]
// var obj = {
//   title: this.userInfo.UserName,		//分享标题
//   desc: '个人资料',						//分享内容
//   linkurl: location.protocol+"//"+location.host+'/dist/#/show?id=' + this.userInfo.Id,//分享链接
//   img: this.userInfo.Photo,				//分享内容显示的图片
// }
// sdk.getJSSDK(url, obj) 	
