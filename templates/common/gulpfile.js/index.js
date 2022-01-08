const { series, parallel } = require('gulp');
const { images } = require('./images');
const { watch } = require('./watch');
const { server } = require('./server');
const config = require('./config');
const { templateEngine, preprocessor, jsVersion } = config;
const devTasks = [];
const buildTasks = [];

if (templateEngine === 'pug') {
  const { pug } = require('./pug');
  devTasks.push(pug);
  buildTasks.push(pug);
}

if (templateEngine === 'ejs') {
  const { ejs } = require('./ejs');
  devTasks.push(ejs);
  buildTasks.push(ejs);
}

if (templateEngine === 'html') {
  const { html } = require('./html');
  devTasks.push(html);
  buildTasks.push(html);
}

if (preprocessor === 'scss') {
  const { scss } = require('./scss');
  devTasks.push(scss);
  buildTasks.push(scss);
}

if (preprocessor === 'css') {
  const { css } = require('./css');
  devTasks.push(css);
  buildTasks.push(css);
}

if (jsVersion === 'esnext') {
  const { webpackDev } = require('./webpackDev');
  const { webpackProd } = require('./webpackProd');
  devTasks.push(webpackDev);
  buildTasks.push(webpackProd);
}

// 並行で各種buildタスクを実行し、完了後にローカルサーバーを起動
exports.default = series(parallel(...devTasks, images, watch), server);

// build コマンドでは、サーバーを立てずにビルドを実行
exports.build = series(parallel(...buildTasks, images));
