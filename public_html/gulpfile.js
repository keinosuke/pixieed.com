const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const del = require('del');

// パス設定
const paths = {
  src: {
    css: './src/css/**/*.css',
    js: './src/js/**/*.js',
    img: './src/img/**/*'
  },
  dist: {
    base: './assets',
    css: './assets/css',
    js: './assets/js',
    img: './assets/img'
  }
};

// Clean task - assets フォルダを削除
function clean() {
  return del([paths.dist.base]);
}


// CSS task - CSSファイルを最小化
function css() {
  return gulp.src(paths.src.css)
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist.css))
    .pipe(browserSync.stream());
}

// JavaScript task - JSファイルを最小化
function js() {
  return gulp.src(paths.src.js)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist.js))
    .pipe(browserSync.stream());
}

// Images task - 画像をコピー（最適化なし）
function images() {
  return gulp.src(paths.src.img)
    .pipe(gulp.dest(paths.dist.img))
    .pipe(browserSync.stream());
}

// Development用CSS task (最小化なし)
function cssDev() {
  return gulp.src(paths.src.css)
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist.css))
    .pipe(browserSync.stream());
}

// Development用JS task (最小化なし)
function jsDev() {
  return gulp.src(paths.src.js)
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist.js))
    .pipe(browserSync.stream());
}


// Development用Images task (最適化なし)
function imagesDev() {
  return gulp.src(paths.src.img)
    .pipe(gulp.dest(paths.dist.img))
    .pipe(browserSync.stream());
}

// Browser Sync - ローカルサーバー起動
function serve() {
  browserSync.init({
    server: {
      baseDir: paths.dist.base
    },
    port: 3000,
    open: true
  });
}

// Watch task - ファイル変更を監視
function watch() {
  gulp.watch(paths.src.css, cssDev);
  gulp.watch(paths.src.js, jsDev);
  gulp.watch(paths.src.img, imagesDev);
}

// タスクの組み合わせ定義
const dev = gulp.series(clean, gulp.parallel(cssDev, jsDev, imagesDev), gulp.parallel(serve, watch));
const build = gulp.series(clean, gulp.parallel(css, js, images));

// タスクのエクスポート
exports.clean = clean;
exports.css = css;
exports.js = js;
exports.images = images;
exports.serve = serve;
exports.watch = watch;
exports.dev = dev;
exports.build = build;
exports.default = dev;