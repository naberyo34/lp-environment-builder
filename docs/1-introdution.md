# ユーザー向け解説

## 機能

- gulp で pug / EJS / SCSS をコンパイルし、効率的なマークアップが行えます。
- ESNext + Webpack構成、ES5 + jQuery構成を選択できます。
- コンパイルを行わないプレーンHTML、CSS構成にすることもできます。

## ディレクトリ解説

| 名前 | 説明 |
| - | - |
| src | 開発用(コンパイル元)のフォルダ。pug, scss, js, 画像ファイルが格納されます。 |
| dist | `yarn dev`や`yarn build`でファイルが生成されます。HTML / CSS / ES5を利用する場合はここを直接編集してください。 |
| gulpfile.js | gulpの設定ファイル |

## Getting Started

```
npm i
npm run dev
```

## npm scripts 一覧

| コマンド | 内容 |
| - | - |
| dev   | gulp でプレビューサーバーと watch タスクを開始します。 |
| build | ビルド用の設定で`dist`配下のファイルを作成します。**webpack 等の設定が`dev`とは異なる**ため、納品時は必ずこちらのコマンドを利用してください。 |
| htmlhint | htmlhintを実行します。自動fixできるものは修正します。
| eslint | ESLintを実行します。自動fixできるものは修正します。
| stylelint | stylelintを実行します。自動fixできるものは修正します。 |
| format | prettierでフォーマットをかけます。 |

### husky (lint-staged) について

コミットの前に、ステージングしたファイルを対象に
- htmlhint
- eslint
- stylelint
- prettier

を実行します。エラーが発生した場合、コミットを中断します。

## 環境詳述

### pug / EJS

- ディレクトリ、ファイル構成はサンプルのため、各自利用しやすいよう調整してください。
- ファイル名に`_`がついているファイルはビルド対象から外されます。includeして利用するファイルには`_`をつけてください。
- 吐き出されるHTMLは圧縮されていますが、`yarn build`時にprettier側でフォーマットをかけることで圧縮を解除するようにしているため、特にpugコンパイル側での設定は不要です。

### SCSS

- ディレクトリ、ファイル構成はサンプルのため、各自利用しやすいよう調整してください。
- ファイル名に`_`がついているファイルはビルド対象から外されます。importして利用するファイルには`_`をつけてください。
- 吐き出されるCSSは圧縮しません。圧縮したい場合は`gulpfile.js/scss.js`で設定を変更してください。

### JS (ESNext) / JS (ES5)

- ESNext利用時は`src`配下のJSがwebpackでバンドルされます。
- ES5利用時は`dist`配下のファイルを直接編集します。jQueryが同梱されるので、適宜利用してください。

### images

- 画像ファイルは、gulpのタスクにより圧縮とコピーが行われます。
- 圧縮設定は`gulpfile.js/images.js`から変更できます。
