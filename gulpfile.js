var gulp = require('gulp');
var pug = require('gulp-pug');
var fs = require('fs');
var data = require('gulp-data');
var path = require('path');
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");
var browserSync = require('browser-sync');

/**
 * 開発用のディレクトリを指定します。
 */
var src = {
  // 出力対象は`_`で始まっていない`.pug`ファイル。
  'html': ['src/**/*.pug', '!' + 'src/**/_*.pug'],
  // JSONファイルのディレクトリを変数化。
  'json': 'src/_data/',
  'css': 'src/**/*.css',
  'js': 'src/**/*.js',
};

/**
 * 出力するディレクトリを指定します。
 */
var dest = {
  'root': 'dest/',
  'html': 'dest/'
};

/**
 * `.pug`をコンパイルしてから、destディレクトリに出力します。
 * JSONの読み込み、ルート相対パス、Pugの整形に対応しています。
 */
gulp.task('html', function() {
  // JSONファイルの読み込み。
  var locals = {
    'site': JSON.parse(fs.readFileSync(src.json + 'site.json'))
  }
  return gulp.src(src.html)
  // コンパイルエラーを通知します。
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  // 各ページごとの`/`を除いたルート相対パスを取得します。
  .pipe(data(function(file) {
    locals.relativePath = path.relative(file.base, file.path.replace(/.pug$/, '.html'));
      return locals;
  }))
  .pipe(pug({
    // JSONファイルとルート相対パスの情報を渡します。
    locals: locals,
    // Pugファイルのルートディレクトリを指定します。
    // `/_includes/_layout`のようにルート相対パスで指定することができます。
    basedir: 'src',
    // Pugファイルの整形。
    pretty: true
  }))
  .pipe(gulp.dest(dest.html))
  .pipe(browserSync.reload({stream: true}));
});

/**
 * cssファイルをdestディレクトリに出力（コピー）します。
 */
gulp.task('css', function() {
  return gulp.src(src.css, {base: src.root})
  .pipe(gulp.dest(dest.root))
  .pipe(browserSync.reload({stream: true}));
});

/**
 * jsファイルをdestディレクトリに出力（コピー）します。
 */
gulp.task('js', function() {
  return gulp.src(src.js, {base: src.root})
  .pipe(gulp.dest(dest.root))
  .pipe(browserSync.reload({stream: true}));
});

/**
 * ローカルサーバーを起動します。
 */
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: dest.root,
      index: "index.html"
    }
  });
});

/**
 * PugのコンパイルやCSSとjsの出力、browser-syncのリアルタイムプレビューを実行します。
 */
gulp.task('watch', ['html', 'css', 'js', 'browser-sync'], function() {
  gulp.watch(src.html, ['html']);
  gulp.watch(src.css, ['css']);
  gulp.watch(src.js, ['js']);
});

/**
 * 開発に使うタスクです。
 * package.jsonに設定をして、`npm run default`で実行できるようにしています。
 */
gulp.task('default', ['watch']);
