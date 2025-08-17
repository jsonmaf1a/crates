# @crates/api

> discovers samples and talks to db

Bun backend for sample storage and playlist management.

## Setup

```bash
bun install
bun run compose:up
bun run migrate:latest
bun run dev
```

## Scripts

    - dev – Run API in watch mode
    - start – Start API
    - test – Run tests
    - migrate:[up|down|latest|status] – DB migrations
    - compose:[up|down|reset] – Docker Compose control
    - db:shell – Open Postgres developer shell
    - db:logs – Open Postgres developer logs

## Env

    - DATABASE_HOST – Postgres host
    - DATABASE_PORT – Postgres port
    - DATABASE_NAME – Postgres database name
    - DATABASE_USERNAME – Postgres username
    - DATABASE_PASSWORD – Postgres password
    - DATABASE_MAX – Max DB connections
    - DISCOGS_API_KEY – Discogs API key
    - PORT – API server port
