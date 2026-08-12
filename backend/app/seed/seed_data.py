from app.database.graph import driver

travel_data = [
    {
        "name": "Bangalore",
        "state": "Karnataka",
        "description": "Garden City of India, known for green spaces, technology and vibrant food culture.",
        "attractions": [
            {"name": "Lalbagh Botanical Garden", "category": "Nature", "activities": ["Nature Walk", "Photography"]},
            {"name": "Cubbon Park", "category": "Nature", "activities": ["Cycling", "Bird Watching"]},
        ],
        "hotels": ["Taj West End", "Radisson Blu"],
        "restaurants": ["MTR", "Vidyarthi Bhavan"],
    },
    {
        "name": "Mysore",
        "state": "Karnataka",
        "description": "The City of Palaces, famous for royal heritage, architecture and local cuisine.",
        "attractions": [
            {"name": "Mysore Palace", "category": "Heritage", "activities": ["Palace Tour", "Photography"]},
        ],
        "hotels": ["Royal Orchid"],
        "restaurants": ["RRR Restaurant"],
    },
    {
        "name": "Coorg",
        "state": "Karnataka",
        "description": "A lush hill destination with waterfalls, coffee plantations and outdoor experiences.",
        "attractions": [
            {"name": "Abbey Falls", "category": "Nature", "activities": ["Trekking", "Nature Walk"]},
            {"name": "Coffee Plantation", "category": "Nature", "activities": ["Coffee Plantation Tour", "Photography"]},
        ],
        "hotels": ["Coorg Cliffs Resort"],
        "restaurants": ["Coorg Cuisine"],
    },
    {
        "name": "Hampi",
        "state": "Karnataka",
        "description": "A UNESCO World Heritage destination filled with temples, ruins and remarkable landscapes.",
        "attractions": [
            {"name": "Virupaksha Temple", "category": "Heritage", "activities": ["Temple Tour", "Photography"]},
        ],
        "hotels": ["Heritage Resort"],
        "restaurants": ["Taste of Hampi"],
    },
]

def seed_database():
    with driver.session() as session:
        session.run("MATCH (n) DETACH DELETE n")

        for d in travel_data:
            session.run(
                '''
                MERGE (destination:Destination {name: $name})
                SET destination.state = $state,
                    destination.description = $description
                ''',
                {
                    "name": d["name"],
                    "state": d["state"],
                    "description": d["description"],
                },
            )

            for hotel in d["hotels"]:
                session.run(
                    '''
                    MATCH (d:Destination {name: $destination})
                    MERGE (h:Hotel {name: $hotel})
                    MERGE (d)-[:HAS_HOTEL]->(h)
                    ''',
                    {"destination": d["name"], "hotel": hotel},
                )

            for restaurant in d["restaurants"]:
                session.run(
                    '''
                    MATCH (d:Destination {name: $destination})
                    MERGE (r:Restaurant {name: $restaurant})
                    MERGE (d)-[:HAS_RESTAURANT]->(r)
                    ''',
                    {"destination": d["name"], "restaurant": restaurant},
                )

            for attraction in d["attractions"]:
                session.run(
                    '''
                    MATCH (d:Destination {name: $destination})
                    MERGE (a:Attraction {name: $attraction})
                    MERGE (d)-[:HAS_ATTRACTION]->(a)
                    ''',
                    {"destination": d["name"], "attraction": attraction["name"]},
                )

                session.run(
                    '''
                    MATCH (a:Attraction {name: $attraction})
                    MERGE (c:Category {name: $category})
                    MERGE (a)-[:BELONGS_TO]->(c)
                    ''',
                    {"attraction": attraction["name"], "category": attraction["category"]},
                )

                for activity in attraction["activities"]:
                    session.run(
                        '''
                        MATCH (a:Attraction {name: $attraction})
                        MERGE (activity:Activity {name: $activity})
                        MERGE (a)-[:OFFERS_ACTIVITY]->(activity)
                        ''',
                        {"attraction": attraction["name"], "activity": activity},
                    )

        # Connect destinations that share a category.
        session.run(
            '''
            MATCH (d1:Destination)-[:HAS_ATTRACTION]->(a1:Attraction)-[:BELONGS_TO]->(c:Category)
                  <-[:BELONGS_TO]-(a2:Attraction)<-[:HAS_ATTRACTION]-(d2:Destination)
            WHERE d1.name <> d2.name
            MERGE (d1)-[:SIMILAR_TO]->(d2)
            '''
        )

    print("Database seeded successfully!")


if __name__ == "__main__":
    seed_database()
