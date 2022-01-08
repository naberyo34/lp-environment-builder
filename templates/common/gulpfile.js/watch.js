// 対象ファイルの変更監視

exports.watch = function watch(cb) {
  const { series } = require('gulp');
  const { watch } = require('gulp');
  const { reload } = require('./server');
  const config = require('./config');
  const { templateEngine, preprocessor, jsVersion } = config;
  const watchTasks = [];

  if (templateEngine === 'pug') {
    const { pug } = require('./pug');
    watchTasks.push(() => watch(config.watch.pug, series(pug, reload)));
  }

  if (templateEngine === 'ejs') {
    const { ejs } = require('./ejs');
    watchTasks.push(() => watch(config.watch.ejs, series(ejs, reload)));
  }

  if (templateEngine === 'html') {
    watchTasks.push(() => watch(config.watch.html, reload));
  }

  if (preprocessor === 'scss') {
    const { scss } = require('./scss');
    watchTasks.push(() => watch(config.watch.scss, series(scss, reload)));
  } else {
    watchTasks.push(() => watch(config.watch.css, reload));
  }

  // esnextのときはwebpack側でwatchしているため、gulpでのwatchはしない
  if (jsVersion === 'es5') {
    watchTasks.push(() => watch(config.watch.js, reload));
  }

  // watch task 実行
  watchTasks.forEach((fn) => fn());

  // タスク完了
  cb();
};
