const cac = require('cac');
const cli = cac('lp-environment-builder');
const validateOptions = require('./validateOptions');
const makeDirectory = require('./makeDirectory');

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
    validateOptions(options);
    makeDirectory(args, options);
  });

cli.help();
cli.parse();
