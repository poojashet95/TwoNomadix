import os
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.graph import driver, close_driver
from app.routes.destination_routes import router as destination_router

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    close_driver()

app = FastAPI(
    title="Travel Planner API",
    description="Graph-powered travel discovery and trip planning API.",
    version="1.0.0",
    lifespan=lifespan,
)

frontend_origin = os.getenv("FRONTEND_ORIGIN")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://www.twonomadix.com",
        "https://twonomadix.com",
        "https://twonomadix-app.vercel.app",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(destination_router)

@app.get("/")
def home():
    return {"message": "Travel Planner API is running"}

@app.get("/health")
def health():
    try:
        with driver.session() as session:
            session.run("RETURN 1").consume()
        return {"status": "ok", "database": "connected"}
    except Exception as exc:
        return {"status": "error", "database": "unreachable", "detail": str(exc)}

@app.get("/graph-summary")
def graph_summary():
    query = '''
    MATCH (n)
    RETURN labels(n)[0] AS label, count(n) AS count
    ORDER BY label
    '''
    try:
        with driver.session() as session:
            return [record.data() for record in session.run(query)]
    except Exception as exc:
        return {"status": "error", "detail": str(exc)}
