# lp-environment-builder

LP 制作などで利用できる、静的なマークアップ環境を爆速で構築します。
コマンドによって作成したディレクトリはこのリポジトリにはコミットせず、任意のリポジトリに移動して利用してください。

## Getting Started

```
npm i
node index.js <project-name> [options]
```

options 未入力だと pug, scss, esnext の環境ができます。

## Usage

ejs やプレーン HTML, CSS、es5(jQuery)を利用したい場合は options を入力してください。

以下のコマンドから入力方法を確認できます。

```
node index.js --help
```

## 開発環境について

docs ディレクトリのドキュメントを参照してください。
