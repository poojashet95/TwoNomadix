# 09 — Debugging Guide

## Error: Couldn't connect to the travel database

Do not immediately modify React code.

Check:

### 1. Is FastAPI running?

```text
http://127.0.0.1:8000/health
```

### 2. Does destinations work?

```text
http://127.0.0.1:8000/destinations
```

### 3. Check frontend `.env`

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

### 4. Restart Vite

```text
Ctrl + C
npm run dev
```

### 5. Check browser Network

Chrome:

```text
DevTools
 → Network
 → Fetch/XHR
```

Find:

```text
GET /destinations
```

Inspect:

- Request URL.
- Status code.
- Response.
- CORS errors.

## Error: `ModuleNotFoundError: No module named 'app'`

Run Uvicorn from the backend directory:

```powershell
cd D:\AssignmentPooja\TwoNomadix\backend
python -m uvicorn app.main:app --reload
```

Do not start it from the parent directory unless the import path is configured accordingly.

## Error: `src refspec main does not match any`

Usually means there is no commit yet or the local branch name differs.

Check:

```powershell
git branch
git status
```

Create the first commit before pushing.

## Error: Git author identity unknown

Configure:

```powershell
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

Then commit again.

## Error: Vercel 404

Check:

- Vercel project root directory.
- Build settings.
- SPA fallback configuration.
- Deployment logs.
- Whether the latest commit was deployed.

For React Router applications, direct navigation to routes such as `/destination/Coorg` may require SPA fallback configuration.

## Error: API works locally but not from Vercel

Check:

1. Vercel `VITE_API_BASE_URL`.
2. Render backend status.
3. Backend CORS.
4. Browser Network tab.
5. Whether the production frontend URL is allowed by CORS.

## Debugging principle

Always isolate the failing layer:

```text
Database
 ↓
Backend
 ↓
API
 ↓
Frontend
 ↓
UI
```

Test from the bottom upward instead of changing multiple files at once.
