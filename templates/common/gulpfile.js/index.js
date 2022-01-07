const { series, parallel } = require('gulp');
// 各種ビルドタスク
const { pug } = require('./pug');
const { ejs } = require('./ejs');
const { scss } = require('./scss');
const { webpackDev } = require('./webpackDev');
const { webpackBuild } = require('./webpackBuild');
const { images } = require('./images');
// フォーマット
const { formatDestHtml } = require('./formatDestHtml');
// 変更監視とプレビューの起動
const { watch } = require('./watch');
const { server } = require('./server');
// コンフィグ
const config = require('./config');
const templateEngine =
  config.templateEngine === 'pug'
    ? pug
    : config.templateEngine === 'ejs'
    ? ejs
    : null;
const preprocessor = config.templateEngine === 'scss' ? scss : null;

// TODO: 選択したパターンそれぞれにおけるタスクをいい感じに書く
// 並行で各種buildタスクを実行し、完了後にローカルサーバーを起動
if (!templateEngine && !preprocessor) {
  exports.default = series(parallel(jsCompileDev, images, watch), server);
} else if (!templateEngine) {
  exports.default = series(
    parallel(preprocessor, jsCompileDev, images, watch),
    server
  );
} else if (!preprocessor) {
  exports.default = series(
    parallel(templateEngine, jsCompileDev, images, watch),
    server
  );
} else {
  exports.default = series(
    parallel(templateEngine, preprocessor, jsCompileDev, images, watch),
    server
  );
}

// build コマンドでは、サーバーを立てずにビルドとHTMLのフォーマットのみを実行
if (!templateEngine && !preprocessor) {
  exports.build = series(parallel(jsCompileBuild, images), formatDestHtml);
} else if (!templateEngine) {
  exports.build = series(
    parallel(preprocessor, jsCompileBuild, images),
    formatDestHtml
  );
} else if (!preprocessor) {
  exports.build = series(
    parallel(templateEngine, jsCompileBuild, images),
    formatDestHtml
  );
} else {
  exports.build = series(
    parallel(templateEngine, preprocessor, jsCompileBuild, images),
    formatDestHtml
  );
}
