/* gulp命令会由gulpfile.js运行，所以src和build文件夹路径如下（根目录下） */
const src = './src/';
const dist = './dist/';


const publicsrc = '/*.{png,jpg,gif,ico}'; //图片读取地址
const publicdest = '.rfv'; //图片输出地址
module.exports = {
    src: src,
    dist: dist,

    clean: { //删除文件路径
        src: ['dist', './rev-manifest.json'],
    },
    rev: {
        src: './rev-manifest.json'
    },
    html: {
        src: src + "**/**.html",
        dest: dist,
        options: {
            removeComments: true, //清除HTML注释
            collapseWhitespace: true, //压缩HTML
            collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
            minifyJS: true, //压缩页面JS
            minifyCSS: true //压缩页面CSS
        }
    },
    css: {
        src: src + "css/**/*.css",
        no: '!src/**/*.min.css',
        dest: dist + 'css'
    },
    js: {
        src: src + "js/**/*.js",
        no: '!src/**/*.min.js',
        dest: dist + '/js'
    },
    images: {
        src: src + "image/**/*",
        dest: dist + "image",
        publicsrc: publicsrc,
        publickdest: publicdest
    },

    copy: {
        src: src + 'public/**/*',
        dest: dist + 'public/'
    },

    less: {
        all: src + "less/**/*.less", //所有less
        // src: src + "/less/*.less", //需要编译的less
        // no: '!src/less/**/{reset,test}.less', //不需要编译的
        dest: src + "css", //输出目录
        // rev: dist + "/rev/css",
        settings: { //编译less过程需要的配置，可以为空

        }
    },

}