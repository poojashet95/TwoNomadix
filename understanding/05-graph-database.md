# 05 — Graph Database

## Why a graph database?

Travel information is naturally relationship-oriented.

Two destinations may share:

- Attraction categories.
- Activities.
- Similar experiences.

A graph represents these relationships directly.

## Main nodes

```text
Destination
Attraction
Category
Activity
Hotel
Restaurant
```

## Relationships

```text
Destination
 ├── HAS_ATTRACTION → Attraction
 ├── HAS_HOTEL → Hotel
 └── HAS_RESTAURANT → Restaurant

Attraction
 ├── BELONGS_TO → Category
 └── OFFERS_ACTIVITY → Activity
```

## Example

```text
Coorg
 ↓ HAS_ATTRACTION
Abbey Falls
 ↓ BELONGS_TO
Nature
```

Another destination may have:

```text
Bangalore
 ↓ HAS_ATTRACTION
Cubbon Park
 ↓ BELONGS_TO
Nature
```

The shared `Nature` category can be used to create a recommendation relationship.

## SIMILAR_TO

The seed process creates:

```text
Destination ──SIMILAR_TO──> Destination
```

when destinations share an attraction category.

## Why this is important for the assignment

The graph is not being used merely as storage.

Relationships are used to derive recommendations, which demonstrates the graph-database requirement.

## Important rule

Do not replace graph relationships with hardcoded recommendation arrays unless there is a specific reason.

The graph should remain the source of recommendation relationships.
