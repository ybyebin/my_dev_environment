/*
 * @Date: 2019-10-22 10:46:25  
 * @Last Modified time: 2019-10-22 10:46:25  
 * 
 * @desc 公共业务方法
 */


import { storageKey } from './defaultData'



// 缓存token
const setToken = token => {
    localStorage.setItem(storageKey.token, token);
}
// 获取 token
const getToken = parmas => {
    return localStorage.getItem(storageKey.token);
}

// 清除本地缓存
const cleanStorage = () => {
    localStorage.clear();
}

// 兼容系统登录后台问题
const systemLogin = {
    key: 'login_flag',
    setFlag: (value) => {

        localStorage.setItem(systemLogin.key, value);
    },
    getFlag: () => {
        return localStorage.getItem(systemLogin.key, false);
    }
}


// 根据屏幕高度设置当前表格高度
const setTableMaxHeight = (clas) => {
    let cla = clas ? clas : 'content-data';
    return document.getElementsByClassName(cla)[0].getBoundingClientRect().height - 50;
}




// 根据权限处理显示数据
const handlePermission = parmas => {
    let manageKey = parmas.m; //模块 key
    let pageKey = parmas.p; //页面 key
    let that = parmas.that;

    let defaultDataPage = that.units.deepClone(that.defaultData.page);
    let m = defaultDataPage[manageKey];
    let pages = m.menu;
    pages.forEach(ele => {
        if (ele.id === that.page[pageKey].id) {
            ele.active = true;
            // 页面标题显示数据
            that.contentTitle = m.title + "/" + ele.title;
        }
    });

    defaultDataPage[manageKey].active = true;
    // 侧边栏显示数据
    that.pageData = pages;
    //顶部模块显示数据
    that.moduleData = defaultDataPage;

    setTimeout(() => {
        // 默认全局处理方法
        defaultInitMethod({
            that: parmas.that
        });
    }, 800);

}

// 默认全局处理方法
const defaultInitMethod = (parmas) => {
    let that = parmas.that;
    if (that.table) {
        that.table.height = setTableMaxHeight();
    }
}


// 重新登录
const reLogin = () => {
    window.location.href = './';
}


export {
    setToken,
    getToken,
    cleanStorage,
    systemLogin,
    handlePermission,
    reLogin
}