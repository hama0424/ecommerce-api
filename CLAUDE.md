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
