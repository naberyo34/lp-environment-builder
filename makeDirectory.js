const fse = require('fs-extra');
const path = require('path');

/**
 * 受け取った値を使ってディレクトリを作成する
 * @param {string} projectName
 * @param {*} options
 */
module.exports = function makeDirectory(projectName, options) {
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
    path.join(__dirname, 'templates', template),
    path.join(__dirname, projectName, templateDirName, templateSubDirName)
  );

  // CSSプリプロセッサ
  console.log(
    `🔧 ${projectName} に ${preprocessor} の必要ファイルを作成します`
  );
  fse.copySync(
    path.join(__dirname, 'templates', preprocessor),
    path.join(__dirname, projectName, preprosessorDirName, preprocessor)
  );
  if (preprocessor === 'scss') {
    fse.copySync(
      path.join(__dirname, 'templates', '.stylelintrc'),
      path.join(__dirname, projectName, '.stylelintrc')
    );
  } else {
    fse.copySync(
      path.join(__dirname, 'templates', '.stylelintrc_css'),
      path.join(__dirname, projectName, '.stylelintrc')
    );
  }
  console.log(`🔧 ${projectName} に ${js} の必要ファイルを作成します`);
  fse.copySync(
    path.join(__dirname, 'templates', js),
    path.join(__dirname, projectName, jsDirName, 'js')
  );

  // JS
  if (js === 'esnext') {
    fse.copySync(
      path.join(__dirname, 'templates', '.babelrc'),
      path.join(__dirname, projectName, '.babelrc')
    );
    fse.copySync(
      path.join(__dirname, 'templates', '.eslintrc'),
      path.join(__dirname, projectName, '.eslintrc')
    );
  } else {
    fse.copySync(
      path.join(__dirname, 'templates', '.eslintrc_es5'),
      path.join(__dirname, projectName, '.eslintrc')
    );
  }

  // 共通ファイル
  console.log(`🔧 ${projectName} に 共通の必要ファイルを作成します`);
  fse.copySync(
    path.join(__dirname, 'templates', 'images'),
    path.join(__dirname, projectName, 'src', 'images')
  );
  fse.copySync(
    path.join(__dirname, 'templates', 'common'),
    path.join(__dirname, projectName)
  );
};
