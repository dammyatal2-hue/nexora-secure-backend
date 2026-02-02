# Nexora Secure MVP (NestJS backend scaffold)

This repo is a **starter scaffold** for the Nexora Secure MVP backend:
- Org-based auth (JWT access token)
- Core modules: orgs, users, assets, alerts, incidents, risk, jobs, audit
- Prisma + Postgres schema included

## Prerequisites
- Node.js 18+
- Docker (recommended for Postgres + Redis)

## Setup
1. Copy env:
   - `cp .env.example .env`

2. Start dependencies:
   - `docker compose up -d`

3. Install deps:
   - `npm install`

4. Prisma generate + migrate:
   - `npx prisma generate`
   - `npx prisma migrate dev --name init`

5. Run API:
   - `npm run start:dev`

API should run on `http://localhost:3000`

## Notes
- This is **not** a complete security product yet. It’s the clean base to build:
  - asset ingestion
  - alert rules
  - incident playbooks
  - scheduled jobs
