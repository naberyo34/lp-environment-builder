const cac = require('cac');
const cli = cac('lp-environment-builder');

cli.option(
  '--templete <name>',
  '利用するテンプレートエンジンを指定します(pug / ejs / html)。 未入力、無効な値を指定するとpugになります',
  {
    default: 'pug',
  }
);

cli.option(
  '--preprocessor <name>',
  '利用するCSSプリプロセッサを指定します(scss / css)。 未入力 or 無効な値を指定するとscssになります',
  {
    default: 'scss',
  }
);

cli.option(
  '--js <name>',
  '利用するJSバージョンを指定します(esnext / es5)。 未入力 or 無効な値を指定するとesnextになります',
  {
    default: 'es6',
  }
);

cli.help();
cli.version('0.0.1');

const parsed = cli.parse();
