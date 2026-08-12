# 07 — Local Development

## Prerequisites

Install:

- Python
- Node.js
- npm

The backend also needs access to the configured graph database.

## Project location

Example:

```powershell
cd D:\AssignmentPooja\TwoNomadix
```

## Terminal 1 — Backend

```powershell
cd D:\AssignmentPooja\TwoNomadix\backend
D:\AssignmentPooja\venv\Scripts\Activate.ps1
```

Install dependencies on first setup:

```powershell
pip install -r requirements.txt
```

Start FastAPI:

```powershell
python -m uvicorn app.main:app --reload
```

Expected:

```text
Uvicorn running on http://127.0.0.1:8000
```

## Test backend

Open:

```text
http://127.0.0.1:8000
http://127.0.0.1:8000/health
http://127.0.0.1:8000/destinations
```

If `/destinations` returns JSON, the backend API is responding.

## Backend environment

`backend/.env` contains database configuration.

Example:

```env
DB_URI=your_database_uri
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
FRONTEND_ORIGIN=http://localhost:5173
```

Use the actual project values.

Never commit the real `.env`.

## Terminal 2 — Frontend

```powershell
cd D:\AssignmentPooja\TwoNomadix\frontend
```

First setup:

```powershell
npm install
```

Create:

```text
frontend/.env
```

Local value:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Start:

```powershell
npm run dev
```

Open the URL Vite displays, normally:

```text
http://localhost:5173
```

## Important environment rule

Never put both values under the same variable:

```env
VITE_API_BASE_URL=https://twonomadix.onrender.com
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Use only the local value in local `.env`.

Vercel gets the production value separately.

## If `.env` changes

Restart Vite:

```text
Ctrl + C
npm run dev
```

## Normal daily startup

Backend:

```powershell
cd backend
python -m uvicorn app.main:app --reload
```

Frontend:

```powershell
cd frontend
npm run dev
```

No need to run `npm install` every time.

No need to reseed every time.

## Basic smoke test

```text
Home
 ↓
Search
 ↓
Explore
 ↓
Destination details
 ↓
Attractions / Hotels / Restaurants
 ↓
Activities
 ↓
Recommendations
 ↓
Add to Trip
 ↓
Trip Planner
```
