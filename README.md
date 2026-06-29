# Cruise — Luxury Car Rental

A full-stack luxury car rental SPA built with React + Vite (frontend) and Convex (backend).

## Structure

```
cruise/
├── convex/            # Convex server functions, schema, and generated API
├── frontend/          # React application (Vite)
│   ├── public/        # Static assets (car images, favicon)
│   └── src/           # React components, pages, hooks, styles, API layer
├── dist/              # Production build
└── (root configs)     # package.json, vite.config.js, eslint.config.js, etc.
```

## Setup

```bash
npm install
npm run convex dev   # Start Convex dev server (one-time setup)
npm run seed         # Seed database with demo data
npm run dev          # Start Vite dev server
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run convex` | Run Convex CLI |
| `npm run seed` | Seed database with initial data |
