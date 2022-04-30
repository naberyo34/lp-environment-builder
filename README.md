# lp-environment-builder

![lpe](https://user-images.githubusercontent.com/39970521/166114093-a3b3e463-2de4-4636-b83d-c57bf2a1001a.png)

LP 制作などで利用できる、静的なマークアップ環境を爆速で構築します。
コマンドによって作成したディレクトリはこのリポジトリにはコミットせず、任意のリポジトリに移動して利用してください。

## 推奨

Node.js 16系

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
