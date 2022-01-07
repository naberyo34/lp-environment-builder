// 対象ファイルの変更監視

exports.watch = function watch(cb) {
  const { series } = require('gulp');
  const { watch } = require('gulp');
  const { pug } = require('./pug');
  const { ejs } = require('./ejs');
  const { scss } = require('./scss');
  const { reload } = require('./server');
  const config = require('./config');
  const targetTemplateDirectory =
    config.templateEngine === 'pug'
      ? config.watch.pug
      : config.templateEngine === 'ejs'
      ? config.watch.ejs
      : config.watch.html;
  const targetTemplateTask =
    config.templateEngine === 'pug'
      ? pug
      : config.templateEngine === 'ejs'
      ? ejs
      : null;
  const targetPreprocessorDirectory =
    config.preprocessor === 'scss' ? config.watch.scss : config.watch.css;

  // watch task 実行
  // series で コンパイル -> ホットリロードを実行
  if (config.preprocessor === 'pug' || config.preprocessor === 'ejs') {
    watch(targetTemplateDirectory, series(targetTemplateTask, reload));
  } else {
    watch(targetTemplateDirectory, series(reload));
  }

  if (config.preprocessor === 'scss') {
    watch(targetPreprocessorDirectory, series(scss, reload));
  } else {
    watch(targetPreprocessorDirectory, series(reload));
  }

  // esnextのときはwebpack側でwatchしているため、gulpでのwatchはしない
  if (config.preprocessor === 'es5') {
    watch(config.watch.js, series(reload));
  }

  // タスク完了
  cb();
};
