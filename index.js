const cac = require('cac');
const cli = cac('lp-environment-builder');
const optionsValidate = require('./optionsValidate');

cli
  .command('<project>', '指定したディレクトリ名でプロジェクトを作成します')
  .option(
    '--template <name>',
    '利用するテンプレートエンジンを指定します(pug / ejs / html)',
    {
      default: 'pug',
    }
  )
  .option(
    '--preprocessor <name>',
    '利用するCSSプリプロセッサを指定します(scss / css)',
    {
      default: 'scss',
    }
  )
  .option('--js <name>', '利用するJSバージョンを指定します(esnext / es5)', {
    default: 'esnext',
  })
  .action((args, options) => {
    const projectName = args;
    const { template, preprocessor, js } = options;

    optionsValidate(options);
    console.log(
      `プロジェクト名: ${projectName}\nテンプレートエンジン: ${template}\nプリプロセッサ: ${preprocessor}\nJSバージョン: ${js}\n\n上記の設定でプロジェクトを作成します`
    );
  });

cli.help();
cli.parse();
