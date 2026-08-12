# 03 — Frontend

## Location

```text
frontend/src/
```

## Important files

### `main.jsx`

Application entry point. Sets up React, routing and trip context.

### `App.jsx`

Root application component.

### `routes/AppRoutes.jsx`

Defines application routes.

Current pattern:

```text
/                         → Home
/destination/:name        → DestinationDetails
/trip                     → TripPlanner
```

### `pages/Home.jsx`

Responsible for:

- Loading destinations.
- Search.
- Loading state.
- Error state.
- Destination cards.

### `pages/DestinationDetails.jsx`

Displays:

- Destination information.
- Attractions.
- Hotels.
- Restaurants.
- Activities.
- Recommendations.

It uses the destination name from the URL.

### `pages/TripPlanner.jsx`

Displays the user's selected destinations.

### `context/TripContext.jsx`

Maintains client-side trip state.

Typical functions:

```text
addDestination()
removeDestination()
clearTrip()
```

The current trip is not persisted to the graph database.

## Components

```text
DestinationCard.jsx
RecommendationCard.jsx
Navbar.jsx
Loader.jsx
```

Use components for reusable UI.

## API configuration

`src/api/api.js` reads:

```javascript
import.meta.env.VITE_API_BASE_URL
```

Local:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Production:

```text
https://twonomadix.onrender.com
```

## Frontend rule

Do not create a new React page for every destination.

Use the existing dynamic route:

```text
/destination/:name
```

and retrieve destination data from the backend.
