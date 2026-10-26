# ecommerce-api

Next.js フロント (ecommerce-app) 向けの API。

## 方針
- データ操作はすべてこのリポジトリの API を経由する
- ルートは必ず `@hono/zod-openapi` の `createRoute` で定義し、OpenAPI 仕様 (`/openapi.json`) を常に最新に保つ

## スタック
- Hono + @hono/zod-openapi (zod) on Cloudflare Workers
- TypeScript / Wrangler (デプロイ) / Vitest (テスト) / ESLint
- GitHub Actions (PR 時に typecheck・lint・test)

## コマンド
- `npm run dev` — ローカル起動 (wrangler dev)
- `npm run typecheck` / `npm run lint` / `npm test`
- `npm run deploy` — Cloudflare Workers へデプロイ

## 構成
- `src/index.ts` — アプリ本体、ルート登録、`/openapi.json`
- `src/routes/` — ルート定義とテスト

## 設計方針（必ず守る）
- 入力は必ず Zod で検証し、レスポンスの型もスキーマで定義する
- 金額・送料・在庫の計算は必ずサーバー側で行い、リクエストの値を信用しない
- 在庫の減算は条件付きUPDATE（stock >= n）で行い、二重販売を防ぐ。在庫・注文・入金の更新はトランザクションで行う
- Stripe Webhook は署名を検証し、stripe_events テーブルで冪等性を担保する
- 管理者向けAPIは /admin/* に置き、ミドルウェアで権限をチェックする
- 会員向けAPIは「自分のデータだけ」に絞る。他人の注文を取得できないことをテストで確認する
- 通知は notify() 関数に集約する（現在はLINE）
- 全テーブルでRLSを有効にする。ブラウザからDBへの直接アクセスは許可しない
- 秘密情報は Wrangler の secrets で管理し、コードや .env をコミットしない
- CORSはフロントのオリジンだけを許可する

## 開発ルール
- 1PR = 1機能。作業前にブランチを切る
- mainとdevelopには直接コミットしない。必ずブランチを切ってPRを出す
- 実装前に計画を提示し、承認を得てから着手する
- 在庫・決済・認可に関わる変更はテストを書く
- DBスキーマの変更は Drizzle のマイグレーションで行う（Supabaseの画面から手動で変更しない）
- PR作成前に typecheck / lint / test を通す
- API仕様を変えたら、PR説明に「フロントで npm run gen:api が必要」と明記する
- コミットメッセージ・PR説明・コメントは日本語

## 開発者について
- フロントエンド歴10年以上（Nuxt.js中心）。Next.jsとバックエンドは学習中
- バックエンドの設計判断（トランザクション、冪等性、認可など）は、PR説明で理由を簡潔に書くこと
