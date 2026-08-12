# 06 — Seed Data

## File

```text
backend/app/seed/seed_data.py
```

This file contains the travel data used to populate the graph database.

## Destination structure

Example:

```python
{
    "name": "Dubai",
    "state": "United Arab Emirates",
    "description": "A modern destination...",
    "attractions": [
        {
            "name": "Burj Khalifa",
            "category": "Landmark",
            "activities": [
                "Photography",
                "Skyline Viewing"
            ]
        }
    ],
    "hotels": [
        "Hotel Name"
    ],
    "restaurants": [
        "Restaurant Name"
    ]
}
```

## What the seed creates

For each destination it creates:

1. Destination node.
2. Hotel nodes and `HAS_HOTEL`.
3. Restaurant nodes and `HAS_RESTAURANT`.
4. Attraction nodes and `HAS_ATTRACTION`.
5. Category nodes and `BELONGS_TO`.
6. Activity nodes and `OFFERS_ACTIVITY`.
7. `SIMILAR_TO` relationships between destinations with shared categories.

## CRITICAL WARNING

The seed currently starts with:

```cypher
MATCH (n) DETACH DELETE n
```

This deletes the existing graph.

Therefore, seeding is a **full reset**.

Before running it, make sure the list contains every destination that should exist.

Never casually run this against production.

## Adding a destination

Add a new object to `travel_data`.

For Dubai, Thailand and Vietnam, keep the same schema.

After changing seed data:

```text
Update seed
 ↓
Run locally
 ↓
Check /destinations
 ↓
Check recommendations
 ↓
Test frontend
 ↓
Commit
 ↓
Push
 ↓
Redeploy backend
```

## Important

If the seed file is the complete source of initial travel data, removing an old destination from the seed and rerunning it will remove that destination from the database because the graph is cleared first.
