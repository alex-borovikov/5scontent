let projectFolder = 'dist';
let sourceFolder = 'source';

let fs = require('fs');

let path = {
    build: {
        html: projectFolder + '/',
        css: projectFolder + '/css/',
        js: projectFolder + '/js/',
        img: projectFolder + '/img/',
        fonts: projectFolder + '/fonts/',
        video: projectFolder + '/video/'
    },
    source: {
        html: [sourceFolder + '/*.html', '!' + sourceFolder + '/_*.html'],
        css: sourceFolder + '/scss/style.scss',
        js: sourceFolder + '/js/script.js',
        img: sourceFolder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
        fonts: sourceFolder + '/fonts/*.ttf',
        video: sourceFolder + '/video/**/*'
    },
    watch: {
        html: sourceFolder + '/**/*.html',
        css: sourceFolder + '/scss/**/*.scss',
        js: sourceFolder + '/js/**/*.js',
        img: sourceFolder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
    },
    clean: './' + projectFolder + '/'

}

let { src, dest } = require('gulp'),
    gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    fileInclude = require('gulp-file-include'),
    del = require('del'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    group_media = require('gulp-group-css-media-queries'),
    clean_css = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify-es').default,
    imagemin = require('gulp-imagemin'),
    ttf2woff = require('gulp-ttf2woff'),
    ttf2woff2 = require('gulp-ttf2woff2'),
    fonter = require('gulp-fonter');

// Удаляет лишние файлы из 'dist'
function deleteFolderDist(arg) {
    return del(path.clean)
}

function synchro(arg) {
    browserSync.init({
        server: {
            baseDir: './' + projectFolder + '/'
        },
        port: 3000,
        notify: false,

    })
}

function html(arg) {
    return src(path.source.html)
        .pipe(fileInclude())
        .pipe(dest(path.build.html))
        .pipe(browserSync.stream())
}

function css(arg) {
    return src(path.source.css)
        .pipe(
            scss({
                outputStyle: 'expanded'
            }))
        .pipe(group_media())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 5 versions'],
            cascade: true
        }))
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(dest(path.build.css))
        .pipe(browserSync.stream())
}

function js(arg) {
    return src(path.source.js)
        .pipe(fileInclude())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest(path.build.js))
        .pipe(browserSync.stream())
}

function video(arg) {
    return src(path.source.video)
        .pipe(dest(path.build.video))
        .pipe(browserSync.stream())
}

function images(arg) {
    return src(path.source.img)
        .pipe(dest(path.build.img))
        .pipe(src(path.source.img))
        .pipe(
            imagemin({
                interlaced: true,
                progressive: true,
                optimizationLevel: 3,
                svgoPlugins: [
                    {
                        removeViewBox: true
                    }
                ]
            }))
        .pipe(dest(path.build.img))
        .pipe(browserSync.stream())
}

function livefonts() {
    src(path.source.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts));
    return src(path.source.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts))
}

gulp.task('otf', function () {
    return src([sourceFolder + '/fonts/*.otf'])
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest(sourceFolder + '/fonts/'))
})

function fontsStyle(params) {

    let file_content = fs.readFileSync(sourceFolder + '/scss/fonts.scss');
    if (file_content != '' || file_content !== '') {
        fs.writeFile(sourceFolder + '/scss/fonts.scss', '', cb);
        return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile(sourceFolder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }
                    c_fontname = fontname;
                }
            }
        })
    }
}
function cb(err) {
    if(err){
        throw new Error('error naxoy')
    }
}




// Следим за файлами
function watchFiles(params) {
    gulp.watch([path.watch.html], html),
        gulp.watch([path.watch.css], css),
        gulp.watch([path.watch.js], js)
    gulp.watch([path.watch.img], images)
}

let build = gulp.series(deleteFolderDist, gulp.parallel(js, css, html, images, livefonts,video), fontsStyle)
let watch = gulp.parallel(build, watchFiles, synchro);

exports.video = video;
exports.fontsStyle = fontsStyle;
exports.livefonts = livefonts;
exports.images = images;
exports.js = js;
exports.css = scss;
exports.build = build;
exports.html = html;
exports.watch = watch;
exports.default = watch;