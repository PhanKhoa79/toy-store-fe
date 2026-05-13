# Toyshop FE

Frontend Next.js App Router cho MVP ecommerce bán đồ chơi trẻ em.

## Run local

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

## Source of truth

- Architecture docs: `C:/Users/hi/ai-architecture`
- Local contracts: `src/contracts`
- FE docs: `docs`

FE không import code từ backend. Contract/type được duplicate từ `ai-architecture/contracts` và cần sync bằng review checklist.
