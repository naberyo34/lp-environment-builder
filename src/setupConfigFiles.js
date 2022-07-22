const fse = require('fs-extra');
const path = require('path');

/**
 * 各種のコンフィグを設定する
 * @param {string} projectName
 * @param {*} options
 */
module.exports = function setupConfigFiles(projectName, options) {
  const { template, preprocessor, js } = options;
  const eslintDirectory =
    js === 'esnext' ? 'src/js/**/*.js' : 'dist/assets/js/*.js';
  const stylelintDirectory =
    preprocessor === 'scss' ? 'src/scss/**/*.scss' : 'dist/assets/css/*.css';
  const readme = fse.readFileSync(
    path.resolve(__dirname, '../', projectName, 'README.md'),
    'utf-8'
  );
  const gulpConfig = fse.readFileSync(
    path.resolve(__dirname, '../', projectName, 'gulpfile.js/config.js'),
    'utf-8'
  );
  const packageJson = fse.readFileSync(
    path.resolve(__dirname, '../', projectName, 'package.json'),
    'utf-8'
  );
  const packageLockJson = fse.readFileSync(
    path.resolve(__dirname, '../', projectName, 'package-lock.json'),
    'utf-8'
  );
  const gitIgnore = fse.readFileSync(
    path.resolve(__dirname, '../', projectName, '.gitignore'),
    'utf-8'
  );
  const stylelintIgnore = fse.readFileSync(
    path.resolve(__dirname, '../', projectName, '.stylelintignore'),
    'utf-8'
  );
  const eslintIgnore = fse.readFileSync(
    path.resolve(__dirname, '../', projectName, '.eslintignore'),
    'utf-8'
  );

  // README.md
  console.log(`🔧 ${projectName} の README を設定します`);
  fse.writeFileSync(
    path.resolve(__dirname, '../', projectName, 'README.md'),
    readme.replace('PROJECT_NAME', projectName)
  );

  // gulpfile.js
  console.log(
    `🔧 ${template}, ${preprocessor}, ${js} 用に gulpfile.js を設定します`
  );
  fse.writeFileSync(
    path.resolve(__dirname, '../', projectName, 'gulpfile.js/config.js'),
    gulpConfig
      .replace('TEMPLATE_ENGINE_CONFIG', template)
      .replace('PREPROCESSOR_CONFIG', preprocessor)
      .replace('JS_VERSION_CONFIG', js)
  );

  // package.json
  console.log(
    `🔧 ${template}, ${preprocessor}, ${js} 用に package.json を設定します`
  );
  fse.writeFileSync(
    path.resolve(__dirname, '../', projectName, 'package.json'),
    packageJson
      .replace('project-name', projectName.toLowerCase())
      .replaceAll('ESLINT_DIRECTORY', eslintDirectory)
      .replaceAll('STYLELINT_DIRECTORY', stylelintDirectory)
  );
  fse.writeFileSync(
    path.resolve(__dirname, '../', projectName, 'package-lock.json'),
    packageLockJson.replaceAll('project-name', projectName.toLowerCase())
  );

  // ignore
  if (template === 'html' || preprocessor === 'css' || js === 'es5') {
    console.log(`🔧 .gitignore を設定します`);
    fse.writeFileSync(
      path.resolve(__dirname, '../', projectName, '.gitignore'),
      gitIgnore.replace('dist', '# dist')
    );

    if (preprocessor === 'css') {
      console.log(`🔧 .stylelintignore を設定します`);
      fse.writeFileSync(
        path.resolve(__dirname, '../', projectName, '.stylelintignore'),
        stylelintIgnore.replace('dist', '# dist')
      );
    }

    if (js === 'es5') {
      console.log(`🔧 .eslintignore を設定します`);
      fse.writeFileSync(
        path.resolve(__dirname, '../', projectName, '.eslintignore'),
        eslintIgnore.replace('dist', '# dist')
      );
    }
  }
};
