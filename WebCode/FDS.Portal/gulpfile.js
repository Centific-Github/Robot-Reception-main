let gulp = require('gulp');
let del = require('del');
let concat = require('gulp-concat');
let cleanCSS = require('gulp-clean-css');
let less = require('gulp-less');
let uglify = require('gulp-uglify');
let systemjsBuilder = require('systemjs-builder');
let htmlreplace = require('gulp-html-replace');
let modifyCssUrls = require('gulp-modify-css-urls');
let ts = require('gulp-typescript');
let sourcemaps = require('gulp-sourcemaps');
let path = require('path');
let rename = require("gulp-rename");
let argv = require('yargs').argv;

let paths = {
    distDir: 'dist',
    tplDir: 'dist/tpl',
    imgDir: 'dist/assets/images',
    fontDir: 'dist/fonts',
    jsSrcDir: 'scripts/js',
    css: [
        'node_modules/admin-lte/dist/css/AdminLTE.css',
        'node_modules/admin-lte/dist/css/skins/_all-skins.css',
        'libs/bs3/dist/toolkit-light.css',
        'node_modules/sweetalert2/dist/sweetalert2.min.css',
        'node_modules/font-awesome/css/font-awesome.min.css',
        'node_modules/angular/angular-csp.css',
        'node_modules/angular-loading-bar/build/loading-bar.min.css',
        'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css',
        'node_modules/angular-bootstrap-datetimepicker/src/css/datetimepicker.css',
        'node_modules/ui-select/dist/select.css',
        'node_modules/ng-notify/dist/ng-notify.min.css',
        'node_modules/dragula/dist/dragula.css',
        'node_modules/angular-bootstrap-colorpicker/css/colorpicker.css',
        'assets/styles/bs.less',
        'assets/styles/site.less',
    ],
    js: [
        'libs/azure/azure-storage.common.js',
        'libs/azure/azure-storage.blob.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/admin-lte/dist/js/adminlte.js',
        'node_modules/tinymce/tinymce.js',
        'node_modules/dragula/dist/dragula.js',
        'node_modules/i18next/dist/umd/i18next.js',
        'node_modules/i18next-xhr-backend/dist/umd/i18nextXHRBackend.js',
        'node_modules/i18next-browser-languagedetector/dist/umd/i18nextBrowserLanguageDetector.js',
        'node_modules/i18next-sprintf-postprocessor/dist/umd/i18nextSprintfPostProcessor.js',
        'node_modules/promise-polyfill/promise.min.js',
        'node_modules/systemjs/dist/system.js',
        'scripts/js/sysconfig.js',
    ],
    fonts: ['node_modules/font-awesome/fonts/**', 'libs/bs3/fonts/**'],
    locales:'dist/locales',
};

gulp.task('css', ['clean'], () => {
    return gulp.src(paths.css)
        .pipe(less())
        .pipe(cleanCSS({ compatibility: 'ie8', rebase: false }))
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest(paths.distDir + '/styles'));
});

gulp.task('js', ['clean'], () => {
    return gulp.src(paths.js)
        //.pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.distDir + '/scripts'));
});

gulp.task('clean', () => {
    // you can use multiple globbing patterns as you would with `gulp.src`
    return del(['dist']);
});

let tsProject = ts.createProject('tsconfig.json');
gulp.task('ts-compile', () => {
    let tsResult = tsProject.src() // or gulp.src("lib/**/*.ts")
        //.pipe(sourcemaps.init())
        .pipe(tsProject());

    return tsResult.js
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.jsSrcDir));
});

gulp.task('env-config', ['ts-compile'], () => {
    let envStr = '';
    let env = argv.env;
    if (env != undefined && env != null && env !== true) envStr = '.' + env;
    let configPath = `${paths.jsSrcDir}/config${envStr}.js`;

    return gulp.src(configPath)
        .pipe(rename('config.js'))
        .pipe(gulp.dest(paths.jsSrcDir));
});

gulp.task('bundle-js-app', ['clean', 'ts-compile', 'env-config'], () => {
    let builder = new systemjsBuilder('', 'scripts/js/sysconfig.js');

    return builder
        .bundle('scripts/js/app.js', 'dist/scripts/app.bundle.min.js', {
            minify: true,
            mangle: false,
            sourceMaps: false,
            //fetch: (load, fetch) => {
            //        //console.log(load);
            //    if (load.name.indexOf('scripts/js/config.js') !== -1) {
            //        return "import config from 'scripts/js/config.prd';";
            //    } else {
            //        // fall back to the normal fetch method
            //        return fetch(load);
            //    }
            //}
        })
        .then(() => {
            console.log('Build complete');
        })
        .catch((err) => {
            console.log('Build error');
            console.log(err);
        });

});

gulp.task('html', ['clean'], () => {
    gulp.src('favicon.ico')
        .pipe(gulp.dest(paths.distDir));

    gulp.src(['tpl/**'])
        .pipe(gulp.dest(paths.tplDir));

    gulp.src(['locales/**'])
        .pipe(gulp.dest(paths.locales));

    gulp.src(['*.html'])
        .pipe(htmlreplace({
            'css': 'styles/app.min.css',
            'js': ['scripts/app.min.js', 'scripts/app.bundle.min.js']
        }))
        .pipe(gulp.dest(paths.distDir));
});

gulp.task('asset', ['clean'], () => {
    gulp.src(['assets/images/**'])
        .pipe(gulp.dest(paths.imgDir));
});

gulp.task('font', ['clean'], () => {
    gulp.src(paths.fonts)
        .pipe(gulp.dest(paths.fontDir));
});

gulp.task('default', ['html', 'asset', 'css', 'font', 'js', 'bundle-js-app']);