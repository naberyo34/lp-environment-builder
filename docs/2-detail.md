# メンテナ向け解説

## 環境の構築方針について

本環境は、ビルド時の成果物をプレーンな HTML/CSS/JS の形とすることを原則としています。webpack による CSS、画像の JS バンドル等は行いません。

タスク制御には原則 gulp を利用し、webpack は babel-loader によるコンパイルタスクのみを担当させる方針をとっています。

gulp の`webpack-stream`を利用し、gulp タスク下で webpack を動作させています。

gulp を利用している都合上、メンテナンスされていないパッケージが今後も増加する懸念があり、できるだけ最小限の機能を実現するためのプラグインのみを導入する方針で構築しています。

## 各種 linter の設定について

### htmlhint

.htmlhintrc の設定を参照ください。わりと厳し目の設定にしています。

### ESLint

原則`airbnb`のルールを採用しています。運用中に使いづらいルールがあった場合には、適宜`.eslintrc`の設定変更を行ってください。

#### JavaScript (ESNext)

- airbnb/base (base は React を利用しない環境向けのルールです)

#### JavaScript (ES5)

- airbnb-base/legacy (ES5 向けルール)

### stylelint

公式提供の最も厳格なルール`stylelint-config-standard`を基盤に、Twitter 社のプロパティオーダールール`stylelint-config-recess-order`を追加しています。

プロパティを手動で並べ替えるのは煩雑なため、エディタ側の設定でセーブ時に自動フォーマットが走る設定にしておくことを推奨します。

## prettier の設定について

原則的に`airbnb`の ESLint ルールに倣い、

- インデントはスペース 2 つ
- 末尾のセミコロンあり
- シングルクォート (pug を除く)

を採用しています。お好みの設定がある場合は適宜変更してください。

## editorconfig の設定について

prettier と競合しないよう、同様の内容を指定しています。

## gulpfile.jsの構成について

`gulpfile.js`はGulp 4系の記述を採用しています。

| ファイル名 | 説明 |
| - | - |
| index.js | yarn scriptsで実行される親タスクが記載されています。必要な処理を統括して実行します。 |
| config.js | ディレクトリ設定など、頻繁に変更される可能性が高い値をオブジェクトとして管理しています。**軽微な設定変更であればここを変更すれば対応できる可能性が高いので、カスタマイズ時は最初に参照することを推奨します。** |
| pug.js | pugのコンパイルに関するタスクです。コンパイル設定の調整ができます。 |
| ejs.js | ejsのコンパイルに関するタスクです。configで`useEjs`がtrueのとき、pug.jsの代わりに呼ばれます。|
| html.js | プレーンHTMLの利用時に使われます。htmlhintをかけます。 |
| scss.js | scssのコンパイルに関するタスクです。コンパイル設定の調整ができます。デフォルトでautoprefixerが動作するようになっています。 |
| css.js | プレーンCSSの利用時に使われます。autoprefixerが動作するようになっています。 |
| images.js | 画像圧縮に関するタスクです。圧縮設定の調整ができます。 |
| webpackDev.js | ESNext利用時に、`webpack.dev.js`の設定を用いてwebpackのコンパイルタスクを実行します。(`yarn dev`時に実行されます)
| webpackProd.js | ESNext利用時に、`webpack.prod.js`の設定を用いてwebpackのコンパイルタスクを実行します。(`yarn build`時に実行されます) |
| server.js | BrowserSync (ローカルサーバー)を立ち上げます。 |
| watch.js | `_dev`配下のファイルの変更を監視し、コンパイルタスクを再実行します。ファイル変更時にはBrowserSyncのホットリロードがかかります。 |

## 環境構築スクリプトについて

CLIツールは`cac`で作成されています。
