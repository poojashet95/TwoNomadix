# 01 — Project Overview

## What is TwoNomadix?

TwoNomadix is a travel discovery and trip-planning web application backed by a graph database.

Users can:

- Explore destinations.
- Search destinations.
- Open destination details.
- View attractions, hotels, restaurants and activities.
- Get graph-based destination recommendations.
- Add destinations to a trip.
- Remove destinations or clear the trip.

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Routing | React Router |
| HTTP | Axios |
| State | React Context |
| Backend | Python + FastAPI |
| Database | CognoDB / Neo4j-compatible graph driver |
| Frontend hosting | Vercel |
| Backend hosting | Render |

## Main destinations

The original seed data contains:

- Bangalore
- Mysore
- Coorg
- Hampi

The same architecture supports destinations such as Dubai, Thailand and Vietnam without creating separate React pages.

## Important concept

This is a **data-driven application**.

A destination should normally be added through graph/seed data and image mapping. The existing generic destination details page is reused.
