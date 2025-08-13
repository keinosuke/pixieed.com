# Pixieed Inc. Official Website

ピクシード株式会社の公式ウェブサイト

## プロジェクト構成

```
project/
├── src/                     # 開発用ソースファイル
│   ├── css/                # CSSファイル
│   │   ├── style.css
│   │   └── style-horizontal.css
│   ├── js/                 # JavaScriptファイル
│   │   └── script.js
│   ├── img/                # 画像ファイル
│   │   ├── logo_horizonal.svg
│   │   └── saito.jpg
│   ├── index.html          # メインページ
│   ├── index-ani.html      # アニメーション版
│   └── index_en.html       # 英語版
├── dist/                   # ビルド後の出力先
├── gulpfile.js            # Gulp設定
├── package.json           # プロジェクト設定
└── README.md              # このファイル
```

## セットアップ

1. 依存関係をインストール:
```bash
npm install
```

2. 開発サーバーを起動:
```bash
npm run dev
```

3. 本番用ビルド:
```bash
npm run build
```

## 利用可能なコマンド

- `npm run dev` - 開発サーバー起動 + ファイル監視
- `npm run build` - 本番用ビルド（最小化・最適化）
- `npm run watch` - ファイル変更の監視のみ
- `npm run clean` - distフォルダを削除

## 開発フロー

1. `src/` フォルダ内でファイルを編集
2. Gulpが自動的に変更を検知
3. ブラウザが自動リロード
4. `dist/` フォルダに最適化されたファイルが出力

## 特徴

- **自動リロード**: ファイル変更時にブラウザが自動更新
- **CSS/JS最小化**: 本番ビルド時にファイルサイズを最適化
- **画像最適化**: 画像ファイルの圧縮・最適化
- **ソースマップ**: デバッグ用のソースマップ生成
- **ローカルサーバー**: Browser Syncによるローカル開発サーバー

## 技術スタック

- **ビルドツール**: Gulp 4
- **CSS**: プレーンCSS（レスポンシブデザイン）
- **JavaScript**: バニラJS（パーティクルアニメーション）
- **フォント**: Google Fonts (Inter)