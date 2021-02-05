# alleria

## 环境要求

- Node 12.16.2（最低 >= 10.13.0）
- Git 2.13.0+

### vscode插件推荐：http://confluence.koolearn-inc.com/pages/viewpage.action?pageId=42822169

### 本地开发

```bash
$ npm i
$ npm run dev
$ open http://localhost:8081/ 
```

- 新建页面请在client/pages/下，之后添加对应路由访问
- 路由文件在client/index.js中
- 本地提交代码时会使用prettier自动格式化代码，所以代码有改动不用担心，    
之后eslint会检测代码格式问题,需修复所有error问题才能提交成功
- 对提交的commit的信息做了如下限制：  
提交信息必须是规定的7个标识开始，并跟随一个英文输入法下的冒号':'和一个空格，接着是提交的内容  
例如:

```bash
$ git commit -m 'feat: add format'
```
- 只允许使用下面7个标识  
upd：代码更新    
feat：新功能（feature）  
fix：修补bug  
docs：文档（documentation）  
style： 格式（不影响代码运行的变动）  
refactor：重构（即不是新增功能，也不是修改bug的代码变动）  
test：增加测试  
chore：构建过程或辅助工具的变动  

### 目录结构

```txt
|-- .
    |-- .babelrc                                                    # babel配置文件
    |-- .eslintrc.js                                                # eslint配置文件
    |-- commitlint.config.js                                        # commit规则配置
    |-- package.json                                        
    |-- postcss.config.js                                           # postcss配置文件
    |-- readme.md
    |-- webpack.config.js                                           # webpack执行文件
    |-- bin
    |   |-- build.sh                                                # 发布执行文件
    |-- build                                                       # webpack配置文件
    |   |-- webpack.common.js
    |   |-- webpack.dev.js
    |   |-- webpack.prod.js
    |-- client                                                      # 客户端代码目录
    |   |-- index.html                                              # html模板
    |   |-- index.js                                                # 入口文件，包括全局的路由配置
    |   |-- components                                              # 组件目录
    |   |   |-- common                                              # 通用组件目录
    |   |   |   |-- Loading
    |   |   |       |-- index.js
    |   |   |       |-- index.less
    |   |   |-- layout                                              # 页面布局组件目录
    |   |       |-- Header
    |   |       |   |-- index.js
    |   |       |   |-- index.less
    |   |       |-- SideBar
    |   |           |-- index.js
    |   |           |-- index.less
    |   |-- pages                                                   # 页面目录
    |   |   |-- home                                                # 示例页面
    |   |   |   |-- index.js
    |   |   |   |-- index.less
    |   |   |-- login                                               # 登录模板页，sso单点登录时不需要
    |   |       |-- index.js
    |   |       |-- index.less
    |   |-- static                                                  # 静态资源目录
    |   |   |-- images
    |   |   |-- js
    |   |   |-- json
    |   |-- utils                                                   # 通用工具函数目录
    |       |-- request.js                                          # 通用请求
    |-- config                                                      # 环境变量
    |   |-- default.js
    |   |-- development.js
    |   |-- hostMap.js
    |   |-- production.js
    |   |-- staging.js
    |   |-- test.js
    |-- dist                                                        # 生产代码目录
```