exports.css = function css(cb) {
  const { src, dest } = require('gulp');
  const autoprefixer = require('gulp-autoprefixer');
  const plumber = require('gulp-plumber');
  const notify = require('gulp-notify');
  const config = require('./config');

  src(config.src.destCss)
    .pipe(
      plumber(
        notify.onError('⚠️ CSS のエラーが出ています ⚠️ <%= error.message %>')
      )
    )
    .pipe(
      // autoprefixer
      // 引数には https://github.com/postcss/autoprefixer#options 記載の設定が渡せます
      autoprefixer({
        // 非圧縮cssの場合はtrueにする
        cascade: false,
      })
    )
    .pipe(dest(config.dest.css));

  // タスク完了
  cb();
};
