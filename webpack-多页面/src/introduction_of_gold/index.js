import 'common/style/reset.less';
import 'common/style/dialog.less';
import './style/index.less';
import lxn from 'common/js/lxn.js';



var baseUrl = '//openapi.lanxiniu.com';

function getEle(id) {
    return document.getElementById(id)
}

new Vue({
    el: '#app',
    data: {
        dialog: {
            show: false,
            msg: ''
        },
        driverFlag: { //司机类型(图片)
            'bronze-medal': false, //铜牌
            'silver-medal': false, //银牌
            'gold-medal': false //金牌
        },
        driverType: '', //司机类型(文字)
        userfulLife: '',
        niubi: { //牛币
            gold: 0,
            silver: 0,
            currentValue: '当前牛币:0', //当前牛币
            silverShow: false, //显示银牌
            dabiao: false //是否达标
        },
        servicePoint: { //服务分
            currentValue: '当前服务分:0', //当前服务分
            dabiao: false //是否达标
        },
        turnoverRate: { //成交率
            currentValue: '当前成交率:0', //当前成交率
            dabiao: false //是否达标
        },
        exchangeFlag: {
            show: false,
            type: '可以兑换金牌啦'
        },
        exchangeUrl: '', // 兑换页面,
        levelDescription: './level_description.html'
    },
    mounted: function () {
        this.getData();
        this.levelDescription += location.search

    },
    methods: {
        // 请求 司机等级 数据
        getData: function () {
            var url = baseUrl + '/Web/getDriverLevelh5' + location.search;
            // var url = '/api'+'/getDriverLevelh5' +'?session_id=fdt6c3bgag553cdpuap37rjd97'

            var that = this;


            lxn.https(url, function (response) {
                var result = response.data;
                if (!+result.code) {
                    console.log('获取数据成功');
                    console.log(result)
                    if (result) {
                        var data = result;
                        // 级别
                        var driverFlag = that.driverFlag;
                        switch (+data.driverLevel) {
                            case 15:
                                driverFlag['gold-medal'] = true;
                                that.driverType = '金牌司机';
                                break;
                            case 10:
                                driverFlag['silver-medal'] = true;
                                that.driverType = '银牌司机';
                                break;
                            case 0:
                                driverFlag['bronze-medal'] = true;
                                that.driverType = '铜牌司机';
                                break;
                            default:
                                break;
                        }

                        // 级别有效期
                        that.userfulLife = '有效期至: ' + data.driverLevelEnd;

                        that.setData(data);

                    } else {
                        that.dialogShow('无数据')
                    }
                } else {
                    that.dialogShow('获取数据失败')
                }
            })
        },
        // 设置数据
        setData: function (data) {
            // lxn.getEle('niubi-value').style.width = '58%';
            // lxn.getEle('fuwu-value').style.width = '94.7%';
            // lxn.getEle('cjlv-value').style.width = '90%';

            // 计算牛币
            var niubi = this.niubi,
                // 比例
                nbProportion = null,
                bfh = '%';
            niubi.gold = +data.jinNiub;
            niubi.silver = +data.yinNiub;
            niubi.currentValue = '当前牛币: ' + data.niub;

            nbProportion = (+niubi.silver / +niubi.gold) * 100;
            var silverValue = 91 - nbProportion;
            console.log(nbProportion)
            getEle('niubi-silver-point').style.right = nbProportion + bfh;
            getEle('niubi-silver').style.left = silverValue + bfh;
            getEle('niubi-value').style.width = data.niub / niubi.gold * 100 + bfh;
            niubi.silverShow = true;
            if (+data.niub >= +data.yinNiub) {
                niubi.dabiao = true;
            }

            // 计算服务分
            var servicePoint = this.servicePoint,
                serviceScore = data.serviceScore;

            servicePoint.currentValue = '当前服务分: ' + serviceScore;
            getEle('fuwu-value').style.width = +serviceScore / 95 * 100 + bfh;

            if (+serviceScore >= 90) {
                servicePoint.dabiao = true;
            }

            // 计算成交率
            var turnoverRate = this.turnoverRate,
                dealRate = data.dealRate;
            turnoverRate.currentValue = '当前成交率: ' + dealRate + bfh;
            getEle('cjlv-value').style.width = dealRate + 3 + bfh;

            if (+dealRate >= 85) {
                turnoverRate.dabiao = true;
            }



            // 立即兑换地址
            this.exchangeUrl = data.exchangeUrl;

            // 是否可兑换弹窗
            var exchangeFlag = this.exchangeFlag;
            if (niubi.dabiao && servicePoint.dabiao && turnoverRate.dabiao) {
                exchangeFlag.show = true;
                exchangeFlag.type = '可以兑换银牌啦'
            }
            if (+data.niub >= +data.jinNiub && +serviceScore >= 95 && +dealRate >= 95) {
                exchangeFlag.show = true;
                exchangeFlag.type = '可以兑换金牌啦'
            }

            // 计算牛币
            // point   right 41%
            // div     left  50%
            // lxn.getEle('niubi-silver-point').style.right = '41%';
            // lxn.getEle('niubi-silver').style.left = '50%';
            // lxn.getEle('niubi-value').style.width = '58%';

            // 计算服务分
            // 进度条比例 x/95    
            // lxn.getEle('fuwu-value').style.width = '94.7%';  

            // 计算成交率
            // 进度条比例 x/95
            // lxn.getEle('cjlv-value').style.width = '87%';
        },
        // 立即兑换
        exchangeNow: function () {
            var url = this.exchangeUrl + location.search;
            console.log(url)
            window.location.href = url;
        },
        // 弹窗提示
        dialogShow: function (msg) {
            var dialog = this.dialog;
            dialog.show = true;
            dialog.msg = msg;
        },

        // 弹窗确认按钮
        dialogSure: function () {
            this.dialog.show = false;
        }


    }
})