const gulp = require('gulp');
const config = require('./config.js');
const minJs = require('gulp-uglify'); //压缩js
const minCss = require('gulp-clean-css'); //- 压缩CSS为一行
const base64 = require('gulp-base64'); //图片转base64

const minImage = require('gulp-imagemin'); //压缩图片
const minHtml = require('gulp-htmlmin'); //压缩 Html
const less = require('gulp-less');
const babel = require('gulp-babel');

const concat = require('gulp-concat'); //- 多个文件合并为一个；
const revMd5 = require('gulp-rev'); //- 对文件名加MD5后缀
const revCollector = require('gulp-rev-collector'); //- 路径替换
const clean = require('gulp-clean'); //清空
const runSequence = require('run-sequence'); // 依赖执行
const autoprefixer = require('gulp-autoprefixer'); //自动加上浏览器前缀
//加载browser-sync模块
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

const gulpSequence = require('gulp-sequence')

const zip = require('gulp-zip');  //压缩 .zip

//删除dist文件
gulp.task('clean', function (cb) {
    return gulp.src(config.clean.src, {
        read: false
    })
        .pipe(clean())
        .on('data', function (file) {
            console.log('删除文件' + file.history[0])
        });
});

// 压缩  html
gulp.task('minhtml', function () {
    return gulp.src(config.html.src)
        .pipe(minHtml(config.html.options))
        .pipe(gulp.dest(config.html.dest))
        .on('data', function (file) {
            console.log('压缩html' + file.history[0])
        });
});

// 压缩 css
gulp.task('mincss', function () {
    return gulp.src([config.css.src, config.css.no])
        // .pipe(minCss()) //- 压缩处理成一行
        .pipe(revMd5()) //- 文件名加MD5后缀
        .pipe(gulp.dest(config.css.dest)) //- 输出文件本地
        .pipe(revMd5.manifest({
            // base: 'build/assets',
            path: config.rev.src,
            merge: true
        })) //- 生成一个rev-manifest.json
        .pipe(gulp.dest('./')) //- 将 rev-manifest.json 保存到 rev 目录内
        .on('data', function (file) {
            console.log('MD5-----css文件' + file.history[0])
        });
});

//压缩js+md5
gulp.task('minjs', ['mincss'], function () {
    return gulp.src([config.js.src])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(minJs({
            compress: {
                drop_console: true //去掉console.log
            }
        })) //- 压缩处理成一行
        .pipe(revMd5()) //- 文件名加MD5后缀
        .pipe(gulp.dest(config.js.dest)) //- 输出文件本地
        .pipe(revMd5.manifest({
            path: config.rev.src,
            merge: true // merge with the existing manifest if one exists
        })) //- 生成一个rev-manifest.json
        .pipe(gulp.dest('./')) //- 将 rev-manifest.json 保存到 rev 目录内
        .on('data', function (file) {
            console.log('MD5---JSJS');
        });
});

//压缩js(layui自定义模块)
gulp.task('minjsnomd5', function () {
    return gulp.src([config.models.src])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(minJs({
            compress: {
                drop_console: true //去掉console.log
            }
        })) //- 压缩处理成一行     
        .pipe(gulp.dest(config.models.dest)) //- 输出文件本地

        .on('data', function (file) {
            console.log('MD5---JSJS');
        });
});


// 替换js  cs  文件路径
gulp.task('rev', ['minjs'], function () {
    return gulp.src([config.rev.src, , config.html.src])
        //- 读取 rev-manifest.json 文件以及需要进行js名替换的文件
        .pipe(revCollector({
            replaceReved: true,
        }))
        .pipe(minHtml(config.html.options))
        //- 执行文件内css名的替换
        .pipe(gulp.dest(config.html.dest))
        .on('data', function (file) {
            console.log('替换引入数据' + file.history[0])
        });
    //- 替换后的文件输出的目录
});

// 压缩 image
gulp.task('minimg', function () {
    return gulp.src('src/images/**/*.{png,jpg,gif,ico}') //压缩图片路径
        .pipe(minImage({
            progressive: true, //Boolean类型 默认:false 无损压缩图片
            optimizationLevel: 5, //number类型 默认:3 取值范围:0-7(优化等级)
            interlced: true, //Boolean类型 默认false 隔行扫描gif进行渲染
            multipass: true //Boolean类型 默认false 多次优化svg直到完全优化
        })) //压缩图片
        .pipe(gulp.dest(config.images.dest)) //压缩图片输出路径
        .on('data', function (file) {
            console.log(file.history[0])
        });
});

//复制文件夹 plugin
gulp.task('copy', function () {
    return gulp.src(config.copy.src)
        .pipe(gulp.dest(config.copy.dest))
        .on('data', function (file) {
            // console.log('复制文件' + file.history[0])
        });
});





// less 处理
// 编译 less
gulp.task('less', function () {
    return gulp.src([config.less.all])
        .pipe(less())
        .pipe(autoprefixer({ //自动加上浏览器前缀
            browsers: ['last 2 versions', 'Android >= 4.0', '> 1%'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            remove: true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(base64({
            maxImageSize: 10 * 1024, // bytes
        }))
        .pipe(minCss()) //- 压缩处理成一行
        .pipe(gulp.dest(config.less.dest)) //- 输出文件本地
});





// gulp.task('lesswatch', function() {
//     gulp.watch('src/**/*.less', ['testless']); //当所有less文件发生改变时，调用testLess任务
// });

// 启动热更新  
gulp.task('serve', function () {
    // gulp.start('script', 'less', 'html');
    browserSync.init({
        port: 2017,
        server: {
            baseDir: ['src'],
            index: 'html/pointPositionManage/regionManage.html' // 指定默认打开的文件
        }
    });
    gulp.watch('src/**/*.js').on('change', reload);
    gulp.watch('src/**/*.less', ['less']).on('change', reload); //当所有less文件发生改变时，调用testLess任务
    gulp.watch('src/**/*.html').on('change', reload); //当所有less文件发生改变时，调用testLess任务

});

// .zip
gulp.task('zip', function () {
    return gulp.src('dist/**/*')
        .pipe(zip('taihangPc.zip'))
        .pipe(gulp.dest('./'))
        .on('data', function (file) {
            console.log('压缩完成')
        });
});




// 开发
gulp.task('dev', ['serve']);



// 默认执执行打包
gulp.task('default', function (callback) {
    gulpSequence('clean', 'rev', 'minjsnomd5', 'minimg', 'copy','zip', function () { })
});


