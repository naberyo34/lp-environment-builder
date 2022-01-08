exports.html = function html(cb) {
  const { src, dest } = require('gulp');
  const prettier = require('gulp-prettier');
  const htmlhint = require('gulp-htmlhint');
  const plumber = require('gulp-plumber');
  const notify = require('gulp-notify');
  const config = require('./config');

  src(config.src.destHtml)
    .pipe(
      plumber(
        notify.onError('⚠️ HTML のエラーが出ています ⚠️ <%= error.message %>')
      )
    )
    .pipe(prettier())
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.failAfterError())
    .pipe(dest(config.dest.root));

  // タスク完了
  cb();
};
