/**
 * optionsとして入力された値のバリデーションを行う
 * @param {string} options
 */
module.exports = function validateOptions(options) {
  const { template, preprocessor, js } = options;
  if (!(template === 'pug' || template === 'ejs' || template === 'html')) {
    throw new Error('ERR: テンプレートエンジンの指定が無効です');
  }
  if (!(preprocessor === 'scss' || preprocessor === 'css')) {
    throw new Error('ERR: CSSプリプロセッサの指定が無効です');
  }
  if (!(js === 'esnext' || js === 'es5')) {
    throw new Error('ERR: JSバージョンの指定が無効です');
  }
};
