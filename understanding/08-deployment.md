# 08 — Deployment

## Production architecture

```text
Vercel
  ↓
React frontend
  ↓ HTTPS
Render
  ↓
FastAPI backend
  ↓
Graph Database
```

## Frontend — Vercel

The frontend root directory is:

```text
frontend
```

Typical Vite settings:

```text
Build Command: npm run build
Output Directory: dist
```

Production environment variable:

```text
VITE_API_BASE_URL=https://twonomadix.onrender.com
```

Do not put the local URL in the production environment.

## Backend — Render

Backend environment variables include database configuration and frontend origin.

Typical:

```text
DB_URI
DB_USERNAME
DB_PASSWORD
FRONTEND_ORIGIN
```

Never commit secrets.

## Stable domains

Backend:

```text
https://twonomadix.onrender.com
```

Frontend should use the stable Vercel production domain configured for the project.

## Deployment workflow

```text
Make local change
 ↓
Test backend
 ↓
Test frontend
 ↓
git status
 ↓
git add
 ↓
git commit
 ↓
git push
 ↓
Render/Vercel deployment
 ↓
Test production
```

## Frontend environment reminder

Vite variables beginning with `VITE_` are bundled into the frontend.

Therefore they are not suitable for secrets.

An API base URL is fine.

Database passwords are never frontend variables.
