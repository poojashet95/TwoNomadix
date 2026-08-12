# 02 — Architecture

## End-to-end flow

```text
User
 ↓
React / Vite
 ↓
Axios
 ↓
FastAPI REST API
 ↓
Service Layer
 ↓
Repository Layer
 ↓
Graph Database
```

React is responsible for presentation and user interaction.

FastAPI is responsible for API handling and database access.

The repository is responsible for graph queries.

The graph database stores travel relationships.

## Frontend structure

```text
main.jsx
 ↓
BrowserRouter
 ↓
TripProvider
 ↓
App
 ↓
AppRoutes
 ↓
Pages
 ↓
Components
 ↓
Services
 ↓
API
```

## Backend structure

```text
main.py
 ↓
Routes
 ↓
Services
 ↓
Repositories
 ↓
graph.py
 ↓
Graph Database
```

## Why this separation matters

Do not put database queries inside React components.

Do not make every React component directly call Axios.

Keep API access in the service/API layers.

Keep graph queries in the repository layer.

## Recommendation flow

```text
Destination
 ↓
Attraction
 ↓
Category
 ↓
Another Attraction
 ↓
Another Destination
```

Destinations sharing attraction categories can become graph recommendations.
