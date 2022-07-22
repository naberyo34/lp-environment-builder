const fse = require('fs-extra');
const path = require('path');

/**
 * 受け取った値を使ってディレクトリを作成する
 * @param {string} projectName
 * @param {*} options
 */
module.exports = function setupDirectory(projectName, options) {
  const { template, preprocessor, js } = options;
  const templateDirName = template === 'html' ? 'dist' : 'src';
  const templateSubDirName = template === 'html' ? '' : template;
  const preprosessorDirName = preprocessor === 'css' ? 'dist/assets' : 'src';
  const jsDirName = js === 'es5' ? 'dist/assets' : 'src';

  // テンプレートエンジン
  console.log(
    `プロジェクト名: ${projectName}\nテンプレートエンジン: ${template}\nプリプロセッサ: ${preprocessor}\nJSバージョン: ${js}\n\n上記の設定でプロジェクトを作成します\n`
  );
  console.log(`🔧 ディレクトリ ${projectName} を作成します`);
  fse.mkdirSync(projectName, (err) => {
    if (err) {
      throw new Error(err);
    }
  });
  console.log(`🔧 ${projectName} に ${template} の必要ファイルを作成します`);
  fse.copySync(
    path.resolve(__dirname, '../', 'templates', template),
    path.resolve(__dirname, '../', projectName, templateDirName, templateSubDirName)
  );

  // CSSプリプロセッサ
  console.log(
    `🔧 ${projectName} に ${preprocessor} の必要ファイルを作成します`
  );
  fse.copySync(
    path.resolve(__dirname, '../', 'templates', preprocessor),
    path.resolve(__dirname, '../', projectName, preprosessorDirName, preprocessor)
  );
  if (preprocessor === 'scss') {
    fse.copySync(
      path.resolve(__dirname, '../', 'templates', '.stylelintrc'),
      path.resolve(__dirname, '../', projectName, '.stylelintrc')
    );
  } else {
    fse.copySync(
      path.resolve(__dirname, '../', 'templates', '.stylelintrc_css'),
      path.resolve(__dirname, '../', projectName, '.stylelintrc')
    );
  }
  console.log(`🔧 ${projectName} に ${js} の必要ファイルを作成します`);
  fse.copySync(
    path.resolve(__dirname, '../', 'templates', js),
    path.resolve(__dirname, '../', projectName, jsDirName, 'js')
  );

  // JS
  if (js === 'esnext') {
    fse.copySync(
      path.resolve(__dirname, '../', 'templates', 'esnextFiles'),
      path.resolve(__dirname, '../', projectName)
    );
  } else {
    fse.copySync(
      path.resolve(__dirname, '../', 'templates', '.eslintrc_es5'),
      path.resolve(__dirname, '../', projectName, '.eslintrc')
    );
  }

  // 共通ファイル
  console.log(`🔧 ${projectName} に 共通の必要ファイルを作成します`);
  fse.copySync(
    path.resolve(__dirname, '../', 'templates', 'images'),
    path.resolve(__dirname, '../', projectName, 'src', 'images')
  );
  fse.copySync(
    path.resolve(__dirname, '../', 'templates', 'common'),
    path.resolve(__dirname, '../', projectName)
  );
};
