const cac = require('cac');
const cli = cac('lp-environment-builder');
const validateOptions = require('./src/validateOptions');
const setupDirectory = require('./src/setupDirectory');
const setupConfigFiles = require('./src/setupConfigFiles');

cli
  .command('<project>', '指定したディレクトリ名でプロジェクトを作成します')
  .option(
    '--template <name>',
    '利用するテンプレートエンジンを指定します (pug / ejs / html)',
    {
      default: 'pug',
    }
  )
  .option(
    '--preprocessor <name>',
    '利用するCSSプリプロセッサを指定します (scss / css)',
    {
      default: 'scss',
    }
  )
  .option('--js <name>', '利用するJSバージョンを指定します (esnext / es5)', {
    default: 'esnext',
  })
  .action((args, options) => {
    validateOptions(options);
    setupDirectory(args, options);
    setupConfigFiles(args, options);
    console.log(`\n🔥 作成が完了しました\n\n'${args}' ディレクトリ内のすべてのファイルを、任意のリポジトリに配置して利用してください\n\n👀 隠しファイルの配置を忘れないようご注意ください\n👀 作成したファイルをこのリポジトリにコミットしないようご注意ください`)
  });

cli.help();
cli.parse();
