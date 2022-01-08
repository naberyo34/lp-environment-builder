# PROJECT_NAME

## 注意事項

Node.js 16系で動作確認しています。Node.jsのバージョンを合わせてご利用ください。

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
