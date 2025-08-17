# crates

> A platform for discovering, manipulating, and organizing audio samples with client-side DSP.

## Structure

- `apps/`
  - `web` – Solid.js frontend
  - `api` – Bun backend
  - `bot` – Telegram bot
- `libs/`
  - `shared` – shared utilities and types
  - `dsp` – Rust DSP engine compiled to WASM

## Setup

```bash
bun install
bun run dev       # Starts all apps in development mode
```

## Scripts

    - dev:[api|bot|web] – Run specific app in watch mode
    - build:[api|bot|web] – build specific app
    - lint:ts – TypeScript type check
    - lint – Biome linter
    - format – Biome formatter
