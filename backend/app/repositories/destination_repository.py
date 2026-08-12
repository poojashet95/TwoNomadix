from app.database.graph import driver


class DestinationRepository:

    @staticmethod
    def get_all_destinations():
        query = '''
        MATCH (d:Destination)
        RETURN d.name AS name, d.state AS state, d.description AS description
        ORDER BY d.name
        '''
        with driver.session() as session:
            return [record.data() for record in session.run(query)]

    @staticmethod
    def get_destination_details(name: str):
        query = '''
        MATCH (d:Destination {name: $name})
        OPTIONAL MATCH (d)-[:HAS_ATTRACTION]->(a:Attraction)
        OPTIONAL MATCH (d)-[:HAS_HOTEL]->(h:Hotel)
        OPTIONAL MATCH (d)-[:HAS_RESTAURANT]->(r:Restaurant)
        RETURN d.name AS destination,
               d.state AS state,
               d.description AS description,
               collect(DISTINCT a.name) AS attractions,
               collect(DISTINCT h.name) AS hotels,
               collect(DISTINCT r.name) AS restaurants
        '''
        with driver.session() as session:
            record = session.run(query, {"name": name}).single()
            return record.data() if record else None

    @staticmethod
    def get_activities(name: str):
        query = '''
        MATCH (d:Destination {name: $name})
              -[:HAS_ATTRACTION]->(a:Attraction)
              -[:OFFERS_ACTIVITY]->(activity:Activity)
        RETURN a.name AS attraction,
               collect(DISTINCT activity.name) AS activities
        ORDER BY a.name
        '''
        with driver.session() as session:
            return [record.data() for record in session.run(query, {"name": name})]

    @staticmethod
    def get_recommendations(name: str):
        # Multi-hop graph traversal:
        # selected destination -> attraction -> category
        # -> another attraction -> another destination
        query = '''
        MATCH (d:Destination {name: $name})
              -[:HAS_ATTRACTION]->(a:Attraction)
              -[:BELONGS_TO]->(c:Category)
              <-[:BELONGS_TO]-(other_attraction:Attraction)
              <-[:HAS_ATTRACTION]-(other:Destination)
        WHERE other.name <> d.name
        RETURN other.name AS destination,
               collect(DISTINCT c.name) AS matching_categories,
               collect(DISTINCT other_attraction.name) AS attractions
        ORDER BY other.name
        '''
        with driver.session() as session:
            return [record.data() for record in session.run(query, {"name": name})]

    @staticmethod
    def search_destinations(search: str):
        query = '''
        MATCH (d:Destination)
        WHERE toLower(d.name) CONTAINS toLower($search)
           OR toLower(d.state) CONTAINS toLower($search)
        RETURN d.name AS name, d.state AS state, d.description AS description
        ORDER BY d.name
        '''
        with driver.session() as session:
            return [record.data() for record in session.run(query, {"search": search})]
