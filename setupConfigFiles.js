const fse = require('fs-extra');
const path = require('path');

/**
 * 各種のコンフィグを設定する
 * @param {string} projectName
 * @param {*} options
 */
module.exports = function setupConfigFiles(projectName, options) {
  const { template, preprocessor, js } = options;
  const templateDirectory =
    template === 'html' ? 'dist/**/*.html' : 'src/pug/**/*.pug';
  const eslintDirectory =
    js === 'esnext' ? 'src/js/**/*.js' : 'dist/assets/js/*.js';
  const stylelintDirectory =
    preprocessor === 'scss' ? 'src/scss/**/*.scss' : 'dist/assets/css/*.css';
  const gulpConfig = fse.readFileSync(
    path.join(__dirname, projectName, 'gulpfile.js/config.js'),
    'utf-8'
  );
  const packageJson = fse.readFileSync(
    path.join(__dirname, projectName, 'package.json'),
    'utf-8'
  );
  const gitIgnore = fse.readFileSync(
    path.join(__dirname, projectName, '.gitignore'),
    'utf-8'
  );

  // gulpfile.js
  console.log(
    `🔧 ${template}, ${preprocessor}, ${js} 用に gulpfile.js を設定します`
  );
  fse.writeFileSync(
    path.join(__dirname, projectName, 'gulpfile.js/config.js'),
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
    path.join(__dirname, projectName, 'package.json'),
    packageJson
      .replace('project-name', projectName.toLowerCase())
      .replaceAll('TEMPLATE_DIRECTORY', templateDirectory)
      .replaceAll('ESLINT_DIRECTORY', eslintDirectory)
      .replaceAll('STYLELINT_DIRECTORY', stylelintDirectory)
  );

  // .gitignore
  if (template === 'html' || preprocessor === 'css' || js === 'es5') {
    console.log(
      `🔧 ${template}, ${preprocessor}, ${js} 用に .gitignore を設定します`
    );
    fse.writeFileSync(
      path.join(__dirname, projectName, '.gitignore'),
      gitIgnore.replace('dist', '# dist')
    );
  }
};
