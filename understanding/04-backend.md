# 04 — Backend

## Location

```text
backend/app/
```

## Architecture

```text
Route
 ↓
Service
 ↓
Repository
 ↓
Graph Database
```

## `main.py`

Creates the FastAPI application and configures middleware such as CORS.

## Routes

File:

```text
app/routes/destination_routes.py
```

Routes expose HTTP endpoints.

Typical endpoints:

```text
GET /
GET /health
GET /graph-summary

GET /destinations
GET /destinations?search=<value>

GET /destinations/{name}

GET /destinations/{name}/activities

GET /destinations/{name}/recommendations
```

## Service layer

File:

```text
app/services/destination_service.py
```

The service layer coordinates application logic and delegates data access.

## Repository layer

File:

```text
app/repositories/destination_repository.py
```

Contains graph/Cypher queries.

This is the main place to modify when a database query needs to change.

## Database connection

File:

```text
app/database/graph.py
```

Creates the graph database driver.

Database credentials should come from environment variables.

## CORS

The backend must allow the frontend origin.

Local frontend:

```text
http://localhost:5173
```

Production frontend should use the stable Vercel domain.

## Backend rule

Keep credentials out of source code and never commit `.env`.
