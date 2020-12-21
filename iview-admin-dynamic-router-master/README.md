# iview admin 动态路由例子



### 方式1： 路由数据全部从后台返回：
* src/libs/util.js 里面加两个方法：backendMenusToRouters，backendMenuToRoute
* src/mock/data.js 里面加路由数据：routersData，模拟服务端获取
* src/mock/index.js这里暴露一个ajax调用接口：Mock.mock(/\/sys\/routers/, routersData)，记得引入一下:routersData
* src/api/routers.js 这里面的请求url改成/sys/routers,当然，你可以自己定义
* src/store/module/app.js ,添加对应的state,getter和actions,看代码。
* src/router/index.js 路由定义里，再route.onReady之后，加载动态路由
* view下面加点测试用的页面，参考pet目录下代码
* src/locale/lang/zh-CN.js 给菜单配一下i18n显示

### 方式2：路由配置在前端，后端返回权限：
* src/mock/data.js添加模拟后台返回的 权限数据：MenuPerms:['Pet', 'PetDog'......],
    这里面的名字必须与路由中的access:['此处']对应。没有配置access的路由页面，不显示。
* 配置一个前端动态路由：src/router/dynamic-routers.js，就是普通路由，完全按照iview方式配置就行
* src/store/module/app.js,引入：import dynamicRouters from '@/router/dynamic-routers'
加一个：actions：getUserMenus，用来获取用户的权限和过滤路由
其中用到方法：filterUserRouter，然后:getters里修改：menuList的获取方式：
menuList: (state, getters, rootState) => getUserMenuByRouter(routers.concat(state.routers))

* src/libs/util.js中新增方法：filterUserRouter，从dynamic-routers.js里，
根据access信息把这个用户具有的权限过滤出来，新增方法：getUserMenuByRouter，
把用户左侧导航菜单数据过滤出来。
* src/router/index.js路由入口，增加：initRouters函数，用来动态加载路由。把turnTo的方法删除，不需要判断是否有权限了
因为能显示的，就是有权限的。把beforeEach里最后一个else里逻辑改一下，在此处初始化权限路由。
---
启动：
* npm install
* npm run dev

