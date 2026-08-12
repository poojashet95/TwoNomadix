import os
from dotenv import load_dotenv
from neo4j import GraphDatabase

load_dotenv()

URI = os.getenv("DB_URI")
USERNAME = os.getenv("DB_USERNAME", "cognodb")
PASSWORD = os.getenv("DB_PASSWORD")

if not URI or not PASSWORD:
    raise RuntimeError("DB_URI and DB_PASSWORD must be set in the environment.")

driver = GraphDatabase.driver(
    URI,
    auth=(USERNAME, PASSWORD),
)

def close_driver():
    driver.close()
