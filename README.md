# lp-environment-builder

LP 制作などで利用できる、静的なマークアップ環境を爆速で構築します。

## Usage

```
npm i
npm run start build
```

## Options

```
npm run start --help
```

でも確認できます。

### --templete

利用するテンプレートエンジンを指定します(pug / ejs / html)。
未入力、無効な値を指定すると pug になります。

## --preprocessor

利用する CSS プリプロセッサを指定します(scss / css)。
未入力 or 無効な値を指定すると scss になります。

## --js

利用する JS バージョンを指定します(esnext / es5)。
未入力 or 無効な値を指定すると esnext になります。
