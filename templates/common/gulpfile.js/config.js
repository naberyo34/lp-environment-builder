// コンフィグ

module.exports = {
  // ビルド対象ファイルのパス
  src: {
    root: './src',
    pug: ['./src/pug/**/*.pug', '!./src/pug/**/_*.pug'],
    ejs: ['./src/ejs/**/*.ejs', '!./src/ejs/**/_*.ejs'],
    scss: ['./src/scss/**/*.scss', '!./src/scss/**/_*.scss'],
    // モジュールのscssファイルも対象に含めたいときはこちらを指定(lintなど)
    allScss: ['./src/scss/**/*.scss', '!./src/scss/**/_reset.scss'],
    js: './src/js/**/*.js',
    // lib 配下のjsを対象に含めたくないときはこちらを指定
    userJs: ['./src/js/**/*.js', '!./src/js/lib/*.js'],
    images: './src/images/**/*',
    destHtml: './dist/**/*.html',
    destCss: './dist/assets/css/**/*.css',
  },
  // ビルドファイルの出力先パス
  dest: {
    root: './dist/',
    css: './dist/assets/css/',
    js: './dist/assets/js/',
    images: './dist/assets/images/',
  },
  // ウォッチ設定
  watch: {
    pug: './src/pug/**/*.pug',
    ejs: './src/ejs/**/*.ejs',
    html: './dist/**/*.html',
    scss: './src/scss/**/*.scss',
    css: './dist/assets/css/*.css',
    js: './dist/assets/js/*.js',
  },
  // ローカルサーバー
  server: {
    port: 3000,
    // 起動時に表示するパスを変えたい場合はここを変更しましょう
    startPath: './',
  },
  // 利用している環境
  templateEngine: 'TEMPLATE_ENGINE_CONFIG',
  preprocessor: 'PREPROCESSOR_CONFIG',
  jsVersion: 'JS_VERSION_CONFIG',
};
