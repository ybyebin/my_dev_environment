/*
 * @Date: 2019-10-22 10:46:25  
 * @Last Modified time: 2019-10-22 10:46:25  
 * 
 * @desc 默认数据
 */

import { page, manageModule } from './config'
let m = manageModule;

const pageData = {
    page: {
        // 首页
        home:
        {
            id: m.home.id,
            title: m.home.title,
            to: page.statistics.link,
            active: false,
            show: true,
            menu: [
                {
                    id: page.statistics.id,
                    to: page.statistics.link,
                    title: page.statistics.title,
                    active: false
                }
            ]
        },
        // 历史数据
        history: {
            id: m.history.id,
            title: m.history.title,
            to: page.history.link,
            active: false,
            show: true,
            menu: [
                {
                    id: page.history.id,
                    to: page.history.link,
                    title: page.history.title,
                    active: false
                }
            ]
        },
        // 工作站
        node: {
            id: m.node.id,
            title: m.node.title,
            to: page.nodelist.link,
            active: false,
            show: true,
            menu: [
                {
                    id: page.nodelist.id,
                    to: page.nodelist.link,
                    title: page.nodelist.title,
                    active: false
                }
            ]
        },
        // 会员
        member: {
            id: m.member.id,
            title: m.member.title,
            to: page.memberlist.link,
            active: false,
            show: true,
            menu: [
                {
                    id: page.memberlist.id,
                    to: page.memberlist.link,
                    title: page.memberlist.title,
                    active: false
                }
            ]
        },

        // 订单
        order: {
            id: m.order.id,
            title: m.order.title,
            to: page.orderlist.link,
            active: false,
            show: true,
            menu: [
                {
                    id: page.orderlist.id,
                    to: page.orderlist.link,
                    title: page.orderlist.title,
                    active: false
                }
            ]
        },
        // 资讯
        zixun: {
            id: m.zixun.id,
            title: m.zixun.title,
            to: page.zixunlist.link,
            active: false,
            show: true,
            menu: [
                {
                    id: page.zixunlist.id,
                    to: page.zixunlist.link,
                    title: page.zixunlist.title,
                    active: false
                }
            ]
        },
        // 用户
        master: {
            id: m.master.id,
            title: m.master.title,
            to: page.masterlist.link,
            active: false,
            show: true,
            menu: [
                {
                    id: page.masterlist.id,
                    to: page.masterlist.link,
                    title: page.masterlist.title,
                    active: false
                },
                {
                    id: page.loginlog.id,
                    to: page.loginlog.link,
                    title: page.loginlog.title,
                    active: false
                }
            ]
        },
        // 人员信息
        person: {
            id: m.person.id,
            title: m.person.title,
            to: page.personlist.link,
            active: false,
            show: true,
            menu: [
                {
                    id: page.personlist.id,
                    to: page.personlist.link,
                    title: page.personlist.title,
                    active: false
                }
            ]
        },
        // 问卷模块
        questions: {
            id: m.questions.id,
            title: m.questions.title,
            to: page.questionlist.link,
            active: false,
            show: true,
            menu: [
                {
                    id: page.questionlist.id,
                    to: page.questionlist.link,
                    title: page.questionlist.title,
                    active: false
                }
            ]
        }
    },
}

const storageKey = {
    token: 'user_token'
}


export {
    pageData, storageKey
}
