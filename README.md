# gulp-pug-test

Gulpを使用したPugの導入テストリポジトリです。

詳しくは以下の記事で公開されています。

[Pug(Jade)で効率的なマークアップ環境を作る ｜ Tips Note by TAM](http://www.tam-tam.co.jp/tipsnote/?p=10973)

## インストール
開発に必要なパッケージなどは以下のコマンドですべてインストールされます。クローン、またはダウンロードをしたあとに実行してください。

```
npm install
```

## 確認環境

以下の環境で動作の確認をしています。

- OS X 10.11.5(El Capitan)
- Node.js 4.2.4

## ファイル構成
開発は`/src`ディレクトリでおこない、`/dest`ディレクトリに出力されます。

```
.
├── README.md
├── gulpfile.js
├── package.json
└── src/
    ├── _data/
    │   └── site.json
    ├── _includes/
    │   ├── _footer.pug
    │   ├── _header.pug
    │   ├── _layout.pug
    │   ├── _meta.pug
    │   └── _script.pug
    ├── assets/
    │   ├── css/
    │   │   └── common.css
    │   └── js/
    │       └── common.js
    └── index.pug
```

## 開発タスク
以下のコマンドを実行すると、開発に必要なGulpのタスクがすべて実行されます。

```
npm start
```

以下のような処理がおこなわれます。

- PugをHTMLにコンパイル
- CSSを`/dest`にコピー
- jsを`/dest`にコピー
- ブラウザが起動して変更をリアルタイムに反映
